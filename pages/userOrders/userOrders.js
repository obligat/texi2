// pages/userOrders/userOrders.js
Page({
  data: {
    orderCommited: [],
    orderDispatched: [],
    orderFinished: []
  },
  onLoad: function (options) {
    console.log(options)
    var pageList = getCurrentPages()
    console.log(pageList)
    var orderCommited = this.data.orderCommited
    var orderDispatched = this.data.orderDispatched
    var orderFinished = this.data.orderFinished
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getOrderBook',
      success(res) {
        console.log("***********user orders onload *******")
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].orderType == '已提交') {
            orderCommited.push(res.data[i])
          }
          if (res.data[i].orderType == '已派单') {
            orderDispatched.push(res.data[i])
          }
          if (res.data[i].orderType == '已完成') {
            orderFinished.push(res.data[i])
          }
        }
        orderCommited = orderCommited.reverse()
        orderDispatched = orderDispatched.reverse()
        orderFinished = orderFinished.reverse()
        that.setData({
          orderCommited,
          orderDispatched,
          orderFinished
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },

})