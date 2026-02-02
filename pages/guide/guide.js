// pages/guide/guide.js
const app = getApp()
const { guidesData, guideCategories } = require('../../data/guides.js')

Page({
  data: {
    categories: guideCategories,
    currentCategory: 'all',
    guideList: [],
    allGuides: guidesData,
    searchKeyword: '',
    showSearchResult: false
  },

  onLoad(options) {
    // 如果从首页带来搜索关键词
    if (options.keyword) {
      const keyword = decodeURIComponent(options.keyword)
      this.setData({ searchKeyword: keyword })
      this.searchGuides(keyword)
    } else {
      this.filterGuides('all')
    }
  },

  // 切换分类
  onCategoryTap(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ 
      currentCategory: id,
      showSearchResult: false,
      searchKeyword: ''
    })
    this.filterGuides(id)
  },

  // 筛选指南
  filterGuides(category) {
    let filteredGuides = []
    if (category === 'all') {
      filteredGuides = this.data.allGuides
    } else {
      filteredGuides = this.data.allGuides.filter(item => item.category === category)
    }
    
    // 按阅读量排序
    filteredGuides = filteredGuides.sort((a, b) => b.readCount - a.readCount)
    
    this.setData({ guideList: filteredGuides })
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    
    // 检查是否触发预警关键词
    const matchedKeyword = app.checkWarningKeyword(keyword)
    if (matchedKeyword) {
      this.showWarning(matchedKeyword)
    }
  },

  // 执行搜索
  onSearch() {
    const { searchKeyword } = this.data
    if (!searchKeyword.trim()) {
      this.setData({ showSearchResult: false })
      this.filterGuides(this.data.currentCategory)
      return
    }
    this.searchGuides(searchKeyword)
  },

  // 搜索指南
  searchGuides(keyword) {
    const lowerKeyword = keyword.toLowerCase()
    
    // 在标题、摘要、关键词中搜索
    const results = this.data.allGuides.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerKeyword)
      const summaryMatch = item.summary.toLowerCase().includes(lowerKeyword)
      const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
      const contentMatch = item.content.toLowerCase().includes(lowerKeyword)
      
      return titleMatch || summaryMatch || keywordMatch || contentMatch
    })

    this.setData({ 
      guideList: results,
      showSearchResult: true
    })
  },

  // 显示预警弹窗
  showWarning(keyword) {
    const warningMessages = {
      '刷单': '⚠️ 警惕刷单诈骗！所有"刷单返利"都是诈骗。',
      '返利': '⚠️ 警惕返利诈骗！"先付款后返利"都是诈骗套路。',
      '校园贷': '⚠️ 警惕校园贷陷阱！非正规校园贷存在高额利息、暴力催收等风险。',
      '贷款': '⚠️ 警惕贷款诈骗！如需借款，请通过正规银行渠道。',
      '兼职': '⚠️ 警惕虚假兼职！"轻松高薪"往往是诈骗陷阱。',
      '中奖': '⚠️ 警惕中奖诈骗！"先交钱后领奖"都是诈骗。'
    }

    const content = warningMessages[keyword]
    if (content) {
      wx.showModal({
        title: '风险提示',
        content: content,
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#e74c3c'
      })
    }
  },

  // 清空搜索
  onClearSearch() {
    this.setData({ 
      searchKeyword: '',
      showSearchResult: false
    })
    this.filterGuides(this.data.currentCategory)
  },

  // 查看指南详情
  onGuideTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/guideDetail/guideDetail?id=${id}`,
      fail: () => {
        wx.showToast({ title: '页面跳转失败', icon: 'none' })
      }
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '防骗指南 - 掌握防骗技巧，保护自己',
      path: '/pages/guide/guide'
    }
  }
})
