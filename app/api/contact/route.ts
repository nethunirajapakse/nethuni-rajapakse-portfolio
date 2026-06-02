import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where contact submissions land (your inbox)
const TO_EMAIL = "nethunirajapakse@gmail.com";

// Until you verify your own domain in Resend, you must send FROM their
// shared test sender. After verifying a domain, change this to e.g.
// "Portfolio <contact@yourdomain.com>".
const FROM_EMAIL = "Portfolio <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic server-side validation — never trust the client alone.
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email, // so you can reply straight to the sender
      subject: subject ? `Portfolio: ${subject}` : "New portfolio contact",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
