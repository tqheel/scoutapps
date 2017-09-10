'use strict';

var nodemailer = require('nodemailer');
const EmailInfo = require('../types/EmailInfo');
const StringUtils = require('../helpers/StringUtils.js');
var fs = require('fs');

var secretFile = './secrets/email.json'

var emailSecrets;

fs.readFile(secretFile, 'utf8', function(err, data) {
		if(err){
			throw err;
		}
		emailSecrets = JSON.parse(data);
});

function getDefaultSystemEmailInfos(next) {
	var defaultSysEmails = emailSecrets.filter(function(item){
		return item.isDefault === true;
	});
	next(defaultSysEmails);
}

function getSystemSenderEmailInfo(next) {
	var sysEmailInfo = emailSecrets.find(function(email){
		return email.id === 1 ;
	});
	next(sysEmailInfo);
}

function constructAndSendMessage(senderInfo, toEmailAddresses, subject, message) {
	console.log('Sending email to : ' + toEmailAddresses);
	var mailOptions = {
		    from: senderInfo.email + ' (Troop 212 Apps)', // sender address
		    to: toEmailAddresses, // list of receivers
		    subject: subject, // Subject line
		    text: message, // plaintext body
		    html: message // html body
		};


		// create reusable transporter object using SMTP transport

		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: senderInfo.email,
		        pass: senderInfo.password
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

function sendSystemEmail(subject, message){
	getSystemSenderEmailInfo(function (sysSenderInfo) {
		/*
		if (Array.isArray(toEmailAddresses)) {
			debugger;
			let su = new StringUtils();
			su.createCommaDelimitedStringFromArray(toEmailAddresses, function(toEmailAddressStrings) {
				constructAndSendMessage(sysSenderInfo, toEmailAddressStrings, subject, message);
			});
			
		}
		else{
			constructAndSendMessage(sysSenderInfo, toEmailAddresses, subject, message);

		}	
		*/
		getDefaultSystemEmailInfos(function(emailInfos) {
			var toEmailAddresses = [];
			for (let i = 0; i < emailInfos.length; i++) {
				toEmailAddresses.push(emailInfos[i].email);
			}
			let su = new StringUtils();
			su.createCommaDelimitedStringFromArray(toEmailAddresses, function(toEmailAddressStrings) {
				constructAndSendMessage(sysSenderInfo, toEmailAddressStrings, subject, message);
			});	
		});		
	});
}

function sendEmailToRecipients(recipients, subject, message, isTestMode) {
	if (isTestMode) {
		message = message + 
			'<p>' + 'This is a test but this message would have been sent to:<br>' +
			recipients + '</p>';
		recipients = 'tqualls@gmail.com, consulting@toddqualls.com';	
	}
	
	getSystemSenderEmailInfo(function (sysSenderInfo) {
		constructAndSendMessage(sysSenderInfo, recipients, subject, message);
	});
	
}

module.exports = {
	sendSystemEmail: sendSystemEmail,
	constructAndSendMessage: constructAndSendMessage,
	sendEmailToRecipients: sendEmailToRecipients
}
