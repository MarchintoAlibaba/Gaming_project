// pages/my/edit_info/edit_info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectData: ['学生', '宝妈', '上班', '待业', '下岗', '无业'], //下拉职业的数据
    work: 0,
    selectData2: ['16以内', '16-18', '19-25', '26-30', '31-40', '41-50', '50以上'], //下拉职业的数据
    age: 0,
    alipay: "",
    alipayname: "",
    wx: "",
    qq: ""
  },
  bindPickerChange: function(e) {
    this.setData({
      work: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    this.setData({
      age: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.request({
      url: app.globalData.URL + '/Mobile/getmyother?t=' + new Date().getTime(),
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        self.setData({
          alipay: res.data.alipay,
          alipayname: res.data.alipayname,
          work: res.data.work,
          age: res.data.age,
          wx: res.data.wx,
          qq: res.data.qq
        });
      },
    });
  },
  savecash: function (options) {
    var self = this;
    wx.request({
      url: app.globalData.URL + '/Mobile/savecash',
      data: {
        'token': wx.getStorageSync('sessionKey'),
        'alipay': self.data.alipay,
        'alipayname': self.data.alipayname,
        'work': self.data.work,
        'age': self.data.age,
        'wx': self.data.wx,
        'qq': self.data.qq
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: "提交保存成功！",
          icon: 'none',
          duration: 2000
        });
      },
    });
  },
  alipayInput: function (e) {
    this.setData({
      alipay: e.detail.value
    })
  },
  alipaynameInput: function (e) {
    this.setData({
      alipayname: e.detail.value
    })
  },
  wxInput: function (e) {
    this.setData({
      wx: e.detail.value
    })
  },
  qqInput: function (e) {
    this.setData({
      qq: e.detail.value
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