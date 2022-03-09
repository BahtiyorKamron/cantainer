import TelegramBot from 'node-telegram-bot-api'
import config from './config/config.js'
import Registrate from './controllers/registrate.js'

const bot = new TelegramBot(`5186015669:AAF8xdrl9rVjn5xqvVjHlS5ggpo7QP4Juwc`,{ polling : true })

Registrate.registrate(bot)
