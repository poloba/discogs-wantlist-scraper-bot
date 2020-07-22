'use strict';

var _interopRequireWildcard3 = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _interopRequireWildcard2 = _interopRequireDefault(
    require('@babel/runtime/helpers/interopRequireWildcard')
);

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _httpErrors = _interopRequireDefault(require('http-errors'));

var _express = _interopRequireDefault(require('express'));

var _path = _interopRequireDefault(require('path'));

var _cookieParser = _interopRequireDefault(require('cookie-parser'));

var _morgan = _interopRequireDefault(require('morgan'));

var _nodeCron = _interopRequireDefault(require('node-cron'));

var _scraper = _interopRequireDefault(require('./scraper'));

var _config = _interopRequireWildcard3(require('./config'));

var _constants = require('./config/constants');

var _log = _interopRequireDefault(require('./utils/log'));

var _index = _interopRequireDefault(require('./routes/index'));

var _discogs = _interopRequireDefault(require('./routes/discogs'));

var app = (0, _express['default'])();
app.use((0, _morgan['default'])('dev'));
app.use(_express['default'].json());
app.use(
    _express['default'].urlencoded({
        extended: false,
    })
);
app.use((0, _cookieParser['default'])());
app.use(_express['default']['static'](_path['default'].join(__dirname, 'public')));
app.use('/', _index['default']);
app.use('/discogs', _discogs['default']);
app.use(function (req, res, next) {
    next((0, _httpErrors['default'])(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json('Error');
}); // Set the your user config and up the telegram bot to listen commands from chat

var init = /*#__PURE__*/ (function () {
    var _ref = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
            var bot;
            return _regenerator['default'].wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            _context.next = 2;
                            return (0, _config['default'])();

                        case 2:
                            _context.next = 4;
                            return Promise.resolve().then(function () {
                                return (0,
                                _interopRequireWildcard2['default'])(require('./bot/bot-listener'));
                            });

                        case 4:
                            bot = _context.sent;
                            return _context.abrupt('return', bot['default']());

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );

    return function init() {
        return _ref.apply(this, arguments);
    };
})(); // Scrap wantlist and push telegram message with new entries

var launch = /*#__PURE__*/ (function () {
    var _ref2 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee2() {
            var bot;
            return _regenerator['default'].wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            if (
                                !(
                                    !_config.config.get(_constants.discogsUsername) &&
                                    !_config.config.get(_constants.telegramToken)
                                )
                            ) {
                                _context2.next = 3;
                                break;
                            }

                            _context2.next = 3;
                            return init();

                        case 3:
                            _context2.next = 5;
                            return (0, _scraper['default'])();

                        case 5:
                            _context2.next = 7;
                            return Promise.resolve().then(function () {
                                return (0,
                                _interopRequireWildcard2['default'])(require('./bot/bot-wantlist'));
                            });

                        case 7:
                            bot = _context2.sent;
                            return _context2.abrupt('return', bot['default']());

                        case 9:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );

    return function launch() {
        return _ref2.apply(this, arguments);
    };
})();

var start = /*#__PURE__*/ (function () {
    var _ref3 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee3() {
            return _regenerator['default'].wrap(function _callee3$(_context3) {
                while (1) {
                    switch ((_context3.prev = _context3.next)) {
                        case 0:
                            _context3.next = 2;
                            return init();

                        case 2:
                            if (!_config.config.get(_constants.cronEnabled)) {
                                _context3.next = 5;
                                break;
                            }

                            (0, _log['default'])(
                                '[Cron] Enabled at ('.concat(_config.config.get(_constants.cronSchedule), ')')
                            );
                            return _context3.abrupt(
                                'return',
                                _nodeCron['default'].schedule(
                                    _config.config.get(_constants.cronSchedule),
                                    function () {
                                        return launch();
                                    }
                                )
                            );

                        case 5:
                            (0, _log['default'])('[Cron] Disabled, launching the app...');
                            return _context3.abrupt('return', launch());

                        case 7:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3);
        })
    );

    return function start() {
        return _ref3.apply(this, arguments);
    };
})();

start();
var _default = app;
exports['default'] = _default;
