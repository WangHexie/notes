---


layout: post
title: C++面经
---

* static 静态全局变量可以限制其仅在文件内部被访问。

### const和static在类中使用的注意事项（定义、初始化和使用）[[^1]]
  * static静态成员变量不能在类的内部初始化。在类的内部只是声明，定义必须在类定义体的外部，通常在类的实现文件中初始化，如：double Account::Rate=2.25;static关键字只能用于类定义体内部的声明中，定义时不能标示为static.
  *  const成员变量也不能在类定义处初始化，只能通过构造函数初始化列表进行，并且必须有构造函数。
  *  ```c++
     class Test
      {
      public:
      Test():a(0){}
      enum {size1=100,size2=200};
      private:
      const int a;//只能在构造函数初始化列表中初始化
      static int b;//在类的实现文件中定义并初始化
      const static int c;//与 static const int c;相同。
      };
      int Test::b=0;//static成员变量不能在构造函数初始化列表中初始化，因为它不属于某个对象。
      cosnt int Test::c=0;//注意：给静态成员变量赋值时，不需要加static修饰符。但要加cosnt
     ```  
    * const变量初始化：
      ```c++
      class foo
      {
      public:
      foo():i(100){}
      private:
      const int i=100;//error!!!
      };
      //或者通过这样的方式来进行初始化
      foo::foo():i(100)
      {}
      ```
    * statics 变量初始化：
      ```c++
      class foo
      {
      public:
      foo();
      private:
      static int i;
      };
      int foo::i=20;
      ```
      * 这表明：
        1. 初始化在类体外进行，而前面不加static，以免与一般静态变量或对象相混淆
        2. 初始化时不加该成员的访问权限控制符private、public等
    * const statics初始化：两者都一样。
      ```c++
      class Test
      {
      public:
      static const int mask1;
      const static int mask2;
      };
      const Test::mask1=0xffff;
      const Test::mask2=0xffff;  
      ```
    * 完整示例：
      ```c++
      #ifdef A_H_
      #define A_H_
      #include <iostream>
      using namespace std;
      class A
      {
      public:
      A(int a);
      static void print();//静态成员函数
      private:
      static int aa;//静态数据成员的声明
      static const int count;//常量静态数据成员（可以在构造函数中初始化）
      const int bb;//常量数据成员
      };
      int A::aa=0;//静态成员的定义+初始化
      const int A::count=25;//静态常量成员定义+初始化
      A::A(int a):bb(a)//常量成员的初始化
      {
      aa+=1;
      }
      void A::print()
      {
      cout<<"count="<<count<<endl;
      cout<<"aa="<<aa<<endl;
      }
      #endif
      void main()
      {
      A a(10);
      A::print();//通过类访问静态成员函数
      a.print();//通过对象访问静态成员函数
      }
      ``` 

