// pages/chooseDrivers/chooseDrivers.js
Page({

  data: {
    driverItems: [
      { name: '白小菜 - 15823905344', value: '白小菜 - 15823905344' },
      { name: '维嘉 - 15332295073', value: '维嘉 - 15332295073' },
      { name: '沫姐 - 13950724388', value: '沫姐 - 13950724388' },
      { name: '京查倪 - 18923557029', value: '京查倪 -18923557029' },
      { name: '李纪珠 - 15633065666', value: '李纪珠 - 15633065666' },
      { name: '李连 - 15833066997', value: '李连 - 15833066997' },
    ],
    drivers: []
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
  },
})