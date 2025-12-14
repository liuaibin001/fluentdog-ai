import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/10 text-primary">
            AI-Powered Pet Behavior Analysis
          </Badge>

          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Turn Dog Barks Into
            <br />
            <span className="text-primary">Actionable Insights</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl lg:mx-0">
            BarkSense AI transforms barking into data insights. Identify emotional triggers, receive science-based
            training programs, and give peace of mind to you and your furry friend.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border/40 pt-12">
            <div>
              <div className="text-3xl font-bold text-primary">90%+</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
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
              alt="Happy dog with BarkSense AI monitoring"
              fill
              className="object-cover"
              priority
            />
            {/* Floating card overlay */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border/50 bg-background/95 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Alert Bark Detected</div>
                  <div className="text-xs text-muted-foreground">Someone at the door</div>
                </div>
                <Badge className="bg-primary/10 text-primary">High</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
