const fs = require('fs')

// The files with long texts for the bot
module.exports = {
	hospitalHistory: fs.readFileSync('./text_files/hospital_history.txt', 'utf8'),
	contactsFile: fs.readFileSync('./text_files/contacts.txt', 'utf8'),
	paidServicesFile: fs.readFileSync('./text_files/paid_services.txt', 'utf8'),
	infoForPatients: fs.readFileSync('./text_files/for_patients.txt', 'utf8'),
	managmentsHospital: fs.readFileSync('./text_files/managments.txt', 'utf8'),
	diagnostic: fs.readFileSync('./text_files/diagnostic.txt', 'utf8'),
	medicalParts: fs.readFileSync('./text_files/parts_hospital.txt', 'utf8')
}