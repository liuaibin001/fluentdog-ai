"use client"

import { useState } from "react"

const faqs = [
  {
    question: "How does FluentDog detect and analyze dog barks?",
    answer:
      "FluentDog uses advanced Voice Activity Detection (VAD) technology combined with AI-powered audio classification. When your dog barks, our system analyzes acoustic features like frequency, duration, and intensity patterns (MFCCs) to classify the bark into one of five emotion categories: Alert, Anxiety, Boredom, Attention-seeking, or Playful. The AI model achieves over 90% accuracy and continuously learns from your dog's unique vocal patterns.",
  },
  {
    question: "Can FluentDog help with my dog's separation anxiety?",
    answer:
      "Yes! FluentDog is specifically designed to help identify and address separation anxiety in dogs. Our AI tracks barking patterns when you're away, identifies anxiety-triggered barking, provides an anxiety intensity score (1-10), and generates personalized progressive desensitization training plans. You'll see exactly when anxiety spikes occur (e.g., within 10 minutes of leaving) and get step-by-step guidance to help reduce your dog's stress over time.",
  },
  {
    question: "What devices do I need to use FluentDog?",
    answer:
      "You can use any spare smartphone, tablet, or existing pet camera as a listening device. Simply download the FluentDog app on both devices — one stays at home as a monitor, and your main phone receives real-time alerts and reports. No special hardware purchase is required, making it an affordable solution for any pet owner.",
  },
  {
    question: "Why is my dog barking at night?",
    answer:
      "Nighttime barking can have several causes that FluentDog helps identify: (1) Alert barking from outside noises like wildlife or passing cars, (2) Anxiety from being alone or in darkness, (3) Boredom from insufficient daytime exercise, (4) Attention-seeking behavior, or (5) Medical discomfort. Our AI analyzes the bark patterns and timing to pinpoint the likely cause and recommends targeted solutions.",
  },
  {
    question: "How accurate is FluentDog's bark classification?",
    answer:
      "FluentDog achieves over 90% accuracy in bark emotion classification. Our AI model is trained on thousands of labeled bark samples using CNN/RNN neural networks and acoustic feature extraction. The system also establishes a personalized baseline for your specific dog during the initial 24-48 hour learning period, improving accuracy over time as it learns your dog's unique vocal characteristics.",
  },
  {
    question: "Can I share FluentDog reports with my veterinarian?",
    answer:
      "Absolutely! Premium and Coach subscribers can export professional vet-grade reports in PDF format. These reports include bark frequency timelines, emotion distribution charts, anxiety score trends, identified triggers (like specific times or events), and behavioral patterns. Veterinarians appreciate having this data-driven insight for more accurate diagnoses and treatment recommendations.",
  },
  {
    question: "How do I stop my dog from barking when left alone?",
    answer:
      "FluentDog's Coach plan provides a personalized training program specifically for this issue. Based on your dog's bark patterns, the AI creates a progressive desensitization plan that typically includes: (1) Gradual departure practice, (2) Positive association training, (3) Environmental enrichment suggestions, (4) Calming sound therapy using our AI sound library, and (5) Exercise and mental stimulation recommendations. Most users see significant improvement within 2-4 weeks.",
  },
  {
    question: "What's the difference between anxious barking and bored barking?",
    answer:
      "FluentDog's AI distinguishes these by analyzing acoustic patterns: Anxiety barking is typically high-pitched, rapid, and sustained, often occurring immediately after you leave or during specific triggers. Bored barking tends to be more rhythmic, lower-pitched, and occurs during periods of inactivity (like midday). Our emotion classification and context correlation helps you understand exactly what's driving your dog's vocalizations.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="container mx-auto px-4 py-24" aria-labelledby="faq-heading">
      <header className="mx-auto max-w-3xl text-center">
        <h2 id="faq-heading" className="mb-4 text-balance text-4xl font-bold md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="text-pretty text-lg text-muted-foreground">
          Everything you need to know about understanding and training your dog
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-3xl">
        <dl className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-border/40 bg-card/50 backdrop-blur overflow-hidden"
            >
              <dt>
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-semibold pr-4">{faq.question}</span>
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
                <p className="px-6 text-muted-foreground">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
