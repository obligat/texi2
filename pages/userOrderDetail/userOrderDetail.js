// pages/userOrderDetail/userOrderDetail.js
Page({
  data: {
    order: {}
  },

  onLoad: function (options) {
    var formId = options.formId
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Driver/findOrderBook',
      data: {
        formId: formId
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        var order = res.data[0]
        console.log("********user order details *******")
        console.log(order)
        that.setData({
          order
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})