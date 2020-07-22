'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _index = _interopRequireDefault(require('./index'));

var _requestPromise = _interopRequireDefault(require('request-promise'));

var _utils = require('../utils');

var _api = require('../utils/api');

var _log = _interopRequireDefault(require('../utils/log'));

var _config = require('../config');

var _constants = require('../config/constants');

function _createForOfIteratorHelper(o) {
    if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {done: true};
                    return {done: false, value: o[i++]};
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F,
            };
        }
        throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
    }
    var it,
        normalCompletion = true,
        didErr = false,
        err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it['return'] != null) it['return']();
            } finally {
                if (didErr) throw err;
            }
        },
    };
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(n);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

var botMessage = /*#__PURE__*/ (function () {
    var _ref = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee(item) {
            var id_discogs,
                artist,
                description,
                price,
                url_details,
                seller,
                location,
                condition_media,
                condition_sleeve;
            return _regenerator['default'].wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            (id_discogs = item.id_discogs),
                                (artist = item.artist),
                                (description = item.description),
                                (price = item.price),
                                (url_details = item.url_details),
                                (seller = item.seller),
                                (location = item.location),
                                (condition_media = item.condition_media),
                                (condition_sleeve = item.condition_sleeve);
                            _context.next = 3;
                            return _index['default']
                                .sendMessage(
                                    _config.config.get(_constants.telegramId),
                                    '<b>'
                                        .concat(artist, '</b>\n\uD83D\uDCC1 ')
                                        .concat(condition_media, '  \uD83D\uDCBF ')
                                        .concat(condition_sleeve, '\n<i>')
                                        .concat(description, '</i>\n<b>')
                                        .concat(price, '</b>    \uD83D\uDCE6  ')
                                        .concat(location, '  \uD83D\uDEAA ')
                                        .concat(seller, '\n\n<a href="https://www.discogs.com')
                                        .concat(url_details, '">\uD83D\uDCCE Ver m\xE1s detalles:</a>'),
                                    {
                                        parseMode: 'HTML',
                                    }
                                )
                                .then(function () {})
                                ['catch'](function (err) {
                                    return console.log(err);
                                });

                        case 3:
                            _context.next = 5;
                            return (0, _requestPromise['default'])(
                                (0, _api.post)({
                                    path: '/notification',
                                    json: {
                                        id_discogs: id_discogs,
                                    },
                                })
                            );

                        case 5:
                            return _context.abrupt(
                                'return',
                                (0, _log['default'])(
                                    '[Bot] Message sent to telegram: ['.concat(seller, '] ').concat(artist)
                                )
                            );

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );

    return function botMessage(_x) {
        return _ref.apply(this, arguments);
    };
})();

var pushMessages = /*#__PURE__*/ (function () {
    var _ref2 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee2() {
            var data, parsedDataArray, _iterator, _step, parsedData;

            return _regenerator['default'].wrap(
                function _callee2$(_context2) {
                    while (1) {
                        switch ((_context2.prev = _context2.next)) {
                            case 0:
                                _context2.next = 2;
                                return (0, _requestPromise['default'])((0, _api.get)('/entries'));

                            case 2:
                                data = _context2.sent;
                                _context2.next = 5;
                                return JSON.parse(data).map(function (item) {
                                    return item;
                                });

                            case 5:
                                parsedDataArray = _context2.sent;

                                if (!(parsedDataArray.length === 0)) {
                                    _context2.next = 8;
                                    break;
                                }

                                return _context2.abrupt(
                                    'return',
                                    (0, _log['default'])('[Bot] No new entries :(')
                                );

                            case 8:
                                _iterator = _createForOfIteratorHelper(parsedDataArray);
                                _context2.prev = 9;

                                _iterator.s();

                            case 11:
                                if ((_step = _iterator.n()).done) {
                                    _context2.next = 17;
                                    break;
                                }

                                parsedData = _step.value;
                                _context2.next = 15;
                                return botMessage(parsedData).then(_utils.delay.bind(null, 500));

                            case 15:
                                _context2.next = 11;
                                break;

                            case 17:
                                _context2.next = 22;
                                break;

                            case 19:
                                _context2.prev = 19;
                                _context2.t0 = _context2['catch'](9);

                                _iterator.e(_context2.t0);

                            case 22:
                                _context2.prev = 22;

                                _iterator.f();

                                return _context2.finish(22);

                            case 25:
                                return _context2.abrupt(
                                    'return',
                                    (0, _log['default'])('[Bot] All messages sent to Telegram :)')
                                );

                            case 26:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                },
                _callee2,
                null,
                [[9, 19, 22, 25]]
            );
        })
    );

    return function pushMessages() {
        return _ref2.apply(this, arguments);
    };
})();

var botWantlist = /*#__PURE__*/ (function () {
    var _ref3 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee3() {
            return _regenerator['default'].wrap(function _callee3$(_context3) {
                while (1) {
                    switch ((_context3.prev = _context3.next)) {
                        case 0:
                            (0, _log['default'])('[Bot] 👮🏻‍♀️ Started, searching new entries...');
                            _context3.next = 3;
                            return pushMessages();

                        case 3:
                            return _context3.abrupt('return', (0, _log['default'])('[Bot] Finished :)'));

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3);
        })
    );

    return function botWantlist() {
        return _ref3.apply(this, arguments);
    };
})();

var _default = botWantlist;
exports['default'] = _default;
