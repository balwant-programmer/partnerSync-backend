import nodemailer from "nodemailer";

export const sendItemAddedEmail = async ({
  to,
  item,
  price,
  partnerId,
  name,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"PartnerSyn Team" <${process.env.MAIL_USER}>`,
    to,
    subject: "🎉 You've Added a New Item!",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 30px 10px;">
        <div style="max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <div style="background-color: #4CAF50; text-align: center; padding: 30px 20px;">
            <h1 style="color: #ffffff; margin: 0;">New Item Added</h1>
          </div>

          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #333;">Hello ${name},</p>
            <p style="font-size: 16px; color: #333;">You have successfully added a new item to your account:</p>

            <table style="width: 100%; margin-top: 20px; font-size: 16px; color: #333; table-layout: fixed;">
              <tr>
                <td style="padding: 8px 0; width: 30%;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; word-wrap: break-word; word-break: break-word; width: 70%;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; width: 30%;"><strong>Item:</strong></td>
                <td style="padding: 8px 0; word-wrap: break-word; word-break: break-word; width: 70%;">${item}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; width: 30%;"><strong>Price:</strong></td>
                <td style="padding: 8px 0; word-wrap: break-word; word-break: break-word; width: 70%;">₹${price}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; width: 30%;"><strong>Partner ID:</strong></td>
                <td style="padding: 8px 0; word-wrap: break-word; word-break: break-word; width: 70%;">${partnerId}</td>
              </tr>
            </table>

            <p style="margin-top: 30px;">If you have any questions, feel free to contact our support team.</p>
            <p style="color: #888; font-size: 14px;">Thanks,<br>PartnerSyn Team</p>
          </div>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
