'use strict';
import rp from 'request-promise';
import Promise from 'bluebird';
import {exec} from 'child_process';
import {post} from './utils/api';
import log from './utils/log';

const fs = Promise.promisifyAll(require('fs'));

const execPromise = () => {
    log('👮🏻‍♀️ Scrapy started, searching for new entries...');

    const scrapy = 'rm discogs.json; scrapy crawl discogs -o discogs.json';
    const ex = exec(scrapy, {maxBuffer: 1024 * 1200}, (error) => {
        if (error) throw error;
    });

    return new Promise((resolve, reject) => {
        ex.addListener('error', reject);
        ex.addListener('exit', resolve);
    });
};

const pushItems = (item) => {
    const {
        idItem,
        artist,
        price,
        image,
        description,
        location,
        linkRelease,
        linkCart,
        linkDetails,
        conditionMedia,
        conditionSleeve,
        seller,
        sellerLink,
    } = item;

    return rp(
        post({
            path: '/insert',
            json: {
                idItem,
                artist,
                price,
                image,
                description,
                location,
                urlRelease: linkRelease,
                urlCart: linkCart,
                urlDetails: linkDetails,
                conditionMedia,
                conditionSleeve,
                seller,
                sellerLink,
            },
        })
    ).then(() => log(`👍🏻 Inserted entry into db: ${artist}`));
};

const scraper = () => {
    return new Promise((resolve) => {
        execPromise()
            .then(() => {
                log('💃 Scrapy finished correctly!');

                fs.readFileAsync('./discogs.json', {encoding: 'utf8'})
                    .then((data) => {
                        JSON.parse(data).map((item, idx) => {
                            log(`Inserting entry ${idx + 1}: ${item.artist}`);
                            pushItems(item);
                        });
                        resolve();
                    })
                    .catch((err) => console.error(err.stack));
            })
            .catch((err) => console.error(err));
    });
};

export default scraper;
