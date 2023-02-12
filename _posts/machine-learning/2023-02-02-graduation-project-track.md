---
layout: post
title: 毕设进度跟踪
---

## 方向一
* [ ] 数据比例
* [ ] 固定随机数种子
 

## 方向二
* [x] GNNbenchmark 论文阅读
  * [x] mnist数据集是怎么制作的？:super pixel
  * [x] GNN是什么结构？（调优模型到sota）: graphsage 非常不错
* [x] 调优并测试所有的算法
  * [x] NAD搞好了
  * [x] finetuning 也搞好了
  * [x] ABL基本也好了，但是ABL有一个问题就是选的数据不能太多，不然最后一个环节有很多干净样本结果会很难看。
* [x] 选一个算法作为基础，然后叠加另一个算法:我选好了
* [ ] 思路
  * [ ] 复制几层，其他的重新训练
  * [ ] 全部重新初始化后蒸馏
  * [ ] 干净的数据集数量很重要，所以使用loss将数据集用ABL过滤出来之后重新训练（**In progeress**）
    * [ ] 检查随机数种子固定后选取的数字是否一致
  * [ ] 可视化一下，看看loss的变化过程，以及poisoned data 的loss 分布情况 (**In progeress**）
