// /pages/workerLogin/workerLogin.js
const app = getApp()
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
    console.log("***********workerLogin*******")
    console.log(e)
    var account = e.detail.value.account
    var password = e.detail.value.password
    this.setData({
      account,
      password
    })
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/User/login',
      data: {
        session_3rd: wx.getStorageSync("session_3rd"),
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
    // app.setUserType('manager')
    // // app.setUserType('driver')


  },
  onLoad: function (options) {
    new app.WeToast()
  },
  onShow: function () {
    console.log(this.data)
  }
})