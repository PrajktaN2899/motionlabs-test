import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();

    // IMPORTANT: You must configure these environment variables.
    // See the instructions in the main response.
    const user = process.env.GMAIL_EMAIL;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
        console.error("Missing Gmail credentials in environment variables");
        return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });

    const mailOptions = {
      from: user,
      to: 'info@motionlabs.in', // Your receiving email address
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from MotionLabs Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Interest:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
  }
}
