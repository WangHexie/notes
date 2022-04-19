---
layout: post
title: Boosting, GBM, XGBoost and LightGBM
---

1. 梯度提升树和提升树区别在于，梯度提升树拟合的是负梯度，当loss采用l2loss的时候，负梯度和残差一致。    
   GBM算法：     
   ![GBM]({{site.baseurl}}/images/boosting/gbm.png)
   ![GBM]({{site.baseurl}}/images/boosting/gbm2.png)[[^bm]]



## XGBoost [[^bm]]
   1. XGBoost 在树的构建阶段就加入了正则项。 
   2. XGBoost在训练之前，预先对数据进行了排序，然后保存为block结构，后面的迭代中重复地使用这个结构，大大减小计算量。
   3. 在进行节点的分裂时，需要计算每个特征的增益，最终选增益最大的那个特征去做分裂，那么各个特征的增益计算就可以开多线程进行
   4. 传统的GBDT没有设计对缺失值进行处理，XGBoost可以自动学习出它的分裂方向。
   5. 传统的GBDT在每轮迭代时使用全部的数据，XGBoost则采用了与随机森林相似的策略，支持对数据进行采样，支持列抽样，不仅能降低过拟合，还能减少计算，这也是xgboost异于传统gbdt的一个特性。
   6. XGBoost支持多种类型的基分类器，比如线性分类器。
   7. GBDT在模型训练时只使用了代价函数的一阶导数信息，XGBoost对代价函数进行二阶泰勒展开，可以同时使用一阶和二阶导数(可以看[[^bm]])

## LightGBM [[^lg]]
  *看不懂啥子意思*
  * 基于Histogram的决策树算法。
  * 单边梯度采样 Gradient-based One-Side Sampling(GOSS)：使用GOSS可以减少大量只具有小梯度的数据实例，这样在计算信息增益的时候只利用剩下的具有高梯度的数据就可以了，相比XGBoost遍历所有特征值节省了不少时间和空间上的开销。
  * 互斥特征捆绑 Exclusive Feature Bundling(EFB)：使用EFB可以将许多互斥的特征绑定为一个特征，这样达到了降维的目的。
  * 带深度限制的Leaf-wise的叶子生长策略：大多数GBDT工具使用低效的按层生长 (level-wise) 的决策树生长策略，因为它不加区分的对待同一层的叶子，带来了很多没必要的开销。实际上很多叶子的分裂增益较低，没必要进行搜索和分裂。LightGBM使用了带有深度限制的按叶子生长 (leaf-wise) 算法。
  * 直接支持类别特征(Categorical Feature)
  * 支持高效并行
  * Cache命中率优化
    
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

[^1]: [GBDT、XGBoost、LightGBM的区别和联系](https://www.jianshu.com/p/765efe2b951a)

[^bm]: 百面机器学习

[^lg]: [https://zhuanlan.zhihu.com/p/99069186](https://zhuanlan.zhihu.com/p/99069186)