function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getAllMonths() {
  const months = []
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }
  return months
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
  return days
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
  return date.getHours()
}

function getCurrentMinute() {
  const date = new Date()
  return date.getMinutes()
}

module.exports = {
  formatTime,
  getAllMonths,
  getAllDays,
  getAllHours,
  getAllMinutes,
  getCurrentMonth,
  getCurrentDay,
  getCurrentHour,
  getCurrentMinute
}