## C++中的const类成员函数（用法和意义）[[^2]]
  * 参数：
    * 对于非内部数据类型的参数而言，象void Func(A a)这样声明的函数注定效率比较底。因为函数体内将产生A类型的临时对象用于复制参数a，而临时对象的构造、复制、析构过程都将消耗时间。为了提高效率，可以将函数声明改为void Func(A&a)，因为“引用传递”仅借用一下参数的别名而已，不需要产生临时对象。但是函数void Func(A&a) 存在一个缺点：“引用传递”有可能改变参数a，这是我们不期望的。解决这个问题很容易，加const修饰即可，因此函数最终成为voidFunc(const A &a)。
    * 内部数据类型的参数不存在构造、析构的过程，而复制也非常快，“值传递”和“引用传递”的效率几乎相当。对于内部数据类型的输入参数，不要将“值传递”的方式改为“const引用传递”。否则既达不到提高效率的目的，又降低了函数的可理解性。例如void Func(int x) 不应该改为voidFunc(const int &x)。
  * 返回值
    * 用const修饰函数的返回值如果给以“指针传递”方式的函数返回值加const修饰，那么函数返回值（即指针）的内容不能被修改，该返回值只能被赋给加const 修饰的同类型指针
    * 操作符重载： const 可以去掉，& 也可以去掉。返回`this`的话，得用`*this`
      ```c++
      class A{
        contst A &operate=(const A &other); // 赋值函数
        };
      
      const A &A::operator=(const A &other){
        return other
      }
      ```
    * const成员函数:表示不会修改类内变量，如果修改编译器会报错。const 是放在名字后面。
      ```c++
      class Stack
      {
      public:
      void Push(intelem);
      int Pop(void);
      int GetCount(void) const; //const 成员函数
      private:
      int m_num;intm_data[100];
      };
      int Stack::GetCount(void)const
      {
      ++ m_num; //编译错误，企图修改数据成员m_num
      Pop(); // 编译错误，企图调用非const函数
      return m_num;
      } 
      ``` 
    * const对象只能访问const成员函数,而非const对象可以访问任意的成员函数,包括const成员函数.
    * const对象的成员是不可修改的,然而const对象通过指针维护的对象却是可以修改的.
		* 然而加上mutable修饰符的数据成员,对于任何情况下通过任何手段都可修改,自然此时的const成员函数是可以修改它的
			* mutable 就是给const函数用的，让const函数也能更改值，但是不能更改其他东西。
			* const 函数只能调用 const函数，即使某个函数本质上没有修改任何数据，但没有声明为const，也是不能被const函数调用的。(同一个类中的函数以及其他的函数都不能)	

### C++的顶层const和底层const [[^3]]
* 顶层const：一般指修饰后无法更改具体值的const：`const int a; const int &a; P *const a; `
* 底层const：指修饰指针的const，指针不能改，但是指针指向的对象的值能改。
* 顶层 const 不影响传入函数的对象，一个拥有顶层 const 的形参无法和另一个没有顶层 const 的形参区分开：
	```c++
  Record lookup(Phone);
  Record lookup(const Phone);         //重复声明了Record lookup(Phone)
  ​
  Record lookup(Phone*);
  Record lookup(Phone* const);        //该const是顶层，重复声明了Record lookup(Phone* const)
  ```
* 另一方面，如果形参是某种类型的指针或引用，则通过区分其是否指向的是常量对象还是非常量对象可以实现函数重载。此时的const是底层的。
  ```c++
  Record lookup(Phone&);
  Record lookup(const Phone&);        //正确，底层const实现了函数的重载
  ​
  Record lookup(Phone*);
  Record lookup(const Phone*);        //正确，底层const实现了函数的重载
  ```
* 为什么不能在一个常量对象中调用非常成员函数？: 主要是this的关系，在调用类中的函数时，隐式地会给this赋值，在调用非常成员函数时候，无法将指向const对象的指针赋值给非const的this。
* 但是底层非const可以默认转化为底层const，非常成员所以可以调用常成员函数。


### final和override关键字 [[^4]]
* override：保证在派生类中声明的重载函数，与基类的虚函数有相同的签名；
* final：阻止类的进一步派生 和 虚函数的进一步重写。
  

### 拷贝初始化和直接初始化，初始化和赋值的区别 [[^5]]
* 如果使用等号（=）初始化一个变量，实际上执行的是“拷贝初始化”，编译器把等号右侧的初始值拷贝到新创建的对象中去。
* 与之相反，如果不使用等号，则执行的是“直接初始化”
* 拷贝初始化实际上是要求编译器将右侧运算对象拷贝到正在创建的对象中，通常用拷贝构造函数来完成
  * 拷贝构造函数是一种特殊的构造函数，它在创建对象时，是使用同一类中之前创建的对象来初始化新创建的对象。[[^6]]
  * 通过使用另一个同类型的对象来初始化新创建的对象。
    ```c++
    classname (const classname &obj) {
      // 构造函数的主体
    }
    ```
