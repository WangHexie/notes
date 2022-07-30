---
layout: post
title: 后门攻击防御
---


* *Mitigating Poisoning Attacks on Machine Learning Models:
A Data Provenance Based Approach（2017）*：该论文增加了假设：数据有标注人ID，所以可以根据ID进行划分删减部分数据进行训练，评估模型的准确率。

  * 有部分信任数据： ![1]({{site.baseurl}}/images/defense-against-backdoor/1.png)
  
  * 无信任数据, 直接拿除某个ID剩下的当信任数据，看用不用该部分数据是否能提升准确率：![2]({{site.baseurl}}/images/defense-against-backdoor/2.png)

* *Detecting Backdoor Attacks on Deep Neural Networks by Activation Clustering（2018）*
  * The intuition behind our method is that while backdoor and target samples receive the same classification by the poisoned network, the reason why they receive this classification is different.
  * 最后一层隐藏层输出结果进行聚类，选择结果中数量较少的类作为被污染的样本，或者算Silhouette Score.
  * 从结果看效果不错的。

* *Adversarial Attacks and Defenses on Graphs: A Review, A Tool and Empirical Studies(2020)*
  * Adversarial Training
  * Adversarial Perturbation Detection
  * Graph Purification
  * Attention Mechanism

* **Deep Robust**(AAAI 2021): 一个比较好用的实现了图上攻击和防御的库？
  * 介绍了不少攻击手段，还有根据决策边界做的。主要是为了实现不同的攻击形式所做的修改，当然还有就是为了更好的攻击。
  * 防御
    * 大部分就是加上攻击后进行训练。当然两次反向传播太慢了，所以会加些优化，例如默认前几层的梯度不变。还有就是自监督？让原始样本的表征和对抗样本的表征一致。
    * gradient masking: 输入离散化，使得找不到梯度
    * 检测异常样本
  * Graph上的具体可以看这个`Adversarial attacks and defenses on
graphs: A review and empirical study`：
    * targeted attack
      * fga: 贪心修改？
      * 网络结构生成？
      * 强化学习，用于black-box query？
      *  integrated gradient？用于模拟梯度
   * Untargeted Attack 
      *  ?????
   * defense:
     * The min-max optimization problem indicates that adversarial training involves two processes:(1) generating perturbations that maximize the prediction loss and (2) updating model parameters that minimize the prediction loss. 
   * Pre-processing:
     * **GCN-jaccard**:The work [24] proposes a preprocessing method based on two empirical observations of the attack methods: (1) Attackers usually prefer to adding edges over removing edges or modifying features and (2) Attackers tend to connect dissimilar nodes. Based on these findings, they propose a defense method by eliminating the edges whose two end nodes have small Jaccard Similarity [30].
     * **gcn svd** It is observed that Nettack [22] generates the perturbations which mainly change the small singular values of the graph adjacency matrix [31]. Thus it proposes to preprocess the perturbed adjacency matrix by using truncated SVD to get its low-rank approximation.

* **BadEncoder: Backdoor Attacks to Pre-trained
Encoders in Self-Supervised Learning（2021.8）**：这个就是self-supurvised。其实仅仅是self-supervised 的loss加上backdoor-attack的loss其他没什么变化。

* **TOP: Backdoor Detection in Neural Networks via Transferability of Perturbation(2021.3)**:
* **Backdoor Learning: A Survey(2022)**：
  * 现有的防御方法:![defense]({{site.baseurl}}/images/defense-against-backdoor/review_defense.png)
  * 攻击场景：越往下，攻击者能控制的部分越多。
     1. 使用被污染的数据集。
     2. 使用第三方的训练平台。
     3. 使用第三方预训练模型。
  * 还有一种挺有意思的攻击方式是，利用语义信息进行攻击。一般的攻击都是无意义的噪点或是预定义的stamp。
  * 即便是基于优化生成的trigger也有所有样本都一样以及每个样本对应的trigger都不一样的区分。
  * 同时攻击还能直接对模型参数进行（不再污染训练样本），例如进行贪心搜索。 
    * 另外就是加入子结构了。
  * 防御的话：
    1. 预处理：
       1. autoencoder之类的手段。
       2. 方形区域检测
    2. 模型处理
       1. 利用灾难性遗忘，重新训练模型。
    3. 合成trigger，然后消除trigger
       1. 还有remove neurons with high activation values in response to the trigger
       2. 更难的是从黑盒模型中恢复trigger。
    4. 减小后门样本的有效性：
       1. noisy sgd
       2. clip，（后门样本梯度可能更大）
    5. 数据集阶段消除trigger，过滤受污染样本。
    6. 部署时检测trigger
    7. 理论上可行的防御
       1. random-smoothing（虽然实际上并不好）

