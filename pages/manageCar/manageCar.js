// pages/manageCar/manageCar.js
Page({
  data: {
    showModalStatus: false,
    carTypes: [
      { name: 'ordinary', value: '普通' },
      { name: 'comfortable', value: '舒适' },
      { name: 'luxury', value: '豪华' }
    ],
    carItems: {
      ordinary: [], comfortable: [], luxury: []
    },
    isManage: false,
    doType: '',
    newItem: {
      carType: '',
      carBand: '',
      carNumber: ''
    },
    currentItem: {
      carId: '',
      carBand: '',
      carNumber: '',
      carType: ''
    },
    newCarType: ''
  },

  inputNewCarName(e) {
    var name = e.detail.value
    var newItem = this.data.newItem
    newItem.carBand = name
    this.setData({
      newItem
    })
  },
  inputNewCarNumber(e) {
    var number = e.detail.value
    var newItem = this.data.newItem
    newItem.carNumber = number
    this.setData({
      newItem
    })
  },
  commitUpdate(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var currentItem = this.data.currentItem
    var newItem = this.data.newItem
    var carItems = this.data.carItems
    var currentType = currentItem.carType
    var id = currentItem.carId
    newItem.carBand = newItem.carBand ? newItem.carBand : currentItem.carBand
    newItem.carNumber = newItem.carNumber ? newItem.carNumber : currentItem.carNumber
    var index = 0
    var currentArray = carItems[currentType]
    for (var i = 0; i < currentArray.length; i++) {
      if (currentItem.carId === currentArray[i].carId) {
        index = i
      }
    }
    carItems[currentType].splice(index, 1, newItem)
    this.setData({
      carItems
    })
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/updateCar',
      method: 'POST',
      data: {
        car_id: id,
        car_band: newItem.carBand,
        car_type: currentType,
        car_number: newItem.carNumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
      }
    })
  },
  commitAdd(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var newItem = this.data.newItem
    var newCarType = newItem.carType
    var carItems = this.data.carItems
    if (newCarType) {
      carItems[newCarType].push(newItem)
    }
    this.setData({
      carItems
    })
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/addCar',
      method: 'POST',
      data: {
        car_band: newItem.carBand,
        car_type: newItem.carType,
        car_number: newItem.carNumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        that.setData({
          newItem: {
            carType: '',
            carBand: '',
            carNumber: ''
          }
        })
      }
    })
  },
  radioChange(e) {
    var type = e.detail.value
    var newItem = this.data.newItem
    newItem.carType = type
    this.setData({
      newItem
    })
  },
  addCar(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    this.setData({
      doType: 'add'
    })
  },
  updateThisCar(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    var number = e.currentTarget.dataset.number
    var currentItem = this.data.currentItem
    currentItem.carBand = name
    currentItem.carNumber = number
    currentItem.carId = id
    currentItem.carType = e.currentTarget.dataset.type
    this.setData({
      currentItem
    })
  },
  updateCar(e) {
    this.setData({
      doType: 'update'
    })
  },
  deleteThisCar(e) {
    var currentType = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    var carItems = this.data.carItems
    var currentArray = carItems[currentType]
    var that = this
    var index = 0
    for (var i = 0; i < currentArray.length; i++) {
      if (id === currentArray[i].carId) {
        index = i
      }
    }
    wx.showModal({
      title: '确认删除',
      content: '',
      success: function (res) {
        if (res.confirm) {
          currentArray.splice(index, 1)
          that.setData({
            carItems
          })
          wx.request({
            url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/deleteCar',
            method: 'POST',
            data: {
              car_id: id
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success(res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  tiggerHidden() {
    this.setData({
      isManage: !this.data.isManage
    })
  },
  onLoad: function (options) {
    var carItems = this.data.carItems
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/selectCar',
      success(res) {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].carType == 'ordinary') {
            carItems.ordinary.push(res.data[i])
          } if (res.data[i].carType == 'comfortable') {
            carItems.comfortable.push(res.data[i])
          } if (res.data[i].carType == 'luxury') {
            carItems.luxury.push(res.data[i])
          }
        }
        console.log(carItems)
        that.setData({
          carItems
        })
      }
    })
  },
  powerDrawer(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "easy",
      delay: 0
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
})