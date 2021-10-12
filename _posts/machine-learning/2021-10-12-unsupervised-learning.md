---
layout: post
title: Unsupervied Learning - Basic
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
 
[1]

“https://www.deeplearningbook.org/contents/ml.html.” https://www.deeplearningbook.org/contents/ml.html (accessed Oct. 11, 2021).
