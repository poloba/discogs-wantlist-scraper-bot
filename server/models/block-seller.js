import fetch from 'node-fetch';
import {toStr} from '../utils';
import log from '../utils/log';

export const createBlockedSellerFromServer = async (seller) => {
    if (seller === undefined) {
        log(`[Bot][model<BlockSeller>] Error creating model. Missing some parameters, seller: ${seller}`);
        return undefined;
    }

    const body = {
        seller: toStr(seller),
    };

    const blockedSellerFromServer = await fetch('http://localhost:3333/discogs/ban', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    }).catch((err) => console.error(err));

    log(`[Scraper] 👍🏻 Blocked seller: ${seller}`);

    return blockedSellerFromServer;
};
