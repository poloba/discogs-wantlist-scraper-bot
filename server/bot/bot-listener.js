import bot from './index';
import fetch from 'node-fetch';

import {createBlockedSellerFromServer} from '../models/block-seller';

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

        (async () => {
            await createBlockedSellerFromServer(seller);
        })();

        return bot.sendMessage(id, `Awesome, <b>${seller}</b> seller blocked!`, {parseMode: 'HTML'});
    });

    bot.on('/banlist', (msg) => {
        const id = msg.from.id;

        (async () => {
            const data = await fetch('http://localhost:3333/discogs/ban/list');
            const dataJson = await data.json();
            return bot.sendMessage(id, `<b>Sellers blocked:</b>\n ${dataJson.map((s) => s.seller)}`, {
                parseMode: 'HTML',
            });
        })();
    });

    bot.on('/id', (msg) => {
        const id = msg.from.id;

        return bot.sendMessage(id, `Your telegram ID is: ${id}`);
    });

    bot.start();
};

export default botListener;
