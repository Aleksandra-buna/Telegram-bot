// the imported elements
const TelegramAPI = require('node-telegram-bot-api')
const {initialOptions, hospitalInfoOptions, againOptions, previousStep} = require('./src/optionsOfButtons.js')
const {hospitalHistory, contactsFile, paidServicesFile, infoForPatients, 
	managmentsHospital, diagnostic, medicalParts} = require('./src/readFiles.js')
const {contacts, price, importantNumbers, infoOnManagment} = require('./src/wordsBySearch.js')


// The token received after registering of a bot in the Telegram
const token = '5393053832:AAEQUZwsYjR9w6OEL79vt_-k2dai9skwKxk'

const bot = new TelegramAPI(token, {polling: true})

// The primary function that handles requests
const startBot = () => {
	// Creating the menu button's with the primary commands
	bot.setMyCommands([
		{ command: '/start', description: 'Приветствие' },
		{ command: '/info', description: 'Информация о боте' }
	])

	// Processing the received messages 
	bot.on('message', async (msg) => {
		// console.log(msg)
		const text = msg.text
		const chatId = msg.chat.id
		try {
			if (text === '/start') {
				return bot.sendMessage(chatId, `Здравствуйте, ${msg.from.first_name}! Вас приветствует Городская Многопрофильная Больница №2.`
					+ ` Мы рады помочь вашему запросу. Выберите интересующую Вас категорию.`, initialOptions)
			}

			if (text === '/info') {
				return bot.sendMessage(chatId, contactsFile)
			}

			for (const word of contacts) {
				if (text.toLowerCase() === word) {
					return bot.sendMessage(chatId, contactsFile)
				}
			}

			for (const word of price) {
				if (text.toLowerCase() === word) {
					await bot.sendMessage(chatId, paidServicesFile)
					return bot.sendDocument(chatId, './text_files/price.pdf')
				}
			}

			for (const word of importantNumbers) {
				if (text.toLowerCase() === word) {
					return bot.sendMessage(chatId, infoForPatients)
				}
			}

			for (const word of infoOnManagment) {
				if (text.toLowerCase() === word) {
					return bot.sendMessage(chatId, managmentsHospital)
				}
			}

			return bot.sendMessage(chatId, 'Я вас не понимаю.')
		} catch (event) {
			return bot.sendMessage(chatId, 'Извините, произошла ошибка! Пожалуйста, попробуйте еще раз.')
		}
	})

	// tapping buttons
	bot.on('callback_query', async (msg) => {
		const data = msg.data
		const chatId = msg.message.chat.id
		try {
			if (data === 'again') {
				return bot.sendMessage(chatId, 'Выберите интересующую Вас категорию.', initialOptions)
			}

			if (data === 'previous') {
				return bot.sendMessage(chatId, 'Выберите интересующую Вас категорию.', hospitalInfoOptions)
			}

			if (data === 'hospitalInfo') {
				return bot.sendMessage(chatId, hospitalHistory, hospitalInfoOptions)
			}

			if (data === 'contacts') {
				return bot.sendMessage(chatId, contactsFile, againOptions)
			}

			if (data === 'paidServices') {
				await bot.sendMessage(chatId, paidServicesFile)
				return bot.sendDocument(chatId, './text_files/price.pdf', againOptions)
			}

			if (data === 'forPatients') {
				return bot.sendMessage(chatId, infoForPatients, againOptions)
			}

			if (data === 'managment') {
				await bot.sendMessage(chatId, managmentsHospital, previousStep)
			}

			if (data === 'diagnosticDivisions') {
				await bot.sendMessage(chatId, diagnostic, previousStep)
			}

			if (data === 'partsHospital') {
				await bot.sendMessage(chatId, medicalParts, previousStep)
			}

		} catch (event) {
			return bot.sendMessage(chatId, 'Извините, произошла ошибка! Пожалуйста, попробуйте еще раз.')
		}
	})
}

startBot()

