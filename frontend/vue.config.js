const { defineConfig } = require("@vue/cli-service");
const API_URL = "http://rails:3000";

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // target: process.env.RAILS_API_URL,
        target: API_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
