// pages/guideDetail/guideDetail.js
const { guidesData } = require('../../data/guides.js')

Page({
  data: {
    guideInfo: null
  },

  onLoad(options) {
    const { id } = options
    this.loadGuideDetail(parseInt(id))
  },

  // 加载指南详情
  loadGuideDetail(id) {
    const guideInfo = guidesData.find(item => item.id === id)
    if (guideInfo) {
      // 将markdown格式的内容转换为适合展示的格式
      guideInfo.formattedContent = this.formatContent(guideInfo.content)
      this.setData({ guideInfo })
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: guideInfo.title
      })
    } else {
      wx.showToast({
        title: '指南不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  // 格式化内容
  formatContent(content) {
    // 将markdown标题转换为可识别的格式
    const lines = content.split('\n')
    const formattedLines = lines.map(line => {
      if (line.startsWith('## ')) {
        return { type: 'h2', text: line.replace('## ', '') }
      } else if (line.startsWith('### ')) {
        return { type: 'h3', text: line.replace('### ', '') }
      } else if (line.startsWith('✓ ')) {
        return { type: 'check', text: line.replace('✓ ', '') }
      } else if (line.startsWith('⚠️ ')) {
        return { type: 'warning', text: line.replace('⚠️ ', '') }
      } else if (line.startsWith('- ')) {
        return { type: 'list', text: line.replace('- ', '') }
      } else if (line.match(/^\d+\. /)) {
        return { type: 'number', text: line }
      } else if (line.trim() === '') {
        return { type: 'empty', text: '' }
      } else {
        return { type: 'text', text: line }
      }
    })
    return formattedLines
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
            phoneNumber: '110',
            fail: () => {
              wx.showToast({ title: '拨号失败，请手动拨打110', icon: 'none' })
            }
          })
        }
      }
    })
  },

  // 拨打反诈热线
  onCallAntifraud() {
    wx.showModal({
      title: '反诈热线',
      content: '确定要拨打96110反诈热线吗？',
      confirmText: '拨打',
      confirmColor: '#3498db',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '96110',
            fail: () => {
              wx.showToast({ title: '拨号失败，请手动拨打96110', icon: 'none' })
            }
          })
        }
      }
    })
  },

  // 分享
  onShareAppMessage() {
    const { guideInfo } = this.data
    return {
      title: `${guideInfo.title} - 校园反诈卫士`,
      path: `/pages/guideDetail/guideDetail?id=${guideInfo.id}`
    }
  }
})
