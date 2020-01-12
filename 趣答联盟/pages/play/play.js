const app = getApp();
Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        selected: 1
      });
      var self = this;
      wx.request({
        url: app.globalData.URL + 'Mobile/GetflNews?t=' + new Date().getTime(),
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          self.setData({
            signs: res.data.sgindata,
            vips: res.data.vipdata,
            exps: res.data.expdata,
            playgold: res.data.playgold
          });
        }
      });
      self.countdown();

      self.setData({
        times2: new Date().getTime()
      });
    }
  },
  attached: function() {

  },
  data: {
    signs: [],
    vips: [],
    exps: [],
    playgold: 0,
    timetext: "",
    timer: null,
    times: {},
    times2: 0
  },
  methods: {
    to_sign_in: function() {
      wx.navigateTo({
        url: 'sign_in/sign_in',
      })
    },
    to_app: function(e) {
      var self = this;
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.id, //小程序appid
        success(res) {
          // 打开成功
          var times = self.data.times;
          times[e.currentTarget.dataset.id] = new Date().getTime();
        },
        fail(res) {
          // 打开失败
        }
      })
    },
    to_tiyan: function(e) {
      var self = this;
      if (this.data.times[e.currentTarget.dataset.id]) {
        if ((this.data.times2 - this.data.times[e.currentTarget.dataset.id]) > 60000) {
          wx.request({
            url: app.globalData.URL + 'Mobile/gettiyan?t=' + new Date().getTime(),
            data: {
              'token': wx.getStorageSync('sessionKey'),
              'guid': e.currentTarget.dataset.guid
            },
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              wx.showToast({
                title: "领取成功！",
                icon: 'none',
                duration: 2000
              });
              wx.request({
                url: app.globalData.URL + 'Mobile/GetflNews?t=' + new Date().getTime(),
                data: {
                  'token': wx.getStorageSync('sessionKey')
                },
                header: {
                  'content-type': 'application/json'
                },
                success(res2) {
                  self.setData({
                    exps: res2.data.expdata
                  });
                }
              });
              wx.request({
                url: app.globalData.URL + '/Mobile/GetMyInfo?t=' + new Date().getTime(),
                data: {
                  'token': wx.getStorageSync('sessionKey')
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  app.globalData.player = res.data;
                  if (res.data.isupshow == true) {
                    wx.setStorageSync('isupshow', true);
                    wx.setStorageSync('title', res.data.title);
                  }
                },
              });
            }
          });
        } else {
          wx.navigateToMiniProgram({
            appId: e.currentTarget.dataset.id, //小程序appid
            success(res) {
              // 打开成功
              var times = {};
              times[e.currentTarget.dataset.id] = new Date().getTime();
              self.setData({
                times: times
              });
            },
            fail(res) {
              // 打开失败
            }
          })
        }
      } else {
        wx.navigateToMiniProgram({
          appId: e.currentTarget.dataset.id, //小程序appid
          success(res) {
            // 打开成功
            var times = {};
            times[e.currentTarget.dataset.id] = new Date().getTime();
            self.setData({
              times: times
            });
          },
          fail(res) {
            // 打开失败
          }
        })
      }
    },
    countdown: function() {
      let now = new Date(); // 获取当前时间
      let hour = now.getHours(); // 时
      let min = now.getMinutes(); // 分
      let sec = now.getSeconds(); // 秒

      let h = 24 - hour; // 倒计时 时
      if (min > 0 || sec > 0) {
        h -= 1
      }
      let m = 60 - min; // 倒计时 分
      if (sec > 0) {
        m -= 1
      }
      if (m == 60) {
        m = 0
      }
      let s = 60 - sec; // 倒计时 秒
      if (s == 60) {
        s = 0
      }
      h = h.toString();
      m = m.toString();
      s = s.toString();
      if (h.length == 1) {
        h = '0' + h
      }
      if (m.length == 1) {
        m = '0' + m
      }
      if (s.length == 1)
        s = '0' + s
      var result = h + ':' + m + ':' + s;
      var self = this;
      this.setData({
        timetext: result,
        timer: setTimeout(function() {
          self.countdown();
        }, 1000)
      });
    },
    onUnload: function() {
      // 页面被隐藏
      //销毁定时器
      clearTimeout(this.data.timer);
    },
    onHide: function() {
      // 页面被隐藏
      //销毁定时器
      clearTimeout(this.data.timer);
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
  }
})