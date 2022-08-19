const path = require("path");
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addPostcssPlugins,
} = require("customize-cra");
const px2viewport = require("postcss-px-to-viewport");
const babelPlugins = fixBabelImports("import", {
  libraryName: "antd-mobile",
  style: "css",
});
const webpackAlias = addWebpackAlias({
  "@": path.resolve(__dirname, "src"),
  "@scss": path.resolve(__dirname, "src", "assets", "styles"),
});

const postcssPlugins = addPostcssPlugins([
  px2viewport({
    viewportWidth: 375,
  }),
]);

module.exports = override(babelPlugins, webpackAlias, postcssPlugins);
