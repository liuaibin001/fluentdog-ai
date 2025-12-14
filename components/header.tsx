import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
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
            >
              <path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3-3" />
              <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2" />
              <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2" />
            </svg>
          </div>
          <span className="text-xl font-bold">BarkSense AI</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            功能
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            工作原理
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            价格
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            登录
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            免费试用
          </Button>
        </div>
      </div>
    </header>
  )
}
