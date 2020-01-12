// pages/my/to_cash/to_cash.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      num: "1",
      checked: true
    }, {
      num: "5",
      checked: false
    }, {
      num: "10",
      checked: false
    }, {
      num: "30",
      checked: false
    }, {
      num: "50",
      checked: false
    }, {
      num: "100",
      checked: false
    }],
    smoney: 0,
    CashNum: 0
  },
  checked(e) {
    var that = this
    if (e.target.dataset.checked == true) {
      return
    } else {
      var list1 = that.data.list
      for (var i = 0; i < list1.length; i++) {
        if (list1[i].checked == true) {
          list1[i].checked = false
        }
        if (e.target.dataset.num == list1[i].num) {
          list1[i].checked = true
        }
      }
      that.setData({
        list: list1
      })
    }
  },
  go_cash(e) {
    var money = 1;
    var list1 = this.data.list
    for (var i = 0; i < list1.length; i++) {
      if (list1[i].checked == true) {
        money = list1[i].num
      }
    }
    if (money >= this.data.smoney) {
      wx.showToast({
        title: "账户余额不足！",
        icon: 'none',
        duration: 2000
      });
    } else if (this.data.CashNum <= 0) {
      wx.showToast({
        title: "提现次数不足！",
        icon: 'none',
        duration: 2000
      });
    } else {
      var self = this;
      wx.request({
        url: app.globalData.URL + '/Mobile/Getcash?t=' + new Date().getTime(),
        data: {
          'money': money,
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: "提现成功，等待审核！",
              icon: 'none',
              duration: 2000
            });
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
                self.setData({
                  smoney: (parseFloat(app.globalData.player.money) + parseFloat(app.globalData.player.gold / 10000)).toFixed(2),
                  CashNum: app.globalData.player.CashNum
                });
              },
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            });
          }
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      smoney: (parseFloat(app.globalData.player.money) + parseFloat(app.globalData.player.gold / 10000)).toFixed(2),
      CashNum: app.globalData.player.CashNum
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