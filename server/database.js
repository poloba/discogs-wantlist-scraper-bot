import mysql from 'mysql';
import {log} from './utils/log';

const config = {
    host: 'localhost',
    user: 'scrapy',
    password: 'scr(scr)',
    database: 'scrapy',
};

const connect = mysql.createConnection(config);

connect.connect((err) => {
    if (err) {
        log(`Error when connecting to db: ${err}`);
    }
    log('Connected to database');
});

export default connect;
