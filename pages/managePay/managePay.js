// pages/managePay/managePay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  confirmOrder() {
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getPrice',
      data: {
        formId: "201706241252",
        basePrice: 1200.00,
        extraPrice: 0.00
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {

        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getTime',
      data: {
        formId: "201706241252"
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log("********* get time ***********")
        console.log(res)

      },
      fail(res) {
        console.log(res)
      }
    })
  }
})