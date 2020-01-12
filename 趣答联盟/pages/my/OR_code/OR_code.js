// pages/my/OR_code/OR_code.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    img: "",
    fnum: 0,
    show_box: false
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
  saveImg: function () {
    var self = this;
    wx.downloadFile({
      url: self.data.img,
      success: function (res) {
        let path = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(res) {
            wx.showToast({
              title: "保存成功！",
              icon: 'none',
              duration: 2000
            });
          },
          fail(res) {
            console.log(res);
            wx.showToast({
              title: "保存失败！",
              icon: 'none',
              duration: 2000
            });
          },
          complete(res) {
          }
        })
      }, fail: function (res) {
        wx.showToast({
          title: "保存失败！",
          icon: 'none',
          duration: 2000
        });
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName: app.globalData.player.nickName,
      avatarUrl: app.globalData.player.avatarUrl,
      img: app.globalData.URL + "/Mobile/GetQrcode?token=" + wx.getStorageSync('sessionKey')
    });
    var self = this;
    wx.request({
      url: app.globalData.URL + 'Mobile/Getfrecords',
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