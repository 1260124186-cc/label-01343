// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查是否首次进入，显示反诈提醒
    const hasShownWarning = wx.getStorageSync('hasShownWarning')
    if (!hasShownWarning) {
      this.globalData.showWarning = true
      wx.setStorageSync('hasShownWarning', true)
    }
  },

  globalData: {
    userInfo: null,
    showWarning: false,
    // 预警关键词
    warningKeywords: ['刷单', '返利', '校园贷', '贷款', '兼职', '日结', '高薪', '账号交易', '游戏代练', '中奖', '领奖', '转账', '验证码'],
    // 测试成绩记录
    quizHistory: []
  },

  // 检查关键词是否触发预警
  checkWarningKeyword(text) {
    const keywords = this.globalData.warningKeywords
    for (let keyword of keywords) {
      if (text.includes(keyword)) {
        return keyword
      }
    }
    return null
  }
})
