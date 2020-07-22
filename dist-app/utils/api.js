'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.post = exports.get = void 0;
var API_URL = 'http://localhost:3333/discogs';
var headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Connection: 'keep-alive',
};

var get = function get(path) {
    return {
        url: API_URL + path,
        method: 'GET',
        headers: headers,
    };
};

exports.get = get;

var post = function post(_ref) {
    var path = _ref.path,
        json = _ref.json;
    return {
        url: API_URL + path,
        method: 'POST',
        headers: headers,
        pool: {
            maxSockets: 500,
        },
        gzip: true,
        json: json,
    };
};

exports.post = post;
