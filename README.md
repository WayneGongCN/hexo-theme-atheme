## OS theme

简洁小巧的复古主题。

Simple and light old style theme.

### Use

主题安装
```shell
cd /hexo-dir

# clone 主题到 themes 目录
git clone https://github.com/zowiegong/hexo-theme-os.git /themes/os

# 依赖安装
npm install hexo-renderer-github hexo-renderer-jade --save
```


修改 **Hexo** 配置文件 `theme` 字段为 `os`
```yml
theme: os
```


### Theme config

编辑**主题**配置文件

`plugins` 用来配置主题自带的功能，不启用时请删除对应字段或设置为 `false`

```yml
# 基本信息
repo: zowiegong/hexo-blog
mail: zowiegong@gmail.com

# 导航栏
menu:
  categories: /categories
  tags: /tags
  about: /about

# 插件
plugins:
  # google 分析
  googleAnalytics: UA-121105508-1

  # 滚动到顶部
  scrollToTop: true
  # 开启平滑滚动
  scrollSmooth: false

  # 评论，评论基于 utteranc.es 启用前请先安装 https://github.com/apps/utterances 在指定 repo
  comments:
    enable: true # 是否启用评论
    repo: zowiegong/hexo-blog # utterances app 所在 repo
```


## Other

### hexo-renderer-github 依赖配置

主题使用 GitHub Markdown 样式，同时使用 GitHub Markdown API 渲染，依赖 `hexo-renderer-github` .

由于 GitHub API 在未认证模式下存在调用的限制，当文章数量较多时请配置 [Authorization](https://github.com/zowiegong/hexo-renderer-github#options).

[这里](https://github.com/settings/tokens/new?scopes=repo&description=OS%20Theme) 申请 Authorization 并填入 Hexo 配置文件 `githubRender` 属性.

```yml
githubRender:
  request:
    headers:
      Authorization: token {TOKEN}
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36
```

### hexo-renderer-github

主题使用 jade 模板语法，需要安装 `hexo-renderer-jade` 无需配置
