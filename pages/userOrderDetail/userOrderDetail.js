// pages/userOrderDetail/userOrderDetail.js
Page({
  data: {
    order: {}
  },
  onLoad: function (options) {
    var formId = options.formId
    var that = this
    var order = {}
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getOrderBook',
      data: {
        formId: formId
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        var orders = res.data
        for (var i = 0; i < orders.length; i++) {
          if (formId == orders[i].formId) {
            order = orders[i]
          }
        }
        if (order.carDriver) {
          var arr = order.carDriver.split("*")
          var oCar = arr[0].split(" ")
          var oDriver = arr[1].split(" ")
          order.oCar = oCar
          order.oDriver = oDriver
        }
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