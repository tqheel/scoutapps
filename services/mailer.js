
var nodemailer = require('nodemailer');
var fs = require('fs');

var secretFile = 'secrets/email.json'

var emailSecrets;

fs.readFile(secretFile, 'utf8', function(err, data) {
		if(err){
			throw err;
		}
		emailSecrets = JSON.parse(data);
});

function getDefaultSystemEmailAddresses(next) {
	var defaultSysEmails = emailSecrets.filter(function(item){
		return item.default === true;
	});

	defaultSysEmails.forEach(function(email){
		console.log('Default sys email: ' + email);
	});
	return defaultSysEmails;
}

function createEmailList(emails, next){
	
}

function sendEmail(emailArray, message){

	var mailOptions = {
	    from: 'Balance Request Bot <balancebot@bsa212cary.org> (Do not Reply)', // sender address
	    to: 'tqualls@gmail.com', // list of receivers
	    subject: 'Scout Account Balance', // Subject line
	    text: message, // plaintext body
	    html: message // html body
	};


	// create reusable transporter object using SMTP transport

	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: emailSecrets.email,
	        pass: emailSecrets.password
	    }
	});

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);

	});

}

module.exports = {
	sendEmail: sendEmail,
	getDefaultSystemEmailAddresses: getDefaultSystemEmailAddresses
}
