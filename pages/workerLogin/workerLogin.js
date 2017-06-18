// /pages/workerLogin/workerLogin.js
const app = getApp()
Page({
  data: {

  },
  formSubmit(e) {
    console.log("***********workerLogin*******")
    console.log(e)
    var account = e.detail.value.account
    var password = e.detail.value.password
    this.setData({
      account,
      password
    })

    app.setUserType('manager')
    wx.switchTab({
      url: '../service/service',
    })

  },
  onLoad: function (options) {

  },
  onShow: function () {

  }
})