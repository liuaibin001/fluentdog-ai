import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4">
        {/* Top CTA Button with curved arrow */}
        <div className="relative mb-8 flex justify-center">
          <Button size="lg" className="rounded-full bg-amber-400 px-8 text-base font-semibold text-amber-900 hover:bg-amber-500" asChild>
            <a href="/signup">
              Start Free Trial
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Button>
        </div>

        {/* Header content */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 id="hero-heading" className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            How to <span className="text-gradient">Stop Dog Barking</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground">with AI Bark Analysis</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
            <strong>Why does your dog bark so much?</strong> Our AI analyzes your dog&apos;s barking to identify the cause
            — anxiety, boredom, or alert — and creates a personalized training plan.
            <span className="block mt-2">Works for dogs barking at nothing, when left alone, or at night.</span>
          </p>
        </div>

        {/* Hero visual with dog and floating cards */}
        <div className="relative mx-auto mt-8 max-w-6xl">
          {/* Curved arrow SVG - from dog to CTA */}
          <svg
            className="absolute -top-32 left-1/2 z-10 hidden h-40 w-32 -translate-x-1/2 md:block"
            viewBox="0 0 120 160"
            fill="none"
          >
            <path
              d="M60 160 C60 100, 60 80, 90 40"
              stroke="#1f2937"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
            <path
              d="M85 50 L90 40 L95 52"
              stroke="#1f2937"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Floating card - Left: Insights Overview */}
          <div className="animate-float absolute -left-4 top-4 z-20 hidden w-64 md:block lg:left-0">
            <div className="card-shadow-lg rounded-2xl border border-border/50 bg-card p-5">
              <h3 className="mb-4 text-lg font-semibold">Bark Insights</h3>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Max</p>
                  <p className="text-xs text-muted-foreground">Golden Retriever</p>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">BARKS</p>
                  <p className="text-lg font-bold">156</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">AVG SCORE</p>
                  <p className="text-lg font-bold">4.2</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">DAYS</p>
                  <p className="text-lg font-bold">14</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span className="text-sm">Best performance</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600">↑ 83.7%</span>
              </div>
            </div>
          </div>

          {/* Notification bell - Left bottom */}
          <div className="animate-float-slow absolute bottom-24 left-8 z-20 hidden md:block lg:left-16">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-amber-900">95</span>
            </div>
          </div>

          {/* Followers card - Left bottom */}
          <div className="animate-float absolute -bottom-4 left-20 z-20 hidden md:block lg:left-32">
            <div className="card-shadow rounded-xl border border-border/50 bg-card px-5 py-4">
              <p className="text-sm text-muted-foreground">Analyzed Barks</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">2,648</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600">↑ 6.2%</span>
              </div>
            </div>
          </div>

          {/* Notification bell - Right top */}
          <div className="animate-float-delayed absolute right-20 top-0 z-20 hidden md:block lg:right-32">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 shadow-md">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">50</span>
            </div>
          </div>

          {/* Floating card - Right: Weekly Chart */}
          <div className="animate-float-delayed absolute -right-4 top-16 z-20 hidden w-72 md:block lg:right-0">
            <div className="card-shadow-lg rounded-2xl border border-border/50 bg-card p-5">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Bark Insight</h3>
                <span className="rounded-lg bg-muted px-2 py-1 text-xs">Week 1</span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Mar 21 - Mar 27</p>

              {/* Bar chart */}
              <div className="mb-4">
                <div className="flex items-end justify-between gap-2" style={{ height: '80px' }}>
                  {[40, 65, 80, 45, 90, 70, 55].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${i === 4 ? 'bg-primary' : 'bg-primary/40'}`}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <div className="mt-1 flex justify-between gap-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <span key={i} className="flex-1 text-center text-[10px] text-muted-foreground">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium">Lowest anxiety</p>
                    <p className="text-[10px] text-muted-foreground">Wednesday</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-green-600">2.1</span>
              </div>

              {/* Emotion breakdown */}
              <div className="mt-4 grid grid-cols-5 gap-1 text-center">
                <div className="rounded-lg bg-yellow-100 p-1.5">
                  <p className="text-[10px] font-medium text-yellow-700">Alert</p>
                  <p className="text-xs font-bold text-yellow-700">32%</p>
                </div>
                <div className="rounded-lg bg-red-100 p-1.5">
                  <p className="text-[10px] font-medium text-red-700">Anxiety</p>
                  <p className="text-xs font-bold text-red-700">18%</p>
                </div>
                <div className="rounded-lg bg-green-100 p-1.5">
                  <p className="text-[10px] font-medium text-green-700">Playful</p>
                  <p className="text-xs font-bold text-green-700">25%</p>
                </div>
                <div className="rounded-lg bg-blue-100 p-1.5">
                  <p className="text-[10px] font-medium text-blue-700">Attention</p>
                  <p className="text-xs font-bold text-blue-700">15%</p>
                </div>
                <div className="rounded-lg bg-gray-100 p-1.5">
                  <p className="text-[10px] font-medium text-gray-700">Bored</p>
                  <p className="text-xs font-bold text-gray-700">10%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center dog image - no background container */}
          <div className="relative mx-auto max-w-lg">
            <Image
              src="/happy-golden-retriever-dog-listening-attentively-i.jpg"
              alt="Happy golden retriever dog with FluentDog AI bark analysis"
              width={500}
              height={600}
              className="relative z-10 mx-auto object-contain"
              priority
            />

            {/* Curved arrow from dog to notification */}
            <svg
              className="absolute -right-8 top-1/4 z-0 hidden h-24 w-24 md:block"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M10 80 Q50 80, 70 40 Q80 20, 90 15"
                stroke="#1f2937"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M82 20 L90 15 L88 25"
                stroke="#1f2937"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Curved arrow from dog to left card */}
            <svg
              className="absolute -left-8 top-1/3 z-0 hidden h-24 w-24 -scale-x-100 md:block"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M10 20 Q30 60, 80 70"
                stroke="#1f2937"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M72 65 L80 70 L75 78"
                stroke="#1f2937"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-sm text-muted-foreground">Trusted by dog owners worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-sm font-medium">90%+ Accuracy</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">5 Emotion Types</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-medium">Vet-Grade Reports</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
