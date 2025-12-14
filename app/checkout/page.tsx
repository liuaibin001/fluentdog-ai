"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Button } from "@/components/ui/button"

const PLANS = {
  premium: {
    name: "Premium",
    price: "$19.9",
    priceValue: "19.90",
    period: "/month",
    description: "Professional diagnosis and continuous peace of mind",
    features: [
      "All Basic features",
      "AI emotion classification (5 types)",
      "Anxiety intensity score (1-10)",
      "Context correlation analysis",
      "Weekly professional reports",
      "Vet-grade report export",
      "30-day history",
    ],
  },
  coach: {
    name: "Coach",
    price: "$49.9",
    priceValue: "49.90",
    period: "/month",
    description: "Complete solution to stop excessive barking",
    features: [
      "All Premium features",
      "Personalized training courses",
      "Progressive behavior modification",
      "AI calming sound library",
      "Real-time training tracking",
      "Priority customer support",
      "Unlimited history",
    ],
  },
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") as "premium" | "coach" | null
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const plan = planId ? PLANS[planId] : null

  if (!plan || !planId) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Invalid Plan</h1>
          <p className="mt-2 text-muted-foreground">
            Please select a valid subscription plan.
          </p>
          <Button asChild className="mt-4">
            <Link href="/#pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    )
  }

  const createOrder = async () => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      return data.orderId
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order")
      throw err
    }
  }

  const onApprove = async (data: { orderID: string }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: data.orderID,
          planId,
        }),
      })

      const captureData = await response.json()

      if (!response.ok) {
        throw new Error(captureData.error || "Failed to capture order")
      }

      // Redirect to success page
      router.push(`/checkout/success?plan=${planId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed")
      setLoading(false)
    }
  }

  const onError = (err: Record<string, unknown>) => {
    console.error("PayPal error:", err)
    setError("Payment failed. Please try again.")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-foreground"
                >
                  <path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3-3" />
                  <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2" />
                  <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2" />
                </svg>
              </div>
              <span className="text-2xl font-bold">FluentDog</span>
            </Link>
            <h1 className="mt-6 text-3xl font-bold">Complete Your Purchase</h1>
            <p className="mt-2 text-muted-foreground">
              Subscribe to FluentDog {plan.name}
            </p>
          </div>

          {/* Plan Summary */}
          <div className="mb-8 rounded-lg border border-border/40 bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{plan.name} Plan</h2>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{plan.price}</div>
                <div className="text-sm text-muted-foreground">{plan.period}</div>
              </div>
            </div>

            <div className="mt-6 border-t border-border/40 pt-6">
              <h3 className="mb-3 text-sm font-semibold">What&apos;s included:</h3>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-md bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* PayPal Buttons */}
          <div className="rounded-lg border border-border/40 bg-card p-6">
            <h3 className="mb-4 text-center text-sm font-semibold">
              Choose Payment Method
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                  currency: "USD",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "rect",
                    label: "pay",
                  }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                  disabled={loading}
                />
              </PayPalScriptProvider>
            )}

            <p className="mt-4 text-center text-xs text-muted-foreground">
              By completing this purchase, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/#pricing"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              &larr; Back to pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
