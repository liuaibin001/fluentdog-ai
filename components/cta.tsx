import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="container mx-auto px-4 py-24" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-12 text-center backdrop-blur">
        <h2 id="cta-heading" className="mb-4 text-balance text-4xl font-bold md:text-5xl">
          Ready to Understand Your Dog Better?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
          Join thousands of pet owners using FluentDog to scientifically solve excessive barking
          and build a deeper bond with their furry friends.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto" asChild>
            <a href="/signup">Start Free 14-Day Trial</a>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
            <a href="mailto:sales@fluentdog.app">Contact Sales</a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          No credit card required · Cancel anytime · Your data is secure
        </p>
      </div>
    </section>
  )
}
