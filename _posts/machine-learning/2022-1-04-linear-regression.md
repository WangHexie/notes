---
layout: post
title: how to solve Ax=b in linear algebra
---

How to solve $ Ax=b $? ( $$A\in \mathbb{R}^{m*n}, x \in \mathbb{R}^{n*1}, b \in \mathbb{R}^{m*1}$$)
1. when $m=n$ and $\mathrm{Rank}(A) = m$:

   $$   \begin{equation}
   x = A^{-1}b
   \end{equation}
   $$

2. when $m \gt n$ and $\mathrm{Rank}(A) = n$:
   
   $$
   \begin{equation}
   x = (A^{\intercal}A)^{-1}A^{\intercal}b
   \end{equation}
   $$
   
3. when $m \gt n$ and $\mathrm{Rank}(A) \lt n$:

   1. pseudoinverse: The pseudoinverse $A^{+}$ gives the minimum $\ell^2$ norm solution with nullspace component = zero
      
      $$
      \begin{equation}
      x = A^{+}b \\
      (A = U\Sigma V^{\intercal}, A^{+} = V\Sigma^{+}U^{\intercal})
      \end{equation}
      $$

   2. 
      $$
      \begin{equation}
      x = x_{1}
      \end{equation}
      $$

      $x_1$ has the minimum norm $\ell^2$ or other norm.

4. when $m \lt n$ : same as 3.

5. when $b$ is not in the columns space of $A$:

   1.  minimize $$ \Vert Ax - b \Vert^2 + \delta ^{2}\Vert x \Vert$$ , solve $$ (A^{\intercal}A + \delta ^{2}I)x_{\delta} = A^{\intercal}b  $$ .

6. $A$ may be nearly singular, the ratio $\sigma_1 / \sigma_r$ is too large(refer to [code example](/notes/ill-conditioned-matrix/)):

   1.  same as 5.1, when $\delta \to 0$ , the result approaches the pseudoinverse $A^{+}$. By adding $\delta^2I$, to make $A^{\intercal}A$ more positive.

   2. Gram-Schmidt to orthogonalizes the columns of A, and then $\hat{x}$ is easy to find.(The condition number of $ A^{T}A$ is its norm $\Vert A^{T}A\Vert$ times $\Vert (A^{T}A)^{-1}\Vert$. More stable and (less computation ?)
      
      $$
      \begin{equation}
      A = QR
      \end{equation}
      $$

      $$
      \begin{equation}
      x = R^{-1}Q^{\intercal}b
      \end{equation}
      $$

      

   3. 

7. 





Reference: Linear_Algebra_and_Learning_from_Data_by_Gilbert_Strang