// pages/answe_union/room/room.js
const app = getApp();
const innerAudioContextbg = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guid: "",
    show_list: 0,
    rows: [],
    NowDate: 0,
    StartDate: 0,
    num: 0,
    problem_num: "答题即将开始",
    problem: "答题时间越短，等级越高，分数就越高",
    Answers: [],
    setInter: '',
    index: -1,
    xuan: -1,
    answer: -1,
    pai: [],
    mypai: {},
    jifen: 0,
    shijian: 0,
    lv: 0,
    isda: false,
    timer: null,
    innerAudioContext: null
  },
  to_result() {
    wx.navigateTo({
      url: '../result/result',
    })
  },
  show_list() {
    this.setData({
      show_list: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      guid: options.guid
    });
    if (wx.getStorageSync('music')) {
      //添加音效
      innerAudioContextbg.autoplay = true // 是否自动开始播放，默认为 false
      innerAudioContextbg.loop = true // 是否循环播放，默认为 false
      wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
        obeyMuteSwitch: false, // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
        success: function(e) {
          console.log(e)
          console.log('play success')
        },
        fail: function(e) {
          console.log(e)
          console.log('play fail')
        }
      })
      innerAudioContextbg.src = app.globalData.URL + '/mp3/bg.mp3'; // 音频资源的地址
      innerAudioContextbg.onPlay(() => { // 监听音频播放事件
        console.log('开始播放')
      })
      innerAudioContextbg.onError((res) => { // 监听音频播放错误事件
        console.log(res.errMsg)
        console.log(res.errCode)
      })
      innerAudioContextbg.play();
    }
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
      url: app.globalData.URL + 'Mobile/GetQues?guid=' + self.data.guid,
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        self.setData({
          NowDate: new Date(res.header.Date).getTime(),
          StartDate: parseInt(res.data.ent.StartDate.substr(6, 13)),
          rows: res.data.data
        });
      }
    });
    self.ref();
  },
  ref: function() {
    var self = this;
    var cha = this.data.NowDate - this.data.StartDate;
    if (cha < 150000) {
      if (cha > 0) {
        this.setData({
          num: 150 - parseInt(cha / 1000)
        });
      }
    } else if (cha > 400000) {
      this.setData({
        num: 0
      });
      wx.redirectTo({
        url: '../result/result?guid=' + this.data.guid,
      });
    } else if (cha > 150000 && cha < 400000) {
      if (parseInt((cha - 150000) % 25000 / 1000) <= 10) {
        this.setData({
          num: 10 - parseInt((cha - 150000) % 25000 / 1000)
        });
      }
      var index = parseInt((cha - 150000) / 25000);
      if (this.data.index != index) {
        this.setData({
          index: index,
          show_list: 1,
          problem_num: "第" + (index + 1) + "/" + this.data.rows.length + "题",
          problem: this.data.rows[index].Content,
          Answers: this.data.rows[index].Answers,
          xuan: -1,
          answer: -1,
          jifen: 0
        });
      } else {
        if (parseInt((cha - 150000) % 25000) < 10000) {
          if (this.data.show_list != 1) {
            this.setData({
              show_list: 1
            });
          }
        } else if (parseInt((cha - 150000) % 25000) < 15000) {
          if (this.data.show_list != 2) {
            this.setData({
              show_list: 2
            });
            this.to_dati();
          }
        } else {
          if (this.data.show_list != 3) {
            this.setData({
              show_list: 3
            });
          }
        }
      }
    }
    //每一秒钟执行一次 
    self.setData({
      timer: setTimeout(function() {
        self.setData({
          NowDate: self.data.NowDate + 1000
        });
        self.ref();
      }, 1000)
    });
  },
  to_xuan(e) {
    if (this.data.show_list == 1 && this.data.isda == false) {
      var xuan = e.currentTarget.dataset.id;
      this.setData({
        isda: true,
        xuan: xuan
      });
      this.to_dati();
    }
  },
  to_dati() {
    var self = this;
    wx.request({
      url: app.globalData.URL + 'Mobile/dati?guid=' + self.data.guid + "&index=" + self.data.index + "&Answer=" + self.data.xuan + "&_t=" + new Date().getTime(),
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.Answer >= 0) {
          if (res.data.code == 403) {
            wx.redirectTo({
              url: '../../index/index',
            });
          }
          if (self.data.jifen == 0) {
            self.setData({
              answer: res.data.Answer,
              problem_num: "回答错误，未获得积分！",
              problem: ""
            });
            if (wx.getStorageSync('acoustics')) {
              //添加音效
              const innerAudioContext = wx.createInnerAudioContext()
              innerAudioContext.autoplay = true // 是否自动开始播放，默认为 false
              innerAudioContext.loop = false // 是否循环播放，默认为 false
              wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
                obeyMuteSwitch: false, // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
                success: function(e) {
                  console.log(e)
                  console.log('play success')
                },
                fail: function(e) {
                  console.log(e)
                  console.log('play fail')
                }
              })
              innerAudioContext.src = app.globalData.URL + '/mp3/no.mp3'; // 音频资源的地址
              innerAudioContext.onPlay(() => { // 监听音频播放事件
                console.log('开始播放')
              })
              innerAudioContext.onError((res) => { // 监听音频播放错误事件
                console.log(res.errMsg)
                console.log(res.errCode)
                innerAudioContext.destroy();
              })
              innerAudioContext.onEnded(() => {
                innerAudioContext.destroy();
              })
            }
          } else {
            self.setData({
              answer: res.data.Answer,
              problem_num: "获得积分：" + self.data.jifen + "分",
              problem: "其中：答题时间+" + self.data.shijian + "，等级加分+" + self.data.lv
            });
            if (wx.getStorageSync('acoustics')) {
              //添加音效
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = true // 是否自动开始播放，默认为 false
              innerAudioContext.loop = false // 是否循环播放，默认为 false
              wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
                obeyMuteSwitch: false, // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
                success: function(e) {
                  console.log(e)
                  console.log('play success')
                },
                fail: function(e) {
                  console.log(e)
                  console.log('play fail')
                }
              })
              innerAudioContext.src = app.globalData.URL + '/mp3/yes.mp3'; // 音频资源的地址
              innerAudioContext.onPlay(() => { // 监听音频播放事件
                console.log('开始播放')
              })
              innerAudioContext.onError((res) => { // 监听音频播放错误事件
                console.log(res.errMsg)
                console.log(res.errCode)
                innerAudioContext.destroy();
              })
              innerAudioContext.onEnded(() => {
                innerAudioContext.destroy();
              })
            }
          }
          self.to_pai();
        } else {
          self.setData({
            jifen: res.data.jifen,
            shijian: res.data.shijian,
            lv: res.data.lv
          });
        }
      }
    });
  },
  to_pai() {
    var self = this;
    wx.request({
      url: app.globalData.URL + 'Mobile/Getdati?guid=' + self.data.guid + "&_t=" + new Date().getTime(),
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        self.setData({
          isda: false,
          pai: res.data.data,
          mypai: res.data.my
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    //销毁定时器
    clearTimeout(this.data.timer);
    innerAudioContextbg.stop();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //销毁定时器
    clearTimeout(this.data.timer);
    innerAudioContextbg.stop();
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
})