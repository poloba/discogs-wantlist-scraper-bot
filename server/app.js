'use strict';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cron from 'node-cron';
import scraper from './scraper';
import configApp, {config} from './config';
import {cronSchedule, discogsUsername, telegramToken, cronEnabled} from './config/constants';
import log from './utils/log';

import indexRouter from './routes/index';
import indexDiscogs from './routes/discogs';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/discogs', indexDiscogs);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json('Error');
});

// Set the your user config and up the telegram bot to listen commands from chat
const init = async () => {
    await configApp();

    const bot = await import('./bot/bot-listener');
    return bot.default();
};

// Scrap wantlist and push telegram message with new entries
const launch = async () => {
    if (!config.get(discogsUsername) && !config.get(telegramToken)) {
        await init();
    }
    await scraper();

    const bot = await import('./bot/bot-wantlist');
    return bot.default();
};

const start = async () => {
    await init();

    if (config.get(cronEnabled)) {
        log(`[Cron] Enabled at (${config.get(cronSchedule)})`);
        return cron.schedule(config.get(cronSchedule), () => launch());
    }

    log(`[Cron] Disabled, launching the app...`);
    return launch();
};

start();

export default app;
