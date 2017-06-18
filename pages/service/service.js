// pages/service/service.js
var app = getApp()
Page({
  data: {
    userType: ''
  },
  pickPlane(){
    wx.navigateTo({
      url: '../pickPlane/pickPlane?pickType=pickPlane',
    })
  },
  pickStation(){
    wx.navigateTo({
      url: '../pickPlane/pickPlane?pickType=pickStation',
    })
  },
  pickTravel(){
    wx.navigateTo({
      url: '../pickTravel/pickTravel?pickType=pickTravel',
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