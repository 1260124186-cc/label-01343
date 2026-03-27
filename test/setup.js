// 测试环境初始化
const automator = require('miniprogram-automator');

// 全局测试配置
jest.setTimeout(60000); // 设置全局超时时间为60秒

// 全局变量
global.miniProgram = null;
global.page = null;

// 在所有测试前启动小程序
beforeAll(async () => {
  try {
    console.log('启动微信小程序...');
    global.miniProgram = await automator.launch({
      cliPath: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli',
      projectPath: process.cwd()
    });
    console.log('小程序启动成功');
  } catch (error) {
    console.error('启动小程序失败:', error);
    throw error;
  }
});

// 在所有测试后关闭小程序
afterAll(async () => {
  if (global.miniProgram) {
    console.log('关闭小程序...');
    await global.miniProgram.close();
    console.log('小程序已关闭');
  }
});

// 在每个测试前清除登录状态
beforeEach(async () => {
  if (global.miniProgram) {
    await global.miniProgram.callWxMethod('removeStorageSync', { key: 'isLoggedIn' });
    await global.miniProgram.callWxMethod('removeStorageSync', { key: 'userInfo' });
    await global.miniProgram.callWxMethod('removeStorageSync', { key: 'quizHistory' });
  }
});

// 辅助函数：等待元素出现
async function waitForElement(selector, timeout = 5000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const element = await global.page.$(selector);
    if (element) {
      return element;
    }
    await global.page.waitFor(100);
  }
  throw new Error(`元素 ${selector} 在 ${timeout}ms 内未出现`);
}

// 辅助函数：检查元素是否存在
async function elementExists(selector) {
  const element = await global.page.$(selector);
  return element !== null;
}

module.exports = {
  waitForElement,
  elementExists
};
