// pages/manageDriver/manageDriver.js
Page({
  data: {
    showModalStatus: false,
    driverItems: [
      // { driverName: '白小菜', driverPhone: '15823905344' },
      // { driverName: '维嘉', driverPhone: '15332295073' },
      // { driverName: '沫姐', driverPhone: '13950724388' },
      // { driverName: '京查倪', driverPhone: '18923557029' },
      // { driverName: '李纪珠', driverPhone: '15633065666' },
      // { driverName: '李连', driverPhone: '15833066997' },
    ],
    isManage: false,
    doType: '',
    newItem: {
      driverName: '',
      driverPhone: '',
      driverId: ''
    },
    currentName: '',
    currentPhone: ''
  },

  inputNewName(e) {
    var driverName = e.detail.value
    var newItem = this.data.newItem
    newItem.driverName = driverName
    this.setData({
      newItem: newItem
    })
  },
  inputNewNumber(e) {
    var driverPhone = e.detail.value
    var newItem = this.data.newItem
    newItem.driverPhone = driverPhone
    this.setData({
      newItem
    })
  },
  commitUpdate(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var that = this
    var id = this.data.currentId
    console.log(id)
    var currentName = this.data.currentName
    var currentPhone = this.data.currentPhone
    var newItem = this.data.newItem
    var driverItems = this.data.driverItems
    newItem.driverName = newItem.driverName ? newItem.driverName : currentName
    newItem.driverPhone = newItem.driverPhone ? newItem.driverPhone : currentPhone
    var index = 0
    for (var i = 0; i < driverItems.length; i++) {
      if (id === driverItems[i].driverId) {
        index = i
      }
    }
    driverItems.splice(index, 1, newItem)
    this.setData({
      driverItems: driverItems
    })
    console.log(id)
    console.log(newItem.driverName)
    console.log(newItem.driverPhone)
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/updateDriver',
      method: 'POST',
      data: {
        driver_id: id,
        driver_name: newItem.driverName,
        driver_phone: newItem.driverPhone
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        that.setData({
          newItem: {
            driverName: '',
            driverPhone: '',
            driverId: ''
          }
        })
      }
    })
  },
  commitAdd(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    var driverItems = this.data.driverItems
    var newItem = this.data.newItem
    var driverName = newItem.driverName
    var driverPhone = newItem.driverPhone
    driverItems.push(this.data.newItem)
    this.setData({
      driverItems: driverItems
    })
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/addDriver',
      method: 'POST',
      data: {
        driver_name: driverName,
        driver_phone: driverPhone
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
      }
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
    var currentName = this.data.currentName
    var currentPhone = this.data.currentPhone
    var driverName = e.currentTarget.dataset.name
    var driverPhone = e.currentTarget.dataset.number
    var driverId = e.currentTarget.dataset.id
    this.setData({
      currentName: driverName,
      currentPhone: driverPhone,
      currentId: driverId
    })

  },
  handleUpdate(e) {
    this.setData({
      doType: 'update'
    })
  },
  deleteThisItem(e) {
    var driverItems = this.data.driverItems
    var id = e.currentTarget.dataset.id
    var index = 0
    for (var i = 0; i < driverItems.length; i++) {
      if (id === driverItems[i].driverId) {
        index = i
      }
    }
    var that = this
    wx.showModal({
      title: '确认删除',
      content: '',
      success: function (res) {
        if (res.confirm) {
          driverItems.splice(index, 1)
          that.setData({
            driverItems
          })
          wx.request({
            url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/deleteDriver',
            method: 'POST',
            data: {
              driver_id: id
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success(res) {
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
    var that = this
    wx.request({
      url: 'https://creatsharecj.cn/wechatapp/public/index.php/index/Manager/selectDriver',
      success(res) {
        console.log(res.data)
        that.setData({
          driverItems: res.data
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