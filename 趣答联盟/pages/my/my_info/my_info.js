// pages/my/my_info/my_info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    integral: "1",
    exp: "",
    sumexp: "",
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName: app.globalData.player.nickName,
      avatarUrl: app.globalData.player.avatarUrl,
      integral: app.globalData.player.integral,
      exp: app.globalData.player.exp,
      sumexp: app.globalData.player.sumexp,
      num: parseInt(app.globalData.player.sumexp == 0 ? 0 : app.globalData.player.exp / app.globalData.player.sumexp * 100)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  to_OR_code: function () {
    wx.navigateTo({
      url: '../OR_code/OR_code',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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