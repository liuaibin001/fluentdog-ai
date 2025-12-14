import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/10 text-primary">
            AI-Powered Dog Bark Translator
          </Badge>

          {/* Primary H1 - Main SEO keyword target */}
          <h1 id="hero-heading" className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            The AI That Understands
            <br />
            <span className="text-primary">Your Dog&apos;s Barks</span>
          </h1>

          {/* SEO-rich description with target keywords */}
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl lg:mx-0">
            <strong>Stop guessing, start fixing.</strong> FluentDog monitors your dog while you&apos;re away,
            translates their barks into emotions (Anxiety, Boredom, Alert), and creates a
            <em> personalized training plan</em> to stop excessive barking.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto" asChild>
              <a href="/signup">Start Free 14-Day Trial</a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          {/* Social proof / key metrics */}
          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border/40 pt-12">
            <div>
              <div className="text-3xl font-bold text-primary">90%+</div>
              <div className="text-sm text-muted-foreground">Bark Classification Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Emotion Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 lg:aspect-[4/5]">
            <Image
              src="/happy-golden-retriever-dog-listening-attentively-i.jpg"
              alt="Golden retriever dog being monitored by FluentDog AI bark translator app showing real-time emotion analysis"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Floating card overlay - demonstrates product feature */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border/50 bg-background/95 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" aria-hidden="true">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a5 5 0 001.414-3.414 5 5 0 00-1.414-3.414m-2.828 9.9a9 9 0 010-12.728"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Alert Bark Detected</div>
                  <div className="text-xs text-muted-foreground">Doorbell trigger - Visitor at door</div>
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Alert</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
