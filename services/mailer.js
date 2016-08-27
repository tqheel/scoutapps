
var nodemailer = require('nodemailer');
const EmailInfo = require('../types/EmailInfo');
const StringUtils = require('../helpers/StringUtils.js');
var fs = require('fs');

var secretFile = 'secrets/email.json'

var emailSecrets;

fs.readFile(secretFile, 'utf8', function(err, data) {
		if(err){
			throw err;
		}
		emailSecrets = JSON.parse(data);
});

function getDefaultSystemEmailInfos(next) {
	var defaultSysEmails = emailSecrets.filter(function(item){
		var emailInfo = item.default === true;
		return emailInfo;
	});
	
	next(defaultSysEmails);
}

function getSystemSenderEmailInfo(next) {
	var sysEmailInfo = emailSecrets.filter(function(email){
		return email.id === 1;
	})[0];
	next(sysEmailInfo);
}

function sendSystemEmail(toEmailAddresses, subject, message){

	getSystemSenderEmailInfo(function (sysSenderInfo) {
		if (Array.isArray(toEmailAddresses)) {
			let su = new StringUtils(toEmailAddresses);
			toEmailAddresses = su.createCommaDelimitedStringFromArray();
		}

		var mailOptions = {
		    from: sysSenderInfo.email + ' (Troop 212 Apps)', // sender address
		    to: toEmailAddresses, // list of receivers
		    subject: subject, // Subject line
		    text: message, // plaintext body
		    html: message // html body
		};


		// create reusable transporter object using SMTP transport

		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: sysSenderInfo.email,
		        pass: sysSenderInfo.password
		    }
		});

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);

		});
	});
}

module.exports = {
	sendSystemEmail: sendSystemEmail,
	getDefaultSystemEmailInfos: getDefaultSystemEmailInfos
}
