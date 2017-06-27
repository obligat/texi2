// pages/usercenter/usercenter.js
var app = getApp()
Page({

  data: {
    userInfo: {},
    userType: '',
  },
  logout() {
    wx.clearStorageSync()
    wx.showToast({
      title: '已清除状态',
    })
    setTimeout(function () {
      wx.redirectTo({
        url: '../index/index',
      })
    }, 500)
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