// src/app/api/send-mail/route.js
import { Resend } from "resend";
import EmailTemplete from "@/components/emailTemplete/EmailTemplete.server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { to, subject, name } = await request.json();

    if (!to || !subject) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing 'to' or 'subject'" }),
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333;">Welcome, ${name}! 👋</h2>
        <p style="color: #555;">
          Thank you for joining our platform. This is a test email sent via <strong>Resend + Next.js</strong>.
        </p>
      </div>
    `;

    const data = await resend.emails.send({
      from: "abir.webbersmedia@gmail.com",
      to,
      subject,
      html: htmlContent,
      text: `Welcome, ${name}! Thank you for joining our platform.`, // fallback
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
