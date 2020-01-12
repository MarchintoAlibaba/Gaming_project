const app = getApp();
Component({
  pageLifetimes: {
    show() {
      var self = this;
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
            self.setData({
              show_alert_box: wx.getStorageSync('isupshow'),
              alert_title: wx.getStorageSync('title')
            });
          }
        },
      });
      wx.request({
        url: app.globalData.URL + 'Mobile/GetNews',
        data: {
          'token': wx.getStorageSync('sessionKey'),
          'location': 5
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
      this.setData({
        nickName: app.globalData.player.nickName,
        avatarUrl: app.globalData.player.avatarUrl,
        integral: app.globalData.player.integral,
        isphone: app.globalData.player.isphone,
        exp: app.globalData.player.exp,
        sumexp: app.globalData.player.sumexp,
        money: app.globalData.player.money,
        smoney: (parseFloat(app.globalData.player.money) + parseFloat(app.globalData.player.gold / 10000)).toFixed(2),
        gold: app.globalData.player.gold,
        num: parseInt(app.globalData.player.sumexp == 0 ? 0 : app.globalData.player.exp / app.globalData.player.sumexp * 100),
        show_alert_box: wx.getStorageSync('isupshow'),
        alert_title: wx.getStorageSync('title')
      });
      this.getTabBar().setData({
        selected: 3
      });
    }
  },
  data: {
    nickName: "",
    avatarUrl: "",
    integral: "1",
    isphone: false,
    exp: "",
    sumexp: "",
    money: "",
    smoney: "",
    gold: "",
    num: 0,
    show_alert_box: false,
    alert_title: "",
    banners: []
  },
  attached: function() {},
  methods: {
    to_my_info: function() {
      wx.navigateTo({
        url: 'my_info/my_info',
      })
    },
    to_app: function(e) {
      if (e.currentTarget.dataset.id) {
        wx.navigateToMiniProgram({
          appId: e.currentTarget.dataset.id, //小程序appid
          success(res) {
            // 打开成功
          },
          fail(res) {
            // 打开失败
          }
        })
      }
    },
    close_alert_box: function() {
      wx.setStorageSync('isupshow', false);
      this.setData({
        show_alert_box: false
      });
      var self = this;
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
            self.setData({
              show_alert_box: wx.getStorageSync('isupshow'),
              alert_title: wx.getStorageSync('title')
            });
          }
        },
      });
    },
    to_OR_code: function() {
      wx.navigateTo({
        url: 'OR_code/OR_code',
      })
    },
    to_system: function() {
      wx.navigateTo({
        url: 'system_detail/system_detail',
      })
    },
    to_set: function() {
      wx.navigateTo({
        url: 'to_set/to_set',
      })
    },
    to_vip_desc: function() {
      wx.navigateTo({
        url: 'vip_desc/vip_desc',
      })
    },
    to_detail1: function () {
      wx.navigateTo({
        url: 'money_detail/money_detail?jsonStr=1',
      })
    },
    to_detail2: function () {
      wx.navigateTo({
        url: 'money_detail/money_detail?jsonStr=3',
      })
    },
    to_edit_info: function() {
      wx.navigateTo({
        url: 'edit_info/edit_info',
      })
    },
    to_cash: function() {
      wx.navigateTo({
        url: 'to_cash/to_cash',
      })
    },
    getPhoneNumber(e) {
      var self = this;
      if (e.detail.errMsg == "getPhoneNumber:ok" && !app.globalData.player.isphone) {
        wx.login({ // 登录
          success: function(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: app.globalData.URL + '/login/iphonesave',
                data: {
                  code: res.code,
                  'iv': e.detail.iv,
                  'encryptedData': e.detail.encryptedData
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function(res) {
                  if (res.data.code != 200) {
                    self.showLoading('登录凭证态失败！')
                  } else {
                    wx.setStorageSync('sessionKey', res.data.Token);
                    app.globalData.player.isphone = true;
                    self.setData({
                      isphone: app.globalData.player.isphone
                    });
                    wx.showToast({
                      title: "绑定成功，获得金币1000",
                      icon: 'none',
                      duration: 2000
                    });
                    wx.navigateTo({
                      url: 'edit_info/edit_info',
                    })
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
      }
    },
    //转发
    onShareAppMessage: function(res) {
      if (res.from === 'button') {

      }
      return {
        title: '趣答题赚',
        desc: '可以赚钱的小程序!',
        path: '/pages/index/index?jsonStr=' + app.globalData.player.guid,
        imageUrl: app.globalData.URL + "/img/v2.jpg",
        success: function(res) {}
      }
    }
  }
})