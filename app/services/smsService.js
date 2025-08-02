/* const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendSmsOtp = async (mobile, otp) => {
  await client.messages.create({
    to: mobile,
    from: process.env.TWILIO_PHONE,
    body: `Your OTP is: ${otp}`
  });
};
 */


const axios = require('axios');
require('dotenv').config();

const sendSmsOtp = async (mobile, otp) => {
  const message = `Your OTP is ${otp}`;

  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'otp',
        message,
        language: 'english',
        flash: 0,
        numbers: mobile
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.return) {
      console.log(`✅ OTP sent to ${mobile}`);
    } else {
      console.warn(`❌ OTP not sent to ${mobile}`, response.data);
    }
  } catch (error) {
    console.error(`❌ Fast2SMS Error:`, error.response?.data || error.message);
  }
};

module.exports = { sendSmsOtp };
