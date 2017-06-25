// pages/driverBegin/driverBegin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId: "201706241252"
  },
  endService(){
    var date = new Date()
    var beginTime = date.getTime()
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Driver/endWork',
      data: {
        formId: "201706241252",
        time: beginTime
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  extraService() {
    var date = new Date()
    var beginTime = date.getTime()
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Driver/extraWork',
      data: {
        formId: "201706241252",
        time: beginTime
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  benginService() {
    var date = new Date()
    var beginTime = date.getTime()
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Driver/startWork',
      data: {
        formId: "201706241252",
        time: beginTime
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})