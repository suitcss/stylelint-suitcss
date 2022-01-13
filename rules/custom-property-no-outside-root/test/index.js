'use strict';

const {ruleName, messages} = require('..');

testRule({
  plugins: ['./rules/custom-property-no-outside-root/index.js'],
  ruleName,
  config: [true],

  accept: [{
    code: ':root { --foo-bar: 1px; }',
  }, {
    code: ':rOoT { --foo-bar: 1px; }',
  }, {
    code: ':ROOT { --foo-bar: 1px; }',
  }, {
    code: 'a { color: pink; }',
  }, {
    code: 'a { -webkit-transform: 1px; }',
  }],

  reject: [{
    code: 'a { --foo-bar: 1px; }',
    message: messages.rejected,
  }, {
    code: 'a { color: pink; -webkit-transform: 1px; --foo-bar: 1px; }',
    message: messages.rejected,
  }, {
    code: ':root, a { --foo-bar: 1px; }',
    message: messages.rejected,
  }, {
    code: ':root a { --foo-bar: 1px; }',
    message: messages.rejected,
  }, {
    code: ':rOoT a { --foo-bar: 1px; }',
    message: messages.rejected,
  }, {
    code: ':ROOT a { --foo-bar: 1px; }',
    message: messages.rejected,
  }],
});
