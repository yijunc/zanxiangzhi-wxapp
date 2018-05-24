// pages/device/device.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftTimes: 10,
    deviceId: 1,
    bodyAnimation: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({deviceId: options.id});
    }else{
      wx.showModal({
        title: '粗错啦',
        content: '找不到对应的纸盒机设备~',
        showCancel: false,
        complete: function(){
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
    //this.setData({deviceId, })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  onGetBtnOnclick: function(){
    wx.redirectTo({
      url: '/pages/device/trigger?id=' + this.data.deviceId
    })
  }
})