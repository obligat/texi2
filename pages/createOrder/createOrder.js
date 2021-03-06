// pages/createOrder/createOrder.js
const util = require('../../utils/util')
const app = getApp()
Page({
  data: {
    ordinaryCar: 0,
    comfortableCar: 0,
    luxuryCar: 0,
    languages: ['英语', '汉语', '其他'],
    language: '',
    value: [0],
    needGuide: 0,
    passenger: '',
    passengerPhone: '',
    appointer: ''
  },
  pickerChange(e) {
    const val = e.detail.value
    this.setData({
      language: this.data.languages[val],
    })
  },
  radioChange(e) {
    var value = e.detail.value
    if (value == 'yes') {
      this.setData({
        needGuide: 1
      })
    } else {
      this.setData({
        needGuide: 0
      })
    }
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
  bindFormSubmit(e) {
    const remark = e.detail.value.remark
    const passenger = e.detail.value.passenger
    const appointer = e.detail.value.appointer
    const passengerPhone = e.detail.value.passengerPhone
    const ordinaryCar = this.data.ordinaryCar
    const comfortableCar = this.data.comfortableCar
    const luxuryCar = this.data.luxuryCar
    const needGuide = this.data.needGuide
    const language = this.data.language
    const time = this.data.time
    const startPlace = this.data.startPlace
    const endPlace = this.data.endPlace || '无'
    const pickType = this.data.pickType
    const flightNum = this.data.flightNum
    const formId = util.formatTime()
    const useType = this.data.useType || '无'
    wx.showToast({
      title: '提交成功'
    })
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Account/addOrderBook',
      data: {
        session_3rd: wx.getStorageSync("session_3rd"),
        formId: formId,
        pickType: pickType,
        time: time,
        startPlace: startPlace,
        endPlace: endPlace,
        ordinaryCar: ordinaryCar,
        comfortableCar: comfortableCar,
        luxuryCar: luxuryCar,
        language: language,
        remark: remark,
        passengerPhone: passengerPhone,
        passenger: passenger,
        appointer: appointer,
        flightNum: flightNum,
        orderType: '已提交',
        useType: useType
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
      },
      fail(res) {
        console.log(res)
      }
    })
    setTimeout(function () {
      wx.redirectTo({
        url: `../userOrders/userOrders`,
      })
    }, 1000)
  },
  handleBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  handleMinusPeople() {
    if (this.data.people) {
      let people = this.data.people - 1
      this.setData({
        people: people
      })
    }
  },
  handleAddPeople() {
    let people = this.data.people + 1
    this.setData({
      people: people
    })
  },
  handleMinusCar1() {
    if (this.data.ordinaryCar) {
      let ordinaryCar = this.data.ordinaryCar - 1
      this.setData({
        ordinaryCar
      })
    }
  },
  handleAddCar1() {
    let ordinaryCar = this.data.ordinaryCar + 1
    this.setData({
      ordinaryCar
    })
  },
  handleMinusCar2() {
    if (this.data.comfortableCar) {
      let comfortableCar = this.data.comfortableCar - 1
      this.setData({
        comfortableCar
      })
    }
  },
  handleAddCar2() {
    let comfortableCar = this.data.comfortableCar + 1
    this.setData({
      comfortableCar
    })
  },
  handleMinusCar3() {
    if (this.data.luxuryCar) {
      let luxuryCar = this.data.luxuryCar - 1
      this.setData({
        luxuryCar
      })
    }
  },
  handleAddCar3() {
    let luxuryCar = this.data.luxuryCar + 1
    this.setData({
      luxuryCar
    })
  },
  bindKeyInput: function (e) {
    let input = Number(e.detail.value)
    let type = e.target.dataset.type
    if (type == 'people') {
      this.setData({
        people: input
      })
    } else if (type == 'ordinary') {
      this.setData({
        ordinaryCar: input
      })
    } else if (type == 'comfort') {
      this.setData({
        comfortableCar: input
      })
    } else if (type == 'luxury') {
      this.setData({
        luxuryCar: input
      })
    }
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      time: options.time,
      startPlace: options.startPlace,
      endPlace: options.endPlace,
      pickType: options.pickType,
      flightNum: options.flightNum,
      useType: options.useType
    })
  }
})