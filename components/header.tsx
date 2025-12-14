import Link from "next/link"
import Image from "next/image"
import { AuthButton } from "@/components/auth-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2" aria-label="FluentDog Home">
          <Image
            src="/icons8-guide-dog-48.png"
            alt="FluentDog"
            width={32}
            height={32}
            className="h-8 w-8"
          />
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
