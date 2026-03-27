// 首页功能测试
const automator = require('miniprogram-automator');

describe('首页功能测试', () => {
  let miniProgram;
  let page;

  // 在所有测试前启动小程序
  beforeAll(async () => {
    try {
      miniProgram = await automator.launch({
        cliPath: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli',
        projectPath: process.cwd()
      });
      
      // 跳转到首页
      page = await miniProgram.reLaunch('/pages/index/index');
      await page.waitFor(1000); // 等待页面加载
      
      console.log('小程序启动成功，页面已加载');
    } catch (error) {
      console.error('启动小程序失败:', error);
      throw error;
    }
  }, 30000); // 延长超时时间到30秒

  // 在所有测试后关闭小程序
  afterAll(async () => {
    if (miniProgram) {
      await miniProgram.close();
      console.log('小程序已关闭');
    }
  });

  // 测试用例1: 轮播图展示
  test('TC-001: 轮播图展示测试', async () => {
    // 检查轮播图容器是否存在
    const swiperContainer = await page.$('.swiper-container');
    expect(swiperContainer).not.toBeNull();
    
    // 检查轮播图项
    const swiperItems = await page.$$('.swiper-item');
    expect(swiperItems.length).toBeGreaterThan(0);
    
    console.log('✅ 轮播图展示正常');
  });

  // 测试用例2: 快速入口导航
  test('TC-002: 快速入口导航测试', async () => {
    // 检查快速入口区域
    const quickEntries = await page.$$('.quick-entry-item');
    expect(quickEntries.length).toBe(4); // 应该有4个快速入口
    
    console.log('✅ 快速入口显示正常');
  });

  // 测试用例3: 搜索关键词预警 - 刷单
  test('TC-003: 搜索关键词预警测试 - 刷单', async () => {
    // 查找搜索输入框
    const searchInput = await page.$('.search-input');
    expect(searchInput).not.toBeNull();
    
    // 输入"刷单"
    await searchInput.input('刷单');
    await page.waitFor(500);
    
    // 检查预警弹窗是否显示
    const warningModal = await page.$('.warning-modal');
    expect(warningModal).not.toBeNull();
    
    // 检查预警内容
    const modalContent = await page.$('.modal-content');
    const contentText = await modalContent.text();
    expect(contentText).toContain('警惕刷单诈骗');
    
    console.log('✅ 刷单关键词预警正常');
    
    // 关闭弹窗
    const closeBtn = await page.$('.modal-close-btn');
    if (closeBtn) {
      await closeBtn.tap();
      await page.waitFor(300);
    }
  });

  // 测试用例4: 搜索关键词预警 - 校园贷
  test('TC-004: 搜索关键词预警测试 - 校园贷', async () => {
    // 查找搜索输入框
    const searchInput = await page.$('.search-input');
    
    // 清空输入框并输入"校园贷"
    await searchInput.input('');
    await searchInput.input('校园贷');
    await page.waitFor(500);
    
    // 检查预警弹窗
    const warningModal = await page.$('.warning-modal');
    expect(warningModal).not.toBeNull();
    
    const modalContent = await page.$('.modal-content');
    const contentText = await modalContent.text();
    expect(contentText).toContain('警惕校园贷陷阱');
    
    console.log('✅ 校园贷关键词预警正常');
    
    // 关闭弹窗
    const closeBtn = await page.$('.modal-close-btn');
    if (closeBtn) {
      await closeBtn.tap();
    }
  });

  // 测试用例5: 热门案例展示
  test('TC-006: 热门案例展示测试', async () => {
    // 检查热门案例区域
    const hotCasesSection = await page.$('.hot-cases-section');
    expect(hotCasesSection).not.toBeNull();
    
    // 检查热门案例列表
    const hotCases = await page.$$('.hot-case-item');
    expect(hotCases.length).toBe(3); // 应该显示3个热门案例
    
    console.log('✅ 热门案例展示正常');
  });

  // 测试用例6: 一键报警功能
  test('TC-007: 一键报警测试', async () => {
    // 查找一键报警按钮
    const callPoliceBtn = await page.$('.call-police-btn');
    expect(callPoliceBtn).not.toBeNull();
    
    // 点击按钮
    await callPoliceBtn.tap();
    await page.waitFor(500);
    
    // 检查确认弹窗
    const confirmModal = await page.$('.confirm-modal');
    expect(confirmModal).not.toBeNull();
    
    console.log('✅ 一键报警功能正常');
    
    // 关闭确认弹窗
    const cancelBtn = await page.$('.confirm-cancel-btn');
    if (cancelBtn) {
      await cancelBtn.tap();
    }
  });

  // 测试用例7: 页面导航 - 案例库
  test('导航到案例库测试', async () => {
    // 点击案例库快速入口
    const caseEntry = await page.$('.quick-entry-item[data-id="cases"]');
    expect(caseEntry).not.toBeNull();
    
    await caseEntry.tap();
    await page.waitFor(1000);
    
    // 检查是否跳转到案例库页面
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toContain('pages/cases/cases');
    
    console.log('✅ 导航到案例库正常');
    
    // 返回首页
    await miniProgram.navigateBack();
    await page.waitFor(500);
  });
});
