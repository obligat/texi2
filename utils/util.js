
function getSessionAndOpenId() {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.request({
          url: 'https://creatsharecj.cn/wechatapp/public/index.php',
          data: {
            code: res.code
          },
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success(res) {
            var session_3rd = res.data.session_3rd
            wx.setStorage({
              key: 'session_3rd',
              data: session_3rd,
            })
            wx.request({
              url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Index/getOpenId',
              data: {
                session_3rd: session_3rd
              },
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success(res) {
                wx.setStorageSync("openId", res.data)
              },
              fail(res) {
                console.log(res)
              }
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
}

function formatTime() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day, hour, minute].map(formatNumber).join('')
}

function getStartTime(month, day, hour, minute) {
  var date = new Date()
  var year = date.getFullYear()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getYear() {
  const date = new Date()
  return date.getFullYear()
}

function getAllMonths() {
  const months = []
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }
  return months.map(formatNumber)
}

function getAllMinutes() {
  const minutes = []
  for (let i = 1; i <= 60; i++) {
    minutes.push(i)
  }
  return minutes.map(formatNumber)
}

function getAllHours() {
  const hours = []
  for (let i = 1; i <= 12; i++) {
    hours.push(i)
  }
  return hours.map(formatNumber)
}

function getAllDays() {
  const days = []
  for (let i = 1; i <= 31; i++) {
    days.push(i)
  }
  return days.map(formatNumber)
}

function getCurrentMonth() {
  const date = new Date()
  return date.getMonth() + 1
}

function getCurrentDay() {
  const date = new Date()
  return date.getDate()
}

function getCurrentHour() {
  const date = new Date()
  const hour = date.getHours().toString()
  return hour[1] ? hour : '0' + hour
}

function getCurrentMinute() {
  const date = new Date()
  const minute = date.getMinutes().toString()
  return minute[1] ? minute : '0' + minute
}

module.exports = {
  formatTime,
  getStartTime,
  getYear,
  getAllMonths,
  getAllDays,
  getAllHours,
  getAllMinutes,
  getCurrentMonth,
  getCurrentDay,
  getCurrentHour,
  getCurrentMinute,
  getSessionAndOpenId
}
