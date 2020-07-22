'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.askResetConfig = exports.askLaunchType = exports.askCronSchedule = exports.askTelegramCredentials = exports.askDiscogsCredentials = void 0;

var _inquirer = _interopRequireDefault(require('inquirer'));

var _index = require('./index');

var _constants = require('./constants');

var askDiscogsCredentials = function askDiscogsCredentials() {
    var questions = [
        {
            name: 'username',
            type: 'input',
            message: 'Enter your Discogs username:',
            validate: function validate(value) {
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
            validate: function validate(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your Discogs password.';
                }
            },
        },
    ];
    return _inquirer['default'].prompt(questions);
};

exports.askDiscogsCredentials = askDiscogsCredentials;

var askTelegramCredentials = function askTelegramCredentials() {
    var questions = [
        {
            name: 'token',
            type: 'input',
            message: 'Enter your bot Telegram token:',
            validate: function validate(value) {
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
            validate: function validate(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your Telegram channel or group ID.';
                }
            },
        },
    ];
    return _inquirer['default'].prompt(questions);
};

exports.askTelegramCredentials = askTelegramCredentials;

var askCronSchedule = function askCronSchedule() {
    return _inquirer['default'].prompt({
        name: 'schedule',
        type: 'input',
        message: 'Enter your cron schedule (* * * * *):',
        default: '47 07-23,00-01 * * *',
        validate: function validate(value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your cron schedule (* * * * *).';
            }
        },
    });
};

exports.askCronSchedule = askCronSchedule;

var askLaunchType = function askLaunchType() {
    return _inquirer['default'].prompt({
        name: 'enabled',
        type: 'list',
        message: 'Do you want to skip the cronjob to start now the app?',
        choices: [
            {
                name: 'Yes',
                value: false,
            },
            {
                name: 'No',
                value: true,
            },
        ],
        default: ['No'],
    });
};

exports.askLaunchType = askLaunchType;

var askResetConfig = function askResetConfig() {
    return _inquirer['default'].prompt({
        name: 'reset',
        type: 'list',
        message: ''.concat(
            JSON.stringify(_index.config.all, null, 4),
            '\n You have an existing config, did you want to reset and set a new config?'
        ),
        choices: [
            {
                name: 'Yes',
                value: true,
            },
            {
                name: 'No',
                value: false,
            },
        ],
    });
};

exports.askResetConfig = askResetConfig;
