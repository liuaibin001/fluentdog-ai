"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

interface SubscribeButtonProps {
  href: string
  cta: string
  popular?: boolean
  className?: string
}

export function SubscribeButton({ href, cta, popular, className }: SubscribeButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      // Not logged in, redirect to login with return URL
      router.push(`/login?redirectTo=${encodeURIComponent(href)}`)
    } else {
      // Logged in, go to checkout
      router.push(href)
    }

    setLoading(false)
  }

  return (
    <Button
      className={`w-full ${popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""} ${className || ""}`}
      variant={popular ? "default" : "outline"}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Loading..." : cta}
    </Button>
  )
}
