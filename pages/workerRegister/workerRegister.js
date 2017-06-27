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
    userPower = parseInt(userPower)
    console.group("******register*******")
    console.log(userPower)
    console.log(wx.getStorageSync("session_3rd"))
    var that = this
    this.setData({
      account,
      password
    })
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/User/register',
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
        console.group(" request register")
        console.log(res)
        console.groupEnd()
        that.wetoast.toast({
          title: res.data.res

        })
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]
        console.log(prevPage)
        if (res.data.res == '注册成功') {
          prevPage.setData({
            account,
            password
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        }

      },
      fail(res) {
        console.log(res)
      }
    })
    // app.setUserType('manager')
    // // app.setUserType('driver')
    console.groupEnd()

  },
  onLoad: function (options) {
    new app.WeToast()
  },
  onShow: function () {

  }
})