* 拷贝初始化不仅在用=定义变量时发生，下列情况也发生
  1. 将一个对象作为实参传递给非引用类型的形参时
  1. 从一个返回类型为非引用类型的函数返回一个对象
  1. 当初始化标准库容器或是调用其insert或push成员时（与之相对，用emplace成员创建的元素都进行直接初始化）
* **拷贝构造函数的形参必须是引用类型的原因**：如果不是引用类型，为了调用拷贝构造函数，我们必须拷贝它的实参，但为了拷贝实参，我们又需要调用拷贝构造函数，如此无限循环，造成错误。 
* 当拷贝构造函数前面加了一个explicit关键字时，调用拷贝构造函数不能进行隐式类型转换，但可以进行显示类型转换()

### extern "C"的用法

* **extern linkage for non-const globals** [[^7]]:When the linker sees extern before a global variable declaration, it looks for the definition in another translation unit. Declarations of non-const variables at global scope are external by default. Only apply extern to the declarations that don't provide the definition.
  ```c++ 
  //fileA.cpp
  int i = 42; // declaration and definition

  //fileB.cpp
  extern int i;  // declaration only. same as i in FileA

  //fileC.cpp
  extern int i;  // declaration only. same as i in FileA

  //fileD.cpp
  int i = 43; // LNK2005! 'i' already has a definition.
  extern int i = 43; // same error (extern is ignored on definitions)
  ```
* All of the standard include files use the extern "C" syntax to allow the run-time library functions to be used in C++ programs.主要是c++编译方式和c不一样，按c++方式编译的话，找不到用c编译的库函数等东西。
  ```c++
  // Declare printf with C linkage.
  extern "C" int printf(const char *fmt, ...);

  //  Cause everything in the specified
  //  header files to have C linkage.
  extern "C" {
      // add your #include statements here
  #include <stdio.h>
  }

  //  Declare the two functions ShowChar
  //  and GetChar with C linkage.
  extern "C" {
      char ShowChar(char ch);
      char GetChar(void);
  }

  //  Define the two functions
  //  ShowChar and GetChar with C linkage.
  extern "C" char ShowChar(char ch) {
      putchar(ch);
      return ch;
  }

  extern "C" char GetChar(void) {
      char ch;
      ch = getchar();
      return ch;
  }

  // Declare a global variable, errno, with C linkage.
  extern "C" int errno;
  ```


模板函数和模板类的特例化
C++的STL源码（这个系列也很重要，建议侯捷老师的STL源码剖析书籍与视频），其中包括内存池机制，各种容器的底层实现机制，算法的实现原理等）
STL源码中的hashtable的实现

隐式类型转换
## 参考文献

[^1]: [https://chowdera.com/2021/05/20210527194638639f.html](https://chowdera.com/2021/05/20210527194638639f.html)

[^2]: [https://blog.csdn.net/zheng19880607/article/details/23883437](https://blog.csdn.net/zheng19880607/article/details/23883437)

[^3]: [https://zhuanlan.zhihu.com/p/161560391](https://zhuanlan.zhihu.com/p/161560391)

[^4]: [https://zhuanlan.zhihu.com/p/260992059](https://zhuanlan.zhihu.com/p/260992059#:~:text=%E9%92%88%E5%AF%B9%E4%B8%8A%E8%BF%B0%E6%83%85%E5%86%B5%EF%BC%8CC%2B%2B%2011,%E5%87%BD%E6%95%B0%E7%9A%84%E8%BF%9B%E4%B8%80%E6%AD%A5%E9%87%8D%E5%86%99%E3%80%82)

[^5]: [https://blog.csdn.net/capecape/article/details/78276677](https://blog.csdn.net/capecape/article/details/78276677)

[^6]: [https://www.runoob.com/cplusplus/cpp-copy-constructor.html](https://www.runoob.com/cplusplus/cpp-copy-constructor.html)

[^7]: [https://docs.microsoft.com/en-us/cpp/cpp/extern-cpp?view=msvc-170](https://docs.microsoft.com/en-us/cpp/cpp/extern-cpp?view=msvc-170)