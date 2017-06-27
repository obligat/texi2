// pages/chooseCars/chooseCars.js
Page({
  data: {
    carItems: {
      ordinary: [], comfortable: [], luxury: []
    },
    cars: [],
    ordinaryCar: 0,
    comfortableCar: 3,
    luxuryCar: 1,
    tempCars: [],
    tempName: '',
    tempPhone: ''
  },
  bindTempName(e) {
    this.setData({
      tempName: e.detail.value
    })
  },
  bindTempPhone(e) {
    this.setData({
      tempPhone: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      cars: e.detail.value
    })
  },
  confrimeTemp() {
    var tempName = this.data.tempName
    var tempPhone = this.data.tempPhone
    var tempCars = this.data.tempCars
    var tempD = [tempName, tempPhone].join('-')
    tempCars.push(tempD)
    this.setData({
      tempCars,
      tempPhone: '',
      tempName: ''
    })
  },
  chooseCarFined() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    var tempCars = this.data.tempCars
    var cars = this.data.cars
    var length = cars.length
    if (tempCars.length != 0) {
      cars = cars.concat(tempCars)
      length = cars.length
    }
    prevPage.setData({
      choosedCar: true,
      cars
    })
    wx.showToast({
      title: '成功',
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 500)
  },
  onLoad: function (options) {
    this.setData({
      luxuryCar: options.luxuryCar,
      comfortableCar: options.comfortableCar,
      ordinaryCar: options.ordinaryCar
    })
    var that = this
    var carItems = this.data.carItems
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/selectCar',
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].carStatus == 0) {
            if (res.data[i].carType == 'ordinary') {
              carItems.ordinary.push(res.data[i])
            } if (res.data[i].carType == 'comfortable') {
              carItems.comfortable.push(res.data[i])
            } if (res.data[i].carType == 'luxury') {
              carItems.luxury.push(res.data[i])
            }
          }

        }
        that.setData({
          carItems
        })
      }
    })
  },
  onShow: function () {

  },
})