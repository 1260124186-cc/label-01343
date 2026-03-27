// 知识测试功能测试
const automator = require('miniprogram-automator');

describe('知识测试功能测试', () => {
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

  // 测试用例1: 未登录状态测试
  test('TC-015: 未登录状态测试', async () => {
    // 清除登录状态
    await miniProgram.callWxMethod('removeStorageSync', { key: 'isLoggedIn' });
    await miniProgram.callWxMethod('removeStorageSync', { key: 'userInfo' });
    
    // 跳转到测试页面
    page = await miniProgram.reLaunch('/pages/quiz/quiz');
    await page.waitFor(1000);
    
    // 点击开始测试按钮
    const startBtn = await page.$('.start-quiz-btn');
    expect(startBtn).not.toBeNull();
    
    await startBtn.tap();
    await page.waitFor(500);
    
    // 检查是否显示登录提示弹窗
    const loginModal = await page.$('.login-required-modal');
    expect(loginModal).not.toBeNull();
    
    console.log('✅ 未登录状态提示正常');
    
    // 关闭弹窗
    const cancelBtn = await page.$('.modal-cancel-btn');
    if (cancelBtn) {
      await cancelBtn.tap();
    }
  });

  // 测试用例2: 登录后开始测试
  test('TC-016: 登录后开始测试', async () => {
    // 先进行登录
    const loginPage = await miniProgram.navigateTo('/pages/login/login');
    await loginPage.waitFor(1000);
    
    // 点击微信快捷登录
    const wechatLoginBtn = await loginPage.$('.wechat-login-btn');
    expect(wechatLoginBtn).not.toBeNull();
    
    await wechatLoginBtn.tap();
    await page.waitFor(2000); // 等待登录完成
    
    // 跳转到测试页面
    page = await miniProgram.reLaunch('/pages/quiz/quiz');
    await page.waitFor(1000);
    
    // 选择分类并开始测试
    const categoryItem = await page.$('.category-item[data-id="all"]');
    if (categoryItem) {
      await categoryItem.tap();
    }
    
    const startBtn = await page.$('.start-quiz-btn');
    await startBtn.tap();
    await page.waitFor(1000);
    
    // 检查是否进入答题界面
    const questionContainer = await page.$('.question-container');
    expect(questionContainer).not.toBeNull();
    
    console.log('✅ 登录后开始测试正常');
  });

  // 测试用例3: 单选题答题测试
  test('TC-017: 单选题答题测试', async () => {
    // 检查是否在答题界面
    const questionType = await page.$('.question-type');
    const typeText = await questionType.text();
    
    if (typeText.includes('单选') || typeText.includes('判断')) {
      // 选择第一个选项
      const option = await page.$('.option-item:first-child');
      expect(option).not.toBeNull();
      
      await option.tap();
      await page.waitFor(300);
      
      // 提交答案
      const submitBtn = await page.$('.submit-answer-btn');
      await submitBtn.tap();
      await page.waitFor(500);
      
      // 检查是否显示答案反馈
      const answerFeedback = await page.$('.answer-feedback');
      expect(answerFeedback).not.toBeNull();
      
      console.log('✅ 单选题答题正常');
    } else {
      console.log('⚠️  当前题目不是单选题，跳过测试');
    }
  });

  // 测试用例4: 测试结果统计
  test('TC-020: 测试结果统计测试', async () => {
    // 快速完成所有题目（模拟）
    let hasNextQuestion = true;
    let questionCount = 0;
    
    while (hasNextQuestion && questionCount < 10) {
      try {
        // 选择第一个选项
        const option = await page.$('.option-item:first-child');
        if (option) {
          await option.tap();
          await page.waitFor(200);
        }
        
        // 提交答案
        const submitBtn = await page.$('.submit-answer-btn');
        if (submitBtn) {
          await submitBtn.tap();
          await page.waitFor(300);
        }
        
        // 下一题
        const nextBtn = await page.$('.next-question-btn');
        if (nextBtn) {
          await nextBtn.tap();
          await page.waitFor(500);
          questionCount++;
        } else {
          hasNextQuestion = false;
        }
      } catch (e) {
        hasNextQuestion = false;
      }
    }
    
    // 检查结果页面
    await page.waitFor(1000);
    const resultContainer = await page.$('.result-container');
    expect(resultContainer).not.toBeNull();
    
    // 检查得分显示
    const scoreDisplay = await page.$('.score-display');
    expect(scoreDisplay).not.toBeNull();
    
    // 检查正确题数
    const correctCount = await page.$('.correct-count');
    expect(correctCount).not.toBeNull();
    
    console.log('✅ 测试结果统计正常');
  });

  // 测试用例5: 重新测试功能
  test('TC-022: 重新测试功能测试', async () => {
    // 点击重新测试按钮
    const restartBtn = await page.$('.restart-quiz-btn');
    expect(restartBtn).not.toBeNull();
    
    await restartBtn.tap();
    await page.waitFor(1000);
    
    // 检查是否回到开始页面
    const startContainer = await page.$('.start-container');
    expect(startContainer).not.toBeNull();
    
    console.log('✅ 重新测试功能正常');
  });
});
