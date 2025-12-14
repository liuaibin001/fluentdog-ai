import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "Get started and understand your dog's barking patterns",
    popular: false,
    features: [
      "Bark counting & detection",
      "24-hour history",
      "Basic monitoring",
      "Community support",
    ],
    cta: "Start Free",
  },
  {
    name: "Premium",
    price: "$19.9",
    period: "/month",
    description: "Professional diagnosis and continuous peace of mind",
    popular: true,
    features: [
      "All Basic features",
      "AI emotion classification (5 types)",
      "Anxiety intensity score (1-10)",
      "Context correlation analysis",
      "Weekly professional reports",
      "Vet-grade report export",
      "30-day history",
    ],
    cta: "Start 14-Day Trial",
  },
  {
    name: "Coach",
    price: "$49.9",
    period: "/month",
    description: "Complete solution to stop excessive barking",
    popular: false,
    features: [
      "All Premium features",
      "Personalized training courses",
      "Progressive behavior modification",
      "AI calming sound library",
      "Real-time training tracking",
      "Priority customer support",
      "Unlimited history",
    ],
    cta: "Start 14-Day Trial",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-24" aria-labelledby="pricing-heading">
      <header className="mx-auto max-w-3xl text-center">
        <h2 id="pricing-heading" className="mb-4 text-balance text-4xl font-bold md:text-5xl">
          Choose the Right Plan for You
        </h2>
        <p className="text-pretty text-lg text-muted-foreground">
          Start free, upgrade anytime for professional features
        </p>
      </header>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative border-border/40 bg-card/50 backdrop-blur ${
              plan.popular ? "border-2 border-primary" : ""
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
              <Button
                className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <a href="/signup">{plan.cta}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        All paid plans include a 14-day money-back guarantee. Cancel anytime.
      </p>
    </section>
  )
}
