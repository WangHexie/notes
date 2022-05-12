---
layout: post
title: 博客以及其他闲聊
---

图片格式：
\!\[_config.yml](\{\{ site.baseurl \}\}/images/config.png)

## 数学公式
* mathjax，然后配置标识符，dollar符号需要对齐，不然无法显示。

## 去除双层highlighting
* 写js，直接将多出来的div.highlight 的class属性给去除了。

## 检索
* 直接使用网上的js，应该是检索XML。
* 检索时出现cache，返回的是其他的检索内容。github可以复现(fixed，主要是最后少一个反斜杠，给你默认301到有反斜杠的网址了，然后query的内容丢失了)
