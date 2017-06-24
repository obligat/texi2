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

    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/User/login',
      data: {
        session_3rd: wx.getStorageSync("session_3rd"),
        user_id: '123',
        password: "567"
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
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