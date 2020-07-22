import bot from './index';
import fetch from 'node-fetch';
import {delay} from '../utils';
import log from '../utils/log';
import {config} from '../config';
import {telegramId} from '../constants/config';

import {createNotifiedRecordFromServer} from '../models/notified-record';

const botMessage = async (item) => {
    const {
        id_discogs,
        artist,
        description,
        price,
        url_details,
        seller,
        location,
        condition_media,
        condition_sleeve,
    } = item;

    await bot
        .sendMessage(
            config.get(telegramId),
            `<b>${artist}</b>\n📁 ${condition_media}  💿 ${condition_sleeve}\n<i>${description}</i>\n<b>${price}</b>    📦  ${location}  🚪 ${seller}\n\n<a href="https://www.discogs.com${url_details}">📎 Ver más detalles:</a>`,
            {parseMode: 'HTML'}
        )
        .catch((err) => console.log(err));

    await createNotifiedRecordFromServer(id_discogs);

    return log(`[Bot] Message sent to telegram: [${seller}] ${artist}`);
};

const pushMessages = async () => {
    const data = await fetch('http://localhost:3333/discogs/entries');
    const dataJson = await data.json();
    const parsedDataArray = await dataJson.map((item) => item);

    if (parsedDataArray.length === 0) {
        return log('[Bot] No new entries :(');
    }

    for (const parsedData of parsedDataArray) {
        await botMessage(parsedData).then(delay.bind(null, 500));
    }

    return log('[Bot] All messages sent to Telegram :)');
};

const botWantlist = async () => {
    log('[Bot] 👮🏻‍♀️ Started, searching new entries...');

    await pushMessages();

    return log('[Bot] Finished :)');
};

export default botWantlist;
