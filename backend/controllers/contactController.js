import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.EMAIL_TO;
const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    console.log(`Sending contact email from ${name} (${email})...`);

    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: `Contact Form: ${safeSubject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ 
        error: 'Sorry, something went wrong. Please try again later.' 
      });
    }

    console.log('Contact email sent successfully:', data);
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Sorry, something went wrong. Please try again later.' 
    });
  }
};
