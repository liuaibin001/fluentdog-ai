export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Set Up Your Listening Device",
      description:
        "Place any spare smartphone or tablet at home as a monitoring device. Your main phone receives alerts and reports in real-time.",
    },
    {
      number: "02",
      title: "AI Analyzes Every Bark",
      description:
        "When barking is detected, our AI instantly classifies the emotion type (Alert, Anxiety, Boredom) and generates a detailed intensity score.",
    },
    {
      number: "03",
      title: "Get Your Training Plan",
      description:
        "Based on your dog's unique barking patterns, receive a customized progressive training program designed to address the root causes.",
    },
    {
      number: "04",
      title: "Track Your Progress",
      description:
        "Monitor barking frequency changes over time, see training effectiveness, and adjust strategies as needed for optimal results.",
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
