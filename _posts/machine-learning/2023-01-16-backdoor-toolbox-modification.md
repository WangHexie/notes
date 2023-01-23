---
layout: post
title: Backdoor Toolbox 适配图数据注意事项 
---

1. 首先是需要对图数据写一个适配器，返回Data，label形式
2. 然后需要禁用所有的pin_memory至少在我本机上是这样的
3. 修改backdoor形式
4. 改优化器
5. 改文件夹保存的文件名格式，":"改成“_”
6. 处理引用__init__.py
7. 