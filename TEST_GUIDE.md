# 校园反诈卫士 - 测试运行指南

## 目录
1. [环境准备](#环境准备)
2. [测试框架安装](#测试框架安装)
3. [测试配置](#测试配置)
4. [运行测试](#运行测试)
5. [测试报告](#测试报告)
6. [常见问题](#常见问题)
7. [持续集成](#持续集成)

---

## 1. 环境准备

### 1.1 系统要求
- macOS 10.14+ 或 Windows 10+
- Node.js 14.0+
- npm 6.0+ 或 yarn 1.22+
- 微信开发者工具（最新稳定版）

### 1.2 安装微信开发者工具
1. 访问 [微信开发者工具下载页面](https://developers.wechat.com/miniprogram/dev/devtools/download.html)
2. 下载并安装适合您操作系统的版本
3. 启动开发者工具，完成登录和初始化设置

### 1.3 配置小程序项目
1. 打开微信开发者工具
2. 导入本项目：
   - 点击"导入项目"
   - 选择项目根目录
   - AppID 可使用测试号（如果没有真实 AppID）
3. 确保项目能正常编译运行

---

## 2. 测试框架安装

### 2.1 安装项目依赖
在项目根目录下执行：

```bash
# 安装所有依赖
npm install

# 或使用 yarn
yarn install
```

### 2.2 验证安装
```bash
# 检查 jest 是否安装
npx jest --version

# 检查 miniprogram-automator 是否安装
node -e "console.log(require('miniprogram-automator').version)"
```

---

## 3. 测试配置

### 3.1 配置文件说明

#### package.json
```json
{
  "scripts": {
    "test": "jest test/**/*.test.js",
    "test:watch": "jest test/**/*.test.js --watch",
    "test:coverage": "jest test/**/*.test.js --coverage"
  }
}
```

#### jest.config.js
- `testEnvironment: 'node'` - 使用 Node.js 测试环境
- `testTimeout: 30000` - 单个测试用例超时时间 30 秒
- `collectCoverage: true` - 收集测试覆盖率
- `testMatch` - 指定测试文件匹配模式

#### test/setup.js
全局测试初始化文件，包含：
- 小程序启动和关闭逻辑
- 测试超时设置
- 通用辅助函数

### 3.2 微信开发者工具配置
1. 打开微信开发者工具
2. 进入"设置" -> "安全设置"
3. 开启"服务端口"（默认端口：9420）
4. 开启"安全服务"

---

## 4. 运行测试

### 4.1 基本运行方式

#### 运行所有测试
```bash
npm test

# 或
yarn test
```

#### 运行特定模块测试
```bash
# 运行首页测试
npm test test/index/index.test.js

# 运行知识测试模块
npm test test/quiz/quiz.test.js

# 运行登录测试
npm test test/login/login.test.js
```

#### 监控模式（文件变化自动重测）
```bash
npm run test:watch
```

#### 带覆盖率报告运行
```bash
npm run test:coverage
```

### 4.2 手动测试步骤

#### 步骤1：启动微信开发者工具
1. 打开微信开发者工具
2. 确保项目已导入并正常运行
3. 检查控制台有无错误

#### 步骤2：运行自动化测试
```bash
# 在项目根目录执行
npm test
```

#### 步骤3：观察测试过程
- 测试框架会自动控制开发者工具
- 可以看到页面自动跳转和操作
- 控制台会输出测试进度和结果

### 4.3 测试命令说明

| 命令 | 说明 |
|------|------|
| `npm test` | 运行所有测试用例 |
| `npm test [文件路径]` | 运行指定文件的测试 |
| `npm run test:watch` | 监控模式，文件变化自动重测 |
| `npm run test:coverage` | 运行测试并生成覆盖率报告 |
| `npm test -- --verbose` | 显示详细测试信息 |
| `npm test -- --testNamePattern="TC-001"` | 只运行匹配名称的测试 |

---

## 5. 测试报告

### 5.1 控制台报告
运行测试后，控制台会显示：
- 测试用例总数
- 通过/失败数量
- 失败用例的详细信息
- 测试耗时

### 5.2 覆盖率报告
运行 `npm run test:coverage` 后：
- 在 `coverage` 目录生成详细报告
- 可以在浏览器中打开 `coverage/lcov-report/index.html` 查看
- 包含语句覆盖率、分支覆盖率、函数覆盖率等

### 5.3 自定义测试报告
可以在 `jest.config.js` 中配置更多报告格式：
```javascript
coverageReporters: ['text', 'lcov', 'html', 'json']
```

---

## 6. 常见问题

### 6.1 小程序启动失败
**问题**：测试时提示无法启动小程序
**解决方法**：
1. 确保微信开发者工具已正确安装
2. 检查 cliPath 配置是否正确
3. 确保开发者工具的服务端口已开启
4. 重启开发者工具和终端

### 6.2 元素找不到
**问题**：测试时提示元素不存在
**解决方法**：
1. 检查选择器是否正确
2. 增加等待时间：`await page.waitFor(1000)`
3. 使用 `waitForElement` 辅助函数
4. 检查页面是否正确加载

### 6.3 测试超时
**问题**：测试用例超时失败
**解决方法**：
1. 增加测试超时时间
2. 在 `jest.config.js` 中调整 `testTimeout`
3. 优化测试逻辑，减少不必要的等待

### 6.4 权限问题
**问题**：涉及微信授权的测试失败
**解决方法**：
1. 在开发者工具中提前授权
2. 使用模拟数据替代真实授权
3. 在测试用例中处理授权弹窗

---

## 7. 持续集成

### 7.1 GitHub Actions 配置示例
创建 `.github/workflows/test.yml`：

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm install
      
      - name: Install WeChat DevTools
        run: |
          wget -O WeChatWebDevTools.dmg "https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin&from=mpwiki&download_version=1.06.2307260&version_type=1"
          hdiutil attach WeChatWebDevTools.dmg
          cp -R "/Volumes/微信开发者工具/微信开发者工具.app" /Applications/
          hdiutil detach "/Volumes/微信开发者工具"
      
      - name: Run tests
        run: npm test
        env:
          CI: true
```

### 7.2 测试环境变量
在 CI 环境中可以设置以下变量：
- `CI=true` - 启用 CI 模式
- `WECHAT_CLI_PATH` - 指定开发者工具路径
- `TEST_TIMEOUT` - 自定义测试超时时间

---

## 8. 测试最佳实践

### 8.1 测试用例编写规范
1. **清晰的测试描述**：每个测试用例应有明确的测试目标
2. **独立的测试环境**：每个测试用例应独立运行，不依赖其他测试
3. **合适的断言**：使用合适的断言验证预期结果
4. **错误处理**：测试中应有适当的错误处理和日志

### 8.2 性能优化建议
1. **减少等待时间**：使用条件等待替代固定延迟
2. **重用测试数据**：避免重复创建相同的测试数据
3. **并行测试**：利用 Jest 的并行测试功能
4. **测试分组**：将相关测试用例分组管理

### 8.3 维护建议
1. **定期更新测试**：功能变更时及时更新测试用例
2. **清理过时测试**：删除不再使用的测试用例
3. **监控测试健康**：定期检查测试通过率和覆盖率
4. **团队协作**：测试用例应与团队共享和评审

---

## 9. 扩展测试

### 9.1 添加新测试用例
1. 在对应模块的 test 目录下创建新文件
2. 遵循现有测试用例的结构和命名规范
3. 使用 `describe` 和 `test` 组织测试
4. 确保测试用例可独立运行

### 9.2 集成其他测试工具
- **ESLint**：代码规范检查
- **Prettier**：代码格式化
- **SonarQube**：代码质量分析
- **Lighthouse**：性能和最佳实践检查

---

## 10. 联系与支持

如果在测试过程中遇到问题：
1. 检查本指南的常见问题部分
2. 查看项目文档和代码注释
3. 在项目 issue 中搜索相关问题
4. 联系开发团队获取技术支持

---

**祝您测试顺利！** 🚀

---

## 附录：测试用例速查表

| 模块 | 测试文件 | 主要测试点 |
|------|----------|------------|
| 首页 | `test/index/index.test.js` | 轮播图、快速入口、搜索预警、一键报警 |
| 知识测试 | `test/quiz/quiz.test.js` | 登录验证、答题流程、结果统计 |
| 登录 | `test/login/login.test.js` | 微信登录、游客模式、权限控制 |
| 求助通道 | `test/mine/mine.test.js` | 热线展示、地图功能、用户信息 |

---

**版本**：1.0.0  
**更新日期**：2024年  
**适用版本**：校园反诈卫士 v1.0.0
