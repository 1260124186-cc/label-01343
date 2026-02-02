// pages/index/index.js
const app = getApp()
const { casesData } = require('../../data/cases.js')
const { guidesData } = require('../../data/guides.js')

Page({
  data: {
    // 轮播图数据
    bannerList: [
      {
        id: 1,
        imageUrl: '/images/banner/banner1.png',
        title: '守护校园安全 远离网络诈骗',
        linkType: 'guide',
        linkId: 1
      },
      {
        id: 2,
        imageUrl: '/images/banner/banner2.png',
        title: '刷单返利都是诈骗',
        linkType: 'case',
        linkId: 1
      },
      {
        id: 3,
        imageUrl: '/images/banner/banner3.png',
        title: '校园贷陷阱多 借钱需谨慎',
        linkType: 'case',
        linkId: 2
      }
    ],
    // 快速入口
    quickEntries: [
      { id: 'cases', name: '案例库', emoji: '📁', url: '/pages/cases/cases', isTab: true },
      { id: 'guide', name: '防骗指南', emoji: '📖', url: '/pages/guide/guide', isTab: false },
      { id: 'quiz', name: '知识测试', emoji: '✏️', url: '/pages/quiz/quiz', isTab: true },
      { id: 'help', name: '求助通道', emoji: '🆘', url: '/pages/mine/mine', isTab: true }
    ],
    // 预警关键词
    warningKeywords: ['刷单', '返利', '校园贷', '高薪兼职'],
    // 热门案例
    hotCases: [],
    // 最新指南
    latestGuides: [],
    // 搜索关键词
    searchKeyword: '',
    // 显示预警弹窗
    showWarningModal: false,
    warningContent: '',
    // 显示首次进入提醒
    showWelcomeModal: false,
    // 页面跳转遮罩
    showPageMask: false
  },

  onLoad() {
    this.initData()
    // 检查是否首次进入
    if (app.globalData.showWarning) {
      this.setData({ showWelcomeModal: true })
      app.globalData.showWarning = false
    }
  },

  onShow() {
    // 每次显示页面时隐藏遮罩
    this.setData({ showPageMask: false })
    
    // 更新自定义tabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  // 初始化数据
  initData() {
    // 获取热门案例（按举报数量排序，取前3个）
    const hotCases = casesData
      .sort((a, b) => b.reportCount - a.reportCount)
      .slice(0, 3)

    // 获取最新指南（按更新时间排序，取前3个）
    const latestGuides = guidesData
      .sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))
      .slice(0, 3)

    this.setData({
      hotCases,
      latestGuides
    })
  },

  // 轮播图点击
  onBannerTap(e) {
    const { linktype, linkid } = e.currentTarget.dataset
    if (linktype === 'case') {
      wx.navigateTo({
        url: `/pages/caseDetail/caseDetail?id=${linkid}`
      })
    } else if (linktype === 'guide') {
      wx.navigateTo({
        url: `/pages/guideDetail/guideDetail?id=${linkid}`
      })
    }
  },

  // 快速入口点击
  onEntryTap(e) {
    const { url, istab } = e.currentTarget.dataset
    
    // 先显示遮罩，覆盖整个页面和tabBar
    this.setData({ showPageMask: true })
    
    // 延迟一帧再跳转，确保遮罩已渲染
    setTimeout(() => {
      if (istab) {
        wx.switchTab({ url })
      } else {
        wx.navigateTo({ url })
      }
    }, 50)
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
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }

    // 跳转到防骗指南页面并传递搜索关键词
    wx.navigateTo({
      url: `/pages/guide/guide?keyword=${encodeURIComponent(searchKeyword)}`
    })
  },

  // 显示预警弹窗
  showWarning(keyword) {
    const warningMessages = {
      '刷单': '⚠️ 警惕刷单诈骗！\n\n所有"刷单返利"都是诈骗，刷单本身也是违法行为。骗子会先用小额返利取得你的信任，然后诱骗你加大投入。\n\n记住：天上不会掉馅饼！',
      '返利': '⚠️ 警惕返利诈骗！\n\n"先付款后返利"都是诈骗套路。不要相信任何承诺高额返利的兼职或活动。',
      '校园贷': '⚠️ 警惕校园贷陷阱！\n\n非正规校园贷存在高额利息、暴力催收等风险。如需借款，请通过正规银行渠道。',
      '高薪兼职': '⚠️ 警惕虚假兼职！\n\n"轻松高薪"往往是诈骗陷阱。正规兼职不会要求你先付款或垫资。',
      '中奖': '⚠️ 警惕中奖诈骗！\n\n"先交钱后领奖"都是诈骗。正规活动不会要求缴纳任何费用才能领奖。'
    }

    const content = warningMessages[keyword] || `⚠️ 风险提示\n\n"${keyword}"可能与网络诈骗相关，请提高警惕！`

    this.setData({
      showWarningModal: true,
      warningContent: content
    })
  },

  // 关闭预警弹窗
  closeWarningModal() {
    this.setData({
      showWarningModal: false,
      warningContent: ''
    })
  },

  // 关闭欢迎弹窗
  closeWelcomeModal() {
    this.setData({ showWelcomeModal: false })
  },

  // 查看案例详情
  onCaseTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/caseDetail/caseDetail?id=${id}`
    })
  },

  // 查看指南详情
  onGuideTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/guideDetail/guideDetail?id=${id}`
    })
  },

  // 查看更多案例
  onMoreCases() {
    wx.switchTab({
      url: '/pages/cases/cases'
    })
  },

  // 查看更多指南
  onMoreGuides() {
    wx.navigateTo({
      url: '/pages/guide/guide'
    })
  },

  // 一键报警
  onCallPolice() {
    wx.showModal({
      title: '确认报警',
      content: '确定要拨打110报警电话吗？',
      confirmText: '拨打',
      confirmColor: '#e74c3c',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '110'
          })
        }
      }
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '校园反诈卫士 - 守护校园安全，远离网络诈骗',
      path: '/pages/index/index',
      imageUrl: '/images/share.png'
    }
  }
})
