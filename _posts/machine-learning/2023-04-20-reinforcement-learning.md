---
layout: post
title: 强化学习
---
参考书⬆[[^1]]

1. 和环境的交互是区别于监督学习的一大特征
2. 如何建模value即长期收益是大多算法的重点
3. 有些算法会建立model，即对环境建模，从而预测状态以及reward的变化，从而进行planning。
4. 期望值和滑动平均其实是一样的东西，推导：
    $$
    \begin{aligned}
    Q_{n+1} & =\frac{1}{n} \sum_{i=1}^n R_i \\
    & =\frac{1}{n}\left(R_n+\sum_{i=1}^{n-1} R_i\right) \\
    & =\frac{1}{n}\left(R_n+(n-1) \frac{1}{n-1} \sum_{i=1}^{n-1} R_i\right) \\
    & =\frac{1}{n}\left(R_n+(n-1) Q_n\right) \\
    & =\frac{1}{n}\left(R_n+n Q_n-Q_n\right) \\
    & =Q_n+\frac{1}{n}\left[R_n-Q_n\right],
    \end{aligned}
    $$ 

   * 当然如果是这个reward不是固定的话，那么可以给最近的值更高的权重，所以就不用 $\frac{1}{n}$， 而是某一固定的值

5. 算概率相关的一个小trick，因为概率的总和为1，固定值：
    $$
    \begin{aligned}
    \frac{\partial \mathbb{E}\left[R_t\right]}{\partial H_t(a)} & =\frac{\partial}{\partial H_t(a)}\left[\sum_x \pi_t(x) q_*(x)\right] \\
    & =\sum_x q_*(x) \frac{\partial \pi_t(x)}{\partial H_t(a)} \\
    & =\sum_x\left(q_*(x)-B_t\right) \frac{\partial \pi_t(x)}{\partial H_t(a)},
    \end{aligned}
    $$  

6. 多臂老虎机换成多个，并且，action能影响到老虎机的选择上时候，就是正经的强化学习了，就是action能影响state了。
7. The reward signal is your way of communicating to the agent what you want achieved, not how you want it achieved
8. return(value) and reward:
    $$
    \begin{aligned}
    G_t & \doteq R_{t+1}+\gamma R_{t+2}+\gamma^2 R_{t+3}+\gamma^3 R_{t+4}+\cdots \\
    & =R_{t+1}+\gamma\left(R_{t+2}+\gamma R_{t+3}+\gamma^2 R_{t+4}+\cdots\right) \\
    & =R_{t+1}+\gamma G_{t+1}
    \end{aligned}
    $$

9. a policy is a mapping from states to probabilities of selecting each possible action

### 参考文献：

[^1]: R. S. Sutton and A. G. Barto, Reinforcement learning: an introduction, Second edition. in Adaptive computation and machine learning series. Cambridge, Massachusetts: The MIT Press, 2018.

