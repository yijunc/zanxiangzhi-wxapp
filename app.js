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
    if (uid && apiToken){
      this.checkApiToken(uid, apiToken, (success)=>{
        if(success){
          this.globalData.uid = uid;
          this.globalData.apiToken = apiToken;
        }else{
          this.login();
        }
        wx.hideLoading();
      });
    }else{
      this.login();
    }
  },
  checkApiToken: function(uid, apiToken, func){
    wx.request({
      url: this.config.apiServer + 'api/user/verify_token',
      method: 'GET',
      data: {
        uid: this.globalData.uid,
        api_token: this.globalData.apiToken
      },
      success: res => {
        var ret = res.data;
        if(ret && ret.code && ret.code == 200){
          if(func){func(true);}
        }else{
          if (func) {func(false);}
        }
      },
      fail: res => {
        if(func) {func(false);}
      }
    })
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
        this.loginFailed();
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
        this.loginFailed();
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
    apiServer: 'https://www.zanxiangzhi.com/',
    wsServer: 'wss://www.zanxiangzhi.com/',
    qrCodeStartWith: 'https://www.zanxiangzhi.com/device/'
  }
})