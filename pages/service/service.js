// pages/service/service.js
var app = getApp()
Page({
  data: {
    userType: '',
    orderType: "已提交"
  },
  pickPlane() {
    wx.navigateTo({
      url: '../pickPlane/pickPlane?pickType=pickPlane',
    })
  },
  pickStation() {
    wx.navigateTo({
      url: '../pickPlane/pickPlane?pickType=pickStation',
    })
  },
  pickTravel() {
    wx.navigateTo({
      url: '../pickTravel/pickTravel?pickType=pickTravel',
    })
  },
  handleDispatchOrder() {
    wx.navigateTo({
      url: `/pages/dispatchOrder/dispatchOrder?ordinaryCar=${this.data.ordinaryCar}&comfortableCar=${this.data.comfortableCar}&luxuryCar=${this.data.luxuryCar}`,
    })
  },
  topTab1() {
    this.setData({
      orderType: "已提交"
    })
  },
  topTab2() {
    this.setData({
      orderType: "已派单"
    })
  },
  topTab3() {
    this.setData({
      orderType: "已完成"
    })
  },
  onLoad: function (options) {
    var userType = app.globalData.userType
    this.setData({
      userType
    })
  },
  onShow: function () {

  }
})