"use client"

import { useState } from "react"

const faqs = [
  {
    question: "How to stop dog barking?",
    answer:
      "To stop dog barking effectively, you first need to understand WHY your dog is barking. FluentDog's AI analyzes your dog's barks to classify them into 5 emotion types (Alert, Anxiety, Playful, Attention-seeking, Boredom), then creates a personalized training plan. Most users see a 60-80% reduction in excessive barking within 2-4 weeks by following the AI-generated training steps. The key is addressing the root cause, not just the symptom.",
  },
  {
    question: "Why is my dog barking at nothing?",
    answer:
      "When your dog appears to be barking at nothing, they're likely responding to sounds or smells humans can't detect — like distant car sounds, wildlife, or neighborhood dogs. Dogs can hear frequencies up to 65,000 Hz (humans max at 20,000 Hz). FluentDog's AI analyzes these 'nothing' barks and often identifies them as Alert barking (responding to perceived threats) or Anxiety barking (general unease). Understanding this helps you address the root cause with appropriate training.",
  },
  {
    question: "Why does my dog bark so much?",
    answer:
      "Excessive dog barking usually falls into 5 categories: (1) Alert/Territorial — reacting to people, animals, or sounds; (2) Anxiety — especially separation anxiety when left alone; (3) Boredom — insufficient mental/physical stimulation; (4) Attention-seeking — learned behavior for getting your response; (5) Playful excitement. FluentDog's AI analyzes your dog's bark patterns to identify which type they exhibit most, enabling targeted training to reduce barking.",
  },
  {
    question: "How to stop dog barking at night?",
    answer:
      "Dog barking at night is typically caused by: alert barking (responding to outside noises), anxiety (fear of darkness or being alone), boredom, or medical discomfort. To stop nighttime barking: (1) Use FluentDog to record and identify the bark type, (2) Address the root cause — more exercise for boredom, desensitization training for anxiety, white noise for alert barking, (3) Follow the AI-generated training plan consistently. Most dogs show improvement within 1-2 weeks.",
  },
  {
    question: "How to stop dog barking when left alone?",
    answer:
      "Dog barking when left alone is usually separation anxiety. Here's how to stop it: (1) Record your dog's barking with FluentDog while you're away, (2) The AI identifies anxiety patterns and severity (1-10 scale), (3) Follow the personalized desensitization plan — gradually increasing alone time, (4) Use the AI calming sound library, (5) Create positive associations with departure cues. FluentDog's Coach plan provides step-by-step guidance, with most users seeing significant improvement in 2-4 weeks.",
  },
  {
    question: "What are the different types of dog barks and their meanings?",
    answer:
      "Dog barks have distinct acoustic patterns that reveal their meaning: Alert barks are sharp, rapid bursts responding to perceived threats. Anxiety barks are high-pitched, sustained whines often with pacing. Playful barks are higher-pitched with a 'bouncy' rhythm. Attention-seeking barks are persistent, directed at owners. Boredom barks are monotonous and rhythmic. FluentDog's AI analyzes frequency, duration, pitch, and patterns to classify barks with 90%+ accuracy.",
  },
  {
    question: "Can AI really help stop dog barking?",
    answer:
      "Yes! AI is highly effective for stopping dog barking because it removes the guesswork. Traditional methods often fail because owners misidentify the bark type — treating anxiety barking like alert barking, for example. FluentDog's AI: (1) Accurately classifies bark emotions using neural network analysis, (2) Tracks patterns to identify triggers, (3) Measures anxiety levels objectively with a 1-10 score, (4) Creates data-driven training plans, (5) Monitors progress over time. Targeted training based on accurate classification is 3x more effective than generic approaches.",
  },
  {
    question: "How does FluentDog analyze dog barking?",
    answer:
      "FluentDog uses advanced Voice Activity Detection (VAD) technology combined with AI-powered audio classification. When your dog barks, our system analyzes acoustic features like frequency, duration, intensity patterns (MFCCs), and rhythm to classify the bark into one of five emotion categories. The AI model achieves over 90% accuracy, trained on thousands of labeled bark samples. It also establishes a personalized baseline for your specific dog, improving accuracy as it learns their unique vocal patterns.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Dog Barking FAQ</p>
          <h2 id="faq-heading" className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            How to <span className="text-gradient">stop dog barking</span> — answered
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Common questions about why dogs bark, what different barks mean, and how to stop excessive barking
          </p>
        </header>

        <div className="mx-auto mt-16 max-w-3xl">
          <dl className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card-shadow rounded-xl border border-border/50 bg-card overflow-hidden transition-all hover:shadow-lg"
              >
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between p-6 text-left"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-base font-semibold pr-4">{faq.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="px-6 text-sm text-muted-foreground">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
