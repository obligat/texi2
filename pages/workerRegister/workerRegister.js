// pages/workerRegister/workerRegister.js
const app = getApp()
Page({
  data: {
    type: [{
      name: '管理员', value: 'manager'
    }, {
      name: '司机', value: 'driver'
    }],
    account: '',
    password: '',
    userType: ''
  },
  radioChange(e) {
    console.log("***** register *******")
    console.log(e)
    this.setData({
      userType: e.detail.value
    })
  },
  formSubmit(e) {
    var userType = this.data.userType
    var account = e.detail.value.account
    var password = e.detail.value.password
    var userPower = userType == 'manager' ? 1 : 0
    this.setData({
      account,
      password
    })
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/User/login',
      data: {
        session_3rd: wx.getStorageSync("session_3rd"),
        user_id: account,
        password: password,
        user_power: userPower
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        app.setUserType(userType)
        wx.switchTab({
          url: '../workerLogin/workerLogin',
        })
      },
      fail(res) {
        console.log(res)
      }
    })
    // app.setUserType('manager')
    // // app.setUserType('driver')


  },
  onLoad: function (options) {

  },
  onShow: function () {

  }
})