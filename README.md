## OS theme

简洁小巧的复古主题。

Simple and light old style theme.

### Use

主题安装
```shell
cd /hexo-dir

# install theme
git clone https://github.com/zowiegong/hexo-theme-os.git /themes/os

# install depend
npm install hexo-renderer-github hexo-renderer-jade --save
```


修改 Hexo 配置文件 theme 字段
```yml
theme: os
```


### Theme config

编辑主题配置文件

```yml
# 基本信息
repo: zowiegong/hexo-blog
mail: zowiegong@gmail.com

# 导航栏
menu:
  categories: /categories
  tags: /tags
  about: /about

plugins:
  googleAnalytics: UA-121105508-1 # google 分析

  scrollToTop: true # 滚动到顶部
  scrollSmooth: false # 开启平滑滚动

  # 评论
  comments:
    enable: true # 是否启用
    repo: zowiegong/hexo-blog # repo
```