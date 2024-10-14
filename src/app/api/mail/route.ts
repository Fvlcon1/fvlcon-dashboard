import { render } from '@react-email/render';
// import EmailTemplate from '@/emails'; // Ensure the correct path to your email template
import { Resend } from 'resend';
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY as string); // Type assertion for the API key

interface SendEmailProps {
  email: string;
  validationCode: string; 
}

export async function POST(request: Request) {
  const { email, validationCode } = await request.json() as SendEmailProps; // Expecting to receive firstName and validationCode

  try {
    const { data, error } = await resend.emails.send({
      from: 'ACM <info@fvlcon.co>', // Updated the sender email
      to: [email], // Change this to the actual recipient's email
      subject: 'Welcome to Fvlcon!',
      html: ""
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error : any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 }); // Return the error message
  }
}
