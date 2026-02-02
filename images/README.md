# 图片资源说明

本目录存放小程序所需的图片资源。**所有图片已准备完毕，可直接使用。**

## 资源状态

✅ **已就绪** - 所有必需的图片资源已下载/生成到本地，无需额外准备。

## 目录结构

```
images/
├── banner/          # 轮播图（已下载 Unsplash 图片）
│   ├── banner1.png  # 750x400px - 网络安全主题
│   ├── banner2.png  # 750x400px - 科技安全主题
│   └── banner3.png  # 750x400px - 数字矩阵主题
│
├── tabbar/          # 底部标签栏图标（自定义TabBar使用emoji，此目录备用）
│   ├── home.png / home-active.png
│   ├── case.png / case-active.png
│   ├── quiz.png / quiz-active.png
│   └── mine.png / mine-active.png
│
├── icons/           # 功能图标（界面已使用emoji替代，此目录备用）
│   ├── marker.png        # 地图标记
│   ├── avatar-default.png # 默认头像
│   └── ...其他图标
│
├── cases/           # 案例配图（已下载 Unsplash 图片）
│   ├── shuadan.png       # 刷单返利 - 购物/交易主题
│   ├── loan.png          # 校园贷 - 金融/钱包主题
│   ├── impersonate.png   # 冒充身份 - 身份/安全主题
│   ├── game.png          # 游戏交易 - 游戏主题
│   ├── prize.png         # 虚假中奖 - 礼物/中奖主题
│   └── refund.png        # 网购退款 - 购物退款主题
│
└── share.png        # 分享封面图 500x400px（已下载）
```

## 图片来源

| 目录 | 来源 | 说明 |
|------|------|------|
| `banner/` | Unsplash | 免费商用图片，安全/科技主题 |
| `cases/` | Unsplash | 免费商用图片，与诈骗类型相关 |
| `share.png` | Unsplash | 分享时显示的封面图 |
| `tabbar/` | 程序生成 | 备用图标，当前使用emoji |
| `icons/` | 程序生成 | 备用图标，当前使用emoji |

## 图片规格

| 类型 | 尺寸 | 格式 |
|------|------|------|
| 轮播图 | 750 x 400 px | PNG/JPG |
| TabBar图标 | 48 x 48 px | PNG |
| 功能图标 | 64 x 64 px | PNG |
| 案例配图 | 600 x 400 px | PNG/JPG |
| 分享图 | 500 x 400 px | PNG |

## 替换说明

如需替换为自定义图片：

1. **轮播图**：替换 `banner/` 目录下的图片，保持相同文件名和尺寸
2. **案例配图**：替换 `cases/` 目录下的图片，建议使用与诈骗类型相关的警示图
3. **分享图**：替换 `share.png`，用于分享时的封面展示

## 图片优化建议

1. 使用 [TinyPNG](https://tinypng.com/) 压缩图片
2. 单张图片建议不超过 200KB
3. 优先使用 PNG 格式保证清晰度
