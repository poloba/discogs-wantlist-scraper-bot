import fetch from 'node-fetch';
import {toNum, toStr} from '../utils';
import log from '../utils/log';

export const createNewRecordFromServer = async (data) => {
    const {
        id_discogs,
        artist,
        description,
        price,
        image,
        url_release,
        url_cart,
        url_details,
        url_seller,
        seller,
        location,
        condition_media,
        condition_sleeve,
    } = data;

    if (id_discogs === undefined || artist === undefined) {
        log(
            `[model<Record>] Error creating model. Missing some parameters, id_discogs: ${id_discogs} || artist: ${artist}`
        );
        return undefined;
    }

    const body = {
        id_discogs: toNum(id_discogs),
        artist: toStr(artist),
        description: description ? toStr(description) : '',
        price: price ? toStr(price) : '',
        image: image ? toStr(image) : '',
        url_release: url_release ? toStr(url_release) : '',
        url_cart: url_cart ? toStr(url_cart) : '',
        url_details: url_details ? toStr(url_details) : '',
        url_seller: url_seller ? toStr(url_seller) : '',
        seller: seller ? toStr(seller) : '',
        location: location ? toStr(location) : '',
        condition_media: condition_media ? toStr(condition_media) : '',
        condition_sleeve: condition_sleeve ? toStr(condition_sleeve) : '',
    };

    const newRecordFromServer = await fetch('http://localhost:3333/discogs/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    }).catch((err) => console.error(err));

    log(`[Scraper] 👍🏻 Inserted entry into DB: [${seller}] ${artist}`);

    return newRecordFromServer;
};
