---
layout: post
title: 算法面经整理
---

## 推荐系统
- [ ] [机器学习/推荐系统/推荐系统算法工程师面试指导](https://blog.nowcoder.net/n/b229dd5b0e56481e990bde04e9c75ca1)
 
  - [ ] LFM MF SVD SVD++ FM difference
 
  - [x] EVD: 特征值分解， $A=Q\Sigma Q^{-1}$, 在线性子空间，各个分量的大小。[[^3]]
   
  - [x] SVD：适用于非方阵 [[^3]]
    * 一般来说SVD里的 $$M=U*\Sigma*V$$, $$U \in R^{m*m}$$, $$\Sigma \in R^{m*n}$$, $$V \in R^{n*n}$$ [[^1]]
    * 但是推荐系统里一般指compact SVD， $$U \in R^{m*k}$$, $$\Sigma \in R^{k*k}$$, $$V \in R^{k*n}$$ [[^1], [^2]]
    * 求解：通过求$$MM^T$$ 和 $$M^TM$$的特征值，分别得到$$U$$和$V$。然后$\Sigma$由下式得到：$A=U \Sigma V^{T} \Rightarrow A V=U \Sigma V^{T} V \Rightarrow A V=U \Sigma \Rightarrow A v_{i}=\sigma_{i} u_{i} \Rightarrow \sigma_{i}=\frac{A v_{i}}{u_{i}}$
    * 由于求解太复杂，所以有了compact SVD， 只保留前几个奇异值，同时效果还可以。
    * 同时原始的SVD必须是要稠密矩阵，应用中实际上大量是空的，所以一般要均值填充或其他方法如下面的FunkSVD。
    * FunkSVD: 分解为两个矩阵，且只关心非空元素,同时有l2正则。[[^4]]
      
      $$
      \begin{equation}
      \min _{q^{*}, p^{*}} \sum_{(u, i) \in \mathcal{K}}\left(r_{u i}-q_{i}^{T} p_{u}\right)^{2}
      \end{equation}
      $$
    
    * PMF：概率形式的FunkSVD， 参数符合正态分布。[[^4]]
     
    * BiasSVD: 加入了用户和item的偏置，减少参数学习的难度。[[^4]]

      $$
      \begin{equation}
      \hat{r}_{i j}=\mu+b_{u}+b_{i}+q_{i}^{T} p_{u}
      \end{equation}
      $$

    * SVD++: 加入了其他隐式反馈信息。其中$I_u$是隐式反馈行为的列表。并加入了隐式反馈行为对用户的偏好的影响$y_j$[[^4]]
      
      $$
      \begin{equation}
      \hat{r}_{u i}=\mu+b_{i}+b_{u}+q_{i}^{\top}\left(p_{u}+\left|I_{u}\right|_{j m}^{-\frac{1}{2}} \sum_{j \in I_{u}} y_{j}\right)
      \end{equation}
      $$

    * timeSVD：用户的偏好等会随时间变化。$t$表示的时间相关参数。

      $$
      \begin{equation}
      \hat{r}_{u i}=\mu+b_{i}\left(t_{u i}\right)+b_{u}\left(t_{u i}\right)+q_{i}^{T} p_{u}\left(t_{u i}\right)
      \end{equation}
      $$

    * NMF：非负矩阵分解，做这个主要是由于分解出来的矩阵有负值的话，现实应用中很难解释推荐，如果都是正值就能较好解释了。
 
    * WMF：(只有正样本的分类问题叫One-class问题，论文：One-class collaborative filtering)加权的矩阵分解，以及负采样。

      $$
      \begin{equation}
      \mathcal{L}(\boldsymbol{X})=\sum_{i j} W_{i j}\left(R_{i j}-X_{i j}\right)^{2}
      \end{equation}
      $$ 
      
    * LLORMA: 局部低秩，而不是全局低秩。？？？(Lee et al. Local low-rank matrix approximation.ICML. 2013.)
    * 

  - [ ] adboost原理
- [ ] [详细面经](https://posts.careerengine.us/p/5df19284178ec71122269bb1)
  - [ ] catboost
  - [ ] 

## 搜索

## NLP

## 机器学习
- [ ] 手推bp公式

## C++
- [ ] [高频面试题](https://blog.csdn.net/xie810005152/article/details/91038878)

## TODO
- [x] python basics
- [ ] c++ interview
- [ ] 推荐系统
- [ ] 搜索
- [ ] NLP
- [ ] 机器学习
- [ ] hadoop等

## 参考资料

[^1]: [https://en.wikipedia.org/wiki/Singular_value_decomposition](https://en.wikipedia.org/wiki/Singular_value_decomposition)

[^2]: [https://analyticsindiamag.com/singular-value-decomposition-svd-application-recommender-system/](https://analyticsindiamag.com/singular-value-decomposition-svd-application-recommender-system/)

[^3]: [矩阵分解之: 特征值分解(EVD)、奇异值分解(SVD)、SVD++](https://blog.csdn.net/qfikh/article/details/103994319)

[^4]: [https://zhuanlan.zhihu.com/p/35262187](https://zhuanlan.zhihu.com/p/35262187)