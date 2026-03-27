// 登录功能测试
const automator = require('miniprogram-automator');

describe('登录功能测试', () => {
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

  // 测试用例1: 微信快捷登录测试
  test('TC-026: 微信快捷登录测试', async () => {
    // 清除之前的登录状态
    await miniProgram.callWxMethod('removeStorageSync', { key: 'isLoggedIn' });
    await miniProgram.callWxMethod('removeStorageSync', { key: 'userInfo' });
    
    // 跳转到登录页面
    page = await miniProgram.navigateTo('/pages/login/login');
    await page.waitFor(1000);
    
    // 检查微信登录按钮
    const wechatLoginBtn = await page.$('.wechat-login-btn');
    expect(wechatLoginBtn).not.toBeNull();
    
    // 点击微信快捷登录
    await wechatLoginBtn.tap();
    await page.waitFor(2000); // 等待登录过程
    
    // 检查登录状态是否保存
    const isLoggedIn = await miniProgram.callWxMethod('getStorageSync', { key: 'isLoggedIn' });
    expect(isLoggedIn).toBe(true);
    
    // 检查用户信息是否保存
    const userInfo = await miniProgram.callWxMethod('getStorageSync', { key: 'userInfo' });
    expect(userInfo).not.toBeNull();
    expect(userInfo.nickName).toBe('微信用户');
    
    console.log('✅ 微信快捷登录功能正常');
  });

  // 测试用例2: 游客模式测试
  test('TC-027: 游客模式测试', async () => {
    // 清除登录状态
    await miniProgram.callWxMethod('removeStorageSync', { key: 'isLoggedIn' });
    await miniProgram.callWxMethod('removeStorageSync', { key: 'userInfo' });
    
    // 跳转到登录页面
    page = await miniProgram.navigateTo('/pages/login/login');
    await page.waitFor(1000);
    
    // 点击游客模式按钮
    const guestBtn = await page.$('.guest-mode-btn');
    expect(guestBtn).not.toBeNull();
    
    await guestBtn.tap();
    await page.waitFor(500);
    
    // 检查确认弹窗
    const confirmModal = await page.$('.guest-confirm-modal');
    expect(confirmModal).not.toBeNull();
    
    // 点击继续浏览
    const confirmBtn = await page.$('.confirm-btn');
    await confirmBtn.tap();
    await page.waitFor(1000);
    
    // 检查是否回到首页
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toContain('pages/index/index');
    
    console.log('✅ 游客模式功能正常');
  });

  // 测试用例3: 登录状态持久化测试
  test('TC-028: 登录状态持久化测试', async () => {
    // 先登录
    page = await miniProgram.navigateTo('/pages/login/login');
    await page.waitFor(1000);
    
    const wechatLoginBtn = await page.$('.wechat-login-btn');
    await wechatLoginBtn.tap();
    await page.waitFor(2000);
    
    // 重新启动小程序（模拟关闭后重新打开）
    await miniProgram.close();
    
    miniProgram = await automator.launch({
      cliPath: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli',
      projectPath: process.cwd()
    });
    
    page = await miniProgram.reLaunch('/pages/index/index');
    await page.waitFor(1000);
    
    // 检查登录状态是否保持
    const isLoggedIn = await miniProgram.callWxMethod('getStorageSync', { key: 'isLoggedIn' });
    expect(isLoggedIn).toBe(true);
    
    console.log('✅ 登录状态持久化正常');
  });

  // 测试用例4: 权限控制测试 - 知识测试
  test('TC-029: 权限控制测试 - 知识测试', async () => {
    // 清除登录状态
    await miniProgram.callWxMethod('removeStorageSync', { key: 'isLoggedIn' });
    
    // 进入知识测试页面
    page = await miniProgram.reLaunch('/pages/quiz/quiz');
    await page.waitFor(1000);
    
    // 点击开始测试
    const startBtn = await page.$('.start-quiz-btn');
    await startBtn.tap();
    await page.waitFor(500);
    
    // 检查登录提示
    const loginModal = await page.$('.login-required-modal');
    expect(loginModal).not.toBeNull();
    
    console.log('✅ 知识测试权限控制正常');
  });
});
