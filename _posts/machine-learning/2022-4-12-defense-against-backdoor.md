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

* **Poisoned classifiers are not only backdoored, they are fundamentally broken, 2020.**：which showed that backdoor attacks create poisoned classifiers that can be easily attacked even without knowledge of the original backdoor。该论文作者认为受到后门攻击的模型实际上是有严重问题的。主要原因就是可以从模型中恢复出trigger，并且trigger无需和攻击者使用的trigger一致。说明模型并不是单单植入后门，而是模型有问题。这篇论文的问题就是很依赖人工生成另外的trigger，并不能自动化生成。

* **Neural cleanse: Identifying and mitigating backdoor attacks in neural networks(2019)**: Neural Cleanse by Wang et al. [36] proposes an optimization technique for detecting and reverse engineering hidden triggers embedded inside deep neural networks for each class. （和我的很像？）这篇论文也有提到unlearning的概念。该论文声称其为第一个能探测和防御后门后门攻击的通用算法。该算法主要实现三个功能，首先判断一个模型是否受到后门攻击，第二是识别出该后门的触发器，第三是消除该后门的影响。首先判断是否受到后门攻击是通过识别决策边界做到的。 识别处后门的触发器是通过第一步的优化过程，找到可能的后门。最后消除后门影响是识别出被后门激活的neuron（这个方法效果不好）以及unlearning（和我的算法差不多，就是通过训练模型消除影响）。
* **Backdoor Defense via Decoupling the Training Process**:非常经典的三个阶段：1.自监督学习:作者claims that自监督学习图增强算法能破坏trigger；2.冻结backbone后有监督的分类；3.去掉可疑样本后半监督训练整个模型
  * 引入了symmetric cross-entropy
  * 半监督用的MixMatch

* **Symmetric Cross Entropy for Robust Learning with Noisy Labels**:就是相互熵？的公式，pq反一下加起来，

* **Backdoor Attacks and Countermeasures on Deep Learning: A Comprehensive Review(2020)**: 来一个经典重温，给第二个算法找找方向。
  * 首先是防御上的几个方法：   
    * Blind Backdoor Removal：无需关心模型是否受到污染1，但是这一类方法的主要问题就是模型的准确率会下降的比较多，而且呢trigger size需要比较小，不然的话效果就不是很好。  
      1. Fine-Pruning. 剪掉least activated neurons, 然后fine-tuning，但是会降低模型准确率。
      2. Februus：在dnn前部署，通过可解释性方法，将影响预测结果大的区域用灰色图像替代，但是这样会比较影响分类结果。于是使用AutoEncoder之类的东西，重构图像。但是如果trigger作用面积比较大的话，就不好处理。（毕竟还得设置一个阈值之类的东西吧，因为如果是正常图片你给覆盖这么大一块区域，直接整张图片就废了吧）。
      3. Suppression：加噪声后多次预测并且投票（是这样吗？）。（效果不好的，并且超参数调节麻烦）
      4. *ConFoc：retrain* the model 使其集中在图像内容上而不是风格上。（？看看具体论文？）
      5. RAB.smoothed training.这个有点有点意思的，在训练上做smooth。
    * offline removal: 适用于能接触到受到污染的数据集的。有一个东西很有意思，就是将污染加到干净的标签上，论文中也提到没有验证是否能否防御这种攻击。 
        1. Spectral Signature. 每个标签样本的latent presentation做奇异值分解。然后将高值（？）的移除后重新训练。
        2. Gradient Clustering：detect and retrain
        3. Activation Clustering：倒数第二层的聚类，之前提到过了不说了
        4. Deep k-NN:????
        5. SCAn.
        6. 差分隐私：训练时候加噪声
    * Model Inspection:
        7. Trigger Reverse Engineer.Cleanse iterates through all labels of the model and determines if any label requires a substantially smaller modification to achieve misclassifications.但是需要循环所有的label，所以计算成本还是挺高的.trigger恢复有一个问题就是trigger恢复出来不一定一样的。需要被污染的训练数据哦
        8. **DeepInspect**. 学习一个生成模型，生成训练数据，然后判断训练数据是否异常。 
        9. AEGIS.for the first time, investigate the backdoor attacks on adversarial robust model that is elaborately trained defending against adversarial attacks 说是借助了鲁棒模型的性质来做的，用分类模型来生成合成的数据。然后对图片对应的latent feature进行降维后聚类，看是不是刚好两类，分别为真实的测试数据和合成数据。
        10. meta-classifer: 什么鬼东西，训练分类器来分类backdoored model和clean model，能做出来也是牛，泛化性能不觉得会很好。
        11. NEO：检测主导色。

    * Online Inpection:
        12. data inspection:
           1. sentinet : 使用模型和数据可解释方法进行。检测高相关的连续区域，然后转移到干净的数据上看，看是否标签会翻转，如果会翻转的话，说明就是高概率的后门。
           2. NEO：检测主导色，很大局限性，大点的不行，不是方形的trigger不行。
           3. STRIP. 带backdoor的样本面对干扰时候然而很稳定 ，所以可以用这个性质来进行检测backdoor。
    * post removal：
      * NNoculation: Broad spectrum and targeted treatment of backdoored DNNs：正确的决策边界，TODO
      *  

  * 然后是如何宣传后门攻击的作用：
    1.  

