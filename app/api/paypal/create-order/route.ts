import { NextResponse } from "next/server"
import { getPayPalAccessToken, PAYPAL_API_BASE, SUBSCRIPTION_PLANS } from "@/lib/paypal/config"

export async function POST(request: Request) {
  try {
    const { planId } = await request.json()

    if (!planId || !SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]) {
      return NextResponse.json(
        { error: "Invalid plan ID" },
        { status: 400 }
      )
    }

    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
    const accessToken = await getPayPalAccessToken()

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: plan.currency,
            value: plan.price,
          },
          description: plan.description,
        },
      ],
      application_context: {
        brand_name: "FluentDog",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/cancel`,
      },
    }

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderPayload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("PayPal create order error:", errorData)
      return NextResponse.json(
        { error: "Failed to create PayPal order" },
        { status: 500 }
      )
    }

    const order = await response.json()
    return NextResponse.json({ orderId: order.id })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
