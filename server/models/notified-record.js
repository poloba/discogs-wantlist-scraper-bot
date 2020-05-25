import fetch from 'node-fetch';
import {toStr} from '../utils';
import log from '../utils/log';

export const createNotifiedRecordFromServer = async (idDiscogs) => {
    if (idDiscogs === undefined) {
        log(
            `[Bot][model<NotifiedRecord>] Error creating model. Missing some parameters, id_discogs: ${idDiscogs}`
        );
        return undefined;
    }

    const body = {
        id_discogs: toStr(idDiscogs),
    };

    const notifiedRecordFromServer = await fetch('http://localhost:3333/discogs/notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    }).catch((err) => console.error(err));

    return notifiedRecordFromServer;
};
