---
layout: post
title: Regularization
---


##  L2      

from [1] CHAPTER 7. REGULARIZATION FOR DEEP LEARNING

在二次方程中，        
$$
\begin{align}
\tilde{\boldsymbol{w}} &=\left(\boldsymbol{Q} \boldsymbol{\Lambda} \boldsymbol{Q}^{\top}+\alpha \boldsymbol{I}\right)^{-1} \boldsymbol{Q} \mathbf{\Lambda} \boldsymbol{Q}^{\top} \boldsymbol{w}^{*} \\
&=\left[\boldsymbol{Q}(\boldsymbol{\Lambda}+\alpha \boldsymbol{I}) \boldsymbol{Q}^{\top}\right]^{-1} \boldsymbol{Q} \boldsymbol{\Lambda} \boldsymbol{Q}^{\top} \boldsymbol{w}^{*} \\
&=\boldsymbol{Q}(\boldsymbol{\Lambda}+\alpha \boldsymbol{I})^{-1} \boldsymbol{\Lambda} \boldsymbol{Q}^{\top} \boldsymbol{w}^{*}
\end{align}
$$

$\alpha$ 是正则化系数，系数对$\Lambda$中系数越大的效果越小，可以看到，随着$\alpha$的增大，首先抹去的是小的系数。$\frac{\lambda _i}{\lambda_i + \alpha}$

![image-20211013100337081]({{ site.baseurl }}/images/l2_re.png)  

图里可以看到，正则化梯度等高线以零为原点，$w$则以$w^{*}$为原点。两者相切时候，hessian矩阵越大的，保留的$w$越大。不过也相当于有一点点用，一般就不会衰减到零



## L1  

$$
\hat{J}(\boldsymbol{w} ; \boldsymbol{X}, \boldsymbol{y})=J\left(\boldsymbol{w}^{*} ; \boldsymbol{X}, \boldsymbol{y}\right)+\sum_{i}\left[\frac{1}{2} H_{i, i}\left(\boldsymbol{w}_{i}-\boldsymbol{w}_{i}^{*}\right)^{2}+\alpha\left|w_{i}\right|\right]
$$

$$
\begin{align}
\frac{d \hat{J}(\boldsymbol{w} ; \boldsymbol{X}, \boldsymbol{y})}{dw_i}&= H_{i, i}\left(\boldsymbol{w}_{i}-\boldsymbol{w}_{i}^{*}\right)+\alpha\operatorname{sign}\left(w_{i}\right)\\

\end{align}
$$

let $\frac{d \hat{J}(\boldsymbol{w} ; \boldsymbol{X}, \boldsymbol{y})}{dw_i} = 0$        

then 
$$
\begin{align}
0 &= H_{i, i}\left(\boldsymbol{w}_{i}-\boldsymbol{w}_{i}^{*}\right)+\alpha\operatorname{sign}\left(w_{i}\right)\\
H_{i, i}w_i &= H_{i, i}w_{i}^{*}-\alpha\operatorname{sign}(w_i)\\

w_i &= w_{i}^{*}-\frac{\alpha\operatorname{sign}(w_i)}{H_{i, i}} \label{a} 
\end{align}
$$
​      

公式$\ref{a}$ 推到公式$\ref{b}$就是分析了，$w_i > 0$时如何如何，$w_i^*<0$时如何如何。 
$$
w_{i}=\operatorname{sign}\left(w_{i}^{*}\right) \max \left\{\left|w_{i}^{*}\right|-\frac{\alpha}{H_{i, i}}, 0\right\}  \label{b}
$$




$H_{i,i}$小的时候，会直接忽略$w_i$直接把他往零推。

[1]

“https://www.deeplearningbook.org/contents/ml.html.” https://www.deeplearningbook.org/contents/ml.html (accessed Oct. 11, 2021).



