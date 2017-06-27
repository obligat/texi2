// pages/userOrders/userOrders.js
var app = getApp()
Page({
  data: {
    orderCommited: [],
    orderDispatched: [],
    orderFinished: []
  },
  onLoad: function (options) {
    var openId = wx.getStorageSync("openId")
    var orderCommited = this.data.orderCommited
    var orderDispatched = this.data.orderDispatched
    var orderFinished = this.data.orderFinished
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getOrderBook',
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].orderType == '已提交' && res.data[i].open_id == openId) {
            orderCommited.push(res.data[i])
          }
          if (res.data[i].orderType == '已派单' && res.data[i].open_id == openId) {
            orderDispatched.push(res.data[i])
          }
          if (res.data[i].orderType == '已完成' && res.data[i].open_id == openId) {
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