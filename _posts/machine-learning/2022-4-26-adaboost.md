---
layout: post
title: Adaboost
---

## Adaboost[[^1]]
  ### 注意点：
  1. 数据有权重，根据权重进行学习得到基分类器
  2. 基分类器学习方法：任一弱分类器？
  3. 基分类器的权重系数：根据分类误差率进行设置。
  4. 数据权重更新：上一轮权重乘以当前模型分类误差率相关稀疏
  5. 最终模型，基模型相加。
  6. 损失函数是指数函数（可证明）：$L(y, f(x))=\exp [-y f(x)]$
     1. 证明挺巧妙的，主要是把$f_m(x)$ 拆分为两部分，一部分是之前学的分类器加和以及当前需要学的$G(x)$。
     2. 对$f_m(x)$施加指数损失函数后，数据权重$w_{mi}$实际上就是前面分类器的指数损失结果。
     3. 而当前求得的$\alpha_m$为将该指数损失函数最小化的结果，通过求导为零解出。
     4. $w_{mi}$ 的更新：由于 $\bar{w}_{m i}=\exp \left[-y_{i} f_{m-1}\left(x_{i}\right)\right]$ ，直接将 $f_m(x)$ 展开即可得更新公式为上一步的 $w_{m-1}$ 乘以这一步的 $G(x)$ 的损失直接得到。
     5. 最终与原始算法差距一个$Z$系数。
  7. 

  ### 公式
  1. 分类误差率：
    
      $$
      \begin{equation}
      e_{m}=\sum_{i=1}^{N} P\left(G_{m}\left(x_{i}\right) \neq y_{i}\right)=\sum_{i=1}^{N} w_{m i} I\left(G_{m}\left(x_{i}\right) \neq y_{i}\right)
      \end{equation}
      $$ 

  2. $G(x)$ 的系数：
      
      $$
      \begin{equation}
      \alpha_{m}=\frac{1}{2} \log \frac{1-e_{m}}{e_{m}}
      \end{equation}
      $$
  
  3. 数据权重更新：
      
      $$
      \begin{equation}
      w_{m+1, i}=\frac{w_{m i}}{Z_{m}} \exp \left(-\alpha_{m} y_{i} G_{m}\left(x_{i}\right)\right), \quad i=1,2, \cdots, N
      \end{equation}
      $$

      规范化因子：

      $$
      \begin{equation}
      Z_{m}=\sum_{i=1}^{N} w_{m i} \exp \left(-\alpha_{m} y_{i} G_{m}\left(x_{i}\right)\right)
      \end{equation}
      $$

  4. 最终模型：
      
       $$
       \begin{equation}
        f(x)=\sum_{m=1}^{M} \alpha_{m} G_{m}(x)
        \end{equation}
       $$

       $$
       \begin{equation}
        \begin{aligned}
        G(x) &=\operatorname{sign}(f(x)) \\
        &=\operatorname{sign}\left(\sum_{m=1}^{M} \alpha_{m} G_{m}(x)\right)
        \end{aligned}
        \end{equation}
       $$

## 参考文献

[^1]: 统计学习方法(第二版)