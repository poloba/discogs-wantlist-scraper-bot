'use strict';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cron from 'node-cron';
import scraper from './scraper';
import configApp, {config} from './config';
import {cronSchedule} from './config/constants';
import botWantlist from './bot/bot-wantlist';
import botListener from './bot/bot-listener';

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
const initApp = async () => {
    await configApp();
    await botListener();
};
initApp();

// Scrap wantlist and push telegram message with new entries
const launch = async () => {
    await scraper();
    await botWantlist();
};

// Cron for the app
cron.schedule(config.get(cronSchedule), () => {
    launch();
});

export default app;
