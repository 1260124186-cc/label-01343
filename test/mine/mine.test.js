// 求助通道功能测试
const automator = require('miniprogram-automator');

describe('求助通道功能测试', () => {
  let miniProgram;
  let page;

  beforeAll(async () => {
    try {
      miniProgram = await automator.launch({
        cliPath: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli',
        projectPath: process.cwd()
      });
      
      console.log('小程序启动成功');
    } catch (error) {
      console.error('启动小程序失败:', error);
      throw error;
    }
  }, 30000);

  afterAll(async () => {
    if (miniProgram) {
      await miniProgram.close();
    }
  });

  // 测试用例1: 求助热线展示测试
  test('TC-023: 求助热线展示测试', async () => {
    // 进入"我的"页面
    page = await miniProgram.reLaunch('/pages/mine/mine');
    await page.waitFor(1000);
    
    // 检查求助热线区域
    const helpHotlineSection = await page.$('.help-hotline-section');
    expect(helpHotlineSection).not.toBeNull();
    
    // 检查热线列表
    const hotlineItems = await page.$$('.hotline-item');
    expect(hotlineItems.length).toBeGreaterThan(0);
    
    console.log('✅ 求助热线展示正常');
  });

  // 测试用例2: 地图组件展示测试（已登录状态）
  test('TC-024: 地图组件展示测试', async () => {
    // 先登录
    await miniProgram.callWxMethod('setStorageSync', { 
      key: 'isLoggedIn', 
      data: true 
    });
    
    // 重新进入"我的"页面
    page = await miniProgram.reLaunch('/pages/mine/mine');
    await page.waitFor(1000);
    
    // 点击查看位置
    const locationBtn = await page.$('.view-location-btn');
    if (locationBtn) {
      await locationBtn.tap();
      await page.waitFor(1000);
      
      // 检查地图组件
      const mapComponent = await page.$('.map-container');
      expect(mapComponent).not.toBeNull();
      
      console.log('✅ 地图组件展示正常');
    } else {
      console.log('⚠️  未找到查看位置按钮，跳过地图测试');
    }
  });

  // 测试用例3: 用户信息展示测试
  test('TC-025: 用户信息展示测试', async () => {
    // 设置用户信息
    await miniProgram.callWxMethod('setStorageSync', {
      key: 'userInfo',
      data: {
        nickName: '测试用户',
        avatarUrl: '/images/avatar.png'
      }
    });
    
    // 重新进入"我的"页面
    page = await miniProgram.reLaunch('/pages/mine/mine');
    await page.waitFor(1000);
    
    // 检查用户信息区域
    const userInfoSection = await page.$('.user-info-section');
    expect(userInfoSection).not.toBeNull();
    
    // 检查昵称显示
    const nickName = await page.$('.user-nickname');
    if (nickName) {
      const nameText = await nickName.text();
      expect(nameText).toBe('测试用户');
      console.log('✅ 用户信息展示正常');
    }
  });

  // 测试用例4: 一键拨号功能测试
  test('一键拨号功能测试', async () => {
    // 点击第一个热线电话
    const hotlineItem = await page.$('.hotline-item:first-child');
    if (hotlineItem) {
      await hotlineItem.tap();
      await page.waitFor(500);
      
      // 检查确认弹窗
      const confirmModal = await page.$('.call-confirm-modal');
      expect(confirmModal).not.toBeNull();
      
      console.log('✅ 一键拨号功能正常');
      
      // 关闭弹窗
      const cancelBtn = await page.$('.modal-cancel-btn');
      if (cancelBtn) {
        await cancelBtn.tap();
      }
    }
  });
});
