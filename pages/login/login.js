/**
 * 登录页面
 * 
 * 【演示说明】
 * 当前为演示项目，使用模拟登录实现。
 * 实际项目部署时，需要替换为真实的微信登录流程：
 * 
 * 1. 调用 wx.login() 获取临时登录凭证 code
 * 2. 将 code 发送到后端服务器
 * 3. 后端调用微信接口换取 openid 和 session_key
 * 4. 后端返回自定义登录态（如 token）
 * 5. 前端保存 token 用于后续请求鉴权
 * 
 * 参考文档：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
 */

Page({
  data: {
    isLoading: false
  },

  /**
   * 微信快捷登录
   * 【演示模式】使用 localStorage 模拟登录状态
   * 【生产环境】应调用 wx.login() + 后端接口实现真实登录
   */
  onWechatLogin() {
    console.log('[Login] 开始微信快捷登录')
    this.setData({ isLoading: true })

    // ========== 演示代码：模拟登录 ==========
    // 实际项目中，请替换为以下真实登录流程：
    // wx.login({
    //   success: (res) => {
    //     if (res.code) {
    //       // 将 code 发送到后端换取 openid 和 session_key
    //       wx.request({
    //         url: 'https://your-server.com/api/login',
    //         method: 'POST',
    //         data: { code: res.code },
    //         success: (response) => {
    //           // 保存后端返回的 token
    //           wx.setStorageSync('token', response.data.token)
    //         }
    //       })
    //     }
    //   }
    // })
    // ========================================

    setTimeout(() => {
      try {
        // 【演示】保存模拟登录状态到本地存储
        wx.setStorageSync('isLoggedIn', true)
        wx.setStorageSync('userInfo', {
          nickName: '微信用户',
          avatarUrl: ''
        })
        console.log('[Login] 登录成功，用户信息已保存')
      } catch (e) {
        console.error('[Login] 保存登录状态失败:', e)
      }

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
            console.log('[Login] navigateBack 失败，跳转到首页')
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
    console.log('[Login] 用户选择游客模式')
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
