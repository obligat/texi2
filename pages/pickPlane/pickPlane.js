// pages/pickPlane/pickPlane.js
const util = require("../../utils/util")
const app = getApp()
const months = util.getAllMonths()
const days = util.getAllDays()
const hours = util.getAllHours()
const minutes = util.getAllMinutes()
const month = util.getCurrentMonth()
const day = util.getCurrentDay()
const hour = util.getCurrentHour()
const minute = util.getCurrentMinute()
Page({
  data: {
    pickType: '',
    months,
    days,
    hours,
    minutes,
    month,
    day,
    hour,
    minute,
    dateValue: [month - 1, day - 1],
    timeValue: [hour, minute],
    startPlace: '',
    endPlace: '',
    flightNum: '',
    doPick: true
  },
  handleFlightNum(e) {
    this.setData({
      flightNum: e.detail.value
    })
  },
  onLoad: function (options) {
    new app.WeToast()
    this.setData({
      pickType: options.pickType
    })
    console.log(this.data)
  },
  onShow: function () {
  },
  handlePickPlane() {
    this.setData({
      doPick: true
    })
  },
  handleSendPlane() {
    this.setData({
      doPick: false
    })
  },
  handleChooseTime() {
    this.setData({
      isChooseTime: true
    })
  },
  confirmTime() {
    this.setData({
      isChooseTime: false
    })
  },
  handleChooseDate() {
    this.setData({
      isChooseDate: true
    })
  },
  confirmDate() {
    this.setData({
      isChooseDate: false
    })
  },
  bindDateChange: function (e) {
    const val = e.detail.value
    this.setData({
      month: this.data.months[val[0]],
      day: this.data.days[val[1]]
    })
  },
  bindTimeChange: function (e) {
    const val = e.detail.value
    this.setData({
      hour: this.data.hours[val[0]],
      minute: this.data.minutes[val[1]]
    })
  },
  choosePositionStart() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        wx.chooseLocation({
          success: function (res) {
            that.setData({
              startPlace: res.name
            })
          },
        })
      }
    })
  },
  choosePositionEnd() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        wx.chooseLocation({
          success: function (res) {
            that.setData({
              endPlace: res.name
            })
          },
        })
      }
    })
  },
  handleNextStep() {
    let time = [this.data.year, this.data.month, this.data.day].join('-')
    let startPlace = this.data.startPlace
    let endPlace = this.data.endPlace
    let word = (this.data.type == 'pickPlane' ? '机' : '站')
    let type = '接送' + word + ' / ' + (this.data.doType == 'pick' ? '接' : '送') + word
    if (time && startPlace && endPlace) {
      wx.navigateTo({
        url: `/pages/createOrder/createOrder?time=${time}&startPlace=${startPlace}&endPlace=${endPlace}&type=${type}`,
      })
    } else {
      this.wetoast.toast({
        title: '好像没有选择位置'
      })
    }
  }
})