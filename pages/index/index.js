//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mapCtx: null,
    mapControls: [
      {
        id: 1,
        iconPath: '/images/map_bg.png',
        position: {
          left:0,
          top: app.globalData.winHeight - 250,
          width: app.globalData.winWidth,
          height: 250
        },
        clickable: false
      },
      {
        id: 2,
        iconPath: '/images/main_scan_btn.png',
        position: {
          left: app.globalData.winWidth/2 - 140/2,
          top: app.globalData.winHeight - 200,
          width: 140,
          height: 140
        },
        clickable: true
      },
      {
        id: 3,
        iconPath: '/images/main_locate_btn.png',
        position: {
          left: app.globalData.winWidth / 6 - 70 / 2,
          top: app.globalData.winHeight - 170,
          width: 70,
          height: 70
        },
        clickable: true
      },
      {
        id: 4,
        iconPath: '/images/main_wallet_btn.png',
        position: {
          left: app.globalData.winWidth * 5 / 6 - 70 / 2,
          top: app.globalData.winHeight - 170,
          width: 70,
          height: 70
        },
        clickable: true
      },
      {
        id: 5,
        iconPath: '/images/map_marker_here.png',
        position: {
          left: app.globalData.winWidth /2 - 20 / 2,
          top: app.globalData.winHeight /2 - 14 - 44,
          width: 20,
          height: 44
        },
        clickable: false
      }
    ]
  },
  onLoad: function () {
    this.setUpMap();
  },
  setUpMap: function () {

  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('main-map');
    this.mapCtx.moveToLocation();
  },
  tipOnclick: function () {
    wx.navigateTo({
      url: '/pages/device/device?id=1'
    })
  },
  onMapControlTap: function(e){
    switch(e.controlId){
      case 2:
        this.onScan();
        break;
      case 3:
        this.mapCtx.moveToLocation();
        break;
      case 4:
        wx.showModal({
          title: '敬请期待',
          content: '钱包功能暂未开通',
          showCancel: false
        });
        break;
    }
  },
  onScan: function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/device/device?id=1',
        })
      }
    });
  }
})