---
layout: post
title: graduation project
---

$$
\begin{aligned}
&\left.\ell_{\text {atk }}\left(\theta, g_{t}\right)=\mathbb{E}_{G \in \mathcal{D}\left[y_{t}\right], G^{\prime} \in \mathcal{D}\left[y_{y}\right]} \Delta\left(f_{\theta}\left(m\left(G ; g_{t}\right)\right)\right), f_{\theta}\left(G^{\prime}\right)\right) \\
&\ell_{\text {ret }}\left(\theta, g_{t}\right)=\mathbb{E}_{G \in \mathcal{D}} \Delta\left(f_{\theta}(G), f_{\theta_{0}}(G)\right)
\end{aligned}
$$

$$
\begin{equation}
\begin{aligned}
&\left.\ell_{\text {atk }}\left(\theta, g_{t}\right)=\mathbb{E}_{G \in \mathcal{D}\left[y_{t}\right], G^{\prime} \in \mathcal{D}\left[y_{y}\right]} \Delta\left(f_{\theta}\left(m\left(G ; g_{t}\right)\right)\right), f_{\theta}\left(G^{\prime}\right)\right) \\
&\ell_{\text {ret }}\left(\theta, g_{t}\right)=\mathbb{E}_{G \in \mathcal{D}} \Delta\left(f_{\theta}(G), f_{\theta_{0}}(G)\right)\\
&\ell_{\text {sem }}\left(\theta, g_{t}\right)=\mathbb{E}_{G \in \mathcal{D}} \Delta\left(f_{\theta_{0}}(m\left(G ; g_{t}\right)), f_{\theta_{0}}(G)\right)
\end{aligned}
\end{equation}
$$

$$
\begin{equation}
\begin{split}
PA + A^TP^T &= P(A + A^T)P^T \\
PA + A^TP^T &= PAP^T + PA^TP^T \\
PA(I-P^T) &= (P-I)A^TP^T
\end{split}
\end{equation}
$$

$$
\begin{equation}
\begin{split}
\frac{1}{m}\sum_i^m \lvert \sigma_i - \sigma_i' \rvert
\end{split}
\end{equation}
$$

