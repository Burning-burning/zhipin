const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "@brand-primary": "#1cae82", // 正常
      "@brand-primary-tap": "#1DA57A", // 按下
    },
    }),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true,
    }),
);