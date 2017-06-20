// pages/dispatchOrder/dispatchOrder.js
Page({
  data: {
    ordinaryCar: 2,
    comfortableCar: 3,
    luxuryCar: 1,
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
  },
  onLoad: function (options) {
    var driverNum = this.data.ordinaryCar + this.data.comfortableCar + this.data.luxuryCar
    this.setData({
      driverNum
    })
  },
  onShow: function () {
    console.log("**********dispach order *********")
    console.log(this.data)

  }
})