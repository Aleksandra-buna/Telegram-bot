// creating buttoms for the bot
module.exports = {
	initialOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'О больнице', callback_data: 'hospitalInfo'}],
				[{text: 'Контакты', callback_data: 'contacts'}],
				[{text: 'Платные услуги', callback_data: 'paidServices'}],
				[{text: 'Информация для пациентов', callback_data: 'forPatients'}]
			]
		})
	},
	
	hospitalInfoOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Руководство', callback_data: 'managment'}],
				[{text: 'Диагностические подразделения', callback_data: 'diagnosticDivisions'}],
				[{text: 'Коечные отделения', callback_data: 'partsHospital'}],
				[{text: '<-- Назад', callback_data: 'again'}],
			]
		})
	},

	againOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: '<-- Назад', callback_data: 'again'}]
			]
		})
	},
	
	previousStep: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: '<-- Назад', callback_data: 'previous'}]
			]
		})
	}
	
}