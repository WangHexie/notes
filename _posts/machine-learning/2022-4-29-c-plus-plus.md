---
layout: post
title: C++入门
---

## C++ [[^1]]
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

## 参考文献

[^1]: 统计学习方法(第二版)
[^2]: [https://www.tutorialspoint.com/cplusplus/cpp_storage_classes.htm](https://www.tutorialspoint.com/cplusplus/cpp_storage_classes.htm)