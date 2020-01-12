const app = getApp();
Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        selected: 2
      });
      this.setData({
        fnum: app.globalData.player.fnum,
        fgold: app.globalData.player.fgold
      });
      var self = this;
      wx.request({
        url: app.globalData.URL + 'Mobile/Getfrecords?t=' + new Date().getTime(),
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          self.setData({
            frecords: res.data.data,
            friends: res.data.friends
          });
        }
      });
    }
  },
  attached: function () {
    console.log(1)
  },
  data: {
    fnum: 0,
    fgold: 0,
    frecords: [],
    friends: [],
    show_box: false
  },
  methods:{
    to_rule() {
      wx.navigateTo({
        url: 'rule/rule',
      })
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
    //转发
    onShareAppMessage: function (res) {
      if (res.from === 'button') {

      }
      return {
        title: '趣答题赚',
        desc: '可以赚钱的小程序!',
        path: '/pages/index/index?jsonStr=' + app.globalData.player.guid,
        imageUrl: app.globalData.URL + "/img/V1.png",
        success: function (res) {
          console.log('成功', res)
        }
      }
    }
  }
})