今天下午要看的几篇论文：
* Adversarial Attacks and Defenses on Graphs：这篇开题时候看过了。
* GNNGUARD: Defending Graph Neural Networks
against Adversarial Attacks:就是你了！！！！
* Adversarial Defenses on Graphs: Towards Increasing the Robustness of Algorithms
* Dealing with the unevenness: deeper insights in graph-based attack and defense
* Online Defense of Trojaned Models using Misattributions
* ONION: A Simple and Effective Defense Against Textual Backdoor Attacks
* A Benchmark Study Of Backdoor Data Poisoning Defenses For Deep Neural Network Classifiers And A Novel Defense
* Rethinking the Trigger of Backdoor Attack

防御要是做不了我就做攻击了！！！！！我顶不住了！！！！！
所以总共有一下几个方向：
1. 数据集的清洗。
2. 在线时候数据的验证。
3. 离线的模型验证。
4. 模型的purify
5. 可能的trigger复原。
我一个方向其实做了3，4，5！或者3其实没做。但是3我真的找不到可以用的文献，尤其是在迁移学习上。
1，2感觉也做了不了啊


## Not Finished:

* **Tabor: A highly accurate approach to inspecting and restoring trojan backdoors in ai systems, 2019.**. Similarly, TABOR by Guo et al. [13] formalizes the detection of trojan backdoors as an optimization problem and identifies a set of candidate triggers by resolving this optimization problem.也是优化问题


- [ ] DeepInspect: A black-box trojan detection and mitigation framework for deep neural networks: 用生成模型生成trigger， 需要看 


## 方向二的论文：

* **GARNET: Reduced-Rank Topology Learning for Robust and
Scalable Graph Neural Networks(2022)**:扫了一眼摘要和流程图，这也太复杂了，并且和我的方向不太符合。主要是在下游的模型运行前做的，并不是在模型里集成。是通过概率图模型以及spectral embedding来建模好像是。
* **EvenNet: Ignoring Odd-Hop Neighbors Improves
Robustness of Graph Neural Networks(2022)**:是在spectral做的，有没有必要搞得这么复杂啊。
  * Zhu et al. [36] first established the relationship between graph homophily and structural attacks. They claimed that existing attack mechanisms tend to introduce heterophily to homophilic graphs, which significantly degrade the performance of GNNs with low-pass filters
  * On the one hand, several attempts are made to improve the robustness of GNNs against the injected heterophily from the spatial domain [12, 16, 30, 34, 35].These methods either compute edge attention or learn new graph structures with node features,


* **EvenNet: Ignoring Odd-Hop Neighbors Improves Robustness of Graph Neural Networks**：这篇论文和题目一模一样，主要是过滤了奇数跳的spectral的信息，并理论证明这样不会导致效果差。
* **ON THE RELATIONSHIP BETWEEN HETEROPHILY AND ROBUSTNESS OF GRAPH NEURAL NETWORKS**：这个主要是说攻击呢主要是在异构图上加同质节点。在同质图上加异质节点。大量证明。但是为了防止攻击上却没有做太多事情，只要是将节点本身的表示和其邻居的表示相分开。
* **How does Heterophily Impact the Robustness of Graph Neural Networks? Theoretical Connections and Practical Implications（2022 KDD）**：有一点不一样啊，这个主要是节点分类的任务，但是我主要是期望做的是图分类的任务。其中同构异构的东西需要重新定义一下了。服了，这个和上面那一篇是一样的啊。ICLR拒稿后重新投了一下。这个肯定是重要的参考文献，以后肯定要重新认真阅读的。
  * 这个poison attack好像和backdoor也不一样，是不是应该重新看一下GuardGNN？
  * 这个结果也太怪了，我实验都看不懂。太复杂了。
  * 还有就是两个攻击分别是怎么做的呢？
  * 

* **Graph alternate learning for robust graph neural networks in node classification**：看上去不是很纯粹，我就没看了。怎么一个特征挑选的也写进去了。
* **Graph Robustness Benchmark: Benchmarking the Adversarial Robustness of Graph Machine Learning**: 实现了GuardGNN，主要还是对抗攻击的内容。
* **Adversarial Attacks on Neural Networks for Graph Data**：poison attack，gnnguard防御的算法之一。但是这个主要应用于节点分类的场景呢。创建了一个替代模型，对A，X直接进行优化，我说呢，厉害厉害。
