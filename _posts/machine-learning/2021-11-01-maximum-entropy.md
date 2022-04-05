---
layout: post
title: Maximum Entropy
---

from：统计学习方法 第二版,  

最大熵模型是在特征函数约束条件下求的最大熵，不是直接求最大熵。   

其中主要约束时，特征函数关于经验分布$\tilde{P}(X, Y)$的期望值与模型$P(Y \mid X)$以及经验分布$\tilde{P}(X)$的期望值相等。

$$
E_{P}(f)=\sum_{x, y} \tilde{P}(x) P(y \mid x) f(x, y)
$$

$$
E_{\tilde{P}}(f)=\sum_{x, y} \tilde{P}(x, y) f(x, y)
$$

$$
E_{P}(f)=E_{\tilde{P}}(f)
$$

其中优化的熵是条件熵$P(Y\mid X)$

$$
H(P)=-\sum_{x, y} \tilde{P}(x) P(y \mid x) \log P(y \mid x)
$$

对最大熵的优化也等价于对数似然函数极大化[p103]

