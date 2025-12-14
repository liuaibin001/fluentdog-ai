import { NextResponse } from "next/server"
import { getPayPalAccessToken, PAYPAL_API_BASE } from "@/lib/paypal/config"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { orderId, planId } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      )
    }

    const accessToken = await getPayPalAccessToken()

    // Capture the order
    const response = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("PayPal capture error:", errorData)
      return NextResponse.json(
        { error: "Failed to capture PayPal order" },
        { status: 500 }
      )
    }

    const captureData = await response.json()

    // Check if payment was successful
    if (captureData.status === "COMPLETED") {
      // Get user from session
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Update user's subscription in database
        // You can create a subscriptions table in Supabase to store this
        const { error } = await supabase.from("subscriptions").upsert({
          user_id: user.id,
          plan: planId,
          paypal_order_id: orderId,
          status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (error) {
          console.error("Failed to save subscription:", error)
          // Payment was successful, but failed to save to DB
          // Still return success but log the error
        }
      }

      return NextResponse.json({
        success: true,
        captureId: captureData.purchase_units[0].payments.captures[0].id,
        status: captureData.status,
      })
    }

    return NextResponse.json(
      { error: "Payment not completed", status: captureData.status },
      { status: 400 }
    )
  } catch (error) {
    console.error("Capture order error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
