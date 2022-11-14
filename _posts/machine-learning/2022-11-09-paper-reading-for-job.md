---
layout: post
title: 工作前的论文以及代码阅读 
---

## 强化学习

* **Top-𝐾 Off-Policy Correction for a REINFORCE Recommender System**:
  * Difference between on-policy and off-policy:
    * Reinforcement Learning: An Introduction
  * Value-based and policy-based
  * log-trick in REINFORCE gradient calculation[[^1]]:To solve such optimization problems, we have to take the derivative of the expectation, which is not as easy as in the case where we optimize empirical loss instead of the true expected loss because we do not know the true data distribution. In the previous case, the parameter we want to optimize does not depend on the sample. However, in the latter, the dependency of the loss and the parameter is only through the samples, once we sample, the loss doesn’t depend on the parameter anymore. Therefore, we can’t just use empirical estimation and get around. Here we have to really deal with the expectation.(看不懂)

  
## 参考文献
[^1]: [Policy Gradients and Log Derivative Trick](https://medium.com/@aminamollaysa/policy-gradients-and-log-derivative-trick-4aad962e43e0)