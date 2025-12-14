"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SubscribeButton } from "@/components/subscribe-button"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    period: "",
    description: "Start understanding why your dog barks so much",
    popular: false,
    features: [
      "Record your dog barking",
      "Basic bark analysis",
      "24-hour bark history",
      "Community support",
    ],
    cta: "Analyze Free",
    href: "/signup",
    requiresAuth: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19.9",
    period: "/month",
    description: "Understand why your dog barks at nothing, when left alone, or at night",
    popular: true,
    features: [
      "All Basic features",
      "AI emotion classification (5 types)",
      "Anxiety score (1-10 scale)",
      "Identify barking triggers",
      "Weekly bark reports",
      "Vet-grade report export",
      "30-day history",
    ],
    cta: "Start Analysis",
    href: "/checkout?plan=premium",
    requiresAuth: true,
  },
  {
    id: "coach",
    name: "Coach",
    price: "$49.9",
    period: "/month",
    description: "Complete training to stop dog barking for good",
    popular: false,
    features: [
      "All Premium features",
      "Personalized stop barking training",
      "Progressive behavior modification",
      "AI calming sounds for anxiety",
      "Track training progress",
      "Priority support",
      "Unlimited history",
    ],
    cta: "Stop Barking Now",
    href: "/checkout?plan=coach",
    requiresAuth: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Stop Dog Barking Plans</p>
          <h2 id="pricing-heading" className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Choose your <span className="text-gradient">bark training plan</span>
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            From basic bark analysis to full training programs that stop excessive dog barking
          </p>
        </header>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`card-shadow relative border-border/50 bg-card transition-all hover:-translate-y-1 hover:shadow-lg ${
                plan.popular ? "border-2 border-primary ring-4 ring-primary/10" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3" role="list">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.requiresAuth ? (
                  <SubscribeButton
                    href={plan.href}
                    cta={plan.cta}
                    popular={plan.popular}
                  />
                ) : (
                  <Button
                    className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href={plan.href}>{plan.cta}</a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          All paid plans include a 14-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
