// pages/usercenter/usercenter.js
var app = getApp()
Page({

  data: {
    userInfo: {},
    userType: '',
  },
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    var userType = app.globalData.userType
    this.setData({
      userType
    })
  }
})