'use strict';

const stylelint = require('stylelint');
const isCustomProperty = require('../../utils/isCustomProperty');
const namespace = require('../../utils/namespace');

const ruleName = namespace('custom-property-no-outside-root');
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: 'Unexpected custom property',
});

module.exports = stylelint.createPlugin(
  ruleName,
  function(actual) {
    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual});
      if (!validOptions) {
        return;
      }

      root.walkRules(rule => {
        // Ignore rules whose selector is just `:root`
        if (rule.selector.toLowerCase().trim() === ':root') {
          return;
        }

        rule.walkDecls(decl => {
          if (!isCustomProperty(decl.prop)) {
            return;
          }
          stylelint.utils.report({
            message: messages.rejected,
            node: decl,
            result,
            ruleName,
          });
        });
      });
    };
  }
);

module.exports.ruleName = ruleName;
module.exports.messages = messages;
