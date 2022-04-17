---
layout: post
title: Python基础
---

参考索引[[^1], [^7]]

## class [[^2]]

  * python所有对象都是类
    * function也是类，可以set_attribute 或者 get_attribute
    * class TypeA 的声明，会生成一个meteclass(type)的对象，该TypeA不仅是类也是对象。TypeA()会调用metaclass 的 `__call__` 方法。
    * TypeA() 的调用顺序是`__new__`, `__init__`。
    * 动态生成类：
      ```python
      Foo = type(
          'Foo',
          (),
          {
              'attr': 100,
              'attr_val': f
          }
      )
      ``` 

## Decorator [[^6]]
  *  类装饰器：`__call__`里写。
  *  `functools.cache` python 自带的缓存装饰器。[[^8]]

## 内存管理 [[^3]]
  * 遍历的是容器对象，并且不根据引用关系遍历，而是根据自己的链表遍历。
  * 接下来第二遍才是根据引用关系遍历

## 迭代器和生成器 [[^4]]
  * **迭代器**：实现了迭代接口的对象。 `__iter__` 和 `__next__`， `__iter__`一般返回`self`，`__next__`要自行保存迭代的位置。结束通过抛出`StopIteration`的错误。
  * **生成器函数**： def 定义， `yield`返回结果 
    * 生成器是 `Iterable`（可迭代对象）, 不是`Iterator`  （迭代器）
  * **生成器表达式**: `(i for i in range(10))` ，返回生成器
  * 可以通过 `iter()` 函数包装，将生成器变成迭代器，从而可以使用`next()`方法。
  * `for` 会自动将生成器包装成迭代器。[[^5]]

## List 实现[[^9]]
  * 连续数组
  * 插入和删除都是O(n)的， append, pop(-1)为O(1)
  * get slice[x:y] O(k)    
    del slice O(n)    
    set slice O(n+k)   


[^1]: [https://github.com/jackfrued/Python-Interview-Bible/blob/master/Python%E9%9D%A2%E8%AF%95%E5%AE%9D%E5%85%B8-%E5%9F%BA%E7%A1%80%E7%AF%87-2020.md](https://github.com/jackfrued/Python-Interview-Bible/blob/master/Python%E9%9D%A2%E8%AF%95%E5%AE%9D%E5%85%B8-%E5%9F%BA%E7%A1%80%E7%AF%87-2020.md)

[^2]: [https://realpython.com/python-metaclasses/#type-and-class](https://realpython.com/python-metaclasses/#type-and-class)

[^3]: [https://zhuanlan.zhihu.com/p/83251959](https://zhuanlan.zhihu.com/p/83251959)

[^4]: [https://www.cnblogs.com/wj-1314/p/8490822.html](https://www.cnblogs.com/wj-1314/p/8490822.html)

[^5]: [https://docs.python.org/3.0/glossary.html](https://docs.python.org/3.0/glossary.html)

[^6]: [https://realpython.com/primer-on-python-decorators/](https://realpython.com/primer-on-python-decorators/)

[^7]: [https://docs.python.org/3.0/glossary.html](https://docs.python.org/3.0/glossary.html)

[^8]: [https://docs.python.org/3/library/functools.html](https://docs.python.org/3/library/functools.html)

[^9]: [https://blog.csdn.net/Yuyh131/article/details/83592608](https://blog.csdn.net/Yuyh131/article/details/83592608)