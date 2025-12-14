import Link from "next/link"
import { AuthButton } from "@/components/auth-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2" aria-label="FluentDog Home">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary-foreground"
              aria-hidden="true"
            >
              <path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3-3" />
              <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2" />
              <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2" />
            </svg>
          </div>
          <span className="text-xl font-bold">FluentDog</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex" role="list">
          <li>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </a>
          </li>
        </ul>

        <AuthButton />
      </nav>
    </header>
  )
}
