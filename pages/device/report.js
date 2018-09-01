// pages/device/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceId: null,
    uploadPics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      deviceId: options.id
    })
  },

  onAddPicBtnClick: function(){
    wx.chooseImage({
      success: (res) => {
        if(res && res.tempFilePaths){
          if (this.data.uploadPics.length + res.tempFilePaths.length <= 5){
            this.setData({
              uploadPics: this.data.uploadPics.concat(res.tempFilePaths)
            })
          }else{
            wx.showModal({
              title: '粗错啦',
              content: '最多上传5张图片啦~~~',
              showCancel: false
            })
          }
        }else{
          wx.showModal({
            title: '粗错啦',
            content: '没有可用的图片~~~',
            showCancel: false
          })
        }
      },
    })
  },

  imageOnClick: function(event){
    if (event && event.target && event.target.dataset && event.target.dataset.src){
      wx.previewImage({
        current: event.target.dataset.src,
        urls: this.data.uploadPics
      })
    }
  },
  
  imageCancelOnclick: function(event){
    if (event && event.target && event.target.dataset && event.target.dataset.src) {
      var index = this.data.uploadPics.indexOf(event.target.dataset.src);
        if (index > -1) {
          this.data.uploadPics.splice(index, 1);
          this.setData({
            uploadPics: this.data.uploadPics
          });
        }
    }
  },

  inFadeOutList: function(src){
    console.log("asking:"+src);
    return (this.data.fadeOutList.indexOf(src) > -1);
  }

})