* **ADVERSARIAL UNLEARNING OF BACKDOORS VIA IMPLICIT HYPERGRADIENT(ICLR 2022)**:
  *  algorithm to solve the minimax
  *  utilizes the implicit hypergradient to account for the interdependence between inner and outer optimization
  *  One popular class of approaches (Wang et al., 2019; Chen et al., 2019; Guo et al., 2019)
is to first synthesize the trigger patterns from the model and then unlearn the triggers. However,
these approaches presume that backdoor triggers only target a small portion of classes, thereby
becoming ineffective when many classes are targeted by the attacker.
  * ass and an important but underexplored setting where
multiple classes are targeted. I-BAU’s performance is comparable to and most often significantly better than the best baseline. Particularly, its performance is more robust to the variation on triggers, attack settings, poison ratio, and clean data size
  * $\sum_i \nabla L_i$ ，$\nabla \sum_{i} L_i$
  * Specifically, assuming $P_{p, \xi}(\cdot)$ is the norm projection of the gradient regarding $p$-norm with a constraint $\xi$ (non-linear), and $\delta$ is the synthesized noise. Given an initialized noise, $\delta_0$, and a batch of data with size $N$:
In universal perturbation, the individual gradient associated with the first data is evaluated at the initial perturbation $\delta_0$:

$$ G_1 = \nabla_{\delta} L(x_1+\delta, \theta) |_{\delta=\delta_0}.$$

The resulting perturbation is

$$ \delta_1 = P_{p, \xi}(\delta_0 + G_1). $$
Note that the gradient for the second data point is computed at $\delta_1$ instead of $\delta_0$:

$$ G_2 = \nabla_{\delta} L(x_2+\delta, \theta) |_{\delta=\delta_1}. $$

$$ \delta_2 = P_{p, \xi}(\delta_1 + G_2). $$

$$ \vdots $$
$$ G = \sum_{i=1}^N \nabla_{\delta} L(x_i + \delta, \theta) |_{ \delta=\delta_0}, $$

* **A GENERAL FRAMEWORK FOR DEFENDING AGAINST BACKDOOR ATTACKS VIA INFLUENCE GRAPH（2021）**。该论文主要是介绍了通过数据间的关系来判断数据是否为加入后门的数据。该关系判断标准为去除某一训练数据后模型对另一数据的预测概率的数值变化程度。构建数据间的影响力关系后，抽取其中的MAXIMUM AVERAGE SUB-GRAPH作为被污染数据，并将其删除。其中污染的节点数量的确定文中没有比较好的解决方式，直接设置为已知量。

* **Hidden Trigger Backdoor Attacks（AAAI 2020）**：We propose a novel form of backdoor attack where poisoned data look natural with correct labels and also more importantly, the attacker hides the trigger in the poisoned data and keeps the trigger secret until the test time。这篇论文挺奇特的，不仅标签不可见，甚至图像和target很相近，并且标注也为target。这样子的话，人工对图像进行检查并且重新标注也不可能。作者在原始图像上进行优化，通过让加上patch的图片与最终输出的图片表征相近，并且加上限制图像需要与target中的某一图像距离相近，从而达到效果，算是比较有意思的一个创新点。
  *  The victim uses a pre-trained deep model and finetunes it for a classification task using the poisoned data
  *  

## Not Finished:
* **Neural cleanse: Identifying and mitigating backdoor attacks in neural networks**: Neural Cleanse by Wang et al. [36] proposes an optimization technique for detecting and reverse engineering hidden triggers embedded inside deep neural networks for each class. （和我的很像？）
* **Tabor: A highly accurate approach to inspecting and restoring trojan backdoors in ai systems, 2019.**. Similarly, TABOR by Guo et al. [13] formalizes the detection of trojan backdoors as an optimization problem and identifies a set of candidate triggers by resolving this optimization problem.也是优化问题
* **Poisoned classifiers are not only backdoored, they are fundamentally broken, 2020.**：which showed that backdoor attacks create poisoned classifiers that can be easily attacked even without knowledge of the original backdoor
