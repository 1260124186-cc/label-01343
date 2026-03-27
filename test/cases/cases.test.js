// 案例库模块测试
const { waitForElement, elementExists } = require('../setup');

describe('案例库模块测试', () => {
  beforeAll(async () => {
    // 导航到案例库页面
    global.page = await global.miniProgram.navigateTo('/pages/cases/cases');
    await global.page.waitFor(2000);
  });

  test('TC-010: 案例库页面展示测试', async () => {
    // 验证页面标题
    const title = await global.page.$('.page-title');
    expect(title).not.toBeNull();
    
    // 验证搜索框存在
    const searchInput = await global.page.$('.search-input');
    expect(searchInput).not.toBeNull();
    
    // 验证分类筛选存在
    const categoryFilter = await global.page.$('.category-filter');
    expect(categoryFilter).not.toBeNull();
    
    // 验证案例列表存在
    const caseList = await global.page.$('.case-list');
    expect(caseList).not.toBeNull();
  });

  test('TC-011: 案例搜索功能测试', async () => {
    // 搜索关键词
    const searchInput = await global.page.$('.search-input');
    await searchInput.input('刷单');
    await global.page.waitFor(1000);
    
    // 验证搜索结果
    const searchResults = await global.page.$$('.case-item');
    expect(searchResults.length).toBeGreaterThan(0);
  });

  test('TC-012: 案例分类筛选测试', async () => {
    // 点击"网络诈骗"分类
    const categoryBtn = await global.page.$('.category-item[data-category="网络诈骗"]');
    await categoryBtn.tap();
    await global.page.waitFor(1000);
    
    // 验证筛选结果
    const filteredCases = await global.page.$$('.case-item');
    expect(filteredCases.length).toBeGreaterThan(0);
  });

  test('TC-013: 案例详情跳转测试', async () => {
    // 点击第一个案例
    const firstCase = await global.page.$('.case-item');
    await firstCase.tap();
    await global.page.waitFor(2000);
    
    // 验证是否跳转到详情页
    const currentPage = await global.miniProgram.currentPage();
    expect(currentPage.path).toContain('caseDetail');
    
    // 返回案例列表
    await global.miniProgram.navigateBack();
    await global.page.waitFor(1000);
  });

  test('TC-014: 案例收藏功能测试(未登录状态)', async () => {
    // 尝试收藏案例
    const collectBtn = await global.page.$('.collect-btn');
    await collectBtn.tap();
    await global.page.waitFor(1000);
    
    // 验证未登录提示
    const loginPrompt = await global.page.$('.login-prompt');
    expect(loginPrompt).not.toBeNull();
  });
});
