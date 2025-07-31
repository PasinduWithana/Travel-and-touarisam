import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP with more detailed configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: 'pasinduwithana2002@gmail.com',
        pass: 'cazq vlev zjey rjup' // Using the App Password directly for testing
    },
    debug: true, // Enable debug logging
    logger: true // Enable built-in logger
});

// Verify transporter connection on startup
transporter.verify()
    .then(() => {
        console.log('SMTP connection verified successfully');
    })
    .catch((error) => {
        console.error('SMTP connection verification failed:', error);
    });

export const sendContactEmail = async (contactData) => {
    const { name, email, subject, message } = contactData;
    
    console.log('Preparing to send email with data:', {
        senderName: name,
        senderEmail: email,
        subject: subject
    });

    // Email to admin
    const mailOptions = {
        from: {
            name: 'Vehicle Rental Contact Form',
            address: 'pasinduwithana2002@gmail.com'
        },
        to: {
            name: 'Admin',
            address: 'pasinduwithana2002@gmail.com'
        },
        subject: `New Contact Form Submission: ${subject}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
        text: `
            New Contact Form Submission
            
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
        `,
        priority: 'high'
    };

    try {
        console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Full response:', info);
        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error('Error sending email:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error response:', error.response);
        console.error('Stack trace:', error.stack);
        throw {
            success: false,
            error: error.message,
            code: error.code
        };
    }
}; 