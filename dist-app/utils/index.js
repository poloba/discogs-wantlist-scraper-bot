'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.delay = exports.toNum = exports.toStr = exports.toNumDate = void 0;

var toNumDate = function toNumDate(any) {
    return any.replace(/[[^0-9]]/, '').replace(/["']/g, '');
};

exports.toNumDate = toNumDate;

var toStr = function toStr(any) {
    if (any === 0) {
        return '0';
    }

    if (!any) {
        return '';
    }

    return String(any);
};

exports.toStr = toStr;

var toNum = function toNum(any) {
    return Number(any) || 0;
};

exports.toNum = toNum;

var delay = function delay(t, data) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, data), t);
    });
};

exports.delay = delay;
