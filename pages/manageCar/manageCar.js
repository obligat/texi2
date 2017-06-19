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
        carName: '蒙迪欧', carNumber: '陕A12345', index: 0
      }], comfortable: [{
        carName: '思域', carNumber: ' 陕A12345', index: 0
      }, {
        carName: '帕萨特', carNumber: '陕A12345', index: 1
      }], luxury: [{
        carName: '奔驰', carNumber: '陕A12345', index: 0
      }, {
        carName: '幻影', carNumber: ' 陕A12345', index: 1
      }]
    },
    isManage: false,
    doType: '',
    newCarType: '',
    newCarName: '',
    newCarNumber: '',
    currentType: '',
    currentName: '',
    currentNumber: '',
    currentIndex: 0
  },

  inputNewCarName(e) {
    this.setData({
      newCarName: e.detail.value
    })
  },
  inputNewCarNumber(e) {
    this.setData({
      newCarNumber: e.detail.value
    })
  },
  commitUpdate(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var currentType = this.data.currentType
    var currentName = this.data.currentName
    var currentNumber = this.data.currentNumber
    var currentIndex = this.data.currentIndex
    var newCarName = this.data.newCarName
    var newCarNumber = this.data.newCarNumber
    var carItems = this.data.carItems
    newCarName = newCarName ? newCarName : currentName
    newCarNumber = newCarNumber ? newCarNumber : currentNumber
    carItems[currentType][currentIndex].carName = newCarName
    carItems[currentType][currentIndex].carNumber = newCarNumber
    this.setData({
      carItems: carItems
    })
  },
  commitAdd(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var newCarType = this.data.newCarType
    var newCarName = this.data.newCarName
    var newCarNumber = this.data.newCarNumber
    var carItems = this.data.carItems
    carItems[newCarType].push({ carName: newCarName, carNumber: newCarNumber })
    console.log(carItems)
    this.setData({
      carItems: carItems
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
    this.setData({
      currentType: e.currentTarget.dataset.type,
      currentName: e.currentTarget.dataset.name,
      currentNumber: e.currentTarget.dataset.number,
      currentIndex: e.currentTarget.dataset.index
    })

  },
  updateCar(e) {
    this.setData({
      doType: 'update'
    })
  },
  deleteThisCar(e) {
    var currentType = e.currentTarget.dataset.type
    var currentIndex = e.currentTarget.dataset.index
    var carItems = this.data.carItems
    var that = this
    wx.showModal({
      title: '确认删除',
      content: '',
      success: function (res) {
        if (res.confirm) {
          carItems[currentType].splice(currentIndex, 1)
          that.setData({
            carItems: carItems
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