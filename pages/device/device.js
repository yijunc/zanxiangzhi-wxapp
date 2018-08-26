// pages/device/device.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftTimes: 10,
        deviceId: 1,
        activationPeriod: 5,
        bodyAnimation: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                deviceId: options.id
            });
            this.getLeftTimes();
        } else {
            wx.showModal({
                title: '粗错啦',
                content: '找不到对应的纸盒机设备~',
                showCancel: false,
                complete: function() {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
        }
        //this.setData({deviceId, })
    },
    getLeftTimes: function() {
        wx.showLoading({
            title: '拼命加载中',
            mask: true
        })
        wx.request({
            url: app.config.apiServer + "api/user/get_left_times",
            method: 'get',
            data: {
                uid: app.globalData.uid,
                api_token: app.globalData.apiToken,
            },
            success: res => {
                wx.hideLoading();
                var ret = res.data;
                if (ret && ret.code && ret.code === 200) {
                    this.setData({
                        leftTimes: ret.data.left_times
                    });
                }
            },
            fail: res => {
                wx.hideLoading();
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    onGetBtnOnclick: function() {
        wx.redirectTo({
            url: '/pages/device/trigger?id=' + this.data.deviceId + '&period=' + this.data.activationPeriod,
        })
    },

    onActivationChange: function(event) {
        this.setData({
            activationPeriod: event.detail.value,
        })
    }
})