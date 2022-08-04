const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL || '',
    port: process.env.PORT_MAIL || 2525,
    auth: {
      user: process.env.USER_MAIL || '',
      pass: process.env.PASSWORD_MAIL || ''
    }
});   

module.exports = (from, to, subject, text) => {

    var mailOptions = {
        from,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}
