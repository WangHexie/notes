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

  