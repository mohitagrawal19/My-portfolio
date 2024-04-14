const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const mongo = require("./Schema.js");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://ma7693849:d3fEptjqZZ9AE5Bz@cluster0.p4j1vsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Hiriing", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ma.7693849@gmail.com",
    pass: "dcfe aobh jetj cwfp",
  },
});

const sendEmail = async (email, message) => {
  try {
    const mailOptions = {
      from: "ma.7693849@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendEmailToPersonal = async (name, email, message, phone) => {
  try {
    const mailOptions = {
      from: "ma.7693849@gmail.com",
      to: "ma.7693849@gmail.com",
      subject: "Recruiter data",
      html: `<p>Data is:</p><p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}<p>Phone: ${phone}</p>`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

app.post("/mail", async (req, res) => {
  console.log("Request Body:", req.body);
  const { email, message, name, phoneNumber } = req.body;
  
  if (!email || !message || !name || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required', status: false });
  }

  try {
    await sendEmail(email, "Thank you for reaching out!");
    const newUser = new mongo({ email, message, name, phoneNumber });
    await newUser.save();
    await sendEmailToPersonal(name, email, message, phoneNumber);
    return res.status(200).json({ message: 'Message sent successfully', status: true });
  } catch (err) {
    console.error("Internal server error:", err);
    return res.status(500).json({ message: 'Internal server error', status: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
