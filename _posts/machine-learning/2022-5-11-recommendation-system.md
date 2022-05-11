---


layout: post
title: 推荐系统
---

## 推荐系统[[^1]]
* ALS: 矩阵分解算法，$Q=LR$,交替最小二乘。通过分别固定左右矩阵，依次更新。通过$L=QR^{-1}$，求得另一个矩阵。矩阵通过随机初始化，然后更新到收敛为止。

* weighted-ALS: 从评分预测问题转化为点击预测，其中浏览越多的权重越高。其中$C$为点击次数，$\alpha$一般为40。
  
  $$
  \begin{equation}
  min \sum c_{ui}(r_{ui}-q_u p_i)^2 + \lambda(...)
  \end{equation}
  $$

  $$
  \begin{equation}
  c_{ui} = 1+ \alpha C
  \end{equation}
  $$
  * 负样本采样一般推荐使用热门物品，随机的不是很靠谱。

* BPR: pair-wise, 评价指标使用AUC较为合适。不适合预测评分，适合预测行为。
  $$
	\begin{align}
    X_{u1,2} &= X_{u1} - X_{u2} \\
    p(1 \gt_u 2 ) &= \frac{1}{1+e^{-X_{u1,2}}}
  \end{align}
  $$

* GDBT+LR: 先训练GDBT，生成N棵树。来了新样本之后，走过所有的树，将访问到的叶子结点的值设为1，未访问到的设置为0。这样生成的one－hot特征，再丢到逻辑回归里做预测。
* FM: 就是加入了特征二阶组合的逻辑回归。为什么要二阶组合:例如年龄三十岁的男的对预测很重要，那么，做二阶组合就能提升效果。不做二阶组合达不到这个效果。而直接做二阶组合的话，参数过多，所以引入了参数对应的隐向量。
    * FM模型如果仅用用户ID和电影ID的话，那么就是带偏置SVD。
    * 如果加上历史观看的电影，那就是SVD＋＋
    * 加上时间信息就是time－SVD。
    * 所以FM可以在最后做模型融合。

* FFM：多加了多个隐向量，向量相乘时候选用另一个向量所在领域的向量。

* wide&deep: wide 一般是指以前做推荐一般都是特征工程＋逻辑回归。这样的好处是效果挺好，并且工程师可以并行工作，推荐的可解释性较强。但是深度学习出来之后，就希望引入deep的特征自动学习的能力。
  * 其中最后一层还是逻辑回归，deep的最后一层隐藏层和wide提取到的特征一起输入逻辑回归。
  * 其中数据要进行归一化（要变为正态分布，进行分桶处理）。

* Exploration and Exploitation: MAB 多臂老虎机。机会给确定好的选项和不确定的选项。评估指标：累积遗憾
  * 汤普森采样算法：根据beta分布来进行选取
  * UCB算法：根据进评分公式来选取
  * Epsilon 贪婪算法：$\epsilon$的概率随机选择一个选项，$1-\epsilon$的概率选择平均收益最高的。

  * (ridge 回归就是在矩阵对角线加上$I$，使得矩阵不那么病态？)
  * Lin－UCB: 给每个臂加上了特征。
  * COFIBA: 给Bandit算法加上了协同过滤。？（看不懂）

* 2Vec
  * doc2vec: 在预测中间词的时候，附带上了段落id，所以在学习过程中能对段落id对应的embedding进行更新。一个段落有多少个滑动窗口就能更新几次。 
    * 能用来学习用户的embedding


## 参考文献

[^1]: 推荐系统.陈开江.

[^2]: [https://blog.csdn.net/zheng19880607/article/details/23883437](https://blog.csdn.net/zheng19880607/article/details/23883437)

[^3]: [https://zhuanlan.zhihu.com/p/161560391](https://zhuanlan.zhihu.com/p/161560391)

[^4]: [https://zhuanlan.zhihu.com/p/260992059](https://zhuanlan.zhihu.com/p/260992059#:~:text=%E9%92%88%E5%AF%B9%E4%B8%8A%E8%BF%B0%E6%83%85%E5%86%B5%EF%BC%8CC%2B%2B%2011,%E5%87%BD%E6%95%B0%E7%9A%84%E8%BF%9B%E4%B8%80%E6%AD%A5%E9%87%8D%E5%86%99%E3%80%82)

[^5]: [https://blog.csdn.net/capecape/article/details/78276677](https://blog.csdn.net/capecape/article/details/78276677)

[^6]: [https://www.runoob.com/cplusplus/cpp-copy-constructor.html](https://www.runoob.com/cplusplus/cpp-copy-constructor.html)

[^7]: [https://docs.microsoft.com/en-us/cpp/cpp/extern-cpp?view=msvc-170](https://docs.microsoft.com/en-us/cpp/cpp/extern-cpp?view=msvc-170)