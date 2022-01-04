---
layout: post
title: how to solve Ax=b in linear algebra
---

How to solve $ Ax=b $? ($ A\in \mathbb{R}^{m*n}, x \in \mathbb{R}^{n*1}, b \in \mathbb{R}^{m*1}  $)
1.  when $m=n$ and $\mathrm{Rank}(A) = m$:
   $$
   x = A^{-1}b
   $$
   

2. when $m \gt n$ and $\mathrm{Rank}(A) = n$:
   $$
   x = (A^{\intercal}A)^{-1}A^{\intercal}b
   $$
   

3. when $m \gt n$ and $\mathrm{Rank}(A) \lt n$:

   1. pseudoinverse:
      $$
      x = A^{+}b \\
      (A = U\Sigma V^{\intercal}, A^{+} = V\Sigma^{+}U^{\intercal})
      $$

   2. $$
      x = x_{1} 
      $$

      $x_1$ has the minimum norm $\ell_1$ or other norm.

4. when $m \lt n$ : same as 3.

5. when $b$ is not in the columns space of $A$:

   1.  minimize $$ \Vert Ax - b \Vert^2 + \delta ^{2}\Vert x \Vert$$ , solve $$ (A^{\intercal}A + \delta ^{2}I)x_{\delta} = A^{\intercal}b  $$ .
   2. 
   3. 

6. $A$ may be nearly singular, the ratio $\sigma_1 / \sigma_r$ is too large(refer to [code example](/ill-conditioned-matrix/)):

   1.  same as 5.1, when 

7. 





