// pages/pickTravel/pickTravel.js
const app = getApp()
const util = require("../../utils/util")
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
    isChooseTime: false,
    allType: [{
      value: '包车', checked: 'true'
    }, {
      value: '班车接送'
    }, {
      value: '只需导游'
    }],
    type: '包车',
    useType: '全天',
    language: '汉语',
    passenger: '',
    passengerPhone: '',
    appointer: ''
  },
  bindPassengerName(e) {
    this.setData({
      passenger: e.detail.value
    })
  },
  bindPassengerPhone(e) {
    this.setData({
      passengerPhone: e.detail.value
    })
  },
  bindAppointerName(e) {
    this.setData({
      appointer: e.detail.value
    })
  },
  radioTypeChange(e) {
    const value = e.detail.value
    this.setData({
      type: value
    })
    if (value == '班车接送') {
      this.setData({
        useType: '全程'
      })
    }
    if (value == '包车') {
      this.setData({
        useType: '全天'
      })
    }
  },
  radioUseTypeChange(e) {
    this.setData({
      useType: e.detail.value
    })
  },
  radioLanguageChange(e) {
    this.setData({
      language: e.detail.value
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
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
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
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
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
    let year = util.getYear()
    let time = util.getStartTime(this.data.month, this.data.day, this.data.hour, this.data.minute)
    let startPlace = this.data.startPlace
    let endPlace = this.data.endPlace
    let type = '旅游预约/' + this.data.type
    let useType = this.data.useType
    let language = this.data.language
    const passenger = this.data.passenger
    const appointer = this.data.appointer
    const passengerPhone = this.data.passengerPhone
    const formId = util.formatTime()
    if (time && startPlace) {
      if (this.data.type == '包车') {
        wx.navigateTo({
          url: `/pages/createOrder/createOrder?time=${time}&startPlace=${startPlace}&pickType=${type}&useType=${useType}`,
        })
      } else if (this.data.type == '班车接送') {
        if (endPlace) {
          wx.navigateTo({
            url: `/pages/createOrder/createOrder?time=${time}&startPlace=${startPlace}&endPlace=${endPlace}&pickType=${type}&useType=${useType}`,
          })
        } else {
          this.wetoast.toast({
            title: '好像没有选择位置'
          })
        }
      } else {
        wx.request({
          url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Account/addOrderBook',
          data: {
            session_3rd: wx.getStorageSync("session_3rd"),
            formId: formId,
            pickType: type,
            time: time,
            startPlace: startPlace,
            endPlace: endPlace,
            language: language,
            passengerPhone: passengerPhone,
            passenger: passenger,
            appointer: appointer,
            orderType: '已提交',
            ordinaryCar: 0,
            comfortableCar: 0,
            luxuryCar: 0,
            remark: '无',
          },
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success(res) {
            wx.redirectTo({
              url: '../userOrders/userOrders',
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      }

    } else {
      this.wetoast.toast({
        title: '好像没有选择位置'
      })
    }
  },
  onLoad: function (options) {
    new app.WeToast()
  }
})