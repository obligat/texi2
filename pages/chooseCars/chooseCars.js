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
    tempCar: ''
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
  checkboxChange: function (e) {
    this.setData({
      cars: e.detail.value
    })
  },
  chooseCarFined() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      choosedCar: true,
      cars: this.data.cars
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
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].carType == 'ordinary') {
            carItems.ordinary.push(res.data[i])
          } if (res.data[i].carType == 'comfortable') {
            carItems.comfortable.push(res.data[i])
          } if (res.data[i].carType == 'luxury') {
            carItems.luxury.push(res.data[i])
          }
        }
        console.log(carItems)
        that.setData({
          carItems
        })
      }
    })
  },
  onShow: function () {

  },
})