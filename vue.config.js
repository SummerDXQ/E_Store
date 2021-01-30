module.exports = {
  lintOnSave:false,
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // cross origin
      "/api": {
        target: "https://fakestoreapi.com/",
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};


