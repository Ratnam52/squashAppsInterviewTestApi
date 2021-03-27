const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

// OTP generate function
function generateOTP() { 
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 5; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// Send mail function
function emailSend(full_name, email_id) {
    let otp = generateOTP();
    const msg = {
        to: email_id,
        from: process.env.SEND_GRID_MAIL_ID,
        subject: 'OTP Authentication',
        text: `Hi ${full_name}. Your One Time Password is ${otp}`,
        html: `<strong>Hi ${full_name}. Your One Time Password is ${otp}</strong>`,
    }

    sgMail.send(msg).then(() => {
        console.log("otp", otp)
    }).catch((error) => {
        console.log("otp", error)
    })

    return otp
}

module.exports = emailSend