// pages/index/hb_desc/hb_desc.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  onLoad:function(options){
    let self = this;
    wx.request({//赛季活动详情
      url: app.globalData.URL + 'Mobile/SeasonPreview',
      data: {
        'token': wx.getStorageSync('sessionKey'),
        'location': 1,
        'sjName':options.season
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.code == 200) {
          let data = res.data.data,
            startTime = self.change_date(data.startTime),
            endTime = self.change_date(data.endTime),
            rank_list = JSON.parse(data.config);
          self.setData({
            activityDetails: data,
            activityStartTime: startTime,
            activityEndTime : endTime,
            rankList: rank_list
          });
        }
      }
    });
  },
  data: {
    show_box: false,
    activityDetails:{},
    activityStartTime:'',
    activityEndTime:'',
    rankList:[]
  },
  show_box() {
    this.setData({
      show_box: true
    })
  }, 
  change_date(d) {
    if (d == '' || d == null) return '';
    var date = new Date(parseInt(d.replace("/Date(", "").replace(")/", ""), 10));
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + currentDate + " ";
  },
  to_seasonRanking() {
    wx.navigateTo({
      url: '../../answe_union/answe_union',
    })
  },
  close_box(){
    this.setData({
      show_box:false
    })
  },
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    console.log(app.globalData.URL)
    return {
      title: '趣答题赚',
      desc: '可以赚钱的小程序!',
      path: '/pages/index/index?jsonStr=' + app.globalData.player.guid,
      // imageUrl: app.globalData.URL + "/img/v1.jpg",
      success: function (res) {
        console.log('成功', res)
      }
    }
  }
})