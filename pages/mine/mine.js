// pages/mine/mine.js
const app = getApp()

Page({
  data: {
    // 求助电话列表
    helpLines: [
      {
        id: 'police',
        name: '报警电话',
        number: '110',
        emoji: '🚔',
        description: '遇到诈骗请立即报警',
        color: '#e74c3c'
      },
      {
        id: 'antifraud',
        name: '反诈专线',
        number: '96110',
        emoji: '🛡️',
        description: '全国反诈预警劝阻电话',
        color: '#3498db'
      },
      {
        id: 'report',
        name: '网络举报',
        number: '12321',
        emoji: '📢',
        description: '网络不良信息举报热线',
        color: '#9b59b6'
      }
    ],
    // 校园求助
    campusHelp: [
      {
        id: 'security',
        name: '校园保卫处',
        description: '24小时值班，可协助处理诈骗事件',
        emoji: '🏢'
      },
      {
        id: 'counselor',
        name: '辅导员/班主任',
        description: '第一时间向老师求助',
        emoji: '👨‍🏫'
      },
      {
        id: 'psychology',
        name: '心理咨询中心',
        description: '如有心理压力可寻求帮助',
        emoji: '💚'
      }
    ],
    // 实用工具
    tools: [
      {
        id: 'app',
        name: '国家反诈中心APP',
        description: '下载官方反诈APP',
        icon: '/images/icons/app.png'
      },
      {
        id: 'wechat',
        name: '腾讯110小程序',
        description: '微信内快速举报',
        icon: '/images/icons/wechat.png'
      }
    ],
    // 地图相关
    showMap: false,
    latitude: 39.908823,
    longitude: 116.397470,
    markers: [],
    // 测试记录
    quizHistory: [],
    totalTests: 0,
    avgScore: 0,
    // 登录状态
    isLoggedIn: false,
    userInfo: null
  },

  onLoad() {
    this.loadQuizHistory()
    this.checkLoginStatus()
  },

  onShow() {
    this.loadQuizHistory()
    this.checkLoginStatus()
    
    // 更新自定义tabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  // 检查登录状态
  checkLoginStatus() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn') || false
    const userInfo = wx.getStorageSync('userInfo') || null
    this.setData({ isLoggedIn, userInfo })
  },

  // 加载测试记录
  loadQuizHistory() {
    const history = wx.getStorageSync('quizHistory') || []
    const totalTests = history.length
    const avgScore = totalTests > 0
      ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / totalTests)
      : 0

    this.setData({
      quizHistory: history.slice(0, 5), // 只显示最近5条
      totalTests,
      avgScore
    })
  },

  // 拨打电话
  onCallPhone(e) {
    const { number, name } = e.currentTarget.dataset
    wx.showModal({
      title: `拨打${name}`,
      content: `确定要拨打${number}吗？`,
      confirmText: '拨打',
      confirmColor: '#e74c3c',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: number,
            fail: () => {
              wx.showToast({
                title: '拨打失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },

  // 打开地图
  onOpenMap() {
    // 显示校园反诈咨询点位置（示例坐标）
    wx.openLocation({
      latitude: 39.908823,
      longitude: 116.397470,
      name: '校园保卫处',
      address: '学校行政楼一楼',
      scale: 18
    })
  },

  // 显示地图弹窗
  onShowMapModal() {
    // 检查登录状态
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: '请先登录',
        content: '登录后可查看校园反诈咨询点位置',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            this.onLogin()
          }
        }
      })
      return
    }

    // 设置标记点
    const markers = [
      {
        id: 1,
        latitude: 39.908823,
        longitude: 116.397470,
        title: '校园保卫处',
        iconPath: '/images/icons/marker.png',
        width: 32,
        height: 32,
        callout: {
          content: '校园保卫处\n24小时值班',
          display: 'ALWAYS',
          padding: 10,
          borderRadius: 8,
          bgColor: '#ffffff',
          fontSize: 12
        }
      }
    ]

    this.setData({
      showMap: true,
      markers
    })
  },

  // 关闭地图弹窗
  onCloseMap() {
    this.setData({ showMap: false })
  },

  // 导航到保卫处
  onNavigate() {
    wx.openLocation({
      latitude: 39.908823,
      longitude: 116.397470,
      name: '校园保卫处',
      address: '学校行政楼一楼',
      scale: 18
    })
  },

  // 下载国家反诈中心APP
  onDownloadApp() {
    wx.showModal({
      title: '下载国家反诈中心APP',
      content: '请在手机应用商店搜索"国家反诈中心"下载官方APP',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 打开腾讯110
  onOpenTencent110() {
    wx.showModal({
      title: '腾讯110',
      content: '请在微信搜索"腾讯110"小程序进行举报',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 查看防骗指南
  onViewGuide() {
    wx.navigateTo({
      url: '/pages/guide/guide'
    })
  },

  // 开始测试
  onStartQuiz() {
    wx.switchTab({
      url: '/pages/quiz/quiz'
    })
  },

  // 校园求助点击
  onCampusHelp(e) {
    // 检查登录状态
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: '请先登录',
        content: '登录后可查看校园求助渠道详情',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            this.onLogin()
          }
        }
      })
      return
    }

    const { id, name } = e.currentTarget.dataset
    if (id === 'security') {
      wx.showModal({
        title: '校园保卫处',
        content: '校园保卫处24小时值班，可协助处理诈骗事件。\n\n地址：学校行政楼一楼\n电话：请联系学校官方获取',
        confirmText: '查看位置',
        success: (res) => {
          if (res.confirm) {
            this.onShowMapModal()
          }
        }
      })
    } else if (id === 'counselor') {
      wx.showModal({
        title: '联系辅导员/班主任',
        content: '遇到诈骗问题，请第一时间联系您的辅导员或班主任寻求帮助。',
        showCancel: false,
        confirmText: '知道了'
      })
    } else if (id === 'psychology') {
      wx.showModal({
        title: '心理咨询中心',
        content: '如果您因诈骗事件产生心理压力，可以前往学校心理咨询中心寻求帮助。\n\n服务时间：工作日 9:00-17:00',
        showCancel: false,
        confirmText: '知道了'
      })
    }
  },

  // 关于我们
  onAbout() {
    wx.showModal({
      title: '关于校园反诈卫士',
      content: '本小程序旨在帮助大学生了解常见诈骗手段、学习防范技巧。内容仅供参考，如遇诈骗请立即报警。\n\n版本：1.0.0',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 分享按钮点击
  onShare() {
    // 触发分享
  },

  // 登录
  onLogin() {
    wx.showModal({
      title: '登录',
      content: '是否使用微信快捷登录？',
      confirmText: '登录',
      success: (res) => {
        if (res.confirm) {
          // 模拟登录成功
          wx.setStorageSync('isLoggedIn', true)
          wx.setStorageSync('userInfo', {
            nickName: '校园用户',
            avatarUrl: ''
          })
          this.setData({ isLoggedIn: true })
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？退出后测试记录将被清除。',
      confirmText: '退出',
      confirmColor: '#e74c3c',
      success: (res) => {
        if (res.confirm) {
          // 清除登录状态
          wx.removeStorageSync('isLoggedIn')
          wx.removeStorageSync('userInfo')
          // 清除测试记录
          wx.removeStorageSync('quizHistory')
          this.setData({
            isLoggedIn: false,
            userInfo: null,
            totalTests: 0,
            avgScore: 0
          })
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '校园反诈卫士 - 守护校园安全，远离网络诈骗',
      path: '/pages/index/index'
    }
  }
})
