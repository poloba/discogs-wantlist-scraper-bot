'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _requestPromise = _interopRequireDefault(require('request-promise'));

var _child_process = require('child_process');

var _fs = require('fs');

var _utils = require('./utils');

var _api = require('./utils/api');

var _log = _interopRequireDefault(require('./utils/log'));

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

var execScrapy = function execScrapy() {
    (0, _log['default'])('[Scraper] 👮🏻‍♀️ Scrapy started');
    var scrapy = 'rm discogs.json; scrapy crawl discogs -o discogs.json'; //const scrapy = 'ls -la';

    var ex = (0, _child_process.exec)(
        scrapy,
        {
            maxBuffer: 1024 * 1200,
        },
        function (error) {
            if (error) throw error;
        }
    );
    return new Promise(function (resolve, reject) {
        ex.addListener('error', reject);
        ex.addListener('exit', resolve);
    });
};

var getBannedSellers = /*#__PURE__*/ (function () {
    var _ref = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
            var sellers, parsedSellersArray;
            return _regenerator['default'].wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            _context.next = 2;
                            return (0, _requestPromise['default'])((0, _api.get)('/ban/list'));

                        case 2:
                            sellers = _context.sent;
                            _context.next = 5;
                            return JSON.parse(sellers).map(function (s) {
                                return s.seller;
                            });

                        case 5:
                            parsedSellersArray = _context.sent;

                            if (!(parsedSellersArray.length === 0)) {
                                _context.next = 8;
                                break;
                            }

                            return _context.abrupt('return', []);

                        case 8:
                            return _context.abrupt('return', parsedSellersArray);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );

    return function getBannedSellers() {
        return _ref.apply(this, arguments);
    };
})();

var pushItem = /*#__PURE__*/ (function () {
    var _ref2 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee2(item) {
            var id_discogs,
                artist,
                description,
                price,
                image,
                url_release,
                url_cart,
                url_details,
                url_seller,
                seller,
                location,
                condition_media,
                condition_sleeve;
            return _regenerator['default'].wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            (id_discogs = item.id_discogs),
                                (artist = item.artist),
                                (description = item.description),
                                (price = item.price),
                                (image = item.image),
                                (url_release = item.url_release),
                                (url_cart = item.url_cart),
                                (url_details = item.url_details),
                                (url_seller = item.url_seller),
                                (seller = item.seller),
                                (location = item.location),
                                (condition_media = item.condition_media),
                                (condition_sleeve = item.condition_sleeve);
                            _context2.next = 3;
                            return (0, _requestPromise['default'])(
                                (0, _api.post)({
                                    path: '/insert',
                                    json: {
                                        id_discogs: id_discogs,
                                        artist: artist,
                                        description: description,
                                        price: price,
                                        image: image,
                                        url_release: url_release,
                                        url_cart: url_cart,
                                        url_details: url_details,
                                        url_seller: url_seller,
                                        seller: seller,
                                        location: location,
                                        condition_media: condition_media,
                                        condition_sleeve: condition_sleeve,
                                    },
                                })
                            );

                        case 3:
                            return _context2.abrupt(
                                'return',
                                (0, _log['default'])(
                                    '[Scraper] \uD83D\uDC4D\uD83C\uDFFB Inserted entry into DB: ['
                                        .concat(seller, '] ')
                                        .concat(artist)
                                )
                            );

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );

    return function pushItem(_x) {
        return _ref2.apply(this, arguments);
    };
})();

var pushScrapedData = /*#__PURE__*/ (function () {
    var _ref3 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee3() {
            var data, parsedDataArray, bannedSellers, _iterator, _step, parsedData;

            return _regenerator['default'].wrap(
                function _callee3$(_context3) {
                    while (1) {
                        switch ((_context3.prev = _context3.next)) {
                            case 0:
                                _context3.next = 2;
                                return (0, _fs.readFileSync)('./discogs.json', {
                                    encoding: 'utf8',
                                });

                            case 2:
                                data = _context3.sent;
                                _context3.next = 5;
                                return JSON.parse(data).map(function (item) {
                                    return item;
                                });

                            case 5:
                                parsedDataArray = _context3.sent;
                                _context3.next = 8;
                                return getBannedSellers();

                            case 8:
                                bannedSellers = _context3.sent;
                                _context3.next = 11;
                                return parsedDataArray.filter(function (val) {
                                    return !bannedSellers.includes(val.seller);
                                });

                            case 11:
                                parsedDataArray = _context3.sent;
                                _iterator = _createForOfIteratorHelper(parsedDataArray);
                                _context3.prev = 13;

                                _iterator.s();

                            case 15:
                                if ((_step = _iterator.n()).done) {
                                    _context3.next = 21;
                                    break;
                                }

                                parsedData = _step.value;
                                _context3.next = 19;
                                return pushItem(parsedData).then(_utils.delay.bind(null, 500));

                            case 19:
                                _context3.next = 15;
                                break;

                            case 21:
                                _context3.next = 26;
                                break;

                            case 23:
                                _context3.prev = 23;
                                _context3.t0 = _context3['catch'](13);

                                _iterator.e(_context3.t0);

                            case 26:
                                _context3.prev = 26;

                                _iterator.f();

                                return _context3.finish(26);

                            case 29:
                                return _context3.abrupt(
                                    'return',
                                    (0, _log['default'])('[Scraper] All data inserted into DB!')
                                );

                            case 30:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                },
                _callee3,
                null,
                [[13, 23, 26, 29]]
            );
        })
    );

    return function pushScrapedData() {
        return _ref3.apply(this, arguments);
    };
})();

var scraper = /*#__PURE__*/ (function () {
    var _ref4 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee4() {
            return _regenerator['default'].wrap(function _callee4$(_context4) {
                while (1) {
                    switch ((_context4.prev = _context4.next)) {
                        case 0:
                            _context4.next = 2;
                            return execScrapy();

                        case 2:
                            (0, _log['default'])('[Scraper] 💃 Scrapy finished correctly!');
                            _context4.next = 5;
                            return pushScrapedData();

                        case 5:
                            return _context4.abrupt('return', (0, _log['default'])('[Scraper] Finished :)'));

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4);
        })
    );

    return function scraper() {
        return _ref4.apply(this, arguments);
    };
})();

var _default = scraper;
exports['default'] = _default;
