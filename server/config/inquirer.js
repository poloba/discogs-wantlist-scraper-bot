import inquirer from 'inquirer';
import {config} from './index';

export const askDiscogsCredentials = () => {
    const questions = [
        {
            name: 'username',
            type: 'input',
            message: 'Enter your Discogs username:',
            validate: (value) => {
                if (value.length) {
                    return true;
                }
                return 'Please enter your username.';
            },
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your Discogs password:',
            validate: (value) => {
                if (value.length) {
                    return true;
                }
                return 'Please enter your Discogs password.';
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
                }
                return 'Please enter your bot Telegram token.';
            },
        },
        {
            name: 'id',
            type: 'input',
            message: 'Enter your Telegram channel or group ID where you will receive the pushes:',
            validate: (value) => {
                if (value.length) {
                    return true;
                }
                return 'Please enter your Telegram channel or group ID.';
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
        default: '47 07-23,00-01 * * *',
        validate: (value) => {
            if (value.length) {
                return true;
            }
            return 'Please enter your cron schedule (* * * * *).';
        },
    });
};

export const askLaunchType = () => {
    return inquirer.prompt({
        name: 'enabled',
        type: 'list',
        message: 'Do you want to skip the cronjob to start now the app?',
        choices: [
            {name: 'No', value: true},
            {name: 'Yes', value: false},
        ],
    });
};

export const askResetConfig = () => {
    return inquirer.prompt({
        name: 'reset',
        type: 'list',
        message: `${JSON.stringify(
            config.all,
            null,
            4
        )}\n You have an existing config, did you want to reset and set a new config?`,
        choices: [
            {name: 'No', value: false},
            {name: 'Yes', value: true},
        ],
    });
};
