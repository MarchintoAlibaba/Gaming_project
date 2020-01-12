// pages/index/choose_id/choose_id.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id_list_one: [
      { src: "../../../static/choose_id/bst.png", name: "百事通" }, { src: "../../../static/choose_id/gwk.png", name: "购物狂" }, 
      { src: "../../../static/choose_id/lmb.png", name: "辣妈帮" }, { src: "../../../static/choose_id/zxz.png", name: "追星族" }, 
      { src: "../../../static/choose_id/yxz.png", name: "游戏宅" }, { src: "../../../static/choose_id/chz.png", name: "吃货族" }, 
      { src: "../../../static/choose_id/csg.png", name: "铲屎官" }, { src: "../../../static/choose_id/jsz.png", name: "技术宅" }, 
      { src: "../../../static/choose_id/qbt.png", name: "丘比特" }, { src: "../../../static/choose_id/ycz.png", name: "有车族" }, 
      { src: "../../../static/choose_id/lhp.png", name: "乐活派" }, { src: "../../../static/choose_id/dmm.png", name: "动漫迷" }],
    id_list_two:[
      { src: "../../../static/choose_id/bst2.png", name: "百事通" }, { src: "../../../static/choose_id/gwk2.png", name: "购物狂" },
      { src: "../../../static/choose_id/lmb2.png", name: "辣妈帮" }, { src: "../../../static/choose_id/zxz2.png", name: "追星族" },
      { src: "../../../static/choose_id/yxz2.png", name: "游戏宅" }, { src: "../../../static/choose_id/chz2.png", name: "吃货族" },
      { src: "../../../static/choose_id/csg2.png", name: "铲屎官" }, { src: "../../../static/choose_id/jsz2.png", name: "技术宅" },
      { src: "../../../static/choose_id/qbt2.png", name: "丘比特" }, { src: "../../../static/choose_id/ycz2.png", name: "有车族" },
      { src: "../../../static/choose_id/lhp2.png", name: "乐活派" }, { src: "../../../static/choose_id/dmm2.png", name: "动漫迷" }],
    choose_id_list:[],
  },
  //身份选择
  choose:function(e){
    var that = this 
    let src = e.target.dataset.src
    let name = e.target.dataset.name
    var list_1 = that.data.id_list_one
    var list_2 = that.data.id_list_two
    var list_3 = that.data.choose_id_list 
    if (name != list_3[0] && name != list_3[1] && name != list_3[2] ){
      if(list_3.length>2){
        wx.showToast({
          title: "身份选择不得超过三个",
          icon: 'none',
          duration: 2000
        });
        return
      }
      list_3.push(name)
      for (var i = 0; i < list_1.length; i++) {
        if (src == list_1[i].src) {
          var item1 = list_1[i]
          var item2 = list_2[i]
          list_1.splice(i, 1, item2)
          list_2.splice(i, 1, item1)
          that.setData({
            id_list_one: list_1,
            id_list_two: list_2,
            choose_id_list:list_3
          })
        }
      }
    }else{
      for(var j = 0 ; j<list_3.length;j++){
        if(name === list_3[j]){
          list_3.splice(j,1)
        }
      }
      for (var i = 0; i < list_1.length; i++) {
        if (src == list_1[i].src) {
          var item1 = list_1[i]
          var item2 = list_2[i]
          list_1.splice(i, 1, item2)
          list_2.splice(i, 1, item1)
          that.setData({
            id_list_one: list_1,
            id_list_two: list_2,
            choose_id_list: list_3
          })
        }
      }
    }
  },
  to_close_id: function () {
    if (this.data.choose_id_list && this.data.choose_id_list.length > 0)
    {
      wx.request({
        url: app.globalData.URL + 'Mobile/TagSave?tag=' + this.data.choose_id_list.join(','),
        data: {
          'token': wx.getStorageSync('sessionKey')
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          wx.reLaunch({
            url: '../index?is_new=login',
          });
        }
      });
    } else {
      wx.showToast({
        title: "请选择您的身份！",
        icon: 'none',
        duration: 2000
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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