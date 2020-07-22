'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _database = _interopRequireDefault(require('../database'));

var router = _express['default'].Router();

router.get('/entries', function (req, res) {
    (0, _database['default'])({
        query: 'SELECT * FROM discogs WHERE telegram_message_pushed = 0',
        res: res,
    });
});
router.get('/entries/all', function (req, res) {
    (0, _database['default'])({
        query: 'SELECT * FROM discogs',
        res: res,
    });
});
router.post('/ban', function (req, res) {
    var seller = req.body.seller;

    if (!seller) {
        return res.status(400).send({
            error: true,
            message: 'Please provide a seller',
        });
    }

    (0, _database['default'])({
        query: 'INSERT INTO seller_blacklist (seller, entry_date) VALUES (?, now())',
        params: seller,
        res: res,
    });
});
router.get('/ban/list', function (req, res) {
    (0, _database['default'])({
        query: 'SELECT seller FROM seller_blacklist',
        res: res,
    });
});
router.post('/notification', function (req, res) {
    var id_discogs = req.body.id_discogs;

    if (!id_discogs) {
        return res.status(400).send({
            error: true,
            message: 'Please provide a id',
        });
    }

    (0, _database['default'])({
        query: 'UPDATE discogs SET telegram_message_pushed = 1 WHERE id_discogs = ?',
        params: id_discogs,
        res: res,
    });
});
router.post('/insert', function (req, res) {
    var _req$body = req.body,
        id_discogs = _req$body.id_discogs,
        artist = _req$body.artist,
        description = _req$body.description,
        price = _req$body.price,
        image = _req$body.image,
        url_release = _req$body.url_release,
        url_cart = _req$body.url_cart,
        url_details = _req$body.url_details,
        url_seller = _req$body.url_seller,
        seller = _req$body.seller,
        location = _req$body.location,
        condition_media = _req$body.condition_media,
        condition_sleeve = _req$body.condition_sleeve;

    if (!id_discogs) {
        return res.status(400).send({
            error: true,
            message: 'Please provide a id',
        });
    }

    (0, _database['default'])({
        query:
            'INSERT INTO discogs (\n            id_discogs,\n            artist,\n            description,\n            price,\n            image,\n            url_release,\n            url_cart,\n            url_details,\n            url_seller,\n            seller,\n            location,\n            condition_media,\n            condition_sleeve,\n            entry_date\n        ) SELECT * FROM (\n            SELECT\n                ? as id_discogs,\n                ? as artist,\n                ? as description,\n                ? as price,\n                ? as image,\n                ? as url_release,\n                ? as url_cart,\n                ? as url_details,\n                ? as url_seller,\n                ? as seller,\n                ? as location,\n                ? as condition_media,\n                ? as condition_sleeve,\n                now() as entry_date\n        ) AS tmp WHERE NOT EXISTS (\n            SELECT\n                id_discogs\n            FROM\n                discogs\n            WHERE\n                id_discogs = ?\n        )',
        params: [
            id_discogs,
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
            condition_sleeve,
            id_discogs,
        ],
        res: res,
    });
});
var _default = router;
exports['default'] = _default;
