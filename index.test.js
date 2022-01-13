'use strict';

const find = require('lodash.find');
const rule = require('./');

test('root-no-standard-properties should exist', () => {
  expect(find(rule, {ruleName: 'suitcss/root-no-standard-properties'})).toBeTruthy();
});

test('selector-root-no-composition should exist', () => {
  expect(find(rule, {ruleName: 'suitcss/selector-root-no-composition'})).toBeTruthy();
});

test('custom-property-no-outside-root should exist', () => {
  expect(find(rule, {ruleName: 'suitcss/custom-property-no-outside-root'})).toBeTruthy();
});
