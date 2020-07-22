'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports[
    'default'
] = exports.resetConfig = exports.getLaunchType = exports.getCronSchedule = exports.getTelegramCredentials = exports.getDiscogsCredentials = exports.config = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _configstore = _interopRequireDefault(require('configstore'));

var _figlet = _interopRequireDefault(require('figlet'));

var _fs = require('fs');

var _inquirer = require('./inquirer');

var _log = _interopRequireDefault(require('../utils/log'));

var _constants = require('./constants');

var configJson = (0, _fs.readFileSync)('./config.json', {
    encoding: 'utf8',
});
var config = new _configstore['default'](configJson.name);
exports.config = config;

var getDiscogsCredentials = /*#__PURE__*/ (function () {
    var _ref = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
            var username, password, credentials;
            return _regenerator['default'].wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            username = config.get(_constants.discogsUsername);
                            password = config.get(_constants.discogsPassword);

                            if (!(username && password)) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt('return', {
                                username: username,
                                password: password,
                            });

                        case 4:
                            _context.next = 6;
                            return (0, _inquirer.askDiscogsCredentials)();

                        case 6:
                            credentials = _context.sent;
                            username = config.set(_constants.discogsUsername, credentials.username);
                            password = config.set(_constants.discogsPassword, credentials.password);
                            return _context.abrupt('return', {
                                username: username,
                                password: password,
                            });

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );

    return function getDiscogsCredentials() {
        return _ref.apply(this, arguments);
    };
})();

exports.getDiscogsCredentials = getDiscogsCredentials;

var getTelegramCredentials = /*#__PURE__*/ (function () {
    var _ref2 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee2() {
            var token, id, credentials;
            return _regenerator['default'].wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            token = config.get(_constants.telegramToken);
                            id = config.get(_constants.telegramId);

                            if (!(token && id)) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt('return', {
                                token: token,
                                id: id,
                            });

                        case 4:
                            _context2.next = 6;
                            return (0, _inquirer.askTelegramCredentials)();

                        case 6:
                            credentials = _context2.sent;
                            token = config.set(_constants.telegramToken, credentials.token);
                            id = config.set(_constants.telegramId, credentials.id);
                            return _context2.abrupt('return', {
                                token: token,
                                id: id,
                            });

                        case 10:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );

    return function getTelegramCredentials() {
        return _ref2.apply(this, arguments);
    };
})();

exports.getTelegramCredentials = getTelegramCredentials;

var getCronSchedule = /*#__PURE__*/ (function () {
    var _ref3 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee3() {
            var schedule, cron;
            return _regenerator['default'].wrap(function _callee3$(_context3) {
                while (1) {
                    switch ((_context3.prev = _context3.next)) {
                        case 0:
                            schedule = config.get(_constants.cronSchedule);

                            if (!schedule) {
                                _context3.next = 3;
                                break;
                            }

                            return _context3.abrupt('return', schedule);

                        case 3:
                            _context3.next = 5;
                            return (0, _inquirer.askCronSchedule)();

                        case 5:
                            cron = _context3.sent;
                            schedule = config.set(_constants.cronSchedule, cron.schedule);
                            return _context3.abrupt('return', schedule);

                        case 8:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3);
        })
    );

    return function getCronSchedule() {
        return _ref3.apply(this, arguments);
    };
})();

exports.getCronSchedule = getCronSchedule;

var getLaunchType = /*#__PURE__*/ (function () {
    var _ref4 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee4() {
            var type, launchType;
            return _regenerator['default'].wrap(function _callee4$(_context4) {
                while (1) {
                    switch ((_context4.prev = _context4.next)) {
                        case 0:
                            type = config.get(_constants.cronEnabled);
                            _context4.next = 3;
                            return (0, _inquirer.askLaunchType)();

                        case 3:
                            launchType = _context4.sent;
                            type = config.set(_constants.cronEnabled, launchType.enabled);
                            return _context4.abrupt('return', type);

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4);
        })
    );

    return function getLaunchType() {
        return _ref4.apply(this, arguments);
    };
})();

exports.getLaunchType = getLaunchType;

var resetConfig = /*#__PURE__*/ (function () {
    var _ref5 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee5() {
            var ask;
            return _regenerator['default'].wrap(function _callee5$(_context5) {
                while (1) {
                    switch ((_context5.prev = _context5.next)) {
                        case 0:
                            if (
                                !(
                                    config.get(_constants.telegramToken) &&
                                    config.get(_constants.discogsUsername)
                                )
                            ) {
                                _context5.next = 7;
                                break;
                            }

                            _context5.next = 3;
                            return (0, _inquirer.askResetConfig)();

                        case 3:
                            ask = _context5.sent;

                            if (!(ask.reset === true)) {
                                _context5.next = 6;
                                break;
                            }

                            return _context5.abrupt('return', config.clear());

                        case 6:
                            return _context5.abrupt('return', null);

                        case 7:
                            return _context5.abrupt('return', null);

                        case 8:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5);
        })
    );

    return function resetConfig() {
        return _ref5.apply(this, arguments);
    };
})();

exports.resetConfig = resetConfig;

var welcomeMessage = function welcomeMessage() {
    (0, _log['default'])(
        _figlet['default'].textSync('discogs', {
            font: 'Sub-Zero',
            horizontalLayout: 'default',
        })
    );
    (0, _log['default'])(
        _figlet['default'].textSync('scraper', {
            font: 'Sub-Zero',
            horizontalLayout: 'default',
        })
    );
    (0, _log['default'])(
        _figlet['default'].textSync('wantlist', {
            font: 'Sub-Zero',
            horizontalLayout: 'default',
        })
    );
    (0, _log['default'])();
    (0, _log['default'])('Recieve your discogs wantlist records in your telegram app, by Pol Escolar');
    (0, _log['default'])();
    (0, _log['default'])('Use this commands inside the bot (in Telegram):');
    (0, _log['default'])(' /ban - Give the seller name and ban his future notifications.');
    (0, _log['default'])(' /banlist - Get ban seller list.');
    (0, _log['default'])();
};

var configApp = /*#__PURE__*/ (function () {
    var _ref6 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee6() {
            return _regenerator['default'].wrap(function _callee6$(_context6) {
                while (1) {
                    switch ((_context6.prev = _context6.next)) {
                        case 0:
                            welcomeMessage();
                            _context6.next = 3;
                            return resetConfig();

                        case 3:
                            _context6.next = 5;
                            return getDiscogsCredentials();

                        case 5:
                            _context6.next = 7;
                            return getTelegramCredentials();

                        case 7:
                            _context6.next = 9;
                            return getCronSchedule();

                        case 9:
                            _context6.next = 11;
                            return getLaunchType();

                        case 11:
                            _context6.next = 13;
                            return (0, _fs.writeFileSync)(
                                './config.json',
                                JSON.stringify(config.all, null, 4)
                            );

                        case 13:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6);
        })
    );

    return function configApp() {
        return _ref6.apply(this, arguments);
    };
})();

var _default = configApp;
exports['default'] = _default;
