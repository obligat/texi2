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
      ordinary: [{
        carName: '蒙迪欧', carNumber: '陕A12345'
      }], comfortable: [{
        carName: '思域', carNumber: ' 陕A12345'
      }, {
        carName: '帕萨特', carNumber: '陕A12345'
      }], luxury: [{
        carName: '奔驰', carNumber: '陕A12345'
      }, {
        carName: '幻影', carNumber: ' 陕A12345'
      }]
    },
    isManage: false,
    doType: '',
    newItem: {
      carName: '',
      carNumber: ''
    },
    currentItem: {
      carName: '',
      carNumber: ''
    },
    newCarType: '',
    currentType: ''
  },

  inputNewCarName(e) {
    var name = e.detail.value
    var newItem = this.data.newItem
    newItem.carName = name
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
    var currentType = this.data.currentType
    var currentItem = this.data.currentItem
    var newItem = this.data.newItem
    var carItems = this.data.carItems
    newItem.carName = newItem.carName ? newItem.carName : currentItem.carName
    newItem.carNumber = newItem.carNumber ? newItem.carNumber : currentItem.carNumber
    var index = 0
    var currentArray = carItems[currentType]
    for (var i = 0; i < currentArray.length; i++) {
      if (currentItem.carName === currentArray[i].carName) {
        index = i
      }
    }
    carItems[currentType].splice(index, 1, newItem)
    this.setData({
      carItems
    })
  },
  commitAdd(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var newCarType = this.data.newCarType
    var newItem = this.data.newItem
    var carItems = this.data.carItems
    carItems[newCarType].push(newItem)
    this.setData({
      carItems
    })
  },
  radioChange(e) {
    this.setData({
      newCarType: e.detail.value
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
    var name = e.currentTarget.dataset.name
    var number = e.currentTarget.dataset.number
    var currentItem = this.data.currentItem
    currentItem.carName = name
    currentItem.carNumber = number
    this.setData({
      currentType: e.currentTarget.dataset.type,
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
    var name = e.currentTarget.dataset.name
    var carItems = this.data.carItems
    var currentArray = carItems[currentType]
    var that = this
    var index = 0
    for (var i = 0; i < currentArray.length; i++) {
      if (name === currentArray[i].carName) {
        index = i
      }
    }
    console.log(index)
    wx.showModal({
      title: '确认删除',
      content: '',
      success: function (res) {
        if (res.confirm) {
          currentArray.splice(index, 1)
          that.setData({
            carItems
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