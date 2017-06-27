// pages/dispatchOrder/dispatchOrder.js
Page({
  data: {
    ordinaryCar: 0,
    comfortableCar: 0,
    luxuryCar: 0,
    cars: [],
    drivers: [],
    guide: '',
    choosedCar: false,
    choosedDriver: false,
    driverNum: 0,
    guideLanguage: ''
  },

  bindGuideName(e) {
    this.setData({
      guideName: e.detail.value
    })
  },
  bindGuidePhone(e) {
    this.setData({
      guidePhone: e.detail.value
    })
  },
  dispatchOrder() {
    var guidePhone = this.data.guidePhone
    var guide = this.data.guide
    if (guidePhone) {
      guide = [this.data.guideName, guidePhone].join("-")
    }
    var cars = this.data.cars
    var drivers = this.data.drivers
    var formId = this.data.formId
    wx.setStorageSync("cars", cars)
    wx.setStorageSync("drivers", drivers)
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/dispatchOrder',
      data: {
        formId: formId,
        cars: cars,
        drivers: drivers,
        guide: guide
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: '派单成功',
        })
        wx.switchTab({
          url: '../service/service',
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    var ordinaryCar = options.ordinaryCar
    var comfortableCar = options.comfortableCar
    var luxuryCar = options.luxuryCar
    var formId = options.formId
    var guideLanguage = options.guide
    console.log(guideLanguage)
    var driverNum = parseInt(ordinaryCar) + parseInt(comfortableCar) + parseInt(luxuryCar)
    this.setData({
      driverNum,
      ordinaryCar,
      comfortableCar,
      luxuryCar,
      formId,
      guideLanguage
    })
  },
  onShow: function () {
    console.log("**********dispach order *********")
    console.log(this.data)
  }
})