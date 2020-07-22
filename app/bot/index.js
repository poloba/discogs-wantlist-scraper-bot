import TeleBot from 'telebot';
import {config} from '../config';
import {telegramToken} from '../constants/config';

const bot = new TeleBot({
    token: config.get(telegramToken),
    allowedUpdates: [],
    usePlugins: ['askUser', 'commandButton'],
});

export default bot;
