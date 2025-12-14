import Link from "next/link"

export function PromoBanner() {
  return (
    <div className="relative z-50 bg-gradient-to-r from-primary via-primary/90 to-primary px-4 py-2.5 text-center text-sm text-primary-foreground">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/75 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
          </span>
          <strong>Limited Time Offer:</strong>
        </span>
        <span className="hidden sm:inline">
          Get 50% off your first 3 months with code
        </span>
        <span className="sm:hidden">50% off first 3 months:</span>
        <code className="rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono font-semibold">
          BARKSENSE50
        </code>
        <Link
          href="/signup"
          className="ml-2 hidden rounded-full bg-primary-foreground px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary-foreground/90 sm:inline-block"
        >
          Claim Now
        </Link>
      </div>
    </div>
  )
}
