'use strict';
import rp from 'request-promise';
import {exec} from 'child_process';
import {readFileSync} from 'fs';
import {delay} from './utils';
import {post, get} from './utils/api';
import log from './utils/log';

const execScrapy = () => {
    log('[Scraper] 👮🏻‍♀️ Scrapy started, collecting data...');

    const scrapy = 'rm discogs.json; scrapy crawl discogs -o discogs.json';
    //const scrapy = 'ls -la';
    const ex = exec(scrapy, {maxBuffer: 1024 * 1200}, (error) => {
        if (error) throw error;
    });

    return new Promise((resolve, reject) => {
        ex.addListener('error', reject);
        ex.addListener('exit', resolve);
    });
};

const getBannedSellers = async () => {
    const sellers = await rp(get('/ban/list'));
    const parsedSellersArray = await JSON.parse(sellers).map((seller) => seller);

    if (parsedSellersArray.length === 0) {
        return log('[Scraper] No banned sellers available');
    }

    return parsedSellersArray;
};

const pushItem = async (item) => {
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
    } = item;

    await rp(
        post({
            path: '/insert',
            json: {
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
            },
        })
    );

    return log(`[Scraper] 👍🏻 Inserted entry into DB: [${seller}] ${artist}`);
};

const pushScrapedData = async () => {
    const data = await readFileSync('./discogs.json', {encoding: 'utf8'});
    let parsedDataArray = await JSON.parse(data).map((item) => item);
    let bannedSellerArray = await getBannedSellers().filter((banned) => banned.seller);

    //console.log(bannedSellerArray);

    for (let parsedData of parsedDataArray) {
        await pushItem(parsedData).then(delay.bind(null, 500));
    }

    return log('[Scraper] All data inserted into DB!');
};

const scraper = async () => {
    await execScrapy();
    log('[Scraper] 💃 Scrapy finished correctly!');

    await pushScrapedData();

    return log('[Scraper] Finished :)');
};

export default scraper;
