---
layout: post
title: Optimization Method
---

1. SGD:

   $$\begin{equation}
   \theta^t = \theta^{t-1} - \alpha \nabla_{\theta} J(\theta) 
   \end{equation}$$
   
2. SGD + Momentum:

   $$\begin{aligned}
   v^t &= \gamma v^{t-1} - \alpha \nabla_{\theta} J(\theta) \\
   \theta^t &= \theta^{t-1} + v^t
   \end{aligned}$$
   
3. Nesterov(More accurate gradient by moving parameter in advance)

   $$\begin{aligned}
   v^t &= \gamma v^{t-1} - \alpha \nabla_{\theta} J(\theta+\gamma v^{t-1}) \\
   \theta^t &= \theta^{t-1} + v^t
   \end{aligned}$$
   
4. Adagrad($$G_t$$ is the sum of the **squares** of  the past gradients. So the frequent updated parameter will have less update.  So it's good for training sparse model)：

   $$\begin{aligned}
   \theta_{t+1}=\theta_{t}-\frac{\eta}{\sqrt{G_{t}+\epsilon}} \odot g_{t}
   \end{aligned}$$
   
5. Adadelta(To avoid $$G_t$$ keeps going larger and larger and make model don't update any more, only keep a few gradients in a window by using momentum):

   $$\begin{aligned}
   E\left[g^{2}\right]_{t}&=\gamma E\left[g^{2}\right]_{t-1}+(1-\gamma) g_{t}^{2}
   \end{aligned}$$
   
   So we can replace $$G_t$$ with $$E\left[g^{2}\right]_{t}$$.
   
   And author claims that the unit in the update is not match.**(???)**.So  he use $$\ref{theta}$$ to replace learning rate in the original formula. And you don't have to set the parameter.

   $$\begin{equation}
   \label{theta}
   E\left[\Delta \theta^{2}\right]_{t}=\gamma E\left[\Delta \theta^{2}\right]_{t-1}+(1-\gamma) \Delta \theta_{t}^{2}
   \end{equation}$$
   
   $$\begin{aligned}
   \Delta \theta_{t} &=-\frac{R M S[\Delta \theta]_{t-1}}{R M S[g]_{t}} g_{t} \\
   \theta_{t+1} &=\theta_{t}+\Delta \theta_{t}
   \end{aligned}$$
   
   
   
6. RMSprop(It's almost as same as the Adadelta and they are for solving the same problem, but it didn't change the learning rate)      

   $$\begin{aligned}
   E\left[g^{2}\right]_{t} &=0.9 E\left[g^{2}\right]_{t-1}+0.1 g_{t}^{2} \\
   \theta_{t+1} &=\theta_{t}-\frac{\eta}{\sqrt{E\left[g^{2}\right]_{t}+\epsilon}} g_{t}
   \end{aligned}$$
   
7. Adam(I would call this momentum +  RMSprop for different learning rate for different parameter. And add a few term to avoid no update. And for easy to remember, $$m$$ for mean, $$v$$ for variance).$$\beta ^t $$means $$\beta$$ to the power t.

   $$\begin{aligned}
   m_{t} &=\beta_{1} m_{t-1}+\left(1-\beta_{1}\right) g_{t} \\
   v_{t} &=\beta_{2} v_{t-1}+\left(1-\beta_{2}\right) g_{t}^{2}\\
   \hat{m}_{t} &=\frac{m_{t}}{1-\beta_{1}^{t}} \\
   \hat{v}_{t} &=\frac{v_{t}}{1-\beta_{2}^{t}}\\
   \theta_{t+1}&=\theta_{t}-\frac{\eta}{\sqrt{\hat{v}_{t}}+\epsilon} \hat{m}_{t}
   \end{aligned}$$

8. 

reference :

[1]

S. Ruder, “An overview of gradient descent optimization algorithms,” *arXiv:1609.04747 [cs]*, Jun. 2017, Accessed: Mar. 08, 2022. [Online]. Available: http://arxiv.org/abs/1609.04747

[2]

D. P. Kingma and J. Ba, “Adam: A Method for Stochastic Optimization,” *arXiv:1412.6980 [cs]*, Jan. 2017, Accessed: Mar. 15, 2022. [Online]. Available: http://arxiv.org/abs/1412.6980
