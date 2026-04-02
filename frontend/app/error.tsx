'use client'

export default function Error({reset}: {error: Error & {digest?: string}; reset: () => void}) {
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

      <h1 className="font-heading text-[36px] md:text-[48px] font-semibold tracking-tight text-forest mb-4">
        Something Went Wrong
      </h1>

      <p className="font-sans text-base text-text-muted mb-8 max-w-md">
        We hit an unexpected error. Please try again, or head back to the homepage.
      </p>

      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-terracotta-dark text-white border-[1.5px] border-terracotta-dark px-8 py-4 font-sans font-medium text-[16px] tracking-[0.02em] hover:brightness-90 transition-all"
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-transparent text-forest border-[1.5px] border-forest px-8 py-4 font-sans font-medium text-[16px] tracking-[0.02em] hover:bg-forest/5 transition-all"
        >
          Back to Home
        </a>
      </div>
    </section>
  )
}
