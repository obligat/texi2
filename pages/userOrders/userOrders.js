// pages/userOrders/userOrders.js
Page({
  data: {
    orderCommited: [],
    orderDispatched: [],
    orderFinished: []
  },
  onLoad: function (options) {
    console.log(options)
    var pageList = getCurrentPages()
    console.log(pageList)
  },

})