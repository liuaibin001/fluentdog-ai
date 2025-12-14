// PayPal Configuration
export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  secretKey: process.env.PAYPAL_SECRET_KEY!,
  mode: (process.env.PAYPAL_MODE || "sandbox") as "sandbox" | "live",
}

// PayPal API Base URLs
export const PAYPAL_API_BASE =
  PAYPAL_CONFIG.mode === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com"

// Subscription Plan IDs - These need to be created in PayPal Dashboard
// For now, we'll use one-time payments until subscription plans are set up
export const SUBSCRIPTION_PLANS = {
  premium: {
    name: "Premium",
    price: "19.90",
    currency: "USD",
    description: "FluentDog Premium - AI emotion classification, anxiety scoring, weekly reports",
  },
  coach: {
    name: "Coach",
    price: "49.90",
    currency: "USD",
    description: "FluentDog Coach - All Premium features + personalized training courses",
  },
}

// Get PayPal Access Token
export async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${PAYPAL_CONFIG.clientId}:${PAYPAL_CONFIG.secretKey}`
  ).toString("base64")

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  })

  if (!response.ok) {
    throw new Error("Failed to get PayPal access token")
  }

  const data = await response.json()
  return data.access_token
}
