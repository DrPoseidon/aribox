const path = require('path');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Components: path.resolve(__dirname, 'src/components'),
        Views: path.resolve(__dirname, 'src/views'),
        Assets: path.resolve(__dirname, 'src/assets'),
        Router: path.resolve(__dirname, 'src/router'),
        Store: path.resolve(__dirname, 'src/store')
      }
    },
  }
};
