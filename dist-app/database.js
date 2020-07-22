'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports['default'] = void 0;

var _mysql = _interopRequireDefault(require('mysql'));

var config = {
    host: 'db',
    user: 'scrapy',
    password: 'scrapy',
    database: 'scrapy',
    connectionLimit: 15,
    acquireTimeout: 30000,
    waitForConnections: true,
    multipleStatements: true,
};

var pool = _mysql['default'].createPool(config);

var connect = function connect(_ref) {
    var query = _ref.query,
        _ref$params = _ref.params,
        params = _ref$params === void 0 ? '' : _ref$params,
        res = _ref.res;
    return pool.getConnection(function (err, connection) {
        if (err) {
            console.log('Error connecting. Retrying in 1 sec...');
            console.log(err);
            setTimeout(connect, 1000);
        } else {
            connection.query(query, params, function (error, results, fields) {
                connection.release();

                if (error) {
                    console.log(error);
                } else {
                    res.json(results);
                }
            });
        }
    });
};

var _default = connect;
exports['default'] = _default;
