// pages/cases/cases.js
const { casesData, caseCategories } = require('../../data/cases.js')

Page({
  data: {
    categories: caseCategories,
    currentCategory: 'all',
    caseList: [],
    allCases: casesData
  },

  onLoad() {
    this.filterCases('all')
  },

  onShow() {
    // 更新自定义tabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  // 切换分类
  onCategoryTap(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ currentCategory: id })
    this.filterCases(id)
  },

  // 筛选案例
  filterCases(category) {
    let filteredCases = []
    if (category === 'all') {
      filteredCases = this.data.allCases
    } else {
      filteredCases = this.data.allCases.filter(item => item.category === category)
    }
    
    // 按举报数量排序
    filteredCases = filteredCases.sort((a, b) => b.reportCount - a.reportCount)
    
    this.setData({ caseList: filteredCases })
  },

  // 查看案例详情
  onCaseTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/caseDetail/caseDetail?id=${id}`
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '校园反诈案例库 - 了解诈骗套路，保护自己',
      path: '/pages/cases/cases'
    }
  }
})
