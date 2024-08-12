const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const cookieparser = require('cookie-parser');

const { EMAIL, PASSWORD } = require('./env');



app.use(cors({
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


const sendMultipleEmails = async (emailList, emailBody, ccList, bccList, subject, emailid, apppassword) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  });

  try {
    const sentEmails = [];
    const invalidEmails = [];
    const filterEmptyStrings = (arr) => arr.filter(email => email.trim() !== '');
    const filteredEmailList = filterEmptyStrings(emailList);
    const filteredCCList = filterEmptyStrings(ccList);
    const filteredBCCList = filterEmptyStrings(bccList);

    const validateAndPushInvalidEmail = (email, emailType, invalidEmails) => {
      if (!isValidEmail(email)) {
        const errorMessage = `${email}: ${emailType}`;
        if (!invalidEmails.includes(errorMessage)) {
          console.log(errorMessage);
          invalidEmails.push(errorMessage);
        }
        return true;
      }
      return false;
    };

    if (filteredEmailList.length > 0) {
      for (const userEmail of filteredEmailList) {
        if (!validateAndPushInvalidEmail(userEmail, 'TO', invalidEmails)) {
          sentEmails.push(userEmail);
          let message = {
            from: emailid,
            to: userEmail,
            subject: subject,
            html: `<html>
            <head>
              <title>Testing Email</title>
            </head>
            <body>
              <p>${emailBody.split('\n').join('<br>')}</p>
              <p>Regards,<br/>Vamsee</p>
            </body>
          </html>`
          };
          await transporter.sendMail(message);
          console.log(`Email sent to ${userEmail} (TO)`);
        }
      }
    }

    if (filteredCCList.length > 0) {
      for (const ccEmail of filteredCCList) {
        if (!validateAndPushInvalidEmail(ccEmail, 'CC', invalidEmails)) {
          sentEmails.push(ccEmail);
          let message = {
            from: emailid,
            cc: ccEmail,
            subject: subject,
            html: `<html>
            <head>
              <title>Testing Email</title>
            </head>
            <body>
              <p>${emailBody.split('\n').join('<br>')}</p>
              <p>Regards,<br/>Vamsee</p>
            </body>
          </html>`
          };
          await transporter.sendMail(message);
          console.log(`Email sent to ${ccEmail} (CC)`);
        }
      }
    }

    if (filteredBCCList.length > 0) {
      for (const bccEmail of filteredBCCList) {
        if (!validateAndPushInvalidEmail(bccEmail, 'BCC', invalidEmails)) {
          sentEmails.push(bccEmail);
          let message = {
            from: emailid,
            bcc: bccEmail,
            subject: subject,
            html: `<html>
            <head>
              <title>Testing Email</title>
            </head>
            <body>
              <p>${emailBody.split('\n').join('<br>')}</p>
              <p>Regards,<br/>Vamsee</p>
            </body>
          </html>`
          };
          await transporter.sendMail(message);
          console.log(`Email sent to ${bccEmail} (BCC)`);
        }
      }
    }

    return { sentEmails, invalidEmails };

  } catch (error) {
    console.error("Error sending emails:", error);
    throw error;
  }
};


app.post('/send-emails', async (req, res) => {
  const { emailList, emailBody, ccList, bccList, subject, emailid, apppassword } = req.body;

  try {
    const { sentEmails, invalidEmails } = await sendMultipleEmails(emailList, emailBody, ccList, bccList, subject, emailid, apppassword);

    res.status(200).json({ success: true, message: 'Emails sent successfully', sentEmails, invalidEmails });

  } catch (error) {
    console.error('Error sending emails:', error);

    if (error.response) {
      // Log the detailed error response from the email service
      console.log('Error details:', error.response);
    }

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




app.listen(3002, () =>{
    console.log('Port is running 3002')
})
