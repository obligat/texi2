// pages/usercenter/usercenter.js
var app = getApp()
Page({

  data: {
    userInfo: {},
  },
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  }
})