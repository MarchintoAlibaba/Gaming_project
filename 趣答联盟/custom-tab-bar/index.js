const app = getApp();
Component({
  //数据
  data: {
    selected: 0, //当前tabBar页面
    color: "#cdcdcd", //未选中tabBar时的文字颜色
    selectedColor: "#22385d", //选中时tabBar文字颜色
    addImgPath: '/static/tab-bar-image/icon_qdt.png', //添加发布图标
    // tabBar对象集合
    list: [{
        pagePath: "/pages/index/index",
        iconPath: "/static/tab-bar-image/index_1.png",
        selectedIconPath: "/static/tab-bar-image/index_2.png",
        text: "首页"
      },
      {
        pagePath: "/pages/play/play",
        iconPath: "/static/tab-bar-image/play_1.png",
        selectedIconPath: "/static/tab-bar-image/play_2.png",
        text: "试玩"
      },
      {
        pagePath: "/pages/addition/addition",
        iconPath: "/static/tab-bar-image/addition_1.png",
        selectedIconPath: "/static/tab-bar-image/addition_2.png",
        text: "加成"
      },
      {
        pagePath: "/pages/my/my",
        iconPath: "/static/tab-bar-image/my_1.png",
        selectedIconPath: "/static/tab-bar-image/my_2.png",
        text: "我的"
      }
    ]
  },
  methods: {
    // tabBar切换事件
    tab_bar_index(e) {
      const url = e.currentTarget.dataset.path
      console.log(url)
      wx.switchTab({
        url
      })
    },

    // 发布添加按钮跳转
    tab_bar_add() {
      var url = "/pages/answe_union/answe_union"
      wx.navigateTo({
        url
      })
    }
  }
})