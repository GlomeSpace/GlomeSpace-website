import fs from "fs";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { Email } from "../models/waitlistModel.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VALID_EMAIL = /^[A-z]+[0-9]*@[A-z]+(\.[A-z]+)+$/;

/*
endpoint: /
method: get
receives: nothing
does: queries the database for a list of all the emails available
returns: a list of emails available in the database
*/
const getEmails = async (req, res) => {
  const emails = await Email.find({}).lean();
  if (!emails?.length) {
    return res.status(404).json({ message: "no emails found." });
  }
  return res.status(200).json(emails);
};

/*
endpoint: /
method: post
receives: an email
does: adds the email to the database, sends an email notification with a verification endpoint
returns: nothing
*/
const addEmail = async (req, res) => {
  const { email, username, message, newsletter } = req.body;
  if (!email.trim()) {
    return res.status(400).json({ message: "An email address is required." });
  }
  if (!VALID_EMAIL.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }
  let emailEntry = await Email.findOne({ email }).lean();
  if (emailEntry) {
    return res
      .status(409)
      .json({ message: "email already exists. Enter a different email." });
  }
  emailEntry = await Email.create({
    email,
    username: username ? username : null,
    message: message ? message : null,
    newsletter: newsletter === true ? newsletter : false,
  });

  // sending the first email
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    dkim: {
      domainName: "glomespace.com",
      keySelector: "default",
      privateKey: fs.readFileSync(
        path.join(__dirname, "..", "privateKeyDKIM.pem"),
        "utf8",
      ),
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const unsubscribeUrl = `${process.env.BACKEND_URL}/mail-list/unsubscribe?emailId=${emailEntry._id}`;
  const messageTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GlomeSpace</title>
  </head>
  <body>
    <table
      style="
        max-width: 700px;
        margin-inline: auto;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 10px;
      "
      borders
    >
      <tbody>
        <tr>
          <td>
            <p>
              Hi <b style="color: gray">${
                emailEntry?.username ? emailEntry.username : email
              }</b>, Thank you for signing up!
              We're thrilled to confirm your spot on the official waitlist for
              GlomeSpace. You're one of the first people who will get access to
              GlomeSpace services, the new platform that lets you connect
              packages with verified travelers heading to the right location and
              ship as fast as possible
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <h3 style="color: gray; margin: 1px">
              Next, we're working hard to prepare for launch. Here's what you
              can expect:
            </h3>
          </td>
        </tr>
        <tr>
          <td style="margin-right: 5px">
            <ol>
              <li>
                Priority Access: You will be among the first users invited to
                download and use the app when we go live.
              </li>
              <li>
                Updates: We'll send you occasional emails with exciting product
                milestones, beta testing opportunities, and the official launch
                date, unless you subscribed to our newsletter.
              </li>
              <li>
                We value your inbox! We'll only contact you with essential
                launch news and updates.
              </li>
              <li>
                Get Noticed Sooner! Want to jump the line? Share the waitlist
                link with friends! We can't wait to help you ship smarter and
                travel lighter. See you on launch day!
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td>
            <span>Best Regards,</span><br />
            <span>Ariho Seth</span><br />
            <span>Founder & CEO,</span><br />
            <span>GlomeSpace | GlomeSpace.com</span>
          </td>
        </tr>
        <tr>
          <td>
            <a href="${unsubscribeUrl}" style="font-size: 0.8em; color: blue">Unsubscribe</a>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
  `;
  const textTemplate = `
  Hi ${email}, Thank you for signing up! We're thrilled to confirm your spot on the official waitlist for GlomeSpace. 
  You're one of the first people who will get access to GlomeSpace services, 
  the new platform that lets you connect packages with verified travelers heading to the right location and ship as fast as possible
 
  Next, we're working hard to prepare for launch. Here's what you can expect:
  Priority Access: You will be among the first users invited to download and use the app when we go live.
  Updates: We'll send you occasional emails with exciting product milestones, beta testing opportunities, 
  and the official launch date, unless you subscribed to our newsletter.
  We value your inbox! We'll only contact you with essential launch news and updates.
  Get Noticed Sooner! Want to jump the line? Share the waitlist link with friends! 
  We can't wait to help you ship smarter and travel lighter. See you on launch day!
  
  Best Regards,
  Ariho Seth
  Founder & CEO, 
  GlomeSpace | GlomeSpace.com
  `;
  const info = await transporter.sendMail({
    from: "'Ariho Seth' <arihoseth@glomespace.com>",
    to: email,
    subject: "GlomeSpace",
    text: textTemplate,
    html: messageTemplate,
    list: {
      unsubscribe: {
        url: unsubscribeUrl,
        comment: "Unsubscribe from the newsletter.",
      },
    },
  });
  res.status(201).json({ message: "email added." });
};

/*
endpoint: verify-email
method: post
receives: unique verification id
does: queries the email database for the verification id and sets the verification field to true if the entry exists
returns: nothing
*/
const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  if (!verificationCode) {
    return res
      .status(400)
      .json({ message: "verification code is not provided." });
  }
  const email = await Email.findOne({ verificationCode });
  if (!email) {
    return res.status(404).json({
      message:
        "verification failed. No email matches the provided verification Id.",
    });
  }
  email.verified = true;
  await email.save();
  res.status(200).json({ message: "email successfully verified." });
};

/*
endpoint: unsubscribe
method: get
receives: email track id
does: queries the db for the email track Id and sets unsubscribed fiela to true
returns: nothing
*/
const unsubscribe = async (req, res) => {
  const { emailId } = req.query;
  if (!emailId || emailId == "undefined") {
    return res.status(400).json({ message: "email Id is not provided." });
  }
  if (!mongoose.Types.ObjectId.isValid(emailId)) {
    return res
      .status(400)
      .json({ message: "the email id you provided is invalid." });
  }
  const email = await Email.findById(emailId);
  if (!email) {
    return res.status(404).json({ messgae: "email not found." });
  }
  email.unsubscribed = true;
  await email.save();
  res.sendFile(path.join(__dirname, "..", "public", "successUnsubscribe.html"));
};

export default {
  getEmails,
  addEmail,
  verifyEmail,
  unsubscribe,
};
