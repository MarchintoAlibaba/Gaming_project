const app = getApp();
Page({
  data: {
    imgUrls: [],
    answers: [],
    show_add: false,
    show_help: false,
    show_list: false,
    NowDate: 0,
    QNum: 0,
    timer: null
  },
  onLoad: function(options) {
    var self = this;
    // Do some initialize when page load.
    wx.request({
      url: app.globalData.URL + 'Mobile/GetqdNews',
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        self.setData({
          imgUrls: res.data.data
        });
      }
    });
  },
  onShow: function(options) {
    var self = this;
    // Do some initialize when page load.
    wx.request({
      url: app.globalData.URL + 'Mobile/GetActivitys?_t=' + new Date().getTime(),
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var answers = res.data.data;
        self.setData({
          answers: answers
        });
        self.setData({
          NowDate: new Date(res.header.Date).getTime()
        });
        self.ref();
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
      success: function(res) {
        app.globalData.player = res.data;
        if (res.data.isupshow == true) {
          wx.setStorageSync('isupshow', true);
          wx.setStorageSync('title', res.data.title);
        }
        self.setData({
          QNum: app.globalData.player.QNum
        });
      },
    })
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
  ref() {
    this.setData({
      NowDate: this.data.NowDate + 1000
    });
    var newans = [];
    var answers = this.data.answers;
    for (var i = 0; i < this.data.answers.length; i++) {
      var cha = parseInt(this.data.answers[i].StartDate.substr(6, 13)) - this.data.NowDate;
      if (cha > -400000) {
        answers[i].status = 1;
        if (cha < -150000) {
          answers[i].test = "正在答第" + parseInt(-(cha + 150000) / 25000 + 1) + "题";
        } else if (cha < 0) {
          answers[i].test = "入场中";
        } else if (cha < 10 * 60 * 1000) {
          answers[i].test = "距入场" + ((parseInt(cha / 60000) + "").length == 1 ? "0" + parseInt(cha / 60000) : parseInt(cha / 60000)) + ":" + ((parseInt((cha % 60000) / 1000) + "").length == 1 ? "0" + parseInt((cha % 60000) / 1000) : parseInt((cha % 60000) / 1000));
        } else {
          answers[i].test = ((new Date(parseInt(this.data.answers[i].StartDate.substr(6, 13))).getHours() + "").length == 1 ? "0" + new Date(parseInt(this.data.answers[i].StartDate.substr(6, 13))).getHours() : new Date(parseInt(this.data.answers[i].StartDate.substr(6, 13))).getHours()) + ':' + ((new Date(parseInt(this.data.answers[i].StartDate.substr(6, 13))).getMinutes() + "").length == 1 ? "0" + new Date(parseInt(this.data.answers[i].StartDate.substr(6, 13))).getMinutes() : new Date(parseInt(this.data.answers[i].StartDate.substr(6, 13))).getMinutes()) + "开始入场";
        }
        newans.push(answers[i]);
      }
    }
    for (var i = 0; i < this.data.answers.length; i++) {
      var cha = parseInt(this.data.answers[i].StartDate.substr(6, 13)) - this.data.NowDate;
      if (cha <= -400000) {
        answers[i].status = 2;
        answers[i].test = "已结束";
        newans.push(answers[i]);
      }
    }
    this.setData({
      answers: newans
    });
    this.GetActivity();
  },
  GetActivity() {
    var self = this;
    wx.request({
      url: app.globalData.URL + 'Mobile/GetActivitys?_t=' + new Date().getTime(),
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var answers = self.data.answers;
        self.setData({
          answers: answers
        });
      }
    });
    self.setData({
      timer: setTimeout(function() {
        self.ref();
      }, 1000)
    });
  },
  to_my() {
    wx.navigateTo({
      url: '../my/my_info/my_info',
    })
  },
  to_play() {
    wx.switchTab({
      url: '../play/play',
    })
  },
  to_room_wait(e) {
    var answers = this.data.answers;
    var id = e.currentTarget.dataset.id;
    var isjin = false;
    for (var j = 0; j < answers.length; j++){
      if (answers[j].guid == id){
        if(answers[j].popels.indexOf(app.globalData.player.guid) > -1)
          isjin = true;
      }
    }
    if (this.data.QNum > 0 || isjin) {
      for (var i = 0; i < answers.length; i++) {
        if (answers[i].guid == id) {
          var cha = parseInt(answers[i].StartDate.substr(6, 13)) - this.data.NowDate;
          if (cha > -400000) {
            if (cha < 0) {
              wx.navigateTo({
                url: 'room/room?guid=' + id,
              });
            } else{
              wx.navigateTo({
                url: 'room_wait/room_wait?guid=' + id,
              });
            }
          }else{
            wx.navigateTo({
              url: 'room_wait/room_wait?guid=' + id,
            });
          }
        }
      }
    } else {
      wx.showToast({
        title: "答题次数不足！",
        icon: 'none',
        duration: 2000
      });
    }
  },
  add() {
    this.setData({
      show_add: true
    })
  },
  close_add() {
    this.setData({
      show_add: false
    })
  },
  show_help() {
    this.setData({
      show_help: true
    })
  },
  close_help() {
    this.setData({
      show_help: false
    })
  },
  show_list() {
    this.setData({
      show_list: true
    })
  },
  close_list() {
    this.setData({
      show_list: false
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
      imageUrl: app.globalData.URL + "/img/v2.jpg",
      success: function (res) {
        console.log('成功', res)
      }
    }
  }
})