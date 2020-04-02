import mysql from 'mysql';

const config = {
    host: 'localhost',
    user: 'scrapy',
    password: 'scr(scr)',
};

export const connect = mysql.createConnection(config);

connect.query('USE scrapy');

connect((err) => {
    if (err) {
        console.log('Error when connecting to db: ', err);
    }
    console.log('Connected as ID ' + connect.threadId);
});
