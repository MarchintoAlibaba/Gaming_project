// pages/answe_union/result/result.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    close_box: true,
    guid: "",
    pai: [],
    myinfo: {},
    index: 0,
    num: 0,
    isl: true
  },
  close_box() {
    this.setData({
      close_box: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    this.setData({
      guid: options.guid
    });
    wx.request({
      url: app.globalData.URL + 'Mobile/Getresult?guid=' + self.data.guid,
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.myinfo) {
          self.setData({
            pai: res.data.data,
            myinfo: res.data.myinfo,
            index: res.data.index,
            num: parseInt((1 - (res.data.index / res.data.sum)) * 100)
          });
        } else {
          wx.redirectTo({
            url: '../room_wait/room_wait?guid=' + self.data.guid,
          });
        }
      }
    });
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
    var self = this;
    if (res.from === 'button') {
      wx.request({
        url: app.globalData.URL + 'Mobile/Getresultl?guid=' + self.data.guid,
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          self.setData({
            isl: false
          });
        }
      });
    }
    return {
      title: '趣答题赚',
      desc: '可以赚钱的小程序!',
      path: '/pages/index/index?jsonStr=' + app.globalData.player.guid,
      imageUrl: app.globalData.URL + "/img/v2.jpg",
      success: function(res) {

      }
    }
  }
})