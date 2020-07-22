import mysql from 'mysql';

const config = {
    host: 'db',
    user: 'scrapy',
    password: 'scrapy',
    database: 'scrapy',
    connectionLimit: 15,
    acquireTimeout: 30000,
    waitForConnections: true,
    multipleStatements: true,
};

const pool = mysql.createPool(config);

const connect = ({query, params = '', res}) =>
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('Error connecting. Retrying in 1 sec...');
            console.log(err);
            setTimeout(connect, 1000);
        } else {
            connection.query(query, params, (error, results, fields) => {
                connection.release();
                if (error) {
                    console.log(error);
                } else {
                    res.json(results);
                }
            });
        }
    });

export default connect;
