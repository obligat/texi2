//app.js
const {WeToast} = require('utils/wetoast/wetoast.js')
App({
  WeToast,
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'https://creatsharecj.cn/wechatapp/public/index.php',
            data: {
              code: res.code
            },
            // method: 'POST',
            // header: {
            //   "content-type": "application/x-www-form-urlencoded"
            // },
            success(res) {
              console.log(res)
              wx.setStorageSync("session_3rd", res.data.session_3rd)
            },
            fail(res) {
              console.log(res)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  setUserType(userType) {
    this.globalData.userType = userType
  },
  globalData: {
    userInfo: null,
    userType: ''
  }
})