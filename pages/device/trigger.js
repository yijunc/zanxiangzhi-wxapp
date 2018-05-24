// pages/device/trigger.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    success: true,
    thumbs_up_count: 0,
    deviceId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      deviceId: options.id
    });
    wx.showLoading({
      title: '拼命加载中'
    })
    setTimeout(()=>{
      wx.hideLoading();
      this.setData({
        loading: false
      });
      // setTimeout(()=>{
      //   wx.navigateTo({
      //     url: '/pages/extra/link?id='+this.data.deviceId
      //   })
      // }, 1000);
    }, 1000);
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
  
  onReturnBtnOnclick: function(){
    wx.navigateBack();
  }


})