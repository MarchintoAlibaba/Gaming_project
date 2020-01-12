// pages/answe_union/room_wait/room_wait.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guid: "",
    //倒计时 
    day: '00',
    hou: '00',
    min: '00',
    sec: '00',
    //结束的日期
    endtime_countdown: 0,
    newTime: 0,
    show_btn: 0,
    timer: null,
    banners: []
  },
  countDown_: function() { //倒计时函数
    var endTime = this.data.endtime_countdown;
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = this.data.newTime;
    let obj = null;
    // 如果活动未结束，对时间进行处理
    var that = this;
    if (endTime - newTime > 0) {
      let time = (endTime - newTime) / 1000;
      // 获取天、时、分、秒
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
      that.setData({
        day: that.timeFormat(day),
        hou: that.timeFormat(hou),
        min: that.timeFormat(min),
        sec: that.timeFormat(sec),
        show_btn: 0,
        newTime: newTime + 1000
      });
    } else if (endTime - newTime <= 0 && endTime - newTime > -400000) {
      that.setData({
        show_btn: 1,
        day: '00',
        hou: '00',
        min: '00',
        sec: '00'
      });
    }else{
      that.setData({
        show_btn: 2,
        day: '00',
        hou: '00',
        min: '00',
        sec: '00'
      });
    }
  },
  countDown: function() {
    var that = this;
    that.countDown_();
    //每一秒钟执行一次 
    that.setData({
      timer: setTimeout(function () {
        that.countDown();
      }, 1000)
    });
  },
  to_room() {
    var self = this;
    wx.navigateTo({
      url: '../room/room?guid=' + self.data.guid,
    })
  },
  to_app: function (e) {
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.id,//小程序appid
      success(res) {
        // 打开成功
      },
      fail(res) {
        // 打开失败
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      guid: options.guid
    });
    var self = this;
    wx.request({
      url: app.globalData.URL + 'Mobile/GetNews',
      data: {
        'token': wx.getStorageSync('sessionKey'),
        'location': 4
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        self.setData({
          banners: res.data.news
        });
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
    var self = this;
    // Do some initialize when page load.
    wx.request({
      url: app.globalData.URL + 'Mobile/GetActivity?guid=' + self.data.guid,
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        self.setData({
          newTime: new Date(res.header.Date).getTime(),
          endtime_countdown: parseInt(res.data.ent.StartDate.substr(6, 13))
        });
        self.countDown();
      }
    });
  },
  timeFormat: function(param) {
    return param < 10 ? '0' + param : param;
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    //销毁定时器
    clearTimeout(this.data.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //销毁定时器
    clearTimeout(this.data.timer);
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