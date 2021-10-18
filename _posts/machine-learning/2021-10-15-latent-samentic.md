---
layout: post
title: 潜在语义分析
---

##  LSA     

word-document matrix
$$
X \in \mathbb{R}^{m*n}
$$
word-topic matrix
$$
T\in \mathbb{R}^{m*k}
$$
topic-document matrix
$$
Y\in \mathbb{R}^{k*n}
$$
已知X，希望求得T，Y，使 公式$\ref{mul}$成立。
$$
\begin{equation}
\label{mul}
X \approx TY  
\end{equation}
$$

* ###  截断奇异值分解

$$
X \approx U_k\Sigma_k V_{k}^{\top} = U_k\left(\Sigma_k V_{k}^{\top}\right)
$$





* ###  非负矩阵分解

$$
X \approx WH
$$

  + 平方损失
    $$
    \|A-B\|^{2}=\sum_{i, j}\left(a_{i j}-b_{i j}\right)^{2}
    $$
    

   * 散度
     $$
     D(A \| B)=\sum_{i, j}\left(a_{i j} \log \frac{a_{i j}}{b_{i j}}-a_{i j}+b_{i j}\right)
     $$

## PLSA



[1]

“https://www.deeplearningbook.org/contents/ml.html.” https://www.deeplearningbook.org/contents/ml.html (accessed Oct. 11, 2021).



