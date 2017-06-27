//app.js
const {WeToast} = require('utils/wetoast/wetoast.js')
var util = require('utils/util')
App({
  WeToast,
  onLaunch: function () {
    var that = this
    var storage = wx.getStorageInfoSync()
    var userInfo = wx.getStorageSync("userInfo")
    var sss = wx.getStorageSync("session_3rd")
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Index/getOpenId',
      data: {
        session_3rd: sss
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data) {
          wx.setStorageSync("openId", res.data)
        } else {
          util.getSessionAndOpenId()
        }
      },
      fail(res) {
        console.log(res)
      }

    })
    if (sss) {
      if (userInfo.userType) {
        this.globalData.userType = userInfo.userType
      }
      wx.switchTab({
        url: '/pages/service/service',
      })
    } else {
      util.getSessionAndOpenId()
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
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
    userType: '',
    openId: ''
  }
})