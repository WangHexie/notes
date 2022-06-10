---
layout: post
title: 面试整理
---
### 阿里
1. BERT:

   1. 别忘了Q*K还要除以$$\sqrt{d_k}$$

   $$
   \operatorname{Attention}(Q, K, V)=\operatorname{softmax}\left(\frac{Q K^{T}}{\sqrt{d_{k}}}\right) V
   $$

   2. 别忘了Position embedding和token embedding 还有一个segment embedding
   3. 训练任务是MLM，cls，还有nsp。

2. Transformer：

   1. Decoder里会接两个Attention。先是自己和自己的attention，第二个Attention里$K$和$$V$$是来自Encoder的输出。

   2. multiple head attention.[实现](https://github.com/jadore801120/attention-is-all-you-need-pytorch/blob/master/transformer/SubLayers.py)

### 携程一面
3. 推荐系统中为什么AUC这个指标不是很好(会识别重要用户，但是对线上没什么用)。如何解决？：换NDCG等分组的指标

### 携程二面

4. word2vec 如何处理高频词汇[[^1]]：
   1. 二次采样[[^2]]： 对文本中的每个词，施加一定的删除概率，词概率与词的频数有关.删除概率：$P\left(w_{i}\right)=\max \left(1-\sqrt{\frac{t}{f\left(w_{i}\right)}}, 0\right)$
   2. 负采样：采样概率 $P\left(w_{i}\right)=\frac{f\left(w_{i}\right)^{3 / 4}}{\sum_{j=0}^{n}\left(f\left(w_{j}\right)^{3 / 4}\right)}$
5. 坐标下降[[^3]]：坐标下降法基于的思想是多变量函数$F(\mathbf {x} )$可以通过每次沿一个方向优化来获取最小值。与通过梯度获取最速下降的方向不同，在坐标下降法中，优化方向从算法一开始就予以固定。例如，可以选择线性空间的一组基 $\mathbf {e} _{1},\mathbf {e} _{2},\dots ,\mathbf {e} _{n}$作为搜索方向。 在算法中，循环最小化各个坐标方向上的目标函数值**在每一次迭代中采用一维搜索（英语：line search)**, **无需导数！！！！**

6. 逻辑回归的优化算法：(是这个吗？[[^4], [^5]][http://blog.csdn.net/itplus/article/details/21896453](http://blog.csdn.net/itplus/article/details/21896453) 牛顿法和拟牛顿法，拟牛顿包括BFGS和L-BFGS, 推导海森矩阵的逆之间的关系，绕开了求解海森矩阵。)
7. L1不可导怎么办：坐标下降算法
8. 最优化里如何处理等式约束和不等式约束：看书，太多了奥。面试时候忘记min还是max了
9.  adboost,GBDT的联系和区别：联系：都是前向加法模型。
10. adboost为什么是前向加法模型？：前向分步算法是简化复杂优化问题的一种方法。因为学习的是加法模型，所以能够从前向后，一步一步学习，每一步只学习一个基函数和它的系数，逐步逼近复杂的优化问题的目标函数。每步只需要优化所有样本的损失函数就可以了：
   1. adaboost算法是前向分步加法算法的特例。这时，模型是由基本分类器组成的加法模型，损失函数是指数函数。[[^6]]

11. K-Means(K均值)、GMM(高斯混合模型)的区别：而它相比于K 均值算法的优点是，可以给出一个样本属于某类的概率是多少；不仅仅可以用于聚类，还可以用于概率密度的估计；并且可以用于生成新的样本点。
    1. 高斯混合模型的公式：
       $$
       \begin{equation}
      p(x)=\sum_{i=1}^{k} \pi_{i} N\left(x \mid u_{i}, \sum_{i}\right)
      \end{equation}
       $$ 
 
12. 线上长序列如何处理：将时间序列和线上模型预测分开？(将用户兴趣建模和ctr预估解耦) [[^7]]。




## 参考文献

[^1]: [https://blog.csdn.net/guangyacyb/article/details/104913504](https://blog.csdn.net/guangyacyb/article/details/104913504)
      
[^2]: [https://github.com/DA-southampton/NLP_ability](https://github.com/DA-southampton/NLP_ability/blob/master/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E5%A4%84%E7%90%86/%E8%AF%8D%E5%90%91%E9%87%8F/Word2vec%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%BA%8C%E6%AC%A1%E9%87%87%E6%A0%B7%EF%BC%9F.md)

[^3]: [https://zh.m.wikipedia.org/zh-hans/%E5%9D%90%E6%A0%87%E4%B8%8B%E9%99%8D%E6%B3%95](https://zh.m.wikipedia.org/zh-hans/%E5%9D%90%E6%A0%87%E4%B8%8B%E9%99%8D%E6%B3%95#:~:text=%E5%9D%90%E6%A0%87%E4%B8%8B%E9%99%8D%E6%B3%95%EF%BC%88%E8%8B%B1%E8%AA%9E%EF%BC%9Acoordinate,%E6%B1%82%E5%BE%97%E6%9C%80%E4%BC%98%E8%A7%A3%E3%80%82)

[^4]:[https://zhuanlan.zhihu.com/p/34953654](https://zhuanlan.zhihu.com/p/34953654)

[^5]: [https://blog.csdn.net/qq_27782503/article/details/88778831](https://blog.csdn.net/qq_27782503/article/details/88778831)

[^6]: [https://blog.csdn.net/zhangyingjie09/article/details/85875264](https://blog.csdn.net/zhangyingjie09/article/details/85875264)

[^7]: [https://cloud.tencent.com/developer/article/1645247](https://cloud.tencent.com/developer/article/1645247)