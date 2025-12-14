import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Dog Training Guides | How to Stop Dog Barking",
  description:
    "Learn how to stop dog barking with our expert guides. Understand why your dog barks, identify bark types, and get proven training tips.",
  alternates: {
    canonical: "https://fluentdog.app/blog",
  },
  openGraph: {
    title: "Dog Training Guides | How to Stop Dog Barking",
    description:
      "Learn how to stop dog barking with our expert guides. Understand why your dog barks and get proven training tips.",
    url: "https://fluentdog.app/blog",
    type: "website",
  },
}

const articles = [
  {
    slug: "how-to-stop-dog-barking",
    title: "How to Stop Dog Barking: Complete Guide (2024)",
    description:
      "Learn why your dog barks excessively and discover proven techniques to stop dog barking. Covers anxiety, alert, and boredom barking with step-by-step solutions.",
    image: "/blog/how-to-stop-dog-barking.jpg",
    date: "December 14, 2024",
    readTime: "12 min read",
    category: "Training",
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fafafa]">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Dog Training Guides
            </p>
            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
              Learn How to <span className="text-gradient">Stop Dog Barking</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Expert guides on understanding your dog&apos;s behavior, reducing excessive barking, and building a stronger bond with your pet.
            </p>
          </header>

          {/* Articles Grid */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <Image
                      src="/icons8-guide-dog-96.png"
                      alt={article.title}
                      width={64}
                      height={64}
                      className="opacity-50 transition-transform group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">{article.date}</p>
                </div>
              </Link>
            ))}

            {/* Coming Soon Card */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-600">More Guides Coming</h3>
              <p className="mt-1 text-sm text-gray-400">
                Stay tuned for more dog training tips
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
