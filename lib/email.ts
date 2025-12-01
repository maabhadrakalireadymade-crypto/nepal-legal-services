// Email notification system
// Supports SendGrid, Resend, or SMTP

export interface EmailConfig {
  to: string
  subject: string
  html: string
  from?: string
}

// Email Templates
export const emailTemplates = {
  registrationConfirmation: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #003893; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .button { background: #DC143C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #003893; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nepal Legal Services</h1>
        </div>
        <div class="content">
          <h2>Application Received Successfully!</h2>
          <p>Dear ${data.contactPerson},</p>
          <p>Thank you for choosing Nepal Legal Services. We have received your company registration application.</p>
          
          <div class="info-box">
            <strong>Application Details:</strong><br>
            Application ID: <strong>${data.applicationId}</strong><br>
            Company Name: ${data.companyName}<br>
            Company Type: ${data.companyType}<br>
            Estimated Completion: ${data.estimatedCompletionDays} days<br>
            Total Fee: NPR ${data.totalFee}
          </div>

          <h3>Next Steps:</h3>
          <ol>
            <li>Complete the payment using the link below</li>
            <li>Submit required documents as per our checklist</li>
            <li>Our team will review and process your application</li>
            <li>Receive your registration certificate</li>
          </ol>

          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/payment?applicationId=${data.applicationId}&amount=${data.totalFee}" class="button">
            Complete Payment
          </a>

          <p>You can track your application status anytime using your Application ID.</p>
          
          <p>If you have any questions, feel free to contact us at info@nepallegal.com or call +977-1-XXXXXXX</p>
          
          <p>Best regards,<br>Nepal Legal Services Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Nepal Legal Services. All rights reserved.</p>
          <p>Kathmandu, Nepal</p>
        </div>
      </div>
    </body>
    </html>
  `,

  paymentConfirmation: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #28a745; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
        .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #28a745; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Successful!</h1>
        </div>
        <div class="content">
          <div class="success-icon">✓</div>
          <h2>Thank you for your payment</h2>
          <p>Dear ${data.customerName},</p>
          <p>We have successfully received your payment. Your company registration process will now begin.</p>
          
          <div class="info-box">
            <strong>Payment Details:</strong><br>
            Transaction ID: ${data.transactionId}<br>
            Amount Paid: NPR ${data.amount}<br>
            Payment Method: ${data.method}<br>
            Date: ${new Date().toLocaleDateString()}
          </div>

          <p>Our team will start processing your application immediately. You will receive updates via email and SMS.</p>
          
          <p>Best regards,<br>Nepal Legal Services Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Nepal Legal Services. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  statusUpdate: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #003893; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
        .status-processing { background: #ffc107; color: #000; }
        .status-completed { background: #28a745; color: white; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Status Update</h1>
        </div>
        <div class="content">
          <p>Dear ${data.customerName},</p>
          <p>Your application status has been updated:</p>
          
          <p>
            Application ID: <strong>${data.applicationId}</strong><br>
            Status: <span class="status-badge status-${data.status}">${data.status.toUpperCase()}</span>
          </p>

          <p>${data.message}</p>
          
          <p>Best regards,<br>Nepal Legal Services Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Nepal Legal Services. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// SendGrid Integration
export async function sendEmailWithSendGrid(config: EmailConfig): Promise<boolean> {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: config.to }]
        }],
        from: { email: config.from || 'noreply@nepallegal.com' },
        subject: config.subject,
        content: [{
          type: 'text/html',
          value: config.html
        }]
      })
    })

    return response.ok
  } catch (error) {
    console.error('SendGrid email error:', error)
    return false
  }
}

// Resend Integration
export async function sendEmailWithResend(config: EmailConfig): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: config.from || 'Nepal Legal Services <noreply@nepallegal.com>',
        to: config.to,
        subject: config.subject,
        html: config.html
      })
    })

    return response.ok
  } catch (error) {
    console.error('Resend email error:', error)
    return false
  }
}

// Main email sending function
export async function sendEmail(config: EmailConfig): Promise<boolean> {
  // Choose email provider based on environment variable
  const provider = process.env.EMAIL_PROVIDER || 'sendgrid'

  if (provider === 'resend') {
    return sendEmailWithResend(config)
  } else {
    return sendEmailWithSendGrid(config)
  }
}
