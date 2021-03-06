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

## List 实现和应用[[^9]]
  * 连续数组
  * 插入和删除都是O(n)的， append, pop(-1)为O(1)
  * get slice[x:y] O(k)    
    del slice O(n)    
    set slice O(n+k)   
  * Slice with Negative Step Size: start 应该是从后面开始的，`print(L[6:1:-2])` [[^sl]]
  * Insert Multiple List Items:Simply specify a zero-length slice[[^sl]]
    ```python
    # Insert at the start
    L = ['a', 'b', 'c']
    L[:0] = [1, 2, 3]
    print(L)
    # Prints [1, 2, 3, 'a', 'b', 'c']
    # Insert at the end
    L = ['a', 'b', 'c']
    L[len(L):] = [1, 2, 3]
    print(L)
    # Prints ['a', 'b', 'c', 1, 2, 3]
    # Insert in the middle
    # You can insert items into the middle of list by keeping both the start and stop indices of the slice same.
    L = ['a', 'b', 'c']
    L[1:1] = [1, 2, 3]
    print(L)
    # Prints ['a', 1, 2, 3, 'b', 'c']
    ```
  * Delete Multiple List Items：`L[1:5] = []` or `del L[1:5]` [[^sl]]





## 继承
  * mark [父类的值变化对子类值的影响](https://github.com/jackfrued/Python-Interview-Bible/blob/master/Python%E9%9D%A2%E8%AF%95%E5%AE%9D%E5%85%B8-%E5%9F%BA%E7%A1%80%E7%AF%87-2020.md#%E9%A2%98%E7%9B%AE018%E8%AF%B4%E5%87%BA%E4%B8%8B%E9%9D%A2%E4%BB%A3%E7%A0%81%E7%9A%84%E8%BF%90%E8%A1%8C%E7%BB%93%E6%9E%9C)
  * python [菱形继承方法解析顺序](https://github.com/jackfrued/Python-Interview-Bible/blob/master/Python%E9%9D%A2%E8%AF%95%E5%AE%9D%E5%85%B8-%E5%9F%BA%E7%A1%80%E7%AF%87-2020.md#%E9%A2%98%E7%9B%AE32%E9%98%85%E8%AF%BB%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E8%AF%B4%E5%87%BA%E8%BF%90%E8%A1%8C%E7%BB%93%E6%9E%9C)

## 类方法
  * ```python
    @classmethod
    def car_count(cls):     # 类方法，只访问类变量
        print(f"我有{cls.car_num}辆车")
    ```
    [[^cm]]

## 编程规范
  * 不要用检查长度的方式来判断字符串、列表等是否为None或者没有元素，应该用if not x这样的写法来检查它。
  * 如果有多个import语句，应该将其分为三部分，从上到下分别是Python标准模块、第三方模块和自定义模块，每个部分内部应该按照模块名称的字母表顺序来排列。

## magic method 
  * 通过定义类似  `__slot__ = ('__value', )`，不允许在类内创建新值 [[^slot]]

## 基础函数
  * `defaultdict`: 返回函数默认的值 [[^dd]]
  * `deque`: list-like，在两端append和pop 是O(1)的 [[^dq]]
  * `nametuple`: 返回的是一个类，可以继承，然后定义方法。 `Card = namedtuple('Card', ('suite', 'face'))`

## Exception [[^ex]]
```python
try:
       # Some Code.... 

except:
       # optional block
       # Handling of exception (if required)

else:
       # execute if no exception

finally:
      # Some code .....(always executed)
```

## 反射 [[^rf]]


## 参考

[^1]: [https://github.com/jackfrued/Python-Interview-Bible/blob/master/Python%E9%9D%A2%E8%AF%95%E5%AE%9D%E5%85%B8-%E5%9F%BA%E7%A1%80%E7%AF%87-2020.md](https://github.com/jackfrued/Python-Interview-Bible/blob/master/Python%E9%9D%A2%E8%AF%95%E5%AE%9D%E5%85%B8-%E5%9F%BA%E7%A1%80%E7%AF%87-2020.md)

[^2]: [https://realpython.com/python-metaclasses/#type-and-class](https://realpython.com/python-metaclasses/#type-and-class)

[^3]: [https://zhuanlan.zhihu.com/p/83251959](https://zhuanlan.zhihu.com/p/83251959)

[^4]: [https://www.cnblogs.com/wj-1314/p/8490822.html](https://www.cnblogs.com/wj-1314/p/8490822.html)

[^5]: [https://docs.python.org/3.0/glossary.html](https://docs.python.org/3.0/glossary.html)

[^6]: [https://realpython.com/primer-on-python-decorators/](https://realpython.com/primer-on-python-decorators/)

[^7]: [https://docs.python.org/3.0/glossary.html](https://docs.python.org/3.0/glossary.html)

[^8]: [https://docs.python.org/3/library/functools.html](https://docs.python.org/3/library/functools.html)

[^9]: [https://blog.csdn.net/Yuyh131/article/details/83592608](https://blog.csdn.net/Yuyh131/article/details/83592608)

[^slot]: [https://stackoverflow.com/questions/472000/usage-of-slots](https://stackoverflow.com/questions/472000/usage-of-slots)

[^cm]: [http://web.suda.edu.cn/hejun/chapter11/python_11_3.html](http://web.suda.edu.cn/hejun/chapter11/python_11_3.html)

[^dd]: [https://www.geeksforgeeks.org/defaultdict-in-python/](https://www.geeksforgeeks.org/defaultdict-in-python/)

[^dq]: [https://docs.python.org/3/library/collections.html#collections.deque](https://docs.python.org/3/library/collections.html#collections.deque)

[^sl]: [https://www.learnbyexample.org/python-list-slicing/](https://www.learnbyexample.org/python-list-slicing/)

[^ex]: [https://www.geeksforgeeks.org/try-except-else-and-finally-in-python/](https://www.geeksforgeeks.org/try-except-else-and-finally-in-python/)

[^rf]: [https://www.cnblogs.com/vipchenwei/p/6991209.html](https://www.cnblogs.com/vipchenwei/p/6991209.html)