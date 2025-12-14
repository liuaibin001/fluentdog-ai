export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Record Your Dog Barking",
      description:
        "Capture when your dog barks — whether it's barking at nothing, when left alone, or at night. Upload existing recordings or record live in the app.",
    },
    {
      number: "02",
      title: "AI Identifies Why Your Dog Barks",
      description:
        "Our AI analyzes the bark to classify it as Alert, Anxiety, Playful, Attention-seeking, or Boredom. Understand why your dog barks so much with a 1-10 anxiety score.",
    },
    {
      number: "03",
      title: "Discover Barking Patterns",
      description:
        "See when and why excessive barking happens. The AI correlates bark data with triggers like you leaving home, visitors arriving, or nighttime to identify patterns.",
    },
    {
      number: "04",
      title: "Follow Your Stop Barking Plan",
      description:
        "Get a personalized AI training plan to stop dog barking. 10-minute daily exercises target the specific cause — anxiety, boredom, or alert barking. Most see results in 2 weeks.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-muted/30" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">How to Stop Dog Barking</p>
          <h2 id="how-it-works-heading" className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Stop your dog barking in <span className="text-gradient">4 simple steps</span>
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Record → Analyze → Understand → Train — the proven way to stop excessive dog barking
          </p>
        </header>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <article key={index} className="group relative">
              <div className="card-shadow rounded-xl border border-border/50 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex gap-4">
                  <div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
