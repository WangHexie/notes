---
layout: post
title: Difference between XGBoost and LightGBM
---

论文里两者分别提到的改进： 

* LightGBM：
  1. 有偏采样(Gradient-based One-Side Sampling)：保留大梯度的样本，小梯度的采样一小部分。
  2. 为稀疏特征设计的特征合并(Exclusive Feature Bundling)：构建图来做。

* XGBoost:
  1. Approximate Algorithm：分桶，画直方图。原来的构建树时候要驻点驻特征构建，太慢了。论文直接画直方图分桶构建。同时也防止过拟合。同时有两种分桶方式，一种是全局的，分桶分完就不变了。另一种，是局部的，树构建时会重新分桶。
  2. Weighed Quantile Sketch：画直方图时候，需要考虑权重。
  3. Sparsity-aware Split Finding: 处理稀疏数据。数据缺失时，采用默认路径。
  4. 工程上的处理：预排序；缓存优化，预读取，小数据块以装进CPU缓存；

百面机器学习中提到的改进：

XGBoost：

