'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports['default'] = void 0;

var _index = _interopRequireDefault(require('./index'));

var _requestPromise = _interopRequireDefault(require('request-promise'));

var _api = require('../utils/api');

var botListener = function botListener() {
    _index['default'].on('/ban', function (msg) {
        return _index['default'].sendMessage(msg.from.id, 'Tell me the seller that you want to block', {
            ask: 'ban',
        });
    });

    _index['default'].on('ask.ban', function (msg) {
        var id = msg.from.id;
        var seller = msg.text;

        if (seller === '' || seller === undefined) {
            return _index['default'].sendMessage(id, 'Please provide a seller to block', {
                ask: 'ban',
            });
        }

        (0, _requestPromise['default'])(
            (0, _api.post)({
                path: '/ban',
                json: {
                    seller: seller,
                },
            })
        )
            .then(function () {
                return _index['default'].sendMessage(
                    id,
                    'Awesome, <b>'.concat(seller, '</b> seller blocked!'),
                    {
                        parseMode: 'HTML',
                    }
                );
            })
            ['catch'](function (err) {
                return console.log(err);
            });
    });

    _index['default'].on('/banlist', function (msg) {
        var id = msg.from.id;
        (0, _requestPromise['default'])((0, _api.get)('/ban/list'))
            .then(function (body) {
                var sellers = JSON.parse(body);
                return _index['default'].sendMessage(
                    id,
                    '<b>Sellers blocked:</b>\n '.concat(
                        sellers.map(function (s) {
                            return s.seller;
                        })
                    ),
                    {
                        parseMode: 'HTML',
                    }
                );
            })
            ['catch'](function (err) {
                return console.log(err);
            });
    });

    _index['default'].start();
};

var _default = botListener;
exports['default'] = _default;
