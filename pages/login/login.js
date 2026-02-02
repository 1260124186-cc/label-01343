// pages/login/login.js
Page({
  data: {
    isLoading: false
  },

  // 微信快捷登录
  onWechatLogin() {
    this.setData({ isLoading: true })

    // 模拟微信登录过程
    setTimeout(() => {
      // 保存登录状态
      wx.setStorageSync('isLoggedIn', true)
      wx.setStorageSync('userInfo', {
        nickName: '微信用户',
        avatarUrl: ''
      })

      this.setData({ isLoading: false })

      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })

      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack({
          fail: () => {
            // 如果无法返回，跳转到首页
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        })
      }, 1500)
    }, 800)
  },

  // 游客模式
  onGuestMode() {
    wx.showModal({
      title: '游客模式',
      content: '游客模式下可浏览案例和指南，但无法进行知识测试和查看校园求助详情',
      confirmText: '继续浏览',
      cancelText: '去登录',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack({
            fail: () => {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        }
      }
    })
  }
})
