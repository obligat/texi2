// pages/managePay/managePay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId: '',
    basePrice: 0,
    extraPrice: 0
  },
  bindBasePrice(e) {
    var basePrice = e.detail.value
    this.setData({
      basePrice
    })
  },
  bindExtraPrice(e) {
    var extraPrice = e.detail.value
    this.setData({
      extraPrice
    })
  },
  confirmOrder() {
    var basePrice = parseFloat(this.data.basePrice)
    var extraPrice = parseFloat(this.data.extraPrice)
    var formId = this.data.formId
    var cars = wx.getStorageSync("cars")
    var drivers = wx.getStorageSync("drivers")
    console.group("pay price")
    console.log(basePrice)
    console.log(extraPrice)
    console.log(formId)
    console.log(cars)
    console.log(drivers)
    console.groupEnd()
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getPrice',
      data: {
        formId: formId,
        basePrice: basePrice,
        extraPrice: extraPrice,
        cars: cars,
        drivers: drivers
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        wx.showToast({
          title: '成功',
        })
        wx.switchTab({
          url: '../service/service',
        })
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
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
        console.log("********* get time ***********")
        that.setData({
          order: res.data[0]
        })
        console.log(res.data[0])
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})