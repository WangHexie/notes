---
layout: post
title: 降维
---


## PCA    

from [1] page 146(51)

**Input**:  $X $    
**Output**: $Z$    

**How**:  

$\operatorname{Var}[\boldsymbol{x}]=\frac{1}{m-1} \boldsymbol{X}^{\top} \boldsymbol{X}$       

需要使$\operatorname{Var}[Z]$co-variance非对角线元素为零，两两不相关。同时$\Sigma$应该从大到小排序，使保留下来的是方差大的。

​    need to learn $W$, $Z = WX$  
​    Using svd to decompose $X = U \Sigma W^{\top}$,
​    $X^{\top}X = W\Sigma^2W^{\top}$     

$$
\begin{align*}

\operatorname{Var}[Z] &= \frac{1}{m-1} Z^{\top}Z \\
&= \frac{1}{m-1} (WX)^{\top}WX \\
&= \frac{1}{m-1} \Sigma^2
\end{align*}
$$

from:百面机器学习 -- PCA

原理：该方法是为了使数据在某一正交基的映射下，使其方差最大。同时等价于求$X$的协方差矩阵的最大几个特征值所对应的几个正交向量。

## LDA

from:百面机器学习 -- LDA

是在有标签情况下降维，使类间距离最大。但是仅仅类间距离最大可能会使类有重叠，所以同时还得使类内间距减小。
$$
\begin{equation}
\max _{\omega} J(\boldsymbol{\omega})=\frac{\left\|\boldsymbol{\omega}^{\mathrm{T}}\left(\boldsymbol{\mu}_{1}-\boldsymbol{\mu}_{2}\right)\right\|_{2}^{2}}{D_{1}+D_{2}},
\end{equation}
$$
化简和求偏导后得相当于求两个散度矩阵的特征向量和特征值，$\lambda$是原优化目标$J$，就是求最大特征值对应的特征向量。
$$
\begin{equation}
\boldsymbol{S}_{w}^{-1} \boldsymbol{S}_{B} \omega=\lambda \omega
\end{equation}
$$




[1]

“https://www.deeplearningbook.org/contents/ml.html.” https://www.deeplearningbook.org/contents/ml.html (accessed Oct. 11, 2021).