$$
\begin{equation}
\begin{aligned}
X^{(l+1)} &= AX^{(l)}W^{(l)} \\
X^{(l+1)} &= A^{l+1}X^{0}\prod_i^{l+1}W^{i} = A^{l+1}X^{0}W^{'} \\
X^{(l+1)} &= Q\Lambda^{l+1} Q^{-1} X^{0}W^{'} \\
\end{aligned}
\end{equation}
$$

$$
\begin{equation}
\begin{aligned}
X^0 &= X+X^{'} \\
X^{(l+1)} &= A^{l+1}(X+X^{'})W^{'} \\
X^{(l+1)} &= A^{l+1}XW^{'}+A^{l+1}X^{'}W^{'} \\
\end{aligned}
\end{equation}
$$


$$
\begin{align}
    P_m(M; M_c, D_d) &= (f_M(D_d) == f_{M_c}(D_d)) \\
    P_m(M; D_c, G) &= (f_M(D_c) == f_{M}(G(D_c))) \\
\end{align}
$$


$$
\begin{equation}
    f_{M_d}(D_d) \equiv f_{M_c}(D_d)
\end{equation}
$$

my own gnn demo:
$$
\begin{equation}
X^{(l+1)} = \sigma (AX^{(l)}W^{(l)}) 
\end{equation}
$$

orginal:

$$
\mathbf{x}^{\prime}_i = \mathbf{W}_1 \mathbf{x}_i +  
\sum_{j \in \mathcal{N(i)}} \mathbf{W}_2 \mathbf{x}_j
$$

fixed:

$$
\mathbf{x}^{\prime}_i = \mathbf{W}_1 \mathbf{x}_i +  
\sum_{j \in \mathcal{N(i)}} \mathbf{e}_{ij} \mathbf{W}_2 \mathbf{x}_j
$$

$$
\mathbf{x}^{\prime}_i = \mathbf{W}_1 \mathbf{x}_i + 
\sum_{j \in \mathcal{V}} \mathbf{e}_{ij} \mathbf{W}_2  \mathbf{x}_j
$$

$$
\mathbf{x}^{\prime}_i = \mathbf{W}_1 \mathbf{x}_i + 
\sum_{j \in \mathcal{N(i)} \cup  \mathcal{N_{neg}(i)} } \mathbf{e}_{ij} \mathbf{W}_2  \mathbf{x}_j
$$

$$
\begin{equation}
\frac{\partial E}{\partial \mathbf{v}_{w_j}^{\prime}}=\frac{\partial E}{\partial \mathbf{v}_{w_j}^{\prime}{ }^T \mathbf{h}} \cdot \frac{\partial \mathbf{v}_{w_j}^{\prime}{ }^T \mathbf{h}}{\partial \mathbf{v}_{w_j}^{\prime}}=\left(\sigma\left(\mathbf{v}_{w_j}^{\prime}{ }^T \mathbf{h}\right)-t_j\right) \mathbf{h}
\end{equation}
$$

$$
\begin{equation}
\varepsilon (x):= \begin{cases}0 & \text { if } x\le 0.5 \\ 1 & \text { if } x>0.5\end{cases}
\end{equation}
$$

$$
\begin{equation}
e_{ij}' = \varepsilon( e_{ij}+ \sigma (XX^T))
\end{equation}
$$


$$
\begin{equation}
\frac{\partial \varepsilon }{\partial x}= x
\end{equation}
$$


$$
\begin{equation}
\frac{\partial x_i^{\prime} }{\partial W_2}= \sum_{j \in \mathcal{N(i)}} \mathbf{e}_{ij}  \mathbf{x}_j=  \sum_{j \in \mathcal{V}} \mathbf{e}_{ij}\mathbf{x}_j = \sum_{j \in \mathcal{N(i)} \cup  \mathcal{N_{neg}(i)} } \mathbf{e}_{ij}  \mathbf{x}_j
\end{equation}
$$


$$
\begin{equation}
\theta_{M_d}=\underset{\theta _{M_d}}{\arg \min } \max _{\theta_G}  H(\theta_{M_d}, \theta_G):=\frac{1}{n} \sum_{i=1}^n L\left(M_d\left(G \left(d_i\right)\right), y_i\right)
\end{equation}
$$


True training process:
$$
\begin{equation}
\theta_{G}=\underset{\theta_G}{\arg \min }   H(\theta_{M_d}, \theta_G):=\frac{1}{n} \sum_{i=1}^n L\left(M_d\left(G \left(d_i\right)\right), y_t\right)
\end{equation}
$$

My training process:
$$
\begin{equation}
\theta_{G}=\underset{\theta_G}{\arg \max }   H(\theta_{M_d}, \theta_G):=\frac{1}{n} \sum_{i=1}^n L\left(M_d\left(G \left(d_i\right)\right), y_i\right)
\end{equation}
$$

$$
\begin{equation}
\mathbf{e}_{ij}:= \begin{cases}0 & \text { 不存在连边  } \\ 1 & \text { 存在连边 } \end{cases}
\end{equation}
$$

$$
\begin{equation}
\text { Clean Accuracy }=\frac{\sum_{i=1}^n \mathbb{I}\left(M\left(G_i\right)=y_i\right)}{n}
\end{equation}
$$

$$
\begin{equation}
\text { Attack Success Rate }=\frac{\sum_{i=1}^m \mathbb{I}\left(M\left(G_i\right)=y_t\right)}{n}
\end{equation}
$$

$$
(\frac{X'}{\lVert X' \rVert^2})(\frac{X'}{\lVert X' \rVert^2})^T
$$

这个来自BACKDOOR DEFENSE VIA DECOUPLING THE TRAINING PROCESS
$$
\begin{equation}
A S R \triangleq \operatorname{Pr}_{(\boldsymbol{x}, y) \in \mathcal{D}_{\text {test }}}\left\{C_{\boldsymbol{w}}(G(\boldsymbol{x}))=y_t \mid y \neq y_t\right\}
\end{equation}
$$



$$
\begin{equation}
PB \triangleq \operatorname{Pr}_{\mathit{g_c} \in \mathcal{D}_{\text {test }}}\left\{f_M(\mathit{g_c}) = f_{M}(G(\mathit{g_c}))\right\}
\end{equation}
$$

$$
\begin{equation}
PB \triangleq \operatorname{Pr}_{\mathit{g_c} \in \mathcal{D}_{\text {test }}}\left\{f_C(G(\mathit{g_c})) = f_{M}(G(\mathit{g_c}))\right\}
\end{equation}
$$


### 第二篇论文

* NAD中attention计算的修改
  ```python
    # Todo： meaning of norm's dim
        # image: B*C*H*W -> B*H*W  : B*H*W/H*W
        # graph: B*N*F -> B*N : B*N / N
        # graph(True): BxN * F -> BxN * 1 / BxN * 1
  ```

### TODO:
* [x] GNNbenchmark 论文阅读
  * mnist数据集是怎么制作的？:super pixel
  * GNN是什么结构？（调优模型到sota）: graphsage 非常不错
* 调优并测试所有的算法
  * [x] NAD搞好了
  * [x] finetuning 也搞好了
  * [x] ABL基本也好了，但是ABL有一个问题就是选的数据不能太多，不然最后一个环节有很多干净样本结果会很难看。
* 选一个算法作为基础，然后叠加另一个算法:我选好了