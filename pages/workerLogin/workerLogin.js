// /pages/workerLogin/workerLogin.js
const app = getApp()
var util = require('../../utils/util')
Page({
  data: {
    account: '',
    password: ''
  },

  handleRegister() {
    wx.navigateTo({
      url: '../workerRegister/workerRegister',
    })
  },

  formSubmit(e) {
    var that = this
    var account = e.detail.value.account
    var password = e.detail.value.password
    var session_3rd = wx.getStorageSync("session_3rd")
    this.setData({
      account,
      password
    })
    if (session_3rd) {
      this.requestLogin(account, password, session_3rd)
    } else {
      util.getSessionAndOpenId()
      wx.getStorage({
        key: 'session_3rd',
        success: function (res) {
          that.requestLogin(account, password, session_3rd)
        },
      })
    }
  },
  onLoad: function (options) {
    new app.WeToast()
  },
  requestLogin(account, password, session_3rd) {
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/User/login',
      data: {
        session_3rd: session_3rd,
        user_id: account,
        password: password
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        var userType = res.data.res
        that.wetoast.toast({
          title: res.data.res
        })
        if (userType == 'driver' || userType == 'manager') {
          app.setUserType(userType)
          var userInfo = {
            account,
            password,
            userType
          }
          wx.setStorageSync("userInfo", userInfo)
          wx.switchTab({
            url: '../service/service',
          })
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})