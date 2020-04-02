import rp from 'request-promise';
import Promise from 'bluebird';
import {exec} from 'child_process';
import {scraperStarted, scraperFinished, scraperPushingItems} from './utils/log';
import {post} from './utils/api';

const fs = Promise.promisifyAll(require('fs'));

const execPromise = () => {
    scraperStarted;

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

    rp(
        post({
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
    );
};

const scraper = () => {
    execPromise
        .then(() => {
            scraperFinished;

            fs.readFileAsync('./discogs.json', {encoding: 'utf8'})
                .then((data) => {
                    JSON.parse(data).map((item, idx) => {
                        scraperPushingItems(name, idx, item.artist);
                        pushItems(item);
                    });
                })
                .catch((err) => console.error(err.stack));
        })
        .catch((err) => console.error(err));
};

export default scraper;
