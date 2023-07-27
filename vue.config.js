/*
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:16
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-07-27 09:03:56
 * @FilePath     : \h5-auto\vue.config.js
 * @Description  : 
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  devServer: {
    client: {
      overlay: false
    }
  }
})
