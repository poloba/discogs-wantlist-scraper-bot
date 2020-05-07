import inquirer from 'inquirer';
import {config} from './index';
import {cronSchedule} from './constants';

export const askDiscogsCredentials = () => {
    const questions = [
        {
            name: 'username',
            type: 'input',
            message: 'Enter your Discogs username:',
            validate: (value) => {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username.';
                }
            },
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your Discogs password:',
            validate: (value) => {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your Discogs password.';
                }
            },
        },
    ];
    return inquirer.prompt(questions);
};

export const askTelegramCredentials = () => {
    const questions = [
        {
            name: 'token',
            type: 'input',
            message: 'Enter your bot Telegram token:',
            validate: (value) => {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your bot Telegram token.';
                }
            },
        },
        {
            name: 'id',
            type: 'input',
            message: 'Enter your Telegram channel or group ID where you will receive the pushes:',
            validate: (value) => {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your Telegram channel or group ID.';
                }
            },
        },
    ];
    return inquirer.prompt(questions);
};

export const askCronSchedule = () => {
    return inquirer.prompt({
        name: 'schedule',
        type: 'input',
        message: 'Enter your cron schedule (* * * * *):',
        default: config.get(cronSchedule),
        validate: (value) => {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your cron schedule (* * * * *).';
            }
        },
    });
};
