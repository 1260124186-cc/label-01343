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

  attached() {
    // 组件挂载时，根据当前页面路径设置选中状态
    const pages = getCurrentPages()
    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1]
      const route = '/' + currentPage.route
      const index = this.data.list.findIndex(item => item.pagePath === route)
      if (index !== -1 && index !== this.data.selected) {
        this.setData({ selected: index })
      }
    }
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const index = data.index
      
      // 先更新选中状态，再切换页面
      this.setData({ selected: index })
      
      wx.switchTab({
        url,
        fail: (err) => {
          console.error('[TabBar] 切换页面失败:', err)
        }
      })
    }
  }
})
