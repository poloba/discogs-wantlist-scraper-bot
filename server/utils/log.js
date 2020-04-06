import chalk from 'chalk';

const colorHead = chalk.rgb(255, 216, 91);
const colorSubHead = chalk.rgb(255, 140, 45);

export const log = (string = '') => console.log(`${colorSubHead('[Discogs]')} ${colorHead(string)}`);
export const scraperStarted = log('Scraper started 👮🏻‍♀️  searching new entries...');
export const scraperFinished = log('Scraper finish correctly 💃');
export const scraperPushingItems = (idx, item) => log(`Pushing item ${idx + 1} => ${item}`);

export const botStarted = log('Bot started 👮🏻‍♀️  searching new entries...');
export const botPushedNotification = (idItem, item) =>
    log(`👍🏻  Telegram pushed notification ${idItem} => ${item}`);
export const botNoNewEntries = log('🙇🏻‍♀️ No new entries');

export const cronStarts = (time, type) =>
    log(`[${type}] Cron will start every hour at **:${time} minutes between ${config.CRON_SCHEDULE}`);
