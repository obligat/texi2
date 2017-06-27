// pages/managePay/managePay.js
Page({
  data: {
    formId: '',
    basePrice: 0,
    extraPrice: 0,
    extraTime: '0'
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
    console.log("car s driver s")
    console.log(cars)
    console.log(drivers)
    wx.showLoading({
      title: '正在请求',
    })
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
        wx.hideLoading()
        console.log("******over pay over pay **********")
        console.log(res)
        wx.showToast({
          title: '通知结账成功',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../service/service',
          })
        }, 500)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    var formId = options.formId
    var order = this.data.order
    this.setData({
      formId
    })
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getOrderBook',
      success(res) {
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].formId == formId) {
            that.setData({
              order: res.data[i]
            })
          }
        }
      },
      fail(res) {
        console.log(res)
      }
    })
    order = this.data.order

    var time = 0
    if (extraTime) {
      var baseTime = parseInt(order.baseTime)
      var extraTime = parseInt(order.extraTime)
      time = (extraTime - baseTime) / 1000 / 60
      this.setData({
        extraTime: time
      })
    }
  }
})