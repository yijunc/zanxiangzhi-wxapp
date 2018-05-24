//app.js
App({
  onLaunch: function () {
    this.globalData.winWidth = wx.getSystemInfoSync().windowWidth;
    this.globalData.winHeight = wx.getSystemInfoSync().windowHeight;
    // 登录
    this.initLoginStatus();
    wx.onSocketMessage((res) => {
      var ret = JSON.parse(res.data);
      if (ret && ret.controller && ret.action){
        switch(ret.controller){
          case "WechatAuth":
            this.handleWechatAuth(ret.action, ret);
            break;
          default:
            break;
        }
      }
    })
    wx.onSocketClose((res)=>{
      this.globalData.ws = false
    })
  },
  initLoginStatus: function(){
    wx.showLoading({
      title: '微信登录中',
      mask: true
    });
    var uid = wx.getStorageSync('uid');
    var apiToken = wx.getStorageSync('apiToken');
    if (uid && apiToken && this.checkApiToken(uid, apiToken)){
      this.globalData.uid = uid;
      this.globalData.apiToken = apiToken;
      wx.hideLoading();
    }else{
      this.login();
    }
  },
  checkApiToken: function(uid, apiToken){
    return false;
  },
  login: function(){
    wx.showLoading({
      title: '微信登录中',
      mask: true
    });
    wx.login({
      success: res => {
        this.sendLoginCert(res.code);
      },
      fail: res => {
        wx.hideLoading();
        loginFailed();
      }
    })
  },
  sendLoginCert: function(code){
    function send(loginCode){
      var data = {
        controller: 'WechatAuth',
        action: 'login',
        code: loginCode
      };
      wx.sendSocketMessage({ data: JSON.stringify(data) });
    }
    if (!this.globalData.ws) {
      wx.connectSocket({ url: this.config.wsServer });
      this.globalData.ws = true;
      wx.onSocketOpen((res) => {
        send(code);
      })
    }else{
      send(code);
    }
  },
  handleWechatAuth: function(action, ret){
    if(action == "login"){
      wx.hideLoading();
      if(ret.code == 200){
        this.globalData.uid = ret.data.uid;
        this.globalData.apiToken = ret.data.api_token;
        wx.setStorageSync('uid', this.globalData.uid);
        wx.setStorageSync('apiToken', this.globalData.apiToken);
      }else{
        loginFailed();
      }
    }
  },
  loginFailed: function(){
    wx.showModal({
      title: '粗错啦',
      content: '微信登录失败啦~~~要不再试一次？',
      confirmText: '重试',
      success: (res) => {
        if (res.confirm) {
          this.login();
        } else {
          wx.navigateBack({
            delta: -1
          })
        }
      }
    })
  },
  globalData: {
    ws: false,
    uid: null,
    apiToken: null,
    winWidth: null,
    winHeight: null
  },
  config: {
    apiServer: 'http://172.31.234.46:8000/',
    wsServer: 'ws://172.31.234.46:8000/',
  }
})