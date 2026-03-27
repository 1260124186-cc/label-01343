// 防骗指南模块测试
const { waitForElement, elementExists } = require('../setup');

describe('防骗指南模块测试', () => {
  beforeAll(async () => {
    // 导航到防骗指南页面
    global.page = await global.miniProgram.navigateTo('/pages/guide/guide');
    await global.page.waitFor(2000);
  });

  test('TC-015: 防骗指南页面展示测试', async () => {
    // 验证页面标题
    const title = await global.page.$('.page-title');
    expect(title).not.toBeNull();
    
    // 验证指南分类存在
    const guideCategories = await global.page.$$('.guide-category');
    expect(guideCategories.length).toBeGreaterThan(0);
  });

  test('TC-016: 指南分类导航测试', async () => {
    // 点击"防骗技巧"分类
    const categoryItem = await global.page.$('.guide-category-item[data-type="技巧"]');
    await categoryItem.tap();
    await global.page.waitFor(1000);
    
    // 验证内容更新
    const guideContent = await global.page.$('.guide-content');
    expect(guideContent).not.toBeNull();
  });

  test('TC-017: 指南详情跳转测试', async () => {
    // 点击第一个指南
    const firstGuide = await global.page.$('.guide-item');
    await firstGuide.tap();
    await global.page.waitFor(2000);
    
    // 验证是否跳转到详情页
    const currentPage = await global.miniProgram.currentPage();
    expect(currentPage.path).toContain('guideDetail');
    
    // 返回指南列表
    await global.miniProgram.navigateBack();
    await global.page.waitFor(1000);
  });

  test('TC-018: 指南分享功能测试', async () => {
    // 点击分享按钮
    const shareBtn = await global.page.$('.share-btn');
    await shareBtn.tap();
    await global.page.waitFor(1000);
    
    // 验证分享弹窗
    const shareModal = await global.page.$('.share-modal');
    expect(shareModal).not.toBeNull();
  });

  test('TC-019: 指南收藏功能测试(未登录状态)', async () => {
    // 尝试收藏指南
    const collectBtn = await global.page.$('.guide-collect-btn');
    await collectBtn.tap();
    await global.page.waitFor(1000);
    
    // 验证未登录提示
    const loginPrompt = await global.page.$('.login-prompt');
    expect(loginPrompt).not.toBeNull();
  });
});
