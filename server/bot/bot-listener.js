import bot from './index';
import rp from 'request-promise';
import {get, post} from '../utils/api';

const botListener = () => {
    bot.on('/ban', (msg) => {
        return bot.sendMessage(msg.from.id, 'Tell me the seller that you want to block', {ask: 'ban'});
    });

    bot.on('ask.ban', (msg) => {
        const id = msg.from.id;
        const seller = msg.text;

        if (seller === '' || seller === undefined) {
            return bot.sendMessage(id, `Please provide a seller to block`, {
                ask: 'ban',
            });
        }

        rp(post({path: '/ban', json: {seller}}))
            .then(() => bot.sendMessage(id, `Awesome, <b>${seller}</b> seller blocked!`, {parseMode: 'HTML'}))
            .catch((err) => console.log(err));
    });

    bot.on('/banlist', (msg) => {
        const id = msg.from.id;

        rp(get('/ban/list'))
            .then((body) => {
                const sellers = JSON.parse(body);
                return bot.sendMessage(id, `<b>Sellers blocked:</b>\n ${sellers.map((s) => s.seller)}`, {
                    parseMode: 'HTML',
                });
            })
            .catch((err) => console.log(err));
    });

    bot.start();
};

export default botListener;
