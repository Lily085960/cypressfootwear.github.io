# Cypress Footwear 独立站部署指南

> 目标域名：**cypressfootwear.com**  
> 预计耗时：15-20分钟  
> 总成本：约 $10/年（域名）+ 免费（托管）

---

## 📋 准备工作

- 一张信用卡或 PayPal 账号（用于支付域名）
- 一个邮箱（用于注册账号）
- 本指南（建议手机或另一台电脑打开，边看边操作）

---

## 第一步：购买域名（约5分钟）

### 1.1 访问 Namecheap
打开浏览器，访问：**https://www.namecheap.com**

### 1.2 搜索域名
在首页搜索框输入：`cypressfootwear.com`

### 1.3 加入购物车
- 如果显示 **"Available"**（可用），点击 **"Add to Cart"**
- 如果显示 **"Taken"**（已被注册），告诉我，我们换备选域名

### 1.4 结算
- 点击购物车图标 → **"Checkout"**
- 选择 **1年** 注册期（约 $10.98）
- 不需要购买额外的 Privacy Protection（WhoisGuard 通常是免费的）
- 填写账号信息（邮箱、密码）
- 支付（信用卡/PayPal）

### 1.5 确认购买成功
- 你会收到确认邮件
- 登录 Namecheap 账号，在 **"Domain List"** 里能看到 `cypressfootwear.com`

---

## 第二步：创建 GitHub 账号（约3分钟）

### 2.1 访问 GitHub
打开：**https://github.com**

### 2.2 注册账号
- 点击 **"Sign up"**
- 输入邮箱、密码、用户名（建议用公司名，如 `cypressfootwear`）
- 完成邮箱验证

### 2.3 创建仓库
- 登录后点击右上角 **"+"** → **"New repository"**
- Repository name 填：`cypressfootwear.github.io`
- 选择 **Public**（公开）
- 勾选 **"Add a README file"**
- 点击 **"Create repository"**

---

## 第三步：上传网站文件（约5分钟）

### 3.1 下载网站文件
网站文件位置：`/Users/yieyu/WorkBuddy/20260408125955/cypress_website/`

你需要把这些文件打包成 ZIP，或者直接用 GitHub 网页上传。

### 3.2 网页上传方式（推荐新手）
1. 进入刚创建的仓库页面
2. 点击 **"Add file"** → **"Upload files"**
3. 把 `cypress_website` 文件夹里的所有文件和文件夹拖进去：
   - `index.html`
   - `robots.txt`
   - `sitemap.xml`
   - `schema.json`
   - `assets/` 文件夹（包含 css/、js/、images/）
4. 滚动到底部，点击 **"Commit changes"**

### 3.3 确认上传成功
- 刷新页面，应该能看到所有文件列表
- 点击 `index.html` 能看到代码内容

---

## 第四步：配置 GitHub Pages（约2分钟）

### 4.1 开启 Pages 功能
1. 在仓库页面，点击顶部 **"Settings"**（设置）
2. 左侧菜单点击 **"Pages"**
3. 在 **"Source"** 部分：
   - Branch 选择 **"main"**
   - 点击 **"Save"**

### 4.2 等待部署
- 页面会显示：`Your site is ready to be published at https://cypressfootwear.github.io/`
- 等待 1-2 分钟，刷新页面
- 看到绿色勾和网址，说明部署成功

### 4.3 测试访问
打开浏览器，访问：**https://cypressfootwear.github.io/**
- 应该能看到你的网站！

---

## 第五步：域名解析（约5分钟）

### 5.1 获取 GitHub Pages IP 地址
GitHub Pages 的 IP 地址是固定的：
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### 5.2 在 Namecheap 配置 DNS
1. 登录 Namecheap，进入 **"Domain List"**
2. 找到 `cypressfootwear.com`，点击 **"Manage"**
3. 点击 **"Advanced DNS"** 标签
4. 在 **"Host Records"** 部分，添加以下记录：

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |
| CNAME Record | www | cypressfootwear.github.io | Automatic |

5. 点击 **"Save All Changes"**

### 5.3 在 GitHub 配置自定义域名
1. 回到 GitHub 仓库
2. 点击 **"Settings"** → **"Pages"**
3. 在 **"Custom domain"** 框里输入：`www.cypressfootwear.com`
4. 点击 **"Save"**
5. 勾选 **"Enforce HTTPS"**（等待DNS生效后才能勾选，通常24小时内）

### 5.4 等待生效
- DNS 传播需要 **几分钟到24小时**
- 可以用这个工具检查：https://dnschecker.org
- 输入 `cypressfootwear.com`，看 A 记录是否指向 185.199.x.x

---

## ✅ 完成！

### 测试清单
- [ ] 访问 https://www.cypressfootwear.com 能看到网站
- [ ] 点击导航能正常跳转
- [ ] 联系表单能填写（提交功能需要第六步）
- [ ] 手机打开显示正常

---

## 第六步（可选）：对接联系表单

现在表单是本地验证，提交后只是显示成功信息，**不会真的发邮件**。

要让表单能发邮件，有两种方案：

### 方案A：Formspree（免费，推荐）
1. 访问 https://formspree.io
2. 注册账号，创建新表单
3. 复制表单 endpoint（如 `https://formspree.io/f/xnqkvnzp`）
4. 告诉我，我帮你改代码

### 方案B：直接留 WhatsApp/邮箱
保持现状，客户点击 WhatsApp 按钮直接聊天

---

## 遇到问题怎么办？

| 问题 | 解决方法 |
|------|---------|
| 域名显示 "Taken" | 告诉我，换备选域名 |
| GitHub Pages 404 | 检查文件名是否正确（必须是小写 index.html） |
| 域名访问不了 | 等24小时，或检查 DNS 配置 |
| 网站样式错乱 | 检查 assets/css/style.css 是否上传成功 |

---

## 下一步建议

1. **Google Search Console** — 提交网站，让Google收录
2. **Google Analytics** — 追踪访客数据
3. **更新产品图片** — 用最新款式替换现有图片

需要我帮你做这些吗？
