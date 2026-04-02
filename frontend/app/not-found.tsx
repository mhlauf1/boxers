import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center bg-cream overflow-hidden">
      <img
        src="/illustrations/hero-left-dog.png"
        alt=""
        aria-hidden="true"
        className="absolute left-[5%] bottom-[10%] w-[60px] lg:w-[100px] pointer-events-none opacity-30"
      />
      <img
        src="/illustrations/hero-right-image.png"
        alt=""
        aria-hidden="true"
        className="absolute right-[5%] bottom-[15%] w-[40px] lg:w-[70px] pointer-events-none opacity-30"
      />

      <p className="font-heading text-[120px] md:text-[180px] leading-none font-semibold text-forest/10 mb-0">
        404
      </p>

      <h1 className="font-heading text-[36px] md:text-[48px] font-semibold tracking-tight text-forest -mt-6 mb-4">
        Page Not Found
      </h1>

      <p className="font-sans text-base text-text-muted mb-8 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or
        no longer exists.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-terracotta-dark text-white border-[1.5px] border-terracotta-dark px-8 py-4 font-sans font-medium text-[16px] tracking-[0.02em] hover:brightness-90 transition-all"
      >
        Back to Home
      </Link>
    </section>
  )
}
