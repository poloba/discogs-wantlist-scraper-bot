'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports['default'] = void 0;

var _chalk = _interopRequireDefault(require('chalk'));

var color = _chalk['default'].rgb(255, 216, 91);

var log = function log() {
    var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return console.log(color(string));
};

var _default = log;
exports['default'] = _default;
