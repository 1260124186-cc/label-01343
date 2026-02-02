# 图片资源说明

本目录存放小程序所需的图片资源。请根据以下说明准备相应的图片文件。

## 目录结构

```
images/
├── banner/          # 轮播图
│   ├── banner1.png  # 750x400px - 主题宣传图
│   ├── banner2.png  # 750x400px - 刷单返利警示
│   └── banner3.png  # 750x400px - 校园贷警示
│
├── tabbar/          # 底部标签栏图标
│   ├── home.png          # 48x48px - 首页图标（未选中）
│   ├── home-active.png   # 48x48px - 首页图标（选中）
│   ├── case.png          # 48x48px - 案例库图标（未选中）
│   ├── case-active.png   # 48x48px - 案例库图标（选中）
│   ├── quiz.png          # 48x48px - 测试图标（未选中）
│   ├── quiz-active.png   # 48x48px - 测试图标（选中）
│   ├── mine.png          # 48x48px - 我的图标（未选中）
│   └── mine-active.png   # 48x48px - 我的图标（选中）
│
├── icons/           # 功能图标
│   ├── search.png        # 搜索图标
│   ├── phone.png         # 电话图标
│   ├── phone-call.png    # 拨打电话图标
│   ├── arrow-right.png   # 右箭头
│   ├── close.png         # 关闭图标
│   ├── share.png         # 分享图标
│   ├── warning.png       # 警告图标
│   ├── info.png          # 信息图标
│   ├── shield.png        # 盾牌图标
│   ├── empty.png         # 空状态图标
│   ├── location.png      # 位置图标
│   ├── marker.png        # 地图标记
│   ├── case.png          # 案例图标
│   ├── guide.png         # 指南图标
│   ├── quiz.png          # 测试图标
│   ├── quiz-big.png      # 测试大图标
│   ├── help.png          # 帮助图标
│   ├── wallet.png        # 钱包图标
│   ├── user.png          # 用户图标
│   ├── game.png          # 游戏图标
│   ├── shopping.png      # 购物图标
│   ├── avatar.png        # 默认头像
│   ├── emergency.png     # 紧急图标
│   ├── school.png        # 学校图标
│   ├── tool.png          # 工具图标
│   ├── police.png        # 警察图标
│   ├── antifraud.png     # 反诈图标
│   ├── report.png        # 举报图标
│   ├── security.png      # 保卫处图标
│   ├── teacher.png       # 老师图标
│   ├── psychology.png    # 心理咨询图标
│   ├── app.png           # APP图标
│   ├── wechat.png        # 微信图标
│   └── about.png         # 关于图标
│
├── cases/           # 案例配图
│   ├── shuadan.png       # 刷单返利案例图
│   ├── loan.png          # 校园贷案例图
│   ├── impersonate.png   # 冒充身份案例图
│   ├── game.png          # 游戏交易案例图
│   ├── prize.png         # 虚假中奖案例图
│   └── refund.png        # 网购退款案例图
│
└── share.png        # 分享封面图 (500x400px)
```

## 图片规格要求

### 轮播图 (banner/)
- 尺寸：750 x 400 像素
- 格式：PNG 或 JPG
- 建议：使用警示性强的配色（红色、橙色），文字清晰醒目

### 标签栏图标 (tabbar/)
- 尺寸：48 x 48 像素（建议使用 2x 或 3x 图）
- 格式：PNG（支持透明背景）
- 颜色：未选中使用灰色，选中使用红色（#e74c3c）

### 功能图标 (icons/)
- 尺寸：建议 64 x 64 像素或更大
- 格式：PNG（支持透明背景）
- 风格：线性图标或填充图标，保持风格统一

### 案例配图 (cases/)
- 尺寸：建议 750 x 400 像素
- 格式：PNG 或 JPG
- 内容：与诈骗类型相关的警示图片

## 图片优化建议

1. 使用 TinyPNG 等工具压缩图片
2. 避免使用过大的图片文件（单张不超过 200KB）
3. 优先使用 PNG 格式保证清晰度
4. 图标建议使用 SVG 转 PNG 保证锐利

## 临时占位

在正式图片准备好之前，可以使用纯色背景或简单形状作为占位符。小程序代码中已对图片缺失做了容错处理。
