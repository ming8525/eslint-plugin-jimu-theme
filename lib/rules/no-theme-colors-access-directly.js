/**
 * @fileoverview This rule is disallow directly access theme.colors in variable assignment.
 * @author ming8525
 */
"use strict";

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow directly access theme.colors in variable assignment',
            recommended: false,
        },
        schema: [],
    },

    create(context) {
        return {
            VariableDeclarator(node) {
                // Check if it's a VariableDeclarator
                if (node.init && node.init.type === 'MemberExpression') {
                    const objectName = node.init.object.name;
                    const propertyName = node.init.property.name;

                    // Check if the object being assigned is theme.colors
                    if (objectName === 'theme' && propertyName === 'colors') {
                        // Ensure there's no property access after theme.colors
                        if (!node.init.computed) {
                            // Report the issue
                            context.report({
                                node,
                                message: `Do not directly access theme.colors in variable assignment.`,
                            });
                        }
                    }
                }
            },
        };
    },
};