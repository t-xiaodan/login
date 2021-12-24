module.exports = {
  devServer: {
    port: 8083,
    proxy: {
      "^[/api|/imageonline|/fileserve|/preweb]": {
        target: "http://127.0.0.1:8896"
      }
    }
  },
  lintOnSave: false
}
