import Configstore from 'configstore';
import figlet from 'figlet';
import {readFileSync} from 'fs';
import {askDiscogsCredentials, askTelegramCredentials, askCronSchedule} from './inquirer';
import log from '../utils/log';

const configJson = readFileSync('./config.json', {encoding: 'utf8'});
const config = new Configstore(configJson.name);

const getDiscogsCredentials = async () => {
    let username = config.get('discogs.username');
    let password = config.get('discogs.password');

    if (username && password) {
        return {username, password};
    }

    const credentials = await askDiscogsCredentials();
    username = credentials.username;
    password = credentials.password;

    return {username, password};
};

const getTelegramCredentials = async () => {
    let token = config.get('telegram.token');
    let id = config.get('telegram.id');

    if (token && id) {
        return {token, id};
    }

    const credentials = await askTelegramCredentials();
    token = credentials.token;
    id = credentials.id;

    return {token, id};
};

const getCronSchedule = async () => {
    let schedule = config.get('cron.schedule');

    if (schedule) {
        return schedule;
    }

    const cron = await askCronSchedule();
    schedule = cron.schedule;

    return schedule;
};

const welcomeMessage = () => {
    log(figlet.textSync('discogs', {font: 'Sub-Zero', horizontalLayout: 'default'}));
    log(figlet.textSync('scraper', {font: 'Sub-Zero', horizontalLayout: 'default'}));
    log(figlet.textSync('wantlist', {font: 'Sub-Zero', horizontalLayout: 'default'}));
    log();
    log('Recieve your discogs wantlist records with telegram pushes by Pol Escolar');
    log();
};

const configApp = async () => {
    welcomeMessage();
    await getDiscogsCredentials();
    await getTelegramCredentials();
    await getCronSchedule();
};

export default configApp;
