import rp from 'request-promise';
import {exec} from 'child_process';
import {readFileSync} from 'fs';
import {delay} from './utils';
import {get} from './utils/api';
import log from './utils/log';
import {createNewRecordFromServer} from './models/new-record';

const execScrapy = () => {
    log('[Scraper] 👮🏻‍♀️ Scrapy started');

    const scrapy = 'rm discogs.json; scrapy crawl discogs -o discogs.json';
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
    const parsedSellersArray = await JSON.parse(sellers).map((s) => s.seller);

    if (parsedSellersArray.length === 0) {
        return [];
    }

    return parsedSellersArray;
};

const pushScrapedData = async () => {
    const data = await readFileSync('./discogs.json', {encoding: 'utf8'});
    let parsedDataArray = await JSON.parse(data).map((item) => item);

    const bannedSellers = await getBannedSellers();
    parsedDataArray = await parsedDataArray.filter((val) => !bannedSellers.includes(val.seller));

    for (let parsedData of parsedDataArray) {
        await createNewRecordFromServer(parsedData).then(delay.bind(null, 500));
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
