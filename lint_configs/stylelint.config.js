module.exports = {
    "rules": {
        /* 禁止空块 */
        "block-no-empty": true,
        /* 禁止无效十六进制颜色 */
        "color-no-invalid-hex": true,
        /* 禁止使用重复字体名称 */
        "font-family-no-duplicate-names": true,
        /* 禁止linear-gradient使用无效方向 */
        "function-linear-gradient-no-nonstandard-direction": true,
        /* 禁止数值尾拖零 */
        "number-no-trailing-zeros": true,
        /* 禁止当值为0时使用单位 */
        "length-zero-no-unit": true,
        /* 禁止使用！imoprtant */
        "declaration-no-important": true,
        /* 声明块中禁止使用重复属性 */
        "declaration-block-no-duplicate-properties": true,
        /* 声明块中禁止出现由于渲染等原因而被忽略的属性 */
        "declaration-block-no-shorthand-property-overrides": true,
        /* 单行块中最多只允许有一个属性 */
        "declaration-block-single-line-max-declarations": 1,
        /* 禁止使用id选择器 */
        "selector-max-id": 0,
        /* 类型选择器小写 */
        "selector-type-case": "lower",
        /* 禁止非复合类型选择器及非子类型选择器 */
        "selector-max-type": [0, {
            ignore: ["child", "compounded", "descendant", "next-sibling"]
        }],
        /* 禁止空注释块 */
        "comment-no-empty": true,
        /* 缩进4 */
        "indentation": 4,
        /* 限制最大连续空行1 */
        "max-empty-lines": 1,
        /* 限制最大嵌套深度5 */
        "max-nesting-depth": 5,
        /* 禁止优先级低的选择器出现在优先级高的选择器后 */
        "no-descending-specificity": true,
        /* 禁止出现重复选择器 */
        "no-duplicate-selectors": true,
        /* 禁止多余分号 */
        "no-extra-semicolons": true
    }
};