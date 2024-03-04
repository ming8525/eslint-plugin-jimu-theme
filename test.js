const { parse } = require('acorn');

function isColorsFromThemeColors(code) {
    // 解析代码生成 AST
    const ast = parse(code, { ecmaVersion: 'latest' });

    let colorsVariable;
    let themeColorsVariable;

    // 遍历 AST，寻找 colors 和 theme.colors 变量的赋值
    ast.body.forEach(node => {
        if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(declaration => {
                if (declaration.id.name === 'colors' && declaration.init) {
                    colorsVariable = declaration.init.object.name;
                } else if (declaration.id.name === 'theme' && declaration.init) {
                    themeColorsVariable = declaration.init.name + '.colors';
                }
            });
        }
    });

    // 判断 colors 是否来自 theme.colors
    if (colorsVariable && themeColorsVariable && colorsVariable === themeColorsVariable) {
        return true;
    } else {
        return false;
    }
}

// 测试代码
const code = `
const colors = theme.colors;
const primary = colors.primary;
`;

console.log(isColorsFromThemeColors(code))