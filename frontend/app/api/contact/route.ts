import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const defaultToEmail = process.env.CONTACT_FORM_TO_EMAIL || ''
const bccEmail = process.env.CONTACT_FORM_BCC_EMAIL || 'acockerham@impactmarketing.net'
const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || ''
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || ''
const RECAPTCHA_MIN_SCORE = 0.5
const RECAPTCHA_ACTION = 'contact_form'
const RECAPTCHA_TIMEOUT_MS = 3000
const RECAPTCHA_MAX_ATTEMPTS = 2

type RecaptchaVerification =
  | {status: 'verified'}
  | {status: 'rejected'}
  | {status: 'unavailable'}
  | {status: 'misconfigured'}
  | {status: 'skipped-development'}

function isAllowedRecaptchaHostname(hostname: string | undefined): boolean {
  if (!hostname) return false

  const normalizedHostname = hostname.toLowerCase()
  const canonicalHostnames = ['boxersbedandbiscuits.com', 'www.boxersbedandbiscuits.com']

  if (canonicalHostnames.includes(normalizedHostname)) return true
  if (process.env.VERCEL_ENV === 'preview') {
    const allowedPreviewHostnames = [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]
      .filter((value): value is string => Boolean(value))
      .map((value) => value.toLowerCase())

    if (allowedPreviewHostnames.includes(normalizedHostname)) return true
  }

  return (
    process.env.NODE_ENV !== 'production' && ['localhost', '127.0.0.1'].includes(normalizedHostname)
  )
}

async function verifyRecaptcha(token: unknown): Promise<RecaptchaVerification> {
  if (!recaptchaSecret) {
    return process.env.NODE_ENV === 'production'
      ? {status: 'misconfigured'}
      : {status: 'skipped-development'}
  }
  if (typeof token !== 'string' || !token) return {status: 'rejected'}

  let lastError: unknown

  for (let attempt = 1; attempt <= RECAPTCHA_MAX_ATTEMPTS; attempt += 1) {
    try {
      const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({secret: recaptchaSecret, response: token}),
        signal: AbortSignal.timeout(RECAPTCHA_TIMEOUT_MS),
      })

      if (!res.ok) throw new Error(`reCAPTCHA verification returned HTTP ${res.status}`)

      const data = (await res.json()) as {
        success?: boolean
        score?: number
        action?: string
        hostname?: string
      }
      const verified =
        data.success === true &&
        (data.score ?? 0) >= RECAPTCHA_MIN_SCORE &&
        data.action === RECAPTCHA_ACTION &&
        isAllowedRecaptchaHostname(data.hostname)

      return verified ? {status: 'verified'} : {status: 'rejected'}
    } catch (error) {
      lastError = error
    }
  }

  // Keep legitimate leads moving during a genuine Google outage, but make the
  // bypass visible in both server logs and the resulting notification email.
  console.error('reCAPTCHA verification unavailable after retries:', lastError)
  return {status: 'unavailable'}
}
const ALLOWED_RECIPIENTS = [
  'boxersgm1@outlook.com',
  'angela@boxersbedandbiscuits.com',
  'boxermarketing@outlook.com',
]

const MAX_CONTACT_BODY_BYTES = 32 * 1024

export async function POST(request: Request) {
  try {
    const declaredLength = Number(request.headers.get('content-length'))
    if (Number.isFinite(declaredLength) && declaredLength > MAX_CONTACT_BODY_BYTES) {
      return NextResponse.json({error: 'Request is too large'}, {status: 413})
    }

    const body = await request.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json({error: 'Invalid request body'}, {status: 400})
    }

    const {recaptchaToken, companyWebsite} = body as Record<string, unknown>
    delete body.recaptchaToken
    delete body.companyWebsite

    // Honeypot fields are hidden from people but commonly filled by simple bots.
    // Return the normal success response so the trap is not disclosed.
    if (typeof companyWebsite === 'string' && companyWebsite.trim()) {
      console.warn('Contact form honeypot triggered; submission discarded', {
        email: typeof (body as Record<string, unknown>).email === 'string' ? (body as Record<string, unknown>).email : undefined,
      })
      return NextResponse.json({success: true})
    }

    const recaptchaVerification = await verifyRecaptcha(recaptchaToken)

    if (recaptchaVerification.status === 'misconfigured') {
      console.error('RECAPTCHA_SECRET_KEY is missing in a production environment')
      return NextResponse.json(
        {error: 'The contact form is temporarily unavailable. Please call us at 740-423-7777.'},
        {status: 503},
      )
    }

    if (recaptchaVerification.status === 'rejected') {
      return NextResponse.json(
        {error: 'Verification failed. Please try again, or call us at 740-423-7777.'},
        {status: 400},
      )
    }

    const recaptchaUnavailable = recaptchaVerification.status === 'unavailable'

    const requestedRecipient = (body._recipientEmail as string)?.toLowerCase().trim()
    delete body._recipientEmail
    const toEmail =
      requestedRecipient && ALLOWED_RECIPIENTS.includes(requestedRecipient)
        ? requestedRecipient
        : defaultToEmail

    const fieldLabels: Record<string, string> = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      service: 'Service',
      petName: 'Pet Name',
      message: 'Message',
      areasOfInterest: 'Areas of Interest',
      availability: 'Availability',
      pastEmployment: 'Past Employment & Experience',
    }

    const lines = Object.entries(body)
      .filter(([, value]) => typeof value === 'string' && value.trim())
      .map(
        ([key, value]) =>
          `<p><strong>${escapeHtml(fieldLabels[key] || key)}:</strong> ${escapeHtml(value as string)}</p>`,
      )
      .join('\n')

    if (!lines) {
      return NextResponse.json({error: 'No form data provided'}, {status: 400})
    }

    if (!toEmail || !fromEmail) {
      console.error('Email environment variables are not configured')
      return NextResponse.json({error: 'Contact form is not configured'}, {status: 500})
    }

    const senderName = (body.name as string) || 'Website Visitor'
    const senderEmail = (body.email as string) || undefined

    await transporter.sendMail({
      from: `"Boxers Bed & Biscuits Website" <${fromEmail}>`,
      to: toEmail,
      bcc: bccEmail || undefined,
      replyTo: senderEmail,
      subject: `${recaptchaUnavailable ? '[reCAPTCHA unavailable] ' : ''}New Contact Form Submission from ${senderName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        ${
          recaptchaUnavailable
            ? '<p><strong>Security notice:</strong> Google reCAPTCHA could not be reached after two attempts. This submission was delivered to avoid losing a potentially legitimate lead.</p>'
            : ''
        }
        ${lines}
        <hr />
        <p style="color: #888; font-size: 12px;">Sent from the Boxers Bed & Biscuits website contact form.</p>
      `,
    })

    return NextResponse.json({success: true})
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {error: 'Failed to send message. Please try again or contact us directly.'},
      {status: 500},
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
