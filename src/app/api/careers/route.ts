import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  console.log("Received a request to /api/careers"); // Check if the function starts

  try {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const portfolio = formData.get('portfolio') as string;
    const linkedin = formData.get('linkedin') as string;
    const message = formData.get('message') as string;
    const resume = formData.get('resume') as File;

    if (!resume || resume.size === 0) {
        console.error("Validation Error: Resume file is missing.");
        return NextResponse.json({ message: "Resume file is required." }, { status: 400 });
    }

    console.log("Form data parsed successfully. Resume:", resume.name);

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    const user = process.env.GMAIL_EMAIL;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
        console.error("Server Config Error: Missing GMAIL_EMAIL or GMAIL_APP_PASSWORD in .env.local");
        return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
    }
    
    console.log("Gmail credentials loaded. Attempting to send email...");

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
      from: `"${fullName}" <${user}>`,
      to: 'careers@motionlabs.in',
      subject: `New Application for ${role} from ${fullName}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Applying for:</strong> ${role}</p>
        <p><strong>Portfolio/GitHub:</strong> <Link href="${portfolio}">${portfolio}</Link></p>
        <p><strong>LinkedIn:</strong> <Link href="${linkedin}">${linkedin}</Link></p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      attachments: [
          {
              filename: resume.name,
              content: resumeBuffer,
              contentType: resume.type,
          }
      ]
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });

  } catch (error) {
    console.error("--- UNEXPECTED ERROR IN /api/careers ---");
    console.error(error);
    console.error("--- END OF ERROR ---");
    return NextResponse.json({ message: "Failed to submit application due to a server error." }, { status: 500 });
  }
}

