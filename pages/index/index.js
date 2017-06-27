//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  bindUserLogin() {
    app.setUserType("user")
    wx.switchTab({
      url: '/pages/service/service',
    })

  },
  bindWorkerLogin() {
    wx.navigateTo({
      url: '/pages/workerLogin/workerLogin',
    })
  },
  onLoad: function () {
  }
})
