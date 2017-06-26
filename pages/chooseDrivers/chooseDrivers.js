// pages/chooseDrivers/chooseDrivers.js
Page({

  data: {
    driverItems: [],
    drivers: [],
    tempDrivers: [],
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
      drivers: e.detail.value
    })
  },
  confrimeTempDriver() {
    var tempName = this.data.tempName
    var tempPhone = this.data.tempPhone
    var tempDrivers = this.data.tempDrivers
    var tempD = [tempName, tempPhone].join('-')
    tempDrivers.push(tempD)
    this.setData({
      tempDrivers,
      tempPhone: '',
      tempName: ''
    })
  },
  chooseCarFined() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    var tempDrivers = this.data.tempDrivers
    var drivers = this.data.drivers
    var length = drivers.length
    console.group("choose driver")
    console.log(tempDrivers)
    if (tempDrivers.length != 0) {
      drivers = drivers.concat(tempDrivers)
      length = drivers.length
    }
    console.log(drivers)
    console.groupEnd()
    prevPage.setData({
      choosedDriver: true,
      drivers,
      driverNum: length
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
      driverNum: options.driverNum
    })
    var that = this
    var driverItems = this.data.driverItems
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/selectDriver',
      success(res) {

        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].driverStatus == 0) {
            driverItems.push(res.data[i])
          }
        }
        that.setData({
          driverItems
        })
      }
    })
  },
})