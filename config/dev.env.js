'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const MOCK = process.env.mock;

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MOCK
});
