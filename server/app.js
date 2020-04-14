'use strict';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cron from 'node-cron';
import scraper from './scraper';
import botNewEntries from './bot/bot-new-entries';
import botInteraction from './bot/bot-interaction';

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

// Up the telegram bot to listen commands from chat
botInteraction();

// Scrap and push the new entries
const start = async () => {
    await scraper();
    await botNewEntries();
};

// Set a cron to scraper
cron.schedule('45 07-23,00-01 * * *', () => {
    start();
});

export default app;
