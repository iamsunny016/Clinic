const { Resend } = require('resend');

const resend = new Resend('re_BPCNoVPq_KNcPtc1HHUPTNJvNahdxCmB2');

async function test() {
  try {
    console.log('Testing Resend API Key...');
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'm.scrajnish@gmail.com', // Using the email from your screenshot
      subject: 'Test from Clinic App',
      html: '<p>If you see this, your API key is working!</p>'
    });
    console.log('Success!', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
