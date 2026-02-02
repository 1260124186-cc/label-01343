// pages/caseDetail/caseDetail.js
const { casesData } = require('../../data/cases.js')

Page({
  data: {
    caseInfo: null,
    videoPlaying: false
  },

  onLoad(options) {
    const { id } = options
    this.loadCaseDetail(parseInt(id))
  },

  // 加载案例详情
  loadCaseDetail(id) {
    const caseInfo = casesData.find(item => item.id === id)
    if (caseInfo) {
      this.setData({ caseInfo })
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: caseInfo.title
      })
    } else {
      wx.showToast({
        title: '案例不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  // 视频播放
  onVideoPlay() {
    this.setData({ videoPlaying: true })
  },

  // 视频暂停
  onVideoPause() {
    this.setData({ videoPlaying: false })
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
    const { caseInfo } = this.data
    return {
      title: `【警惕】${caseInfo.title} - 校园反诈卫士`,
      path: `/pages/caseDetail/caseDetail?id=${caseInfo.id}`
    }
  }
})
