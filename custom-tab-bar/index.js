Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#e74c3c",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        icon: "🏠"
      },
      {
        pagePath: "/pages/cases/cases",
        text: "案例库",
        icon: "📋"
      },
      {
        pagePath: "/pages/quiz/quiz",
        text: "测试",
        icon: "✏️"
      },
      {
        pagePath: "/pages/mine/mine",
        text: "我的",
        icon: "👤"
      }
    ]
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      
      wx.switchTab({
        url
      })
    }
  }
})
