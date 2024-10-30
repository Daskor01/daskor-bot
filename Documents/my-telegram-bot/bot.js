const TelegramBot = require('node-telegram-bot-api');
const { callbackQuery, message } = require('telegraf/filters');
const { inlineKeyboard } = require('telegraf/markup');
const {gameOptions, againOptions} = require('./options')

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на ваш токен бота
const token = '7158290800:AAHbxxEqyBrsbFXMOwU2yyMIxXZTh4QVrjM';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId,'Сейчас я загадаю цифру, попробуй отгадать');
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Старт'},
        {command: '/info', description: 'Инфо о пользователе'},
        {command: '/game', description: 'Игра "Угадай-ка"'}
    ])
   
    // Обработка текстовых сообщений
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text === '/start') {
          await bot.sendSticker(chatId, 'https://data.chpic.su/stickers/s/SplittyVK/SplittyVK_001.webp?v=1729110189')
          return bot.sendMessage(chatId, 'Привет! Я ваш Telegram-бот.')
            console.log(msg);
                
        }

        if (text === '/info') {
         return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
        }

        if (text === '/game') {
            return startGame(chatId)
        }
       
        
     return bot.sendMessage(chatId, 'Я тебя не понимаю, перейди к списку команд')
    });

   bot.on('callback_query', async msg =>{
    const data = msg.data;
    const chatId =  msg.message.chat.id;
    if (data === '/again') {
        return startGame(chatId)
    }
    if( Number(data) === chats[chatId]) {
        await bot.sendSticker(chatId,'https://data.chpic.su/stickers/s/SplittyVK/SplittyVK_020.webp?v=1729110189')
        return bot.sendMessage(chatId, `Поздравляю ты отгадал цифру: ${chats[chatId]}`, againOptions)
    } else {
        return bot.sendMessage(chatId, `Я загадал другую цифру: ${chats[chatId]}`, againOptions)
    }
})
}

 start()
