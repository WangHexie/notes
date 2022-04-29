---
layout: post
title: 预训练语言模型
---

1. ELMO(**2018.2**):

1. GPT(**2018.1**):生成式，自回归，最大化最大似然函数。关键在预训练

1. GPT2(**2019**): 仅仅是更大。关键在多任务zero-shot

1. GPT3(**2020.5**): 更大杯，few-shot learning变得很好。

1. BERT(**2018.10**):
   * 预训练目标: Token mask + Next sentence prediction

1. Transformer-XL(**2019.01**):为了学长距离依赖关系。采用了 relative sinusoidal positional embeddings。同时使用了上一个片段的embedding，但不回传梯度。
   * 除了原始的transformer当前片段的输入，同时引用上一片段的输入，但是不回传梯度。
   * ![Transformer-XL.png]({{site.baseurl}}/images/Transformer-XL.png)

2. XLNet(**2019.01**): 是在Transformer-XL上做的，也是自回归。作者认为引入MASK标签，会使训练和预测不一致。
   * 作者没有使用Mask，而是引入了自回归的模式，使得一部分词语不可见。但是通过shuffle token得index，使得不可见的词语并不是按原始文本顺序，而是按shuffle后的顺序。使得能学会双向注意力机制。
   * 上述机制主要是在Attention上加mask做具体实现（基本上和其他模型实现使一致的，并不是真的训练时搞自回归预测）
   * 上面提到的方式解码时候不知道解码顺序，于是引入位置参数作为输入，引导输出对应的结果。作者引出了其特殊的注意力机制以及增加了部分参数。
   * 该模型难以收敛，作者提出仅仅预测末尾几个单词，同时不预测得单词，就不计算其$$g$$参数，减少计算量。
   * 也去掉了NSP。
   * 不同句子拼接时候，仅标识attention里两个token是否来自同一个片段。


3. RoBERTa(**2019.7**):It builds on BERT and modifies key hyperparameters, removing the next-sentence pretraining objective and training with much larger mini-batches and learning rates.
   * 同时处理了模型输入。NSP任务中会拼接不同文章的文本，并且如果只拼接短句子，会使得无法学会远距离依赖。
   * 直接去掉NSP效果不错。
   * 梯度累计来做大batch。
   * 换了BPE编码器，以byte做单位而不是unicode。

4. ALBERT(**2019.9**): 降低参数数量，但是不减少计算量
   * 降低参数量的方法：
      1. Splitting the embedding matrix into two smaller matrices.    
         V\*H -> V\*E + E\*H    
         作者认为WordPiece Embedding是用来学上下文无关的信息的。而 hidden-layer embeddings 是为了学上下文相关信息的，所以两者维度无需一致。
      2. Using repeating layers split among groups.
   * 增加了loss：
      1. We also use a self-supervised loss that focuses on modeling inter-sentence coherence, and show it consistently helps downstream tasks with multi-sentence inputs    
      作者认为该任务难度更高
   * others:
      1. 使用了n-gram masking
      2. 使用了absolute position embedding

5. T5(**2019.10**):探索迁移学习的极限。we explore the landscape of transfer
learning techniques for NLP by introducing a unified framework that converts all text-based language problems into a text-to-text format

1. ELECTRA(**2019.10**):用小的generator替换token后，用discriminator判断是否有被替换。作者声称这样做数据利用率更高，而不是仅仅几个mask掉的token会被用到。    
   generator梯度不来自discriminator而是最大似然函数。    
   对BERT唯一的修改是和ALBERT一样，embedding 分解

1. BART(**2019.10**)：降噪自编码器
   * 预训练方式：
      ![BART]({{ site.baseurl }}/images/BART.png)    
      虽然有些地方会加mask，但是不一定有东西被mask掉。

1. Reformer(**2020.1**):模型改进，局部敏感哈希替代attention

1. Pegasus(题外话)：是挑和剩下文本覆盖度高的句子作为摘要。


   

reference: [huggingface](https://huggingface.co/docs/transformers/model_doc/albert)和各自的论文
