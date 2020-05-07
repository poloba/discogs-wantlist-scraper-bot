import Configstore from 'configstore';
import figlet from 'figlet';
import {readFileSync, writeFileSync} from 'fs';
import {askDiscogsCredentials, askTelegramCredentials, askCronSchedule} from './inquirer';
import log from '../utils/log';
import {discogsUsername, discogsPassword, telegramToken, telegramId, cronSchedule} from './constants';

const configJson = readFileSync('./config.json', {encoding: 'utf8'});
export const config = new Configstore(configJson.name);

export const getDiscogsCredentials = async () => {
    let username = config.get(discogsUsername);
    let password = config.get(discogsPassword);

    if (username && password) {
        return {username, password};
    }

    const credentials = await askDiscogsCredentials();
    username = config.set(discogsUsername, credentials.username);
    password = config.set(discogsPassword, credentials.password);

    return {username, password};
};

export const getTelegramCredentials = async () => {
    let token = config.get(telegramToken);
    let id = config.get(telegramId);

    if (token && id) {
        return {token, id};
    }

    const credentials = await askTelegramCredentials();
    token = config.set(telegramToken, credentials.token);
    id = config.set(telegramId, credentials.id);

    return {token, id};
};

export const getCronSchedule = async () => {
    let schedule = config.get('cron.schedule');

    if (schedule) {
        return schedule;
    }

    const cron = await askCronSchedule();
    schedule = config.set(cronSchedule, cron.schedule);

    return schedule;
};

const welcomeMessage = () => {
    log(figlet.textSync('discogs', {font: 'Sub-Zero', horizontalLayout: 'default'}));
    log(figlet.textSync('scraper', {font: 'Sub-Zero', horizontalLayout: 'default'}));
    log(figlet.textSync('wantlist', {font: 'Sub-Zero', horizontalLayout: 'default'}));
    log();
    log('Recieve your discogs wantlist records in your telegram app, by Pol Escolar');
    log();
    log('Use this commands inside the bot (in Telegram):');
    log(' /ban - Give the seller name and ban his future notifications.');
    log(' /banlist - Get ban seller list.');
    log();
};

const configApp = async () => {
    welcomeMessage();
    await getDiscogsCredentials();
    await getTelegramCredentials();
    await getCronSchedule();
    await writeFileSync('./config.json', JSON.stringify(config.all));
};

export default configApp;
