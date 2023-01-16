---
layout: post
title: pytorch-geometric进阶
---

## 前向传播方式 [[^1]]

* edge_index + `propagate` +`message`: 这个主要是利用框架已有的方式进行处理。似乎主要是用torch_scatter封装了一下
* adj(sparse_tensor) + `propagate` + `message_and_aggregate`: 主要是使用sparse_tensor，公式上写的好看一些。
* torch_scatter: 这个就不用message机制了，直接forward里一套带走，基本不用框架里的东西。[[^2]]
  * 这个好像只是对pytorch的接口包装了一下，改动应该不难。

## 数据集处理 
主要是将图像上的算法迁移到graph上来所以需要这些

* 使用pytorch-geometric数据集可以直接通过index返回对应图的Data()结构[[^3]]
* transoform和图像上的一样，都是作用于单个Data数据结构，可以通过这里的代码示例[[^4]]看到

  
## 参考文献

[^1]: [MEMORY-EFFICIENT AGGREGATIONS](https://pytorch-geometric.readthedocs.io/en/latest/notes/sparse_tensor.html)
[^2]: [pytorch_scatter](https://github.com/rusty1s/pytorch_scatter/blob/c615accffe4d4fc7d101d59db2869f3abb0815e9/torch_scatter/scatter.py#L8)
[^3]: [pytorch geometric入门](https://pytorch-geometric.readthedocs.io/en/latest/notes/introduction.html#mini-batches)
[^4]: [transform 应用](https://pytorch-geometric.readthedocs.io/en/latest/_modules/torch_geometric/datasets/tu_dataset.html#TUDataset:~:text=if%20self.pre_filter%20is%20not%20None%20or%20self.pre_transform%20is%20not%20None%3A)
