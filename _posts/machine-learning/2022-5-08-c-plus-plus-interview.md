---


layout: post
title: C++面经
---


Question List[[^ml]](其实吧，我怀疑就是抄的c++ primer里面的，c++primer介绍的确实详细。)

* static 静态全局变量可以限制其仅在文件内部被访问。


### const和static在类中使用的注意事项（定义、初始化和使用）[[^1]]
  * static静态成员变量不能在类的内部初始化。在类的内部只是声明，定义必须在类定义体的外部，通常在类的实现文件中初始化，如：double Account::Rate=2.25;static关键字只能用于类定义体内部的声明中，定义时不能标示为static.
  *  const成员变量也不能在类定义处初始化，只能通过构造函数初始化列表进行，并且必须有构造函数。
  * 初始化
     ```c++
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

### 指针和引用的区别
指针可以初始化为空，引用不可以，引用只是对象的别名，在全生命周期中不能为空。


### 模板函数和模板类的特例化 [[^8], [^9]]
* 模板函数可以声明多个class，并且`class`和`typename`的含义与作用是一样的。[[^8]]
  ```c++
  template <class T, class U>
  T GetMin (T a, U b) {
    return (a<b?a:b);
  }
  ```
* 函数模板特化：为特殊的类调用不同的函数来处理。[[^9]]
  ```c++
  template <class T>
  int compare(const T left, const T right)
  {
      std::cout <<"in template<class T>..." <<std::endl;
      return (left - right);
  }


  //  这个是一个特化的函数模版
  template < >
  int compare<const char*>(const char* left, const char* right)
  {
      std::cout <<"in special template< >..." <<std::endl;

      return strcmp(left, right);
  }
  ```
  * 模板函数的调用：[[^8]]
    ```c++
    int i,j;
    k=GetMax<int>(i,j);
    k=GetMax(i, j); // 这样也行
    ``` 
  * 模板类的初始化：
    ```c++
    mypair<int> myobject (115, 36); 
    ```
  * 模板类中函数的实现：
    ```c++
    template <class T>
    T mypair<T>::getmax ()
    ```
  * 模板类的特化：
    ```c++
    template <> class mycontainer <char> { ... };
    ```

  * 模板类中非class的，常规类型常数，并且可以给class等设置默认值。
    ```c++
    template <class T, int N>
    class mysequence {
        T memblock [N];
      public:
        void setmember (int x, T value);
        T getmember (int x);
    };
    mysequence <int,5> myints;
    ```
    ```c++
    template <class T=char, int N=10> class mysequence {..};
    ```
  * 类的偏特化：
    ```c++
    template<class T1, class T2>
    class A
    {
    }

    template<class T1>
    class A<T1, int>
    {
    }
    ```
  * 特化为指针类型：
    ```c++
    template<class T>
    class Compare<T*>
    {
    public:
      static bool IsEqual(const T* lh, const T* rh)
      {
          return Compare<T>::IsEqual(*lh, *rh);
      }
    };
    ```
  * 特化为其他类型：
    ```c++
    template<class T>
    class Compare<vector<T> >
    {
    public:
        static bool IsEqual(const vector<T>& lh, const vector<T>& rh)
        {
            if(lh.size() != rh.size()) return false;
            else
            {
                for(int i = 0; i < lh.size(); ++i)
                {
                    if(lh[i] != rh[i]) return false;
                }
            }
            return true;
        }
    };
    ```
  * 模板嵌套：
    ```c++
    template <class T1> 
    struct SpecializedType
    {
        T1 x1;
        T1 x2;
    };
    template <class T>
    class Compare<SpecializedType<T> >
    {
    public:
        static bool IsEqual(const SpecializedType<T>& lh, const SpecializedType<T>& rh)
        {
            return Compare<T>::IsEqual(lh.x1 + lh.x2, rh.x1 + rh.x2);
        }
    };
    ```



C++的STL源码（这个系列也很重要，建议侯捷老师的STL源码剖析书籍与视频），其中包括内存池机制，各种容器的底层实现机制，算法的实现原理等）

STL源码中的hashtable的实现

STL中unordered_map和map的区别和应用场景

STL中vector的实现

  
* STL容器的几种迭代器以及对应的容器[[^all]]
  ![iterator]({{site.baseurl}}/images/c++/iterators.png)
  * 输入迭代器[[^i]]:They are the iterators that can be used in sequential input operations, where each value pointed by the iterator is read-only once and then the iterator is incremented.
    * Arithmetic Operators: Similar to relational operators, they also can’t be used with arithmetic operators like +, – and so on
  * 输出迭代器[[^oi]]: They can be assigned values in a sequence, but cannot be used to access values, 
    * Equality / Inequality Comparison: Unlike input iterators, output iterators **cannot be compared** for equality with another iterator.
    * Arithmetic Operators: Similar to relational operators, they also can’t be used with arithmetic operators like +, – and so on
  * 前向迭代器:Forward iterators are considered to be the combination of input as well as output iterators
    * Use of offset dereference operator ([ ]): Forward iterators do not support offset dereference operator ([ ])
  * 双向迭代器:Bidirectional iterators are iterators that can be used to access the sequence of elements in a range in both directions 
    * Equality / Inequality Comparison:
  * 随机访问迭代器:Random-access iterators are iterators that can be used to access elements at an arbitrary offset position relative to the element they point to, offering the same functionality as pointers. Random-access iterators are the most complete iterators in terms of functionality. All pointer types are also valid random-access iterators.
    * Relational Operators: allowed
      ```c++
      A <= B     // Allowed
      ```
    * Arithmetic Operators:allowed
      ```c++ 
      B - 2     // Allowed
      ``` 
    * Use of offset dereference operator ([]): allowed
    * 
顺序容器：vector, deque是随机访问迭代器；list是双向迭代器

容器适配器：stack,queue,priority_queue没有迭代器

关联容器：set,map,multiset,multimap是双向迭代器

unordered_set,unordered_map,unordered_multiset,unordered_multimap是前向迭代器

STL中的traits技法
type_traits

iterator_traits

char traits

allocator_traits

pointer_traits

array_traits

vector使用的注意点及其原因，频繁对vector调用push_back()对性能的影响和原因。
C++中的重载和重写的区别
C++内存管理，内存池技术（热门问题），与csapp中几种内存分配方式对比学习加深理解
介绍面向对象的三大特性，并且举例说明每一个
C++多态的实现
C++虚函数相关（虚函数表，虚函数指针），虚函数的实现原理（包括单一继承，多重继承等）（拓展问题：为什么基类指针指向派生类对象时可以调用派生类成员函数，基类的虚函数存放在内存的什么区，虚函数表指针vptr的初始化时间）
C++中类的数据成员和成员函数内存分布情况
this指针
析构函数一般写成虚函数的原因
构造函数、拷贝构造函数和赋值操作符的区别
构造函数：对象不存在，没用别的对象初始化

拷贝构造函数：对象不存在，用别的对象初始化

赋值运算符：对象存在，用别的对象给它赋值

构造函数声明为explicit
构造函数为什么一般不定义为虚函数
构造函数的几种关键字(default delete 0)
= default：将拷贝控制成员定义为=default显式要求编译器生成合成的版本

= delete：将拷贝构造函数和拷贝赋值运算符定义删除的函数，阻止拷贝（析构函数不能是删除的函数 C++Primer P450）

= 0：将虚函数定义为纯虚函数（纯虚函数无需定义，= 0只能出现在类内部虚函数的声明语句处；当然，也可以为纯虚函数提供定义，不过函数体必须定义在类的外部）

构造函数或者析构函数中调用虚函数会怎样
纯虚函数
静态类型和动态类型，静态绑定和动态绑定的介绍
引用是否能实现动态绑定，为什么引用可以实现
深拷贝和浅拷贝的区别（举例说明深拷贝的安全性）
对象复用的了解，零拷贝的了解
介绍C++所有的构造函数
什么情况下会调用拷贝构造函数（三种情况）
结构体内存对齐方式和为什么要进行内存对齐？
内存泄露的定义，如何检测与避免？
手写智能指针的实现（shared_ptr和weak_ptr实现的区别）
智能指针的循环引用
遇到coredump要怎么调试
内存检查工具的了解
模板的用法与适用场景
成员初始化列表的概念，为什么用成员初始化列表会快一些（性能优势）？
用过C++ 11吗，知道C++ 11哪些新特性？
C++的调用惯例（简单一点C++函数调用的压栈过程）
C++的四种强制转换
static_cast

dynamic_cast

const_cast

reinterpret_cast

C++中将临时变量作为返回值的时候的处理过程（栈上的内存分配、拷贝过程）
C++的异常处理
volatile关键字
优化程序的几种方法
public，protected和private访问权限和继承
class和struct的区别
decltype()和auto
inline和宏定义的区别
C++和C的类型安全


隐式类型转换
## 参考文献

[^1]: [https://chowdera.com/2021/05/20210527194638639f.html](https://chowdera.com/2021/05/20210527194638639f.html)

[^2]: [https://blog.csdn.net/zheng19880607/article/details/23883437](https://blog.csdn.net/zheng19880607/article/details/23883437)

[^3]: [https://zhuanlan.zhihu.com/p/161560391](https://zhuanlan.zhihu.com/p/161560391)

[^4]: [https://zhuanlan.zhihu.com/p/260992059](https://zhuanlan.zhihu.com/p/260992059#:~:text=%E9%92%88%E5%AF%B9%E4%B8%8A%E8%BF%B0%E6%83%85%E5%86%B5%EF%BC%8CC%2B%2B%2011,%E5%87%BD%E6%95%B0%E7%9A%84%E8%BF%9B%E4%B8%80%E6%AD%A5%E9%87%8D%E5%86%99%E3%80%82)

[^5]: [https://blog.csdn.net/capecape/article/details/78276677](https://blog.csdn.net/capecape/article/details/78276677)

[^6]: [https://www.runoob.com/cplusplus/cpp-copy-constructor.html](https://www.runoob.com/cplusplus/cpp-copy-constructor.html)

[^7]: [https://docs.microsoft.com/en-us/cpp/cpp/extern-cpp?view=msvc-170](https://docs.microsoft.com/en-us/cpp/cpp/extern-cpp?view=msvc-170)

[^8]: [https://www.cplusplus.com/doc/oldtutorial/templates/](https://www.cplusplus.com/doc/oldtutorial/templates/)


[^9]: [https://blog.csdn.net/gatieme/article/details/50953564](https://blog.csdn.net/gatieme/article/details/50953564)

[^ml]: [https://blog.csdn.net/xie810005152/article/details/91038878](https://blog.csdn.net/xie810005152/article/details/91038878)

[^i]: [https://www.geeksforgeeks.org/input-iterators-in-cpp/](https://www.geeksforgeeks.org/input-iterators-in-cpp/)

[^oi]: [https://www.geeksforgeeks.org/output-iterators-cpp/](https://www.geeksforgeeks.org/output-iterators-cpp/)

[^all]: [https://www.geeksforgeeks.org/iterators-c-stl/](https://www.geeksforgeeks.org/iterators-c-stl/)