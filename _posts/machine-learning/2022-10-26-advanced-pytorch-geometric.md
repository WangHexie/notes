---
layout: post
title: pytorch-geometric进阶
---

## 前向传播方式 [[^1]]

* edge_index + `propagate` +`message`: 这个主要是利用框架已有的方式进行处理。
* adj(sparse_tensor) + `propagate` + `message_and_aggregate`: 主要是使用sparse_tensor，公式上写的好看一些。
* torch_scatter: 这个就不用message机制了，直接forward里一套带走，基本不用框架里的东西。
  * 这个好像只是对pytorch的接口包装了一下，改动应该不难。
  
## 参考文献：
[^1]: [MEMORY-EFFICIENT AGGREGATIONS](https://pytorch-geometric.readthedocs.io/en/latest/notes/sparse_tensor.html)