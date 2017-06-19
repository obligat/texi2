// pages/chooseCars/chooseCars.js
Page({
  data: {
    carItems: {
      ordinary: [{
        name: '蒙迪欧 - 陕A12345', value: '蒙迪欧 - 陕A12345'
      }], comfortable: [{
        name: '思域 - 陕A12345', value: '思域 - 陕A12345'
      }, {
        name: '帕萨特 - 陕A12345', value: '帕萨特 - 陕A12345'
      }], luxury: [{
        name: '奔驰 - 陕A12345', value: '奔驰 - 陕A12345'
      }, {
        name: '幻影 - 陕A12345', value: '幻影 - 陕A12345'
      }]
    },
    cars: [],
    ordinaryCar: 0,
    comfortableCar: 3,
    luxuryCar: 1
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
  },
  onShow: function () {

  },
})