// pages/index/hb_party/hb_party.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main_bg: app.globalData.URL + 'img/bg2.png',
    show_box: false,
    frecords: [],
    show_alert_box: false,
    alert_title: "",
    hbs: []
  },
  show_box() {
    this.setData({
      show_box: true
    })
  },
  close_box() {
    this.setData({
      show_box: false
    })
  },
  close_alert_box: function () {
    this.setData({
      show_alert_box: false
    })
  },
  to_answe() {
    wx.navigateTo({
      url: '../../answe_union/answe_union',
    })
  },
  to_kai() {
    if (this.data.frecords.length < 3) {
      wx.showToast({
        title: "开启条件不足",
        icon: 'none',
        duration: 2000
      });
    } else {
      var self = this;
      wx.request({
        url: app.globalData.URL + '/Mobile/kaihbpartys',
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if (res.data.code == 200) {
            app.globalData.player.money = app.globalData.player.money + res.data.money;
            self.setData({
              show_alert_box: true,
              alert_title: "恭喜您抢到" + res.data.money + "元！"
            })
          } else {
            wx.showToast({
              title: "今日已开启过了！",
              icon: 'none',
              duration: 2000
            });
          }
        },
      })
      wx.request({
        url: app.globalData.URL + '/Mobile/Gethbpartys?t=' + new Date().getTime(),
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          self.setData({
            hbs: res.data.data
          })
        },
      })
    }
  },
  to_shre() {
    wx.switchTab({
      url: '../../addition/addition',
    })
  },
  to_play() {
    wx.switchTab({
      url: '../../play/play',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.request({
      url: app.globalData.URL + '/Mobile/Gethbfrecords?t=' + new Date().getTime(),
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        self.setData({
          frecords: res.data.data
        })
      },
    })
    wx.request({
      url: app.globalData.URL + '/Mobile/Gethbpartys?t=' + new Date().getTime(),
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        self.setData({
          hbs: res.data.data
        })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {

    }
    console.log(app.globalData.URL)
    return {
      title: '趣答题赚',
      desc: '可以赚钱的小程序!',
      path: '/pages/index/index?jsonStr=' + app.globalData.player.guid,
      imageUrl: app.globalData.URL + "/img/v1.jpg",
      success: function(res) {
        console.log('成功', res)
      }
    }
  }
})