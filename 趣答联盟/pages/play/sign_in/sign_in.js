// pages/index/sign_in/sign_in.js
const app = getApp();
var util = require('../../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    day1: "",
    day2: "",
    day3: "",
    day4: "",
    day5: "",
    day6: "",
    day7: "",
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
    n7: "",
    t1: "",
    t2: "",
    t3: "",
    t4: "",
    t5: "",
    t6: "",
    t7: "",
    issign: true,
    sign: 0,

    size: { //转盘大小可配置
      w: 599,
      h: 600
    },
    musicflg: true,
    fastJuedin: false,
    repeat: false,
    xiaojuedingArr: [],
    s_awards: '？', //结果
    iszhuan: false, //是否能转

    share: true,

    //画布--------------------------------
    canvasWidth: 400,
    canvasHeight: 650,
    showCanvasFlag: false,
    show_box: false,
    show_alert_box: false,
    alert_title: "",
    banners: []
  },
  show_box: function() {
    var self = this;
    if (this.data.iszhuan) {
      wx.request({
        url: app.globalData.URL + 'Mobile/zhuanpan',
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          var pans = self.data.xiaojuedingArr;
          for (var i = 0; i < pans[0].awards.length; i++) {
            if ((pans[0].awards[i].id + 1) == res.data.pid)
              pans[0].awards[i].probability = 100;
            else
              pans[0].awards[i].probability = 0;
          }
          self.setData({
            xiaojuedingArr: pans,
            s_awards: res.data.pid,
            show_box: true
          });
        }
      });
    }
  },
  close_box: function() {
    this.setData({
      show_box: false
    })
  },
  close_alert_box: function() {
    this.setData({
      show_alert_box: false
    })
  },
  //接收当前转盘初始化时传来的参数
  getData(e) {
    this.setData({
      awardsConfig: e.detail,
    })
  },

  //接收当前转盘结束后的答案选项
  getAwards(e) {
    var tid = this.data.xiaojuedingArr[0].awards[e.detail.s_awards].tid;
    var name = this.data.xiaojuedingArr[0].awards[e.detail.s_awards].name;
    this.setData({
      show_alert_box: true,
      alert_title: "恭喜，抽中" + name + (tid == 1 ? "金币" : "元"),
      s_awards: e.detail.end ? "？" : e.detail.s_awards,
      iszhuan: false,
      share: e.detail.end ? true : false
    })
  },

  //开始转
  startZhuan(e) {
    this.setData({
      zhuanflg: e.detail ? true : false
    });
  },

  //点击切换转盘选项
  xiaojueding(e) {
    var that = this,
      idx = e.currentTarget.dataset.idx,
      xiaojuedingArr = that.data.xiaojuedingArr;
    if (!that.data.zhuanflg) {
      for (let x in xiaojuedingArr) {
        if (idx == x && xiaojuedingArr[x].option != that.data.awardsConfig.option) {
          that.zhuanpan.switchZhuanpan(xiaojuedingArr[x]); //切换当前转盘数据选项 
          return;
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.request({
      url: app.globalData.URL + 'Mobile/Getpan',
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var pans = [{
          id: 0,
          option: '我帅吗？', //转盘的标题名称
          awards: [{
              id: 0, // id递增
              tid: 1, //1金币，2红包，3手机
              name: "50", // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
              color: '', // 选项的背景颜色  这个属性不用了
              probability: 0 // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
            },
            {
              id: 1,
              tid: 1,
              name: "800",
              color: '',
              probability: 0
            },
            {
              id: 2,
              tid: 3,
              name: "",
              color: '',
              probability: 0
            },
            {
              id: 3,
              tid: 2,
              name: "20元",
              color: '',
              probability: 0
            },
            {
              id: 4,
              tid: 1,
              name: "600",
              color: '',
              probability: 0
            },
            {
              id: 5,
              tid: 2,
              name: "5元",
              color: '',
              probability: 0
            }
          ]
        }]
        for (var i = 0; i < res.data.pans.length; i++) {
          pans[0].awards[i].tid = res.data.pans[i].Type;
          if (res.data.pans[i].Type == 3)
            pans[0].awards[i].name = "";
          else
            pans[0].awards[i].name = res.data.pans[i].Num + (res.data.pans[i].Type == 2 ? "元" : "");
        }
        self.setData({
          xiaojuedingArr: pans
        });
      }
    });
    this.zhuanpan = this.selectComponent("#zhuanpan");
    var startDate = parseInt(app.globalData.player.signdate.substr(6, 13));
    this.setData({
      issign: app.globalData.player.issign,
      day1: (new Date(startDate).getMonth() + 1) + "月" + new Date(startDate).getDate() + "日",
      day2: (new Date(startDate + 24 * 60 * 60 * 1000 * 1).getMonth() + 1) + "月" + new Date(startDate + 24 * 60 * 60 * 1000 * 1).getDate() + "日",
      day3: (new Date(startDate + 24 * 60 * 60 * 1000 * 2).getMonth() + 1) + "月" + new Date(startDate + 24 * 60 * 60 * 1000 * 2).getDate() + "日",
      day4: (new Date(startDate + 24 * 60 * 60 * 1000 * 3).getMonth() + 1) + "月" + new Date(startDate + 24 * 60 * 60 * 1000 * 3).getDate() + "日",
      day5: (new Date(startDate + 24 * 60 * 60 * 1000 * 4).getMonth() + 1) + "月" + new Date(startDate + 24 * 60 * 60 * 1000 * 4).getDate() + "日",
      day6: (new Date(startDate + 24 * 60 * 60 * 1000 * 5).getMonth() + 1) + "月" + new Date(startDate + 24 * 60 * 60 * 1000 * 5).getDate() + "日",
      day7: (new Date(startDate + 24 * 60 * 60 * 1000 * 6).getMonth() + 1) + "月" + new Date(startDate + 24 * 60 * 60 * 1000 * 6).getDate() + "日",
      sign: app.globalData.player.sign,
      iszhuan: app.globalData.player.iszhuan
    });
    var self = this;
    wx.request({
      url: app.globalData.URL + 'Mobile/GetSign',
      data: {
        'token': wx.getStorageSync('sessionKey')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        self.setData({
          n1: "+" + res.data.sings[0].gold,
          n2: "+" + res.data.sings[1].gold,
          n3: "+" + res.data.sings[2].gold,
          n4: "+" + res.data.sings[3].gold,
          n5: "+" + res.data.sings[4].gold,
          n6: "+" + res.data.sings[5].gold,
          n7: "+" + res.data.sings[6].gold,
          t1: "+" + res.data.sings[0].money,
          t2: "+" + res.data.sings[1].money,
          t3: "+" + res.data.sings[2].money,
          t4: "+" + res.data.sings[3].money,
          t5: "+" + res.data.sings[4].money,
          t6: "+" + res.data.sings[5].money,
          t7: "+" + res.data.sings[6].money
        });
      }
    });
    wx.request({
      url: app.globalData.URL + 'Mobile/GetNews',
      data: {
        'token': wx.getStorageSync('sessionKey'),
        'location': 2
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
  },
  to_app: function(e) {
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.id, //小程序appid
      success(res) {
        // 打开成功
      },
      fail(res) {
        // 打开失败
      }
    })
  },
  to_sign: function(e) {
    if (!this.data.issign) {
      var self = this;
      wx.request({
        url: app.globalData.URL + 'Mobile/Sgin',
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.code == 200) {
            app.globalData.player.sign = res.data.sign;
            app.globalData.player.signSum = res.data.signSum;
            app.globalData.player.issign = true;
            app.globalData.player.iszhuan = res.data.iszhuan;
            app.globalData.player.gold = res.data.gold;
            app.globalData.player.QNum = res.data.QNum;
            app.globalData.player.money = res.data.money;
            app.globalData.player.exp = res.data.exp;
            self.setData({
              issign: app.globalData.player.issign,
              sign: app.globalData.player.sign,
              iszhuan: app.globalData.player.iszhuan
            });
            if (res.data.iszhuan) {
              self.show_box();
            } else
              wx.showToast({
                title: "签到成功",
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
    }
  }
})