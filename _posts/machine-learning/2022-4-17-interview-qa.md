---
layout: post
title: 算法面经整理
---

## 推荐系统
- [ ] [机器学习/推荐系统/推荐系统算法工程师面试指导](https://blog.nowcoder.net/n/b229dd5b0e56481e990bde04e9c75ca1)
 
  - [ ] LFM MF SVD SVD++ FM difference
 
  - [x] EVD: 特征值分解， $A=Q\Sigma Q^{-1}$, 在线性子空间，各个分量的大小。[[^3]]
   
  - [x] SVD：适用于非方阵 [[^3]]
    * 一般来说SVD里的 $$M=U*\Sigma*V$$, $$U \in R^{m*m}$$, $$\Sigma \in R^{m*n}$$, $$V \in R^{n*n}$$ [[^1]]
    * 但是推荐系统里一般指compact SVD， $$U \in R^{m*k}$$, $$\Sigma \in R^{k*k}$$, $$V \in R^{k*n}$$ [[^1], [^2]]
    * 求解：通过求$$MM^T$$ 和 $$M^TM$$的特征值，分别得到$$U$$和$V$。然后$\Sigma$由下式得到：$A=U \Sigma V^{T} \Rightarrow A V=U \Sigma V^{T} V \Rightarrow A V=U \Sigma \Rightarrow A v_{i}=\sigma_{i} u_{i} \Rightarrow \sigma_{i}=\frac{A v_{i}}{u_{i}}$
    * 由于求解太复杂，所以有了compact SVD， 只保留前几个奇异值，同时效果还可以。
    * 同时原始的SVD必须是要稠密矩阵，应用中实际上大量是空的，所以一般要均值填充或其他方法如下面的FunkSVD。
    * FunkSVD: 分解为两个矩阵，且只关心非空元素,同时有l2正则。[[^4]]
      
      $$
      \begin{equation}
      \min _{q^{*}, p^{*}} \sum_{(u, i) \in \mathcal{K}}\left(r_{u i}-q_{i}^{T} p_{u}\right)^{2}
      \end{equation}
      $$
    
    * PMF：概率形式的FunkSVD， 参数符合正态分布。[[^4]]
     
    * BiasSVD: 加入了用户和item的偏置，减少参数学习的难度。[[^4]]

      $$
      \begin{equation}
      \hat{r}_{i j}=\mu+b_{u}+b_{i}+q_{i}^{T} p_{u}
      \end{equation}
      $$

    * SVD++: 加入了其他隐式反馈信息。其中$I_u$是隐式反馈行为的列表。并加入了隐式反馈行为对用户的偏好的影响$y_j$[[^4]]
      
      $$
      \begin{equation}
      \hat{r}_{u i}=\mu+b_{i}+b_{u}+q_{i}^{\top}\left(p_{u}+\left|I_{u}\right|_{j m}^{-\frac{1}{2}} \sum_{j \in I_{u}} y_{j}\right)
      \end{equation}
      $$

    * timeSVD：用户的偏好等会随时间变化。$t$表示的时间相关参数。

      $$
      \begin{equation}
      \hat{r}_{u i}=\mu+b_{i}\left(t_{u i}\right)+b_{u}\left(t_{u i}\right)+q_{i}^{T} p_{u}\left(t_{u i}\right)
      \end{equation}
      $$

    * NMF：非负矩阵分解，做这个主要是由于分解出来的矩阵有负值的话，现实应用中很难解释推荐，如果都是正值就能较好解释了。
 
    * WMF：(只有正样本的分类问题叫One-class问题，论文：One-class collaborative filtering)加权的矩阵分解，以及负采样。

      $$
      \begin{equation}
      \mathcal{L}(\boldsymbol{X})=\sum_{i j} W_{i j}\left(R_{i j}-X_{i j}\right)^{2}
      \end{equation}
      $$ 
      
    * LLORMA: 局部低秩，而不是全局低秩。？？？(Lee et al. Local low-rank matrix approximation.ICML. 2013.)
    * 

  - [x] adboost原理
  - [ ] focal loss:
  
	$$
      \begin{equation}
      \operatorname{FL}\left(p_{\mathrm{t}}\right)=-\alpha_{\mathrm{t}}\left(1-p_{\mathrm{t}}\right)^{\gamma} \log \left(p_{\mathrm{t}}\right)
      \end{equation}
      $$
  			
- [ ] [详细面经](https://posts.careerengine.us/p/5df19284178ec71122269bb1)
  - [ ] catboost
  - [ ] 

- [ ] [携程暑期实习 搜索推荐算法岗](https://www.nowcoder.com/discuss/945094?channel=-1&source_id=discuss_experience_nctrack)[[^5]]
  * 推荐系统流程
  * 推荐系统各个阶段所用的模型：
    * 召回 [[^7]]
      * 规则召回（兴趣标签top，热门top，新品top等）
      * 协同召回
        * 基于用户的协同过滤:喜欢相似物品的用户之间，存在着相似的兴趣偏好
          * 应用场景与优缺点：
            1. 因为UserCF是基于用户相似度的推荐，所以它具备了非常强的社交属性，容易通过社交关系来传播符合用户口味的东西，因此它更适用于新闻推荐这样的场景，一方面新闻内容具有实时性、热点性，而UserCF更擅长于捕捉这一类的内容。另一方面，新闻内容的数量要远远多余用户数量，因此计算向量相似度时，要比ItemCF的时间复杂度更低。
            2. 新用户往往历史行为数据非常稀疏，可能会得到【0，0，0，0，0，…..，1】这样的向量，导致根据用户相似度推荐的物品准确度和置信度会非常低。也就是说如果遇到低频应用以及用户冷启动会比较麻烦，不太适用。
            3. 还有一种情况是，用户数远远多于商品数，用户数的不断增长会导致用户相似度矩阵难以维护，它用到的存储空间的增长速度是呈指数级的。 
        * 基于商品的协同过滤: 用户偏好一类物品，喜欢物品的用户群相似的话，物品也会是相似的。
          * 应用场景与优缺点：
            1.  因为UserCF有一些明显的缺点，所以Amazon和Netflix最早应用的都是ItemCF，它相比用户向量，物品的向量变化要更为稳定，因此广泛用于电商和视频推荐的领域，当用户对某一类商品或某一类电影产生兴趣时，此时给Ta推荐同类型的商品或电影是一个可靠的选择。
            2.  ItemCF不具备很强的泛化能力。当一个热门商品出现后，它容易和大量的商品都具有相似性，导致推荐商品时，热门商品的出现概率会非常高，形成了“头部效应”，同样也致使处于长尾的商品较难被挖掘，因为长尾商品的特征向量会非常稀疏。所以要想解决这个问题，需要后期添加一些干预策略在里面。
      * 向量召回
        * FM召回 
        * Item2vec
        * Youtube DNN向量召回，
        * Graph Embedding召回，
        * DSSM双塔召回: n-gram 分词后，使用Word hashing进行处理。反正就是两个分开的网络呗
    * 粗排
    * 精排
    * 排序模型：
      * GBDT + LR、
      * Xgboost
      * FM/FFM：后面那个就是加了个field，多个embedding
      * Wide&Deep： 
      * DeepFM：就是将wide部分换成了fm模型，不用手工做特征了。
      * Deep & Cross：cross层可以等价于FM模型，但是特征交叉的纬度更高。相当于n次多元方程，n小于等于cross的层数。
      * DIN：聚合用户过往行为向量到的时候引入attention机制。其中attention根据过往行为向量与当前需要推荐的广告向量一起计算(两个向量相减的绝对值与两个向量的原始值进行拼接)。
      * BST：用户行为序列+Transformer
        * position embedding：直接使用原始的embedding效果不是很好。用了事件的时间戳作为embedding（但是我觉得还是得处理过，不能直接用的。）
          $$
          \begin{equation}
          \operatorname{pos}(v i)=\operatorname{timestamp}\left(v_{t}\right)-\operatorname{timestamp}\left(v_{i}\right)
          \end{equation}
          $$ 
        * 作者还另外设计了交叉特征作为输入。
        * 仅仅stack了一层，stack多层的效果并没有很好，反而下降了
        * sequence长度仅仅20
        * embedding size：4-64

  * 各阶段的目的：
    * 召回:召回层的特点是：数据量大、速度响应快、模型简单、特征较少。因此召回层的意义在于缩小对商品的计算范围，将用户感兴趣的商品从百万量级的商品中进行粗选，通过简单的模型和算法将百万量级缩小至几百甚至几十量级。这样用户才能有机会在毫秒的延迟下，得到迅速的商品反馈。
    * 粗排:得到精确的排序结果，也是推荐系统产生效果的重点，更是深度学习等应用的核心。从召回层召回的几百个物品，进行精准排序，根据规则对每个商品赋予不同的得分，由高至低来排序。由于精确度的要求，排序层的模型一般比较复杂，所需要的特征会更多。排序层的特点是：数据量少、排序精准、模型复杂、特征较多。
    * 精排:业务排序层，这一环连接着排序层和即将给用户展示的推荐列表。物品在排序层排好序之后，不一定完全符合业务要求和用户体验，有时我们还需要兼顾结果的多样性、流行度、新鲜度等指标，以及结果是否符合当前产品发展阶段某些流量的倾斜策略等，实施特定的业务策略，来对当前已经排好序的物品进行再次排序。比如物品的提权、打散、隔离、强插等。举个实际的例子，一个内容平台，假设有A、B、C三类内容，我们不想让A类型的内容连续出现3次以上，就需要加一些干扰规则，将A类内容进行打散处理，使得用户最终看到的推荐列表是符合业务上的预期的。重排序的特点是：重业务需求、重用户体验。
  * 指标[[^zb]]：
    * NDCG：归一化折损增益，
    * MRR:(Mean Reciprocal Rank) $k_u$ 是第一个相关item的位置:$$\operatorname{MRR}(O, U)=\frac{1}{|U|} \sum_{u \in U} \frac{1}{k_{u}}$$
    * MAP: (Mean Average Precision)This is primarily an approximation of the original goal of the AP metric.
    * The AP metric represents the area under the precision-recall curve.
    * ROC曲线含义，坐标轴：对正负样本类别数量比例具有鲁棒性 [[^roc]]
      * 坐标轴：Y:recall(真阳率)，X: 假阳率 $\frac{\lvert Prediction - Positive  \rvert}{\lvert negative  \rvert}$
    * PR曲线含义，坐标轴: 主要关心正例[[^roc]]
      * 坐标轴：Precision - Recall
    * 使用场景：[[^roc]]
      * ROC曲线由于兼顾正例与负例，所以适用于评估分类器的整体性能，相比而言PR曲线完全聚焦于正例。
      * 如果有多份数据且存在不同的类别分布，比如信用卡欺诈问题中每个月正例和负例的比例可能都不相同，这时候如果只想单纯地比较分类器的性能且剔除类别分布改变的影响，则ROC曲线比较适合，因为类别分布改变可能使得PR曲线发生变化时好时坏，这种时候难以进行模型比较；反之，如果想测试不同类别分布下对分类器的性能的影响，则PR曲线比较适合。
      * 如果想要评估在相同的类别分布下正例的预测情况，则宜选PR曲线。
      * 类别不平衡问题中，ROC曲线通常会给出一个乐观的效果估计，所以大部分时候还是PR曲线更好。
      * 最后可以根据具体的应用，在曲线上找到最优的点，得到相对应的precision，recall，f1 score等指标，去调整模型的阈值，从而得到一个符合具体应用的模型。

    * AUC：
    * 召回怎么做
    * 双塔模型优势，缺点，如何改进:
      * 优点：速度快
      * 缺点：精度低
      * 改进: （1）减少特征信息损失：不再完全依赖DNN拟合能力，筛选重要特征参与交叉，减少无关特征干扰，或引入多种交叉网络（FM、DCN等），多种交叉方式取长补短，减少特征损失，如SENet双塔模型、并联双塔模型（2）蒸馏学习：以精排模型为teacher，指导双塔模型学习，通过蒸馏学习的方式，弥补双塔模型特征和结构上的不足（3）引入交叉信息或特征：
    * 如何实现快速召回
    * 粗排的目的是什么：
    * wide&deep模型 为什么要有wide层结构，优缺点，如何改进？
      * 缺点就是还是得手动特征工程。
    * deepfm中的fm怎么做的
	* 1 线下提升线上效果不好: 数据分布不同，有标签泄露啊，线上线下特征不一致啊
	* 10 多路召回的作用:使用不同的召回策略，保证召回率的同时提升速度（可以并行召回）
	* 21 推荐系统的特征工程有哪些？怎么做？
	* 33 如何解决推荐系统重复推荐用户已经处理过的item的问题？推荐过的物品得记录下来，然后筛掉，可以用布隆过滤器。
	* 34 推荐系统召回阶段如何实现热门item的打压？（推荐中的“哈利波特”效应）：负采样
	* 36 user/item冷启动怎么解决？：收集更多信息？
	* 41 协同过滤，优缺点。
  	* 无需上下文，
  	* 无法添加其他特征，冷启动问题，
	* 48 LR中连续特征为什么要做离散化？：非线性，便于特征交叉，模型鲁棒（防止特征过大），

## 搜索

## NLP

## 机器学习
- [ ] 手推bp公式

## C++
- [ ] [高频面试题](https://blog.csdn.net/xie810005152/article/details/91038878)

## TODO
- [x] python basics
- [ ] c++ interview
- [ ] 推荐系统
- [ ] 搜索
- [ ] NLP
- [ ] 机器学习
- [ ] hadoop等

## 参考资料

[^1]: [https://en.wikipedia.org/wiki/Singular_value_decomposition](https://en.wikipedia.org/wiki/Singular_value_decomposition)

[^2]: [https://analyticsindiamag.com/singular-value-decomposition-svd-application-recommender-system/](https://analyticsindiamag.com/singular-value-decomposition-svd-application-recommender-system/)

[^3]: [矩阵分解之: 特征值分解(EVD)、奇异值分解(SVD)、SVD++](https://blog.csdn.net/qfikh/article/details/103994319)

[^4]: [https://zhuanlan.zhihu.com/p/35262187](https://zhuanlan.zhihu.com/p/35262187)

[^5]: [https://zhuanlan.zhihu.com/p/510845185](https://zhuanlan.zhihu.com/p/510845185)

[^7]: [http://www.woshipm.com/data-analysis/4542994.html](http://www.woshipm.com/data-analysis/4542994.html)

[^roc]: [https://zhuanlan.zhihu.com/p/34655990](https://zhuanlan.zhihu.com/p/34655990)

[^zb]: [https://medium.com/swlh/rank-aware-recsys-evaluation-metrics-5191bba16832](https://medium.com/swlh/rank-aware-recsys-evaluation-metrics-5191bba16832)