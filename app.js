import TelegramBot from 'node-telegram-bot-api'
import config from './config/config.js'
import Registrate from './controllers/registrate.js'

const bot = new TelegramBot(config.token,{ polling : true })

Registrate.registrate(bot)
