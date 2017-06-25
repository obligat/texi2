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
    driverNum: 0
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
    var guide = [this.data.guideName, this.data.guidePhone].join("-")
    var cars = this.data.cars
    var drivers = this.data.drivers
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/dispatchOrder',
      data: {
        formId: '201706241252',
        cars: [1, 2, 3],
        drivers: [1, 2, 3]
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
  onLoad: function (options) {
    var ordinaryCar = options.ordinaryCar
    var comfortableCar = options.comfortableCar
    var luxuryCar = options.luxuryCar
    var formId = options.formId
    var guide = options.guide
    var driverNum = parseInt(ordinaryCar) + parseInt(comfortableCar) + parseInt(luxuryCar)
    this.setData({
      driverNum,
      ordinaryCar,
      comfortableCar,
      luxuryCar
    })
  },
  onShow: function () {
    console.log("**********dispach order *********")
    console.log(this.data)
  }
})