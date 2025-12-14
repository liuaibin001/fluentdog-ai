import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Background } from "@/components/background"

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Background />
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10">
          <svg
            className="h-10 w-10 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold">Payment Cancelled</h1>
        <p className="mt-2 text-muted-foreground">
          Your payment was cancelled. No charges have been made.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/#pricing">Try Again</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Having trouble? Contact us at{" "}
          <a
            href="mailto:support@fluentdog.app"
            className="text-primary hover:underline"
          >
            support@fluentdog.app
          </a>
        </p>
      </div>
    </div>
  )
}
