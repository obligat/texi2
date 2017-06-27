// pages/service/service.js
var app = getApp()
Page({
  data: {
    userType: '',
    orderType: "已提交",
    ordinaryCar: 2,
    comfortableCar: 3,
    luxuryCar: 0,
    formId: '',
    formItems: []
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

  handlePayBill(e) {
    var formId = e.currentTarget.dataset.formId
    wx.navigateTo({
      url: `/pages/managePay/managePay?formId=${formId}`,
    })
  },
  handleDispatchOrder(e) {
    console.log("*********dispatch button **********")
    console.log(e)
    var formId = e.currentTarget.dataset.formId
    var ordinaryCar = e.currentTarget.dataset.ordinary
    var comfortableCar = e.currentTarget.dataset.comfortable
    var luxuryCar = e.currentTarget.dataset.luxury
    var guide = e.currentTarget.dataset.guide
    wx.navigateTo({
      url: `/pages/dispatchOrder/dispatchOrder?ordinaryCar=${ordinaryCar}&comfortableCar=${comfortableCar}&luxuryCar=${luxuryCar}&formId=${formId}&guide=${guide}`,
    })
  },
  topTab1() {
    this.setData({
      orderType: "已提交"
    })
    var formItems = this.data.formItems
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getOrderBook',
      success(res) {
        console.log("***********manager order get all *******")
        console.log(res.data)
        that.setData({
          formItems: res.data.reverse()
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  topTab2() {
    this.setData({
      orderType: "已派单"
    })
    var formItems = this.data.formItems
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getOrderBook',
      success(res) {
        console.log("***********manager order get all *******")
        console.log(res.data)
        that.setData({
          formItems: res.data.reverse()
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  topTab3() {
    this.setData({
      orderType: "已完成"
    })
    var formItems = this.data.formItems
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getOrderBook',
      success(res) {
        console.log("***********manager order get all *******")
        console.log(res.data)
        that.setData({
          formItems: res.data.reverse()
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    var userType = app.globalData.userType
    this.setData({
      userType
    })

  },
  onShow: function () {
    var formItems = this.data.formItems
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/getOrderBook',
      success(res) {
        console.log("***********manager order get all *******")
        console.log(res.data)
        that.setData({
          formItems: res.data.reverse()
        })
      },
      fail(res) {
        console.log(res)
      }
    })
    console.log(formItems)
  }
})