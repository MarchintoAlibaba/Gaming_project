const app = getApp();
Component({
  pageLifetimes: {
    show() { //页面显示
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
          if (res.data.code == 200) {
            app.globalData.player = res.data;
            self.setData({
              signSum: app.globalData.player.signSum,
              isphone: app.globalData.player.isphone,
              gold: app.globalData.player.gold,
              wfgold: app.globalData.player.wfgold,
              IsOn: app.globalData.player.IsOn,
              IsB: app.globalData.player.IsB,
              islogin: true
            });
            if (res.data.isupshow == true) {
              wx.setStorageSync('isupshow', true);
              wx.setStorageSync('title', res.data.title);
            }
          }
        },
      });
      
      wx.request({
        url: app.globalData.URL + 'Mobile/GetWebConfig',
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.cfg) {
            if (app.globalData.player.IsOn) {
              var cha = new Date(res.header.Date).getTime() - parseInt(app.globalData.player.OticketTime.substr(6, 13));
              if (cha < res.data.cfg.QTime * 1000) {
                self.show_Online(res.data.cfg.QTime * 1000 - cha);
              } else {
                self.setData({
                  Online: "可领取"
                });
              }
            }
            self.setData({
              zh_list: [res.data.cfg.broadcastContent, res.data.cfg.broadcastContent],
              zh_color: res.data.cfg.color
            });
          }
        }
      });
      wx.request({
        url: app.globalData.URL + 'Mobile/GetNews',
        data: {
          'token': wx.getStorageSync('sessionKey'),
          'location': 1
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.news)
            self.setData({
              banners: res.data.news
            });
        }
      });
      wx.request({//获取赛季信息
        url: app.globalData.URL + 'Mobile/GetNews',
        data: {
          'token': wx.getStorageSync('sessionKey'),
          'location': 1
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.news)
            self.setData({
              banners: res.data.news
            });
        }
      });
      wx.request({//获取首页活动列表
        url: app.globalData.URL + 'Mobile/ActivityList',
        data: {
          'token': wx.getStorageSync('sessionKey'),
          'location': 1
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.code == 200){
            self.setData({
              activityList: res.data.data
            });
          }
        }
      });
    },
    hide: function() {
      // 页面被隐藏
      //销毁定时器
      clearTimeout(this.data.timer);
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  properties: {
    is_new: {
      type: String, //类型
      value: '', //默认值
      observer: function(newVal, oldVal) {
        var that = this
        if (newVal == "login") { //判断是否新人
          that.setData({
            new_user_hb: true,
            show_hb_party: false
          })
        }
      }
    }
  },
  data: {
    sign: 0,
    timer: null,
    gold: 0,
    wfgold: 0,
    IsOn: true,
    IsB: true,
    isphone: false,
    QTime: 0,
    show_hb_party: false, //红包派对
    new_user_hb: false, //新人红包
    zh_list: ['发布消息或者回答分享给好友，可以赚经验和红包哦', '发布消息或者回答分享给好友，可以赚经验和红包哦'],
    zh_color: "",
    show_alert_box: false,
    alert_title: "",
    banners: [],
    islogin: true,
    pguid: "",
    Online: ""
  },
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var self = this;
      if (options.jsonStr || decodeURIComponent(options.scene)) {
        self.setData({
          pguid: options.jsonStr || decodeURIComponent(options.scene)
        });
      }
      wx.login({ // 登录
        success: function(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.globalData.URL + '/login/index',
              data: {
                code: res.code,
                guid: self.data.pguid,
                http_type: 'wechat'
              },
              success: function(res) {
                if (res.data.code != 200) {
                  self.showLoading('登录凭证态失败！');
                } else {
                  wx.setStorageSync('sessionKey', res.data.Token);
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
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                if (!wx.getStorageSync('sessionKey')) {
                  return false
                }
                if (!self.data.new_user_hb) {
                  self.setData({
                    show_hb_party: true
                  })
                }
                //发起网络请求
                wx.request({
                  url: app.globalData.URL + '/Mobile/GetMyInfo?t=' + new Date().getTime(),
                  data: {
                    'token': wx.getStorageSync('sessionKey')
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function(res) {
                    if (res.data.is_new) {
                      wx.reLaunch({
                        url: '../index/choose_id/choose_id',
                      })
                    } else {
                      self.getTabBar().setData({
                        selected: 0
                      });
                    }
                  },
                })
              }
            })
          } else {
            self.getTabBar().setData({
              selected: -1
            });
            self.setData({
              islogin: false
            })
          }
        }
      })
    },
    to_login: function() {
      wx.navigateTo({
        url: '../login/login',
      })
    },
    sort_url: function (e) {//首页点击不同的活动列表
      let guid = e.currentTarget.dataset.smile,
        hdName = e.currentTarget.dataset.hdname;
      switch (guid){
        case '5e15a274342e8047ac1887a6': //s1赛季列表
          let name = hdName.substring(0, 2);
          wx.navigateTo({
            url: 'season/season?season=' + name,
          })
        break;
        case '5e15a5b6342e8147acf56e71': //天天抢红包列表
          wx.navigateTo({
            url: 'hb_party/hb_party',
          })
        break;
        case '5e15a5e4342e8147acf56e72': //福利大抽奖列表
          wx.navigateTo({
            url: 'hb_party/hb_party',
          })
        break;
      }
    },
    to_hb_desc: function(e) {
      wx.navigateTo({
        url: 'hb_desc/hb_desc',
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
    to_answe: function() {
      wx.navigateTo({
        url: '../answe_union/answe_union',
      })
    },
    show_Online: function(cha) {
      var self = this;
      if (cha > 0) {
        var online = ((parseInt(cha / 60000) + "").length == 1 ? "0" + parseInt(cha / 60000) : parseInt(cha / 60000)) + ":" + ((parseInt((cha % 60000) / 1000) + "").length == 1 ? "0" + parseInt((cha % 60000) / 1000) : parseInt((cha % 60000) / 1000));
        self.setData({
          Online: "00:" + online,
          timer: setTimeout(function() {
            self.show_Online(cha - 1000);
          }, 1000)
        });
      } else {
        self.setData({
          Online: "可领取"
        });
      }
    },
    to_my: function() {
      wx.switchTab({
        url: '../my/my',
      });
      this.setData({
        new_user_hb: false
      });
    },
    to_sign_in: function() {
      wx.navigateTo({
        url: '../play/sign_in/sign_in',
      })
    },
    close_new_user_hb: function() {
      this.setData({
        show_hb_party: true,
        new_user_hb: false
      });
    },
    close_hb_party: function() {
      this.setData({
        show_hb_party: false
      })
    },
    close_alert_box: function() {
      this.setData({
        show_alert_box: false
      })
    },
    to_online: function(e) {
      if (this.data.Online == "可领取") {
        var self = this;
        wx.request({
          url: app.globalData.URL + 'Mobile/QuOnline',
          data: {
            'token': wx.getStorageSync('sessionKey')
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            if (res.data.code == 200) {
              app.globalData.player.QNum = res.data.QNum;
              app.globalData.player.OticketTime = res.data.OticketTime;
              app.globalData.player.IsOn = res.data.IsOn;
              self.setData({
                IsOn: app.globalData.player.IsOn
              });
              var cha = new Date(res.header.Date).getTime() - parseInt(app.globalData.player.OticketTime.substr(6, 13));
              if (cha < res.data.cfg.QTime * 1000) {
                self.show_Online(res.data.cfg.QTime * 1000 - cha);
              } else {
                self.setData({
                  Online: "可领取"
                });
              }
              wx.showToast({
                title: "答题次数+1",
                icon: 'none',
                duration: 2000
              });
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              });
            }
          }
        });
      } else {
        wx.showToast({
          title: "条件不足，请稍后领取",
          icon: 'none',
          duration: 2000
        });
      }
    },
    to_bx: function(e) {
      console.log(this.data);
      if (this.data.IsB) {
        var self = this;
        wx.request({
          url: app.globalData.URL + 'Mobile/qubaoxiang',
          data: {
            'token': wx.getStorageSync('sessionKey')
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            if (res.data.code == 200) {
              app.globalData.player.gold = res.data.gold;
              app.globalData.player.IsB = res.data.IsB;
              self.setData({
                IsB: app.globalData.player.IsB,
                show_alert_box: true,
                alert_title: "恭喜，宝箱奖励" + res.data.BNum + "金币！",
                gold: app.globalData.player.gold
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              });
            }
          }
        });
      } else {
        wx.showToast({
          title: "条件不足，请稍后领取",
          icon: 'none',
          duration: 2000
        });
      }
    },
    to_fgold: function(e) {
      if (this.data.wfgold > 0) {
        var self = this;
        wx.request({
          url: app.globalData.URL + 'Mobile/Getwfgold',
          data: {
            'token': wx.getStorageSync('sessionKey')
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            self.setData({
              wfgold: 0,
              gold: res.data.gold
            })
            app.globalData.player.wfgold = 0;
            app.globalData.player.gold = res.data.gold;
            wx.showToast({
              title: "领取成功！",
              icon: 'none',
              duration: 2000
            });
          }
        });
      } else {
        wx.showToast({
          title: "暂无可领取收益！",
          icon: 'none',
          duration: 2000
        });
      }
    },
    getPhoneNumber(e) {
      var self = this;
      if (e.detail.errMsg == "getPhoneNumber:ok") {
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
                    wx.showToast({
                      title: "绑定失败，请稍后重试！",
                      icon: 'none',
                      duration: 2000
                    });
                  } else {
                    wx.setStorageSync('sessionKey', res.data.Token);
                    app.globalData.player.isphone = true;
                    app.globalData.player.gold = parseInt(app.globalData.player.gold) + 1000;
                    self.setData({
                      isphone: app.globalData.player.isphone,
                      gold: app.globalData.player.gold
                    });
                    wx.showToast({
                      title: "绑定成功，获得金币1000",
                      icon: 'none',
                      duration: 2000
                    });
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