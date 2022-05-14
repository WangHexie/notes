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
  
* friend:
  * **Friend Class** A friend class can access private and protected members of other class in which it is declared as friend.
    ```c++
    class Node {
    private:
        int key;
        Node* next;
    
        /* Other members of Node Class */
        friend int LinkedList::search();
        // Only search() of linkedList
        // can access internal members
    };
    ``` 
  * **Friend Function** Like friend class, a friend function can be given a special grant to access private and protected members. 
    ```c++
    class Node {
    private:
        int key;
        Node* next;
        /* Other members of Node Class */
    
        // Now class  LinkedList can
        // access private members of Node
        friend class LinkedList;
    };
    ``` 
  * 都是在function或者class前面加friend就行。
  * 

* template?

* 右值引用[[^lrr]]：An lvalue is an expression that refers to a memory location and allows us to take the address of that memory location via the & operator. An rvalue is an expression that is not an lvalue. 
  * X&& x
  * 主要是为了实现一下两个功能：
    1. move semantics: 为了能调用rvalue作为输入的赋值函数，赋值时不用构造一个临时变量然后销毁。而是交换原始的value和rvalue，退出时自动销毁rvalue的内容，从而提升性能。（需要overload copy constructor and assignment operator）
    1. perfect forwarding：主要是处理引用和rvalue的template问题。
  
* 引用折叠
* 宏
* 成员初始化列表
* 智能指针：能够自动化地释放资源。
* 不想使用编译器自动生成的函数，就应该明确拒绝（将不想使用的成员函数声明为 private，并且不予实现）


## 参考文献

[^1]: [https://github.com/huihut/interview](https://github.com/huihut/interview)

[^2]: [https://www.tutorialspoint.com/cplusplus/cpp_storage_classes.htm](https://www.tutorialspoint.com/cplusplus/cpp_storage_classes.htm)

[^lrr]: [http://thbecker.net/articles/rvalue_references/section_01.html](http://thbecker.net/articles/rvalue_references/section_01.html)