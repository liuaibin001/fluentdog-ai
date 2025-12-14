export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Dog's Profile",
      description:
        "Add your dog's name and basic info. Set up context events like when you leave home, visitors arrive, or other triggers you've noticed.",
    },
    {
      number: "02",
      title: "Upload or Record Barking",
      description:
        "Capture your dog's barking with video or audio - upload existing recordings or record directly in the app when you notice barking.",
    },
    {
      number: "03",
      title: "AI Analyzes & Classifies",
      description:
        "Our AI classifies each bark into 5 emotion types (Alert, Anxiety, Playful, Attention, Boredom), generates a 1-10 anxiety score, and correlates with context events.",
    },
    {
      number: "04",
      title: "Get Insights & Training Plan",
      description:
        "View daily summaries, weekly reports with bark type pie charts, and receive a personalized AI training plan to address the root causes.",
    },
  ]

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-24" aria-labelledby="how-it-works-heading">
      <header className="mx-auto max-w-3xl text-center">
        <h2 id="how-it-works-heading" className="mb-4 text-balance text-4xl font-bold md:text-5xl">
          Get Started in 4 Simple Steps
        </h2>
        <p className="text-pretty text-lg text-muted-foreground">
          Easy setup, intelligent analysis, science-based training
        </p>
      </header>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
        {steps.map((step, index) => (
          <article key={index} className="relative">
            <div className="flex gap-4">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border-2 border-primary bg-background text-2xl font-bold text-primary"
                aria-hidden="true"
              >
                {step.number}
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
