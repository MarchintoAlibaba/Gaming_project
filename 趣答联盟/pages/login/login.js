// pages/index/login.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    login_img: app.globalData.URL + 'img/login.png',
    url: '../index/index',
    is_new: 'login',
    pguid: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    if (options.jsonStr) {
      self.setData({
        pguid: options.jsonStr || decodeURIComponent(options.scene)
      });
    }
    wx.login({ // 登录
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.URL + '/login/index',
            data: {
              code: res.code,
              guid: self.data.pguid,
              http_type: 'wechat'
            },
            success: function(res) {
              if (res.data.code != 200) {
                that.showLoading('登录凭证态失败！');
              } else {
                wx.setStorageSync('sessionKey', res.data.Token);
              }
            },
          })
        } else {
          //console.log(res.errMsg)
        }
      },
      //登录失败
      fail: function(res) {
        //console.log('登录失败')
      }
    });


    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              if (!wx.getStorageSync('sessionKey')) {
                return false
              }
              //发起网络请求
              wx.request({
                url: app.globalData.URL + '/Mobile/GetMyInfo?t=' + new Date().getTime(),
                data: {
                  'token': wx.getStorageSync('sessionKey')
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function(res) {
                  app.globalData.player = res.data;
                  if (res.data.isupshow == true) {
                    wx.setStorageSync('isupshow', true);
                    wx.setStorageSync('title', res.data.title);
                  }
                  if (res.data.is_new) {
                    wx.reLaunch({
                      url: '../index/choose_id/choose_id',
                    })
                  } else {
                    wx.reLaunch({
                      url: '../index/index?is_new=' + res.data.is_new,
                    })
                  }
                },
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    var that = this
    var res2 = e.detail.userInfo
    if (!res2) {
      wx.reLaunch({
        url: '../index/index',
      })
      return false
    }
    //头像昵称传给后台
    //发起网络请求
    wx.request({
      url: app.globalData.URL + '/Mobile/saveMyInfo',
      data: {
        'token': wx.getStorageSync('sessionKey'),
        'avatarUrl': e.detail.userInfo.avatarUrl,
        'city': e.detail.userInfo.city,
        'gender': e.detail.userInfo.gender,
        'language': e.detail.userInfo.language,
        'nickName': e.detail.userInfo.nickName,
        'province': e.detail.userInfo.province
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        app.globalData.player = res.data;
        wx.setStorageSync('music', true);
        wx.setStorageSync('acoustics', true);
        wx.setStorageSync('isupshow', false);
        if (res.data.isupshow == true) {
          wx.setStorageSync('isupshow', true);
          wx.setStorageSync('title', res.data.title);
        }
        if (res.data.is_new) {
          wx.reLaunch({
            url: '../index/choose_id/choose_id',
          })
        } else {
          wx.reLaunch({
            url: '../index/index?is_new=' + res.data.is_new,
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: '趣答题赚',
      desc: '可以赚钱的小程序!',
      path: '/pages/index/index?jsonStr=' + app.globalData.player.guid,
      imageUrl: app.globalData.URL + "/img/v2.jpg",
      success: function (res) {
      }
    }
  }
})