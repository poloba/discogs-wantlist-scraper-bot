import express from 'express';
import connect from '../database';

const router = express.Router();

// Provisional solution to CORS problems
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

router.get('/entries', (req, res) => {
    connect({
        query: 'SELECT * FROM discogs WHERE telegram_message_pushed = 0',
        res,
    });
});

router.get('/entries/all', (req, res) => {
    connect({
        query: 'SELECT * FROM discogs',
        res,
    });
});

router.post('/ban', (req, res) => {
    const {seller} = req.body;

    if (!seller) {
        return res.status(400).send({error: true, message: 'Please provide a seller'});
    }

    return connect({
        query: 'INSERT INTO seller_blacklist (seller, entry_date) VALUES (?, now())',
        params: seller,
        res,
    });
});

router.get('/ban/list', (req, res) => {
    connect({
        query: 'SELECT seller FROM seller_blacklist',
        res,
    });
});

router.post('/notification', (req, res) => {
    const {id_discogs} = req.body;

    if (!id_discogs) {
        return res.status(400).send({error: true, message: 'Please provide a id'});
    }

    return connect({
        query: 'UPDATE discogs SET telegram_message_pushed = 1 WHERE id_discogs = ?',
        params: id_discogs,
        res,
    });
});

router.post('/insert', (req, res) => {
    const {
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
    } = req.body;

    if (!id_discogs) {
        return res.status(400).send({error: true, message: 'Please provide a id'});
    }

    return connect({
        query: `INSERT INTO discogs (
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
            entry_date
        ) SELECT * FROM (
            SELECT
                ? as id_discogs,
                ? as artist,
                ? as description,
                ? as price,
                ? as image,
                ? as url_release,
                ? as url_cart,
                ? as url_details,
                ? as url_seller,
                ? as seller,
                ? as location,
                ? as condition_media,
                ? as condition_sleeve,
                now() as entry_date
        ) AS tmp WHERE NOT EXISTS (
            SELECT
                id_discogs
            FROM
                discogs
            WHERE
                id_discogs = ?
        )`,
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
        res,
    });
});

export default router;
