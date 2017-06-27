//app.js
const {WeToast} = require('utils/wetoast/wetoast.js')
App({
  WeToast,
  onLaunch: function () {
    var that = this
    var storage = wx.getStorageInfoSync()
    console.log(storage)
    var userInfo = wx.getStorageSync("userInfo")
    var sss = wx.getStorageSync("session_3rd")
    console.log(sss)
    if (sss) {
      console.log("if if if on lounch openid exist if if ")
      if (userInfo.userType) {
        this.globalData.userType = userInfo.userType
      }
      // wx.switchTab({
      //   url: '/pages/service/service',
      // })
    } else {
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
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success(res) {
                console.log("_______code _________")
                console.log(res)
                wx.setStorageSync("session_3rd", res.data.session_3rd)
                wx.request({
                  url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Index/getOpenId',
                  data: {
                    session_3rd: wx.getStorageSync("session_3rd")
                  },
                  method: 'POST',
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  success(res) {
                    console.log("********get open id *********")
                    wx.setStorageSync("openId", res.data)
                  },
                  fail(res) {
                    console.log(res)
                  }

                })
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

    }


    // wx.login({
    //   success(code) {
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx0cda5d13f5aef083&secret=eac738952a4d3368e8cd351a8737d5ad&grant_type=authorization_code&js_code=' + code.code,
    //       success(res) {
    //         console.log(res)
    //         that.globalData.openId = res.data.openid
    //         console.log("wwwwwwwwww Open id wwwwww")
    //         console.log(res.data )
    //       },
    //       fail(res) {
    //         console.log("error error")
    //         // console.log(res)
    //       },
    //       complete(res) {
    //         // console.log(res)
    //       }
    //     })
    //   }
    // })


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
    userType: '',
    openId: ''
  }
})