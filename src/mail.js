const nodemailer = require("nodemailer");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mycart19@gmail.com",
    pass: "mnmg scxj fxcw abkg",
  },
});

// Activation email function
const sendActivationEmail = (recipientEmail, userName, activationToken) => {
  const activationLink = `http://localhost:5000/api/activate/${activationToken}`;

  const mailOptions = {
    from: "mycart19@gmail.com",
    to: recipientEmail,
    subject: "Activate Your Account",
    text: `Hi ${userName},\n\nThank you for registering on our platform. Please activate your account by clicking the link below:\n\n${activationLink}\n\nBest,\nThe Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Activation email sent:", info.response);
    }
  });
};

module.exports = { sendActivationEmail };
