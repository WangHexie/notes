---
layout: post
title: 深度学习面试
---



## BN的作用
   * 深度学习模型对输入的分布有一定的假设，认为其分布是稳定的。并且模型内部模块也要求内部输入分布是稳定的。

   * 但是深度学习模型的内部模块输入和输出分布和参数相关，每次更新参数都会导致分布改变。有以下几个问题：
     * 每一层都需要不断适应分布变化
     * 有可能会使数据变得太大或太小掉入饱和区
     * 为了降低影响会降低学习率，导致收敛速度慢。

   * $\gamma$ 和 $\beta$  参数的作用：
     * 能学到特定的分布
     * 防止激活函数失效，例如刚好落在sigmoid函数的近似线性区域
     * 能够恢复原始分布。

   * 位置:
     * 激活函数之前：
       * 防止归一化破坏非线性函数的分布，
       * 防止数据落入非线性函数的饱和区
     * 激活函数之后：
       * Relu 没有上述函数的饱和区问题，所以可以放在后面，避免非线性特征分布趋于童话。

## RNN 中长期依赖问题
   * 和GNN一样，$$W^n X$$, 导致特征值大于一的爆炸，小于一的消失 
   
## [LSTM](https://towardsdatascience.com/tutorial-on-lstm-a-computational-perspective-f3417442c2cd) 

$$
\begin{align}
&f_{t}=\sigma_{g}\left(W_{f} \times x_{t}+U_{f} \times h_{t-1}+b_{f}\right) \\
&i_{t}=\sigma_{g}\left(W_{i} \times x_{t}+U_{i} \times h_{t-1}+b_{i}\right) \\
&o_{t}=\sigma_{g}\left(W_{o} \times x_{t}+U_{o} \times h_{t-1}+b_{o}\right) \\
&c_{t}^{\prime}=\sigma_{c}\left(W_{c} \times x_{t}+U_{c} \times h_{t-1}+b_{c}\right) \\
&c_{t}=f_{t} \cdot c_{t-1}+i_{t} \cdot c_{t}^{\prime} \\
&h_{t}=o_{t} \cdot \sigma_{c}\left(c_{t}\right)
\end{align}
$$

$f_{t}$ is the forget gate $i_{t}$ is the input gate   
$o_{t}$ is the output gate $c_{t}$ is the cell state   
$h_{t}$ is the hidden state   

$\sigma_{g}: \operatorname{sigmoid}$    
$\sigma_{c}: \tanh$

or   

$$
\begin{aligned} i_{t} &=\sigma\left(w_{i}\left[h_{t-1}, x_{t}\right]+b_{i}\right) \\ f_{t} &=\sigma\left(w_{f}\left[h_{t-1}, x_{t}\right]+b_{f}\right) \\ o_{t} &=\sigma\left(w_{o}\left[h_{t-1}, x_{t}\right]+b_{o}\right) \end{aligned}
$$

## GCN

$$
\begin{aligned}
\boldsymbol{y}&=\sigma\left(\boldsymbol{U} \cdot\left(\sum_{k=0}^{K} \alpha_{k} \boldsymbol{\Lambda}^{k}\right) \cdot \boldsymbol{U}^{\top} \boldsymbol{x}\right)\\
&=\sigma\left(\sum_{k=0}^{k} \alpha_{k} \boldsymbol{L}^{k} \boldsymbol{x}\right)\\
&=\sigma\left(\sum_{k=0}^{k} \alpha_{k} (\boldsymbol{D} - \boldsymbol{A})^{k} \boldsymbol{x}\right)
\end{aligned}
$$

## 普通的GNN

$$
\begin{equation}
\boldsymbol{Y}=\sigma\left(\hat{D}^{-1} \hat{A} X W\right)
\end{equation}
$$

## Facrization Machine 

$$
\begin{equation}
\hat{y}(\boldsymbol{x})=\mu+\sum_{i=1}^{n} w_{i} x_{i}+\sum_{i=1}^{n} \sum_{j=i+1}^{n}\left\langle\boldsymbol{v}_{i}, \boldsymbol{v}_{j}\right\rangle x_{i} x_{j}
\end{equation}
$$


reference: 百面深度学习
