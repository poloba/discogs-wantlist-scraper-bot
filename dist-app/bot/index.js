'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports['default'] = void 0;

var _telebot = _interopRequireDefault(require('telebot'));

var _config = require('../config');

var _constants = require('../config/constants');

var bot = new _telebot['default']({
    token: _config.config.get(_constants.telegramToken),
    allowedUpdates: [],
    usePlugins: ['askUser', 'commandButton'],
});
var _default = bot;
exports['default'] = _default;
