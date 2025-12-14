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
    default: "FluentDog | AI Dog Bark Translator & Separation Anxiety Monitor",
    template: "%s | FluentDog",
  },
  description:
    "Stop guessing why your dog barks. FluentDog AI monitors your dog while you're away, translates their barks (Anxiety vs. Boredom vs. Alert), and creates a personalized training plan to fix excessive barking. Try free today.",
  keywords: [
    "dog bark monitor app",
    "separation anxiety tracker for dogs",
    "dog behavior AI analyzer",
    "app to record dog barking while away",
    "dog training app for excessive barking",
    "why is my dog barking at night",
    "types of dog barks and meanings",
    "signs of dog separation anxiety",
    "dog bark translator",
    "pet anxiety monitor",
    "dog bark decoder",
    "stop dog barking app",
    "dog behavior analysis",
    "AI pet monitor",
    "dog emotion detection",
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
    title: "FluentDog | AI Dog Bark Translator & Separation Anxiety Monitor",
    description:
      "Stop guessing why your dog barks. Our AI monitors your dog while you're away, translates their barks, and creates a personalized training plan to fix it.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FluentDog - AI Dog Bark Translator & Behavior Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FluentDog | AI Dog Bark Translator & Separation Anxiety Monitor",
    description:
      "Stop guessing why your dog barks. Our AI monitors your dog while you're away, translates their barks, and creates a personalized training plan.",
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
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
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
      name: "FluentDog",
      description: "AI Dog Bark Translator & Separation Anxiety Monitor",
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
      name: "FluentDog",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android, Web",
      offers: [
        {
          "@type": "Offer",
          name: "Basic",
          price: "0",
          priceCurrency: "USD",
          description: "Free tier with bark counting and 24-hour history",
        },
        {
          "@type": "Offer",
          name: "Premium",
          price: "10",
          priceCurrency: "USD",
          billingDuration: "P1M",
          description: "AI emotion classification, anxiety scoring, weekly reports",
        },
        {
          "@type": "Offer",
          name: "Coach",
          price: "18",
          priceCurrency: "USD",
          billingDuration: "P1M",
          description: "Personalized training courses and AI sound library",
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
        "AI-powered dog bark translator and separation anxiety monitor. Understand why your dog barks and get personalized training plans.",
      screenshot: `${siteUrl}/screenshot.png`,
      featureList: [
        "Real-time bark detection and monitoring",
        "AI emotion classification (Alert, Anxiety, Boredom, Attention-seeking, Playful)",
        "Anxiety intensity scoring (1-10 scale)",
        "Context correlation analysis",
        "Weekly and monthly behavior reports",
        "Vet-grade exportable reports",
        "Personalized behavior training courses",
        "AI calming sound library",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How does FluentDog detect and analyze dog barks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "FluentDog uses advanced Voice Activity Detection (VAD) technology combined with AI-powered audio classification. When your dog barks, our system analyzes acoustic features like frequency, duration, and intensity patterns to classify the bark into one of five emotion categories: Alert, Anxiety, Boredom, Attention-seeking, or Playful.",
          },
        },
        {
          "@type": "Question",
          name: "Can FluentDog help with my dog's separation anxiety?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! FluentDog is specifically designed to help identify and address separation anxiety. Our AI tracks barking patterns when you're away, identifies anxiety-triggered barking, provides an anxiety intensity score (1-10), and generates personalized progressive desensitization training plans to help reduce your dog's anxiety over time.",
          },
        },
        {
          "@type": "Question",
          name: "What devices do I need to use FluentDog?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can use any spare smartphone, tablet, or existing pet camera as a listening device. The FluentDog app on your main phone receives real-time alerts and reports. No special hardware purchase is required.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate is FluentDog's bark classification?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "FluentDog achieves over 90% accuracy in bark emotion classification. Our AI model is trained on thousands of labeled bark samples and continuously improves through machine learning. The system also establishes a baseline for your specific dog during the initial 24-48 hour learning period.",
          },
        },
        {
          "@type": "Question",
          name: "Can I share FluentDog reports with my veterinarian?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely! Premium and Coach subscribers can export professional vet-grade reports showing bark patterns, emotion distribution, anxiety scores over time, and behavioral trends. These data-driven reports help veterinarians make more informed diagnoses and treatment recommendations.",
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
    <html lang="en" className="dark">
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
