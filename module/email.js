const nodemailer = require("nodemailer");

const keys = require("../config/keys");

// async..await is not allowed in global scope, must use a wrapper
async function send_mail(email_user, link_id, type) {

    var subject;

    if(type == 'verify'){
        subject = "Verify your email for your Wojak Paradise account"
    } else if (type == 'reset') {
        subject = 'Reset your password by clicking on the link below'
    }

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(keys.email);

  console.log('"Wojak Paradise" <'+keys.email.auth.user+'>')

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Wojak Paradise" <'+keys.email.auth.user+'>', // sender address
    to: email_user, // list of receivers
    subject: subject, // Subject line
    text: "", // plain text body
    html: "<p>"+subject+" : <a href='https://wojakparadise.net/auth/local/"+link_id+"'>https://wojakparadise.net/auth/local/"+link_id+"</a></p>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.send_mail = send_mail;

