import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 bg-muted/30" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4">
        <div className="card-shadow-lg mx-auto max-w-4xl rounded-3xl border border-border/50 bg-card p-8 text-center md:p-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Stop Dog Barking Today</p>
          <h2 id="cta-heading" className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Ready to <span className="text-gradient">stop your dog barking?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
            Join thousands of dog owners who finally understand why their dog barks so much.
            Our AI-powered analysis and training plans have helped stop excessive barking in 89% of cases.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="min-w-[180px] bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="/signup">Analyze My Dog&apos;s Barking Free</a>
            </Button>
            <Button size="lg" variant="outline" className="min-w-[180px]" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required · Works for all dog breeds · Results in 2 weeks
          </p>
        </div>
      </div>
    </section>
  )
}
