---
layout: post
title: 工作前的论文以及代码阅读 
---

## 强化学习

* **Top-𝐾 Off-Policy Correction for a REINFORCE Recommender System**:
  * Difference between on-policy and off-policy:
    * Reinforcement Learning: An Introduction
  * Value-based and policy-based
  * log-trick in REINFORCE gradient calculation[[^1]]:To solve such optimization problems, we have to take the derivative of the expectation, which is not as easy as in the case where we optimize empirical loss instead of the true expected loss because we do not know the true data distribution. In the previous case, the parameter we want to optimize does not depend on the sample. However, in the latter, the dependency of the loss and the parameter is only through the samples, once we sample, the loss doesn’t depend on the parameter anymore. Therefore, we can’t just use empirical estimation and get around. Here we have to really deal with the expectation.(看不懂) 不能使用重参数化技巧吗？
  * 公式三
  * sampled softmax
  * temperature in softmax(✔)
  * why we should reduce gradient variance?[[^3], [^4]]:
  * weight capping:好像是非负的吧
  * Boltzmann exploration
  * actor-critic[[^4]]:![actor_critc]({{site.baseurl}}/images/rf/actor_critic.png)
  * q-learning[[^2]]
  * reinforce：
  * behavior policy $\beta$ ，item embedding可以训练，但是，user state那里梯度不回传的话，user state一直变化，但是item embedding是不变化的？？？？？
  * gumbel（softmax采样）[[^5]]：复杂度可以降低到O(n).
  * 离散变量采样[[^6]]:有O(1)的欸，直接就是生成一个array，其中数值分布按概率分布来，然后随机选一个就好了。

## 参考文献

[^1]: [Policy Gradients and Log Derivative Trick](https://medium.com/@aminamollaysa/policy-gradients-and-log-derivative-trick-4aad962e43e0)
[^2]: [An introduction to Q-Learning: Reinforcement Learning](https://blog.floydhub.com/an-introduction-to-q-learning-reinforcement-learning/)
[^3]: [Jerry Liu’s post to “Why does the policy gradient method have high variance”](https://www.quora.com/unanswered/Why-does-the-policy-gradient-method-have-a-high-variance)
[^4]: [Understanding Actor Critic Methods and A2C](https://towardsdatascience.com/understanding-actor-critic-methods-931b97b6df3f)
[^5]: [Gumbel-max trick](https://timvieira.github.io/blog/post/2014/07/31/gumbel-max-trick/)
[^6]: [How to sample from a discrete distribution?](https://stats.stackexchange.com/questions/67911/how-to-sample-from-a-discrete-distribution)