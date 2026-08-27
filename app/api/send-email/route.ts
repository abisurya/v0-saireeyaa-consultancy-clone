import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.RESEND_API_KEY
if (!API_KEY) {
  console.error("Missing RESEND_API_KEY environment variable")
}

/* Create the client only if the key is present; otherwise
   stub a minimal object so TypeScript is satisfied. */
const resend = API_KEY ? new Resend(API_KEY) : { emails: { send: async () => ({ error: { message: "Missing key" } }) } }

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string
    const to = formData.get("to") as string

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Name, email, and message are required" }, { status: 400 })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Saireeyaa Consultancy <onboarding@resend.dev>", // Replace with your verified domain
      to: [to],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
              <div style="width: 50px; height: 3px; background: linear-gradient(to right, #3b82f6, #8b5cf6); margin: 10px auto;"></div>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin-top: 0; font-size: 20px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
                  <td style="padding: 8px 0; color: #1f2937;">
                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${
                  phone
                    ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Phone:</td>
                  <td style="padding: 8px 0; color: #1f2937;">
                    <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <h2 style="color: #374151; margin-top: 0; font-size: 20px;">Message</h2>
              <p style="color: #1f2937; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                This message was sent from the Saireeyaa Consultancy contact form.<br>
                Received on ${new Date().toLocaleString("en-US", {
                  timeZone: "Asia/Colombo",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })} (Sri Lanka Time)
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}

Message:
${message}

---
This message was sent from the Saireeyaa Consultancy contact form.
Received on ${new Date().toLocaleString("en-US", {
        timeZone: "Asia/Colombo",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })} (Sri Lanka Time)
      `,
    })

    if (error) {
      const message = error.message?.toLowerCase().includes("api key")
        ? "Email service not configured. Please add a valid RESEND_API_KEY."
        : "Failed to send email."

      console.error("Resend error:", error)
      return NextResponse.json({ success: false, message }, { status: 500 })
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while sending your message" },
      { status: 500 },
    )
  }
}
