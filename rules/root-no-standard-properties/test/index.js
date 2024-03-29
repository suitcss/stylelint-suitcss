'use strict';

const {ruleName, messages} = require('..');

testRule({
  plugins: ['./rules/root-no-standard-properties/index.js'],
  ruleName,
  config: [true],

  accept: [{
    code: ':root { --foo: 0; }',
  }, {
    code: ':rOoT { --foo: 0; }',
  }, {
    code: ':ROOT { --foo: 0; }',
  }, {
    code: 'a, :root { --foo: 0; }',
  }, {
    code: 'a { color: pink; } :root { --foo: 0; }',
  }, {
    code: ':root { $scss: 0; }',
  }, {
    code: ':root { @less: 0; }',
  }, {
    code: ':not(:root) { color: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: ':nOt(:root) { color: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: ':NOT(:root) { color: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: ':not(:rOoT) { color: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: ':not(:ROOT) { color: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: 'svg:not(:root) { color: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: 'a, :not(:root) { color: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: ':not(:root) { --foo: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: 'div, a:not(div a:root) { --foo: pink; }',
    description: 'negation pseudo-class',
  }, {
    code: ':root { --foo: { color: pink; }; }',
    description: 'custom property set',
  }, {
    code: ':root { a { color: pink; } }',
    description: 'nested rule',
  }],

  reject: [{
    code: ':root { top: 0; }',
    message: messages.rejected('top'),
    line: 1,
    column: 9,
  }, {
    code: ':rOoT { top: 0; }',
    message: messages.rejected('top'),
    line: 1,
    column: 9,
  }, {
    code: ':ROOT { top: 0; }',
    message: messages.rejected('top'),
    line: 1,
    column: 9,
  }, {
    code: ':root { -webkit-transform: scale(0); }',
    message: messages.rejected('-webkit-transform'),
    line: 1,
    column: 9,
  }, {
    code: 'a, :root { color: pink; }',
    message: messages.rejected('color'),
    line: 1,
    column: 12,
  }, {
    code: 'a { color: pink; } :root { margin: 0; }',
    message: messages.rejected('margin'),
    line: 1,
    column: 28,
  }, {
    code: ':root, :not(a) { color: pink; }',
    message: messages.rejected('color'),
    line: 1,
    column: 18,
  }, {
    code: ':rOoT, :nOt(a) { color: pink; }',
    message: messages.rejected('color'),
    line: 1,
    column: 18,
  }, {
    code: ':ROOT, :NOT(a) { color: pink; }',
    message: messages.rejected('color'),
    line: 1,
    column: 18,
  }, {
    code: ':root:not(a) { color: pink; }',
    message: messages.rejected('color'),
    line: 1,
    column: 16,
  }, {
    code: '.foo, :root, .bar:not(:hover) { color: pink; }',
    message: messages.rejected('color'),
    line: 1,
    column: 33,
  }],
});
