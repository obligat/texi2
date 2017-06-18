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
    wx.redirectTo({
      url: '/pages/workerLogin/workerLogin',
    })
  },
  onLoad: function () {
    console.log("index onload")
    //   var that = this
    //   //调用应用实例的方法获取全局数据
    //   app.getUserInfo(function (userInfo) {
    //     //更新数据
    //     that.setData({
    //       userInfo: userInfo
    //     })
    //   })
  }
})
