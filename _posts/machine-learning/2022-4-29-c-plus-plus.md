---
layout: post
title: C++入门
---

## C++ [[^1], [^2]]
* global variable is automatically initialized with default value.But local varible not!!.  

* There are two simple ways in C++ to define constants −

	1. Using #define preprocessor.

	1. Using const keyword.

* wide charactor: `L'a'`
* preprocessor 
* compile multiple files: `$g++ main.cpp support.cpp -o write` [[^2]]
	* use `extern` to declare function in other cpp file 
* struct defination:
  ```c++
    struct Books {
    char  title[50];
    char  author[50];
    char  subject[100];
    int   book_id;
    };

    struct Books Book1;        // Declare Book1 of type Book
    struct Books Book2; 
  ```

* c++ 初始化列表

* static 修饰普通函数 

* inline  直接将函数写入调用处，所以能加快运行速度，避免了内核的切换。
  * 类内定义的函数会默认为inline。

* operator ?
  
* friend?

* template?

* 右值引用
* 引用折叠
* 宏
* 成员初始化列表
* 智能指针：能够自动化地释放资源。
* 不想使用编译器自动生成的函数，就应该明确拒绝（将不想使用的成员函数声明为 private，并且不予实现）


## 参考文献

[^1]: [https://github.com/huihut/interview](https://github.com/huihut/interview)

[^2]: [https://www.tutorialspoint.com/cplusplus/cpp_storage_classes.htm](https://www.tutorialspoint.com/cplusplus/cpp_storage_classes.htm)