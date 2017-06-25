// pages/chooseDrivers/chooseDrivers.js
Page({

  data: {
    driverItems: [],
    drivers: [],
    tempDriver: ''
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
      drivers: e.detail.value
    })
  },
  chooseCarFined() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      choosedDriver: true,
      drivers: this.data.drivers,
      driverNum: this.data.drivers.length
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
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/selectDriver',
      success(res) {
        that.setData({
          driverItems: res.data
        })
      }
    })
  },
})