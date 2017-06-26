// pages/driverBegin/driverBegin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId: '',
    isBegin: false,
    order: {}
  },
  endService() {
    var date = new Date()
    var time = date.getTime()
    var formId = this.data.formId
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Driver/endWork',
      data: {
        formId: formId,
        time: time
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
  },
  extraService() {
    var date = new Date()
    var time = date.getTime()
    var formId = this.data.formId
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Driver/extraWork',
      data: {
        formId: formId,
        time: time
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
  },

  benginService() {
    this.setData({
      isBegin: true
    })
    var formId = this.data.formId
    var date = new Date()
    var time = date.getTime()
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Driver/startWork',
      data: {
        formId: formId,
        time: time
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var formId = options.formId
    this.setData({
      formId
    })
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Driver/findOrderBook',
      data: {
        formId: formId
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        var order = res.data[0]
        that.setData({
          order
        })
      },
      fail(res) {
        console.log(res)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})