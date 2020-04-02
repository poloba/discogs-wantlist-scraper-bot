import express from 'express';

var router = express.Router();

router.get('/', (req, res, next) => {
    res.json('Hiiio');
});

export default router;
