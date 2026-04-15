const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const sendContactEmail = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }

  const { name, email, message } = req.body;

  try {
    // Create transporter — configure via .env
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email to portfolio owner
    const ownerMailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `📬 New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: white;">New Portfolio Message</h1>
          </div>
          <div style="padding: 30px;">
            <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
              <p style="margin: 0; font-size: 18px; font-weight: 600; color: #f1f5f9;">${name}</p>
              <p style="margin: 4px 0 0; color: #6366f1;">${email}</p>
            </div>
            <div style="background: #1e293b; border-radius: 8px; padding: 20px;">
              <p style="margin: 0 0 12px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; line-height: 1.7; color: #e2e8f0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div style="padding: 20px 30px; border-top: 1px solid #1e293b; text-align: center;">
            <p style="margin: 0; color: #475569; font-size: 13px;">Sent from your Portfolio website</p>
          </div>
        </div>
      `
    };

    // Auto-reply to sender
    const autoReplyOptions = {
      from: `"Lellouchi company" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: white;">Message Received! 🎉</h1>
          </div>
          <div style="padding: 30px;">
            <p style="margin: 0 0 16px; font-size: 16px;">Hi <strong>${name}</strong>,</p>
            <p style="margin: 0 0 16px; line-height: 1.7; color: #cbd5e1;">
              Thank you for reaching out! I've received your message and will get back to you as soon as possible, typically within 24-48 hours.
            </p>
            <p style="margin: 0; line-height: 1.7; color: #cbd5e1;">
              In the meantime, feel free to connect with me on 
              <a href="https://linkedin.com" style="color: #6366f1;">LinkedIn</a> or check out my 
              <a href="https://github.com/Lellouchi00" style="color: #6366f1;">GitHub</a>.
            </p>
          </div>
          <div style="padding: 20px 30px; border-top: 1px solid #1e293b; text-align: center;">
            <p style="margin: 0; color: #475569; font-size: 13px;">Best regards,Lellouchi</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(autoReplyOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! I will get back to you soon.' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again or contact me directly.' 
    });
  }
};

module.exports = { sendContactEmail };
