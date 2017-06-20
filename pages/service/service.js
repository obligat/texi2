// pages/service/service.js
var app = getApp()
Page({
  data: {
    userType: '',
    orderType: "已提交",
    ordinaryCar: 2,
    comfortableCar: 3,
    luxuryCar: 0,
    formId: ''
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
  dHandleInput(e) {
    this.setData({
      formId: e.detail.value
    })
  },
  dCommitForm() {
    var formId = this.data.formId
    wx.navigateTo({
      url: `../driverBegin/driverBegin?formId=${formId}`,
    })
  },
  dClearInput() {
    this.setData({
      formId: ''
    })
  },

  handlePayBill() {
    wx.navigateTo({
      url: `/pages/managePay/managePay?ordinaryCar=${this.data.ordinaryCar}&comfortableCar=${this.data.comfortableCar}&luxuryCar=${this.data.luxuryCar}`,
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