import { Router } from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import dotenv from "dotenv";
import https from "https";

dotenv.config();
const router = Router();

const ALLOW_INSECURE =
  String(process.env.ALLOW_INSECURE_TLS || "").toLowerCase() === "true";

const httpsAgent = ALLOW_INSECURE
  ? new https.Agent({ rejectUnauthorized: false })
  : undefined;

router.post("/", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const subject = (req.body?.subject || "").trim();
    const email = (req.body?.email || "").trim();
    const message = (req.body?.message || "").trim();

    if (!name || !subject || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Optional: Validate email using Abstract API if key is present
    const apiKey = process.env.EMAIL_API_KEY;
    if (apiKey) {
      try {
        const validateRes = await axios.get(
          `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(
            email
          )}`,
          { timeout: 3000, httpsAgent }
        );

        if (
          !validateRes.data?.is_valid_format?.value ||
          validateRes.data?.deliverability !== "DELIVERABLE"
        ) {
          return res.status(400).json({
            success: false,
            message: "Please enter a valid email address.",
          });
        }
      } catch (err) {
        console.warn("Email validation service error:", err?.message || err);
        // Continue without blocking the user
      }
    }

    const smtpPass = (process.env.EMAIL_PASS || "").replace(/\s/g, "");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 6500,
      tls: ALLOW_INSECURE ? { rejectUnauthorized: false } : {},
      auth: {
        user: process.env.EMAIL_USER,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject} — ${name}`,
      text: `Name: ${name}\nSubject: ${subject}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
    };

    const sendPromise = transporter.sendMail(mailOptions);
    await Promise.race([
      sendPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("SENDMAIL_TIMEOUT")), 6000)
      ),
    ]);

    return res.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error(
      "Contact route error:",
      error?.response?.data || error?.message || error
    );

    if (error && error.message === "SENDMAIL_TIMEOUT") {
      return res.status(202).json({
        success: true,
        message:
          "Message accepted and will be sent shortly. Please do not resend.",
        code: "SENDMAIL_TIMEOUT",
      });
    }

    if (
      /self-signed certificate|SELF_SIGNED_CERT_IN_CHAIN/i.test(
        error?.message || ""
      )
    ) {
      return res.status(502).json({
        success: false,
        message:
          "TLS certificate verification failed with an upstream service. For local/corporate networks, set ALLOW_INSECURE_TLS=true in Backend/.env and restart the server.",
        code: "TLS_CERT_ERROR",
      });
    }

    if (
      error &&
      (error.code === "EAUTH" || /Invalid login/i.test(error.message || ""))
    ) {
      return res.status(500).json({
        success: false,
        message:
          "Email service authentication failed. Verify EMAIL_USER and EMAIL_PASS.",
        code: "EMAIL_AUTH_FAILED",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

export default router;
