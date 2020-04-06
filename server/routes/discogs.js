import express from 'express';
import connect from '../database';

var router = express.Router();

router.get('/entries', (req, res) => {
    db.connect.query(
        'SELECT * FROM discogs WHERE notificationPushed = 0 AND sellerBlacklisted IS NULL',
        (error, results) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

router.post('/ban', (req, res) => {
    const seller = req.body.seller;

    if (!seller) {
        return res.status(400).send({error: true, message: 'Please provide a seller'});
    }

    connect.query(
        'UPDATE seller_blacklist SET matches = matches + 1 WHERE seller = ?',
        seller,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

router.post('/notification', (req, res) => {
    const {idItem} = req.body;

    if (!idItem) {
        return res.status(400).send({error: true, message: 'Please provide a idItem'});
    }

    connect.query('UPDATE discogs SET notificationPushed = 1 WHERE idItem = ?', idItem, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/insert', (req, res) => {
    const {
        idItem,
        artist,
        price,
        image,
        description,
        location,
        urlRelease,
        urlCart,
        urlDetails,
        conditionMedia,
        conditionSleeve,
        seller,
        sellerLink,
    } = req.body;

    if (!idItem) {
        return res.status(400).send({error: true, message: 'Please provide a idItem'});
    }

    connect.query(
        `INSERT INTO discogs (
            idItem,
            artist,
            price,
            image,
            description,
            location,
            urlRelease,
            urlCart,
            urlDetails,
            conditionMedia,
            conditionSleeve,
            seller,
            sellerLink,
            entryDate
        ) SELECT * FROM (
            SELECT
                ? as idItem,
                ? as artist,
                ? as price,
                ? as image,
                ? as description,
                ? as location,
                ? as urlRelease,
                ? as urlCart,
                ? as urlDetails,
                ? as conditionMedia,
                ? as conditionSleeve,
                ? as seller,
                ? as sellerLink,
                now() as entryDate
        ) AS tmp WHERE NOT EXISTS (
            SELECT
                idItem
            FROM
                discogs
            WHERE
                idItem = ?
        )
    `,
        [
            idItem,
            artist,
            price,
            image,
            description,
            location,
            urlRelease,
            urlCart,
            urlDetails,
            conditionMedia,
            conditionSleeve,
            seller,
            sellerLink,
            idItem,
        ],
        (error, results, fields) => {
            if (error) throw error;

            res.json(results);
        }
    );
});

export default router;
