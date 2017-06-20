// pages/manageDriver/manageDriver.js
Page({
  data: {
    showModalStatus: false,
    driverItems: [
      { name: '白小菜', phone: '15823905344' },
      { name: '维嘉', phone: '15332295073' },
      { name: '沫姐', phone: '13950724388' },
      { name: '京查倪', phone: '18923557029' },
      { name: '李纪珠', phone: '15633065666' },
      { name: '李连', phone: '15833066997' },
    ],
    isManage: false,
    doType: '',
    newItem: {
      name: '',
      phone: ''
    },
    currentItem: {
      name: '',
      phone: ''
    }
  },

  inputNewName(e) {
    var name = e.detail.value
    var newItem = this.data.newItem
    newItem.name = name
    this.setData({
      newItem: newItem
    })
  },
  inputNewNumber(e) {
    var phone = e.detail.value
    var newItem = this.data.newItem
    newItem.phone = phone
    this.setData({
      newItem
    })
  },
  commitUpdate(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var currentItem = this.data.currentItem
    var newItem = this.data.newItem
    var driverItems = this.data.driverItems
    newItem.name = newItem.name ? newItem.name : currentItem.name
    newItem.phone = newItem.phone ? newItem.phone : currentItem.phone
    var index = driverItems.indexOf(currentItem)
    console.log(index)
    driverItems.splice(index, 1, newItem)
    this.setData({
      driverItems: driverItems
    })
  },
  commitAdd(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var driverItems = this.data.driverItems
    driverItems.push(this.data.newItem)
    this.setData({
      driverItems: driverItems
    })
  },
  handleAdd(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    this.setData({
      doType: 'add'
    })
  },
  updateThisItem(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var name = e.currentTarget.dataset.name
    var phone = e.currentTarget.dataset.number
    var currentItem = this.data.currentItem
    currentItem.name = name
    currentItem.phone = phone
    this.setData({
      currentItem
    })

  },
  handleUpdate(e) {
    this.setData({
      doType: 'update'
    })
  },
  deleteThisItem(e) {
    var driverItems = this.data.driverItems
    var currentItem = this.data.currentItem
    var name = e.currentTarget.dataset.name
    var phone = e.currentTarget.dataset.number
    currentItem.name = name
    currentItem.phone = phone
    console.log(currentItem)
    console.log(driverItems)
    console.log(currentItem.name === driverItems[2].name)
    console.log(currentItem.phone === driverItems[2].phone)
    var temp = currentItem
    var index = driverItems.indexOf(temp)
    console.log(index)
    var that = this
    wx.showModal({
      title: '确认删除',
      content: '',
      success: function (res) {
        if (res.confirm) {
          driverItems.splice(index, 1)
          that.setData({
            driverItems: driverItems
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