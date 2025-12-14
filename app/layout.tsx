import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const siteUrl = "https://fluentdog.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "How to Stop Dog Barking | AI Bark Analyzer - FluentDog",
    template: "%s | FluentDog",
  },
  description:
    "Why does your dog bark so much? AI analyzes barking to find the cause and stop it. Works for barking at nothing, when alone, or at night. Try free!",
  keywords: [
    "stop dog barking",
    "dog barking",
    "why dog barks",
    "dog bark analyzer",
    "excessive barking",
    "dog anxiety",
    "separation anxiety",
    "dog training",
    "bark meaning",
    "dog behavior",
  ],
  authors: [{ name: "FluentDog", url: siteUrl }],
  creator: "FluentDog",
  publisher: "FluentDog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FluentDog",
    title: "How to Stop Dog Barking | AI Bark Analyzer - FluentDog",
    description:
      "Why does your dog bark so much? AI analyzes barking to find the cause and stop it. Works for barking at nothing, when alone, or at night.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FluentDog - Stop Dog Barking with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Stop Dog Barking | AI Bark Analyzer - FluentDog",
    description:
      "Why does your dog bark so much? AI analyzes barking to find the cause and stop it. Try free!",
    images: ["/og-image.png"],
    creator: "@fluentdogapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icons8-guide-dog-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/icons8-guide-dog-96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: "/icons8-guide-dog-96.png",
    shortcut: "/icons8-guide-dog-48.png",
  },
  manifest: "/manifest.json",
  category: "technology",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "FluentDog",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icons8-guide-dog-96.png`,
        width: 96,
        height: 96,
      },
      sameAs: [
        "https://twitter.com/fluentdogapp",
        "https://www.facebook.com/fluentdogapp",
        "https://www.instagram.com/fluentdogapp",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "support@fluentdog.app",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "FluentDog - How to Stop Dog Barking",
      description: "AI-powered dog bark analyzer that helps you understand why your dog barks and how to stop excessive barking",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#app`,
      name: "FluentDog - Stop Dog Barking App",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android, Web",
      offers: [
        {
          "@type": "Offer",
          name: "Basic",
          price: "0",
          priceCurrency: "USD",
          description: "Free dog barking analyzer with basic bark counting",
        },
        {
          "@type": "Offer",
          name: "Premium",
          price: "19.9",
          priceCurrency: "USD",
          billingDuration: "P1M",
          description: "AI emotion classification to understand why your dog barks so much",
        },
        {
          "@type": "Offer",
          name: "Coach",
          price: "49.9",
          priceCurrency: "USD",
          billingDuration: "P1M",
          description: "Personalized training to stop dog barking completely",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "2847",
        bestRating: "5",
        worstRating: "1",
      },
      description:
        "AI app that analyzes dog barking to understand why your dog barks and provides personalized training plans to stop excessive barking. Helps with dogs barking at nothing, when left alone, or at night.",
      screenshot: `${siteUrl}/screenshot.png`,
      featureList: [
        "Analyze why your dog barks so much",
        "Stop dog barking with AI-powered training",
        "Identify anxiety, boredom, or alert barking",
        "Understand dog barking at nothing",
        "Fix dog barking when left alone",
        "Stop dog barking at night",
        "Vet-grade behavior reports",
        "Personalized bark reduction training",
      ],
    },
    // HowTo Schema for "How to Stop Dog Barking"
    {
      "@type": "HowTo",
      "@id": `${siteUrl}/#howto`,
      name: "How to Stop Dog Barking with AI Analysis",
      description: "Learn how to stop your dog from barking excessively using AI-powered bark analysis and personalized training plans.",
      totalTime: "P14D",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: "0",
      },
      tool: [
        {
          "@type": "HowToTool",
          name: "FluentDog App",
        },
        {
          "@type": "HowToTool",
          name: "Smartphone or tablet",
        },
      ],
      step: [
        {
          "@type": "HowToStep",
          name: "Record Your Dog's Barking",
          text: "Upload or record audio/video of your dog barking. This helps the AI understand why your dog barks so much.",
          position: 1,
        },
        {
          "@type": "HowToStep",
          name: "AI Analyzes the Bark",
          text: "Our AI classifies the bark into 5 emotion types (Alert, Anxiety, Playful, Attention-seeking, Boredom) and identifies if your dog is barking at nothing or has a specific trigger.",
          position: 2,
        },
        {
          "@type": "HowToStep",
          name: "Understand the Cause",
          text: "Review the analysis to understand why your dog barks. Is it anxiety? Boredom? Alert barking at night? The AI pinpoints the exact cause.",
          position: 3,
        },
        {
          "@type": "HowToStep",
          name: "Follow the Training Plan",
          text: "Get a personalized training plan to stop dog barking. The AI creates progressive exercises based on your dog's specific bark patterns.",
          position: 4,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How to stop dog barking?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To stop dog barking effectively, you first need to understand WHY your dog is barking. FluentDog's AI analyzes your dog's barks to classify them into 5 emotion types (Alert, Anxiety, Playful, Attention-seeking, Boredom), then creates a personalized training plan. Most users see a 60-80% reduction in excessive barking within 2-4 weeks by following the AI-generated training steps.",
          },
        },
        {
          "@type": "Question",
          name: "Why is my dog barking at nothing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When your dog appears to be barking at nothing, they're likely responding to sounds or smells humans can't detect - like distant car sounds, wildlife, or neighborhood dogs. Dogs can hear frequencies up to 65,000 Hz (humans max at 20,000 Hz). FluentDog's AI analyzes these 'nothing' barks and often identifies them as Alert barking (responding to perceived threats) or Anxiety barking (general unease). Understanding this helps you address the root cause.",
          },
        },
        {
          "@type": "Question",
          name: "Why does my dog bark so much?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Excessive dog barking usually falls into 5 categories: (1) Alert/Territorial - reacting to people, animals, or sounds; (2) Anxiety - especially separation anxiety when left alone; (3) Boredom - insufficient mental/physical stimulation; (4) Attention-seeking - learned behavior for getting response; (5) Playful excitement. FluentDog's AI analyzes bark patterns to identify which type your dog exhibits most, enabling targeted training to reduce barking.",
          },
        },
        {
          "@type": "Question",
          name: "How to stop dog barking at night?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dog barking at night is typically caused by: alert barking (responding to outside noises), anxiety (fear of darkness or being alone), boredom, or medical discomfort. To stop nighttime barking: (1) Use FluentDog to identify the bark type, (2) Address the root cause - more exercise for boredom, desensitization training for anxiety, white noise for alert barking, (3) Follow the AI-generated training plan consistently. Most dogs show improvement within 1-2 weeks.",
          },
        },
        {
          "@type": "Question",
          name: "How to stop dog barking when left alone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dog barking when left alone is usually separation anxiety. To stop it: (1) Record your dog's barking with FluentDog while you're away, (2) The AI identifies anxiety patterns and severity (1-10 scale), (3) Follow the personalized desensitization plan - gradually increasing alone time, (4) Use the AI calming sound library, (5) Create positive associations with departure cues. FluentDog's Coach plan provides step-by-step guidance, with most users seeing significant improvement in 2-4 weeks.",
          },
        },
        {
          "@type": "Question",
          name: "What are the different types of dog barks and their meanings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dog barks have distinct acoustic patterns: Alert barks are sharp, rapid bursts responding to perceived threats. Anxiety barks are high-pitched, sustained whines often with pacing. Playful barks are higher-pitched with a 'bouncy' rhythm. Attention-seeking barks are persistent, directed at owners. Boredom barks are monotonous and rhythmic. FluentDog's AI analyzes frequency, duration, pitch, and patterns to classify barks with 90%+ accuracy, helping you understand exactly what your dog is communicating.",
          },
        },
        {
          "@type": "Question",
          name: "Can AI really help stop dog barking?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! AI is highly effective for stopping dog barking because it removes the guesswork. Traditional methods often fail because owners misidentify the bark type. FluentDog's AI: (1) Accurately classifies bark emotions using neural network analysis, (2) Tracks patterns to identify triggers, (3) Measures anxiety levels objectively, (4) Creates data-driven training plans, (5) Monitors progress over time. Studies show that targeted training based on accurate bark classification is 3x more effective than generic approaches.",
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
