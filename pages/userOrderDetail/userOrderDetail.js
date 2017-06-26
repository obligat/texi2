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
        console.log("********user order details *******")
        var orders = res.data
        console.log(orders)
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
        console.group("order detail")
        console.log(that.data.order)
        console.log(that.data.order.basePrice)
        console.groupEnd()
      },
      fail(res) {
        console.log(res)
      }
    })

    console.log(this.data)
    console.groupEnd()
  }
})