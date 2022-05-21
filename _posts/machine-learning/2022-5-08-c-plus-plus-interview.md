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
* 顺序容器：vector, deque是随机访问迭代器；list是双向迭代器

* 容器适配器：stack,queue,priority_queue没有迭代器

* 关联容器：set,map,multiset,multimap是双向迭代器

* unordered_set,unordered_map,unordered_multiset,unordered_multimap是前向迭代器

STL中的traits技法
type_traits

iterator_traits

char traits

allocator_traits

pointer_traits

array_traits

vector使用的注意点及其原因，频繁对vector调用push_back()对性能的影响和原因。
* C++中的重载和重写的区别：对虚函数重写，是多态的体现。而重载则是静态的，在编译器编译的时候就已经确定是应该调用哪个函数了。      

C++内存管理，内存池技术（热门问题），与csapp中几种内存分配方式对比学习加深理解

* 介绍面向对象的三大特性，并且举例说明：封装、继承、多态
五大原则："单一职责原则"、"开放封闭原则"、"里氏替换原则"、"依赖倒置原则"、"接口分离原则"、"迪米特原则（高内聚低耦合）"。



* C++多态的实现: 虚函数表，虚函数指针
C++虚函数相关（虚函数表，虚函数指针），

* 虚函数的实现原理（包括单一继承，多重继承等）（
  
  拓展问题：为什么基类指针指向派生类对象时可以调用派生类成员函数，

* 基类的虚函数存放在内存的什么区:C++中虚函数表位于只读数据段（.rodata），也就是C++内存模型中的常量区；而虚函数则位于代码段（.text），也就是C++内存模型中的代码区。

，虚函数表指针vptr的初始化时间）

* C++中类的数据成员和成员函数内存分布情况:从代码运行结果来看，对象的大小和对象中数据成员的大小是一致的，也就是说，成员函数不占用对象的内存。这是因为所有的函数都是存放在代码区的

this指针
* 析构函数一般写成虚函数的原因：基类指针指向了派生类对象，而基类中的析构函数是非virtual的，而虚构函数是动态绑定的基础。现在析构函数不是virtual的，因此不会发生动态绑定，而是静态绑定，指针的静态类型为基类指针，因此在delete的时候只会调用基类的析构函数，而不会调用派生类的析构函数。

* 构造函数、拷贝构造函数和赋值操作符的区别
  * 构造函数：对象不存在，没用别的对象初始化

  * 拷贝构造函数：对象不存在，用别的对象初始化

  * 赋值运算符：对象存在，用别的对象给它赋值

构造函数声明为explicit

构造函数为什么一般不定义为虚函数

* 构造函数的几种关键字(default delete 0)
  * = default：将拷贝控制成员定义为=default显式要求编译器生成合成的版本
  * = delete：将拷贝构造函数和拷贝赋值运算符定义删除的函数，阻止拷贝（析构函数不能是删除的函数 C++Primer P450）
  * = 0：将虚函数定义为纯虚函数（纯虚函数无需定义，= 0只能出现在类内部虚函数的声明语句处；当然，也可以为纯虚函数提供定义，不过函数体必须定义在类的外部）

* 构造函数或者析构函数中调用虚函数会怎样:构造函数和析构函数调用虚函数时都不使用动态联编，如果在构造函数或析构函数中调用虚函数，则运行的是为构造函数或析构函数自身类型定义的版本。[[^19]]


纯虚函数

* 静态类型和动态类型[[^ds]]: 静态类型和动态类型的区别在于什么时候报类型的错误？，比如说 3 / "a“，静态类型多是在编译时，动态类型多是在程序运行时
* 静态绑定和动态绑定的介绍[[^dsb]]: 
  * 静态绑定发生在编译时，并将名称绑定到一个固定的函数定义，然后在每次调用该名称时执行该定义。
  * 动态绑定发生在运行时。动态绑定仅在编译器可以确定运行时子类对象所属的确切类时才起作用。编译器然后使用这个运行时类型信息来调用该类中定义的函数版本。动态绑定始终使用对象的实际类中的成员函数版本，而无视用于访问对象的指针的类。

* 引用是否能实现动态绑定，为什么引用可以实现:[^db]
  * `	Ainmal animal3 = dog;` 这样是没法实现的，只能是指针和引用
  * void fun(A a);　　将B b传入时，首先发生了b的向上转型，然后发生了值拷贝，vptr发生了改变，多态失败。
  * 一个pointer或一个reference之所以支持多态，是因为它们并不引发内存任何“与类型有关的内存委托操作； 会受到改变的。只有它们所指向内存的大小和解释方式 而已”
    * 指针和引用类型只是要求了基地址和这种指针所指对象的内存大小，与对象的类型无关，相当于把指向的内存解释成指针或引用的类型。
    * 而把一个派生类对象直接赋值给基类对象，就牵扯到对象的类型问题，编译器就会回避之前的的虚机制。从而无法实现多态。

深拷贝和浅拷贝的区别（举例说明深拷贝的安全性）

* 对象复用的了解，零拷贝的了解[^zc]:
  * 对象复用对象复用其本质是一种设计模式：Flyweight享元模式。通过将对象存储到“对象池”中实现对象的重复利用，这样可以避免多次创建重复对象的开销，节约系统 资源。
  * 零拷贝:零拷贝就是一种避免 CPU 将数据从一块存储拷贝到另外一块存储的技术。零拷贝技术可以减少数据拷贝和共享总线操作的次数。
    * emplace_back()很好地体现了零拷贝技术，它跟push_back()函数一 样可以将一个元素插入容器尾部，区别在于：使用push_back()函数需要调用拷贝构造函数和转移构造 函数，而使用emplace_back()插入的元素原地构造，不需要触发拷贝构造和转移构造，效率更高


* 介绍C++所有的构造函数:
  * 默认构造函数、一般构造函数、拷贝构造函数
  * 默认构造函数（无参数）：如果创建一个类你没有写任何构造函数,则系统会自动生成默认的构造函数，或者写了一个不带任何形参的构造函数
  * 一般构造函数：一般构造函数可以有各种参数形式,一个类可以有多个一般构造函数，前提是参数的个数或者类型不同（基于c++的重载函数原理）
  * 拷贝构造函数参数为类对象本身的引用，用于根据一个已存在的对象复制出一个新的该类的对象，一般在函数中会将已存在对象的数据成员的值复制一份到新创建的对象中。参数（对象的引用）是不可变的（const类型）。此函数经常用在函数调用时用户定义类型的值传递及返回。


* 什么情况下会调用拷贝构造函数（三种情况）[[^ci]]:
  * 用类的一个对象去初始化另一个对象时
  * 当函数的形参是类的对象时（也就是值传递时），如果是引用传递则不会调用
  * 当函数的返回值是类的对象或引用时


* 在什么情况下需要用户自己定义拷贝构造函数：一般情况下，当类中成员有指针变量、类中有动态内存分配时常常需要用户自己定义拷贝构造函数。

* 结构体内存对齐方式和为什么要进行内存对齐？:
  * 不是所有的硬件平台都能访问任意地址上的数据
  * 某些硬件平台只能只在某些地址访问某些特定类型的数据，否则抛出硬件异常，及遇到未对齐的边界直接就不进行读取数据了。
  * 为了代码的可移植性，和提升CPU访问内存的效率，所以结构体一定要内存对齐。本质：空间换区时间的做法。


* 内存泄露的定义，如何检测与避免？:
  * 栈中内存的申请和释放:通常来说,一个线程上的栈内存是有限的,通常为8MB左右(大小取决于运行环境),栈上的内存通常是由编译器自动管理的。当在栈上分配一个新的变量时,或进入一个函数时,栈的指针会向下移动(下压栈),相当于在栈上分配了一块内存。我们把变量分配在栈上,也就是利用了栈上的内存空间,当这个变量的生命周期结束的时候,栈的指针会上移,相当于回收了此块内存。正是由于栈上的内存和分配和回收均是由编译器自动完成控制的,所以在栈上是不会发生内存泄漏的,只会发生栈 溢 出的情况(Stack Overflow),也就是分配的空间超过了规定的栈大小。
  * 堆中内存的申请和释放:堆中的内存是由程序直接控制的,程序可以通过[new/delete]来分配和回收内存,如果程序中通过[new]手动分配了一块内存,但忘记使用[delete]来回收内存,便会发生内存泄漏。
  * 内存的泄漏可以分为四类:
    1. 常发性内存泄漏:即发生内存泄漏的代码会被多次重复的指执行,每次被执行的时候都会导致一块内存泄漏
    2. 偶发性内存泄漏:即发生内存泄漏的代码只有再某些特定环境和操作过程下才会发生(例如在释放分配的内存之前程序通过某条件跳出了函数体,导致内存无法被delete)。常发性和偶发性是相对的,对于特定的环境,偶发性的也许会变成常发性的,所以测试环境和测试方法对检测内存泄漏至关重要！
    3. 一次性内存泄漏:即发生内存的代码只会被执行一次,或者是由于算法上的缺陷,导致总会有且仅有一块内存发生泄漏(比如在类的构造函数中分配内存,在析构函数中却没有释放该内存,但是由于这个类只会使用一次,所以内存泄漏只会发生一次)
    4. 隐式内存泄漏:即程序运行的过程中不停的分配内存,但是直到结束的时候才释放内存,严格的来说,这里并没有发生内存泄漏,因为最终程序释放了所有申请的内存,但是对于一个服务器程序来说,需要运行几天几周甚至几年,不及时释放内存可能导致最终耗尽系统的所有内存,所以称为这内存泄漏为隐式内存泄漏。    
    作为一般的用户，根本感觉不到内存泄漏的存在。真正有危害的是内存泄漏的堆积，这会最终消耗尽系统所有的内存。从这个角度来说， 一次性内存泄漏并没有什么危害，因为它不会堆积，而隐 式 内 存 泄 漏 危 害 性 非 常 大，因为较之于常发性和偶发性内存泄漏它更难被检测


手写智能指针的实现（shared_ptr和weak_ptr实现的区别）[[^hw]]

* 智能指针的区别：
  * unique_ptr: 管理的资源唯一的属于一个对象，但是支持将资源移动给其他unique_ptr对象。当拥有所有权的unique_ptr对象析构时，资源即被释放。
  * shared_ptr: 管理的资源被多个对象共享，内部采用引用计数跟踪所有者的个数。当最后一个所有者被析构时，资源即被释放。
  * weak_ptr: 与shared_ptr配合使用，虽然能访问资源但却不享有资源的所有权，不影响资源的引用计数。有可能资源已被释放，但weak_ptr仍然存在。因此每次访问资源时都需要判断资源是否有效。

智能指针的循环引用:shared_ptr和weak_ptr

遇到coredump要怎么调试 [[^cd]]

内存检查工具的了解

* 模板的用法与适用场景:模板的四大场景
  1. 数据类型与算法相分离的泛型编程
  2. 类型适配Traits
  3. 函数转发
  4. 元编程

* 迭代器失效
  
* 成员初始化列表的概念，为什么用成员初始化列表会快一些（性能优势）？[[^il], [^ilo]]：用初始化列表会快一些的原因是，对于类型，它少了一次调用构造函数的过程，而在函数体中赋值则会多一次调用。而对于内置数据类型则没有差别。
  * 但如果有些成员是类，那么在进入构造函数之前，会先调用一次默认构造函数，进入构造函数后所做的事其实是一次赋值操作(对象已存在)，所以如果是在构造函数体内进行赋值的话，等于是一次默认构造加一次赋值，而初始化列表只做一次赋值操作。


用过C++ 11吗，知道C++ 11哪些新特性？

* C++的调用惯例（简单一点C++函数调用的压栈过程）[[^fc],[^fcr]]

* C++的四种强制转换
  * static_cast:在c++ primer 中说道：c++ 的任何的隐式转换都是使用 static_cast 来实现。用于类层次结构中基类（父类）和派生类（子类）之间指针或引用的转换。
  * dynamic_cast: 有类型检查，子类到父类，父类到子类（这个不行，会有null指针）
  * const_cast：1、常量指针被转化成非常量的指针，并且仍然指向原来的对象；2、常量引用被转换成非常量的引用，并且仍然指向原来的对象；3、const_cast一般用于修改指针。如const char *p形式。
  * reinterpret_cast：制类型转换符用来处理无关类型转换的，通常为操作数的位模式提供较低层次的重新解释

* C++中将临时变量作为返回值的时候的处理过程（栈上的内存分配、拷贝过程）:
  * C语言里规定：16bit程序中，返回值保存在ax寄存器中，32bit程序中，返回值保持在eax寄存器中，如果是64bit返回值，edx寄存器保存高32bit，eax寄存器保存低32bit。
  * 一个指向局部变量的指针作为函数的返回值是有问题的。由于指针指向局部变量，因此在函数返回时，临时变量被销毁，指针指向一块无意义的地址空间，所以一般不会有返回值。
  * 如果得到正常的值，只能是幸运的，因为退出函数的时候，系统只是修改了栈顶的指针，并没有清内存；所以，是有可能正常访问到局部变量的内存的。但因为栈是系统自动管理的，所以该内存可能会可以被分配给其他函数，这样，该内存的内容就会被覆盖，不再是原来的值了

C++的异常处理

* volatile关键字[[^vol]]:volatile 关键字是一种类型修饰符，用它声明的类型变量表示可以被某些编译器未知的因素更改，比如：操作系统、硬件或者其它线程等。遇到这个关键字声明的变量，编译器对访问该变量的代码就不再进行优化，从而可以提供对特殊地址的稳定访问。声明时语法：int volatile vInt; 当要求使用 volatile 声明的变量的值的时候，系统总是重新从它所在的内存读取数据，即使它前面的指令刚刚从该处读取过数据。而且读取的数据立刻被保存。

* 优化程序的几种方法:
  * 掌握常用的高效的数据结构和算法。 至少要熟悉模板的使用。
  * 消除循环的低效率， 尽量减少循环次数。 尽量不要在循环里 循环计算一些不会改变的值。
  * 消除不必要的存储器引用。 尽量使用临时变量来暂存要多次使用的引用值，避免寻址开销。
  * 防止寄存器溢出。 临时变量也并不是越多越好， 因为寄存器总是有限的，如果需要同时使用的临时变量数超过了可用的寄存器数量，编译器会把临时值存放到栈中。 一旦出现这种情况， 性能会急剧下降。（x86-64代码能够同时累积最多 12 个值， 而不会溢出任何寄存器。）
  * 循环展开。 通俗的说就是利用分治的策略来减小循环的迭代次数。
  * 提高并行性。 大多数情况下，程序的代码都不是按部就班的一步一步从上往下执行的， 它会适当的并行一些不相依赖的代码行。 所以尽量编写不相依赖的代码， 能够提高运行效率。
  * 编写利于分支预测的代码。 在 CPU 执行分支时， 会预测程序朝哪一个分支方向执行。 如果预测错误会被罚时。处理方法一般是
    1.  编写能被预测的分支。
    2.  书写条件传送实现的代码， 不依赖分支预测。
  * 利用存储器结构体系 ：由于存储器山的存储器结构，利用了 时间局部性 和 空间局部性 的代码， 能极大的提高缓存命中， 从而使程序执行的更快。
  * 多线程编程： 适当的应用多线程， 特别是多CPU的情况下， 程序的性能666的飞起。
  * 多线程 + 线程池： 多线程的进阶版本。

* public，protected和private访问权限和继承[[^cl]]

* class和struct的区别:
  1. 默认的继承访问权。class默认的是private,strcut默认的是public。
  2. 默认访问权限：struct作为数据结构的实现体，它默认的数据访问控制是public的，而class作为对象的实现体，它默认的成员变量访问控制是private的。
  3. “class”这个关键字还用于定义模板参数，就像“typename”。但关建字“struct”不用于定义模板参数
  4. class和struct在使用大括号{ }上的区别：关于使用大括号初始化
     1. class和struct如果定义了构造函数的话，都不能用大括号进行初始化
     2. 如果没有定义构造函数，struct可以用大括号初始化。
     3. 如果没有定义构造函数，且所有成员变量全是public的话，class可以用大括号初始化

* decltype()和auto：
  * 当表达式的类型为引用时，auto 和 decltype 的推导规则也不一样；decltype 会保留引用类型，而 auto 会抛弃引用类型，直接推导出它的原始类型。
  * 在推导变量类型时，auto 和 decltype 对 cv 限制符的处理是不一样的。decltype 会保留 cv 限定符，而 auto 有可能会去掉 cv 限定符。

* inline和宏定义的区别:
  1. 内联函数在编译时展开，而宏在预编译时展开
  2. 在编译的时候，内联函数直接被嵌入到目标代码中去，而宏只是一个简单的文本替换。
  3. 内联函数可以进行诸如类型安全检查、语句是否正确等编译功能，宏不具有这样的功能。
  4. 宏不是函数，而inline是函数
  5. 宏在定义时要小心处理宏参数，一般用括号括起来，否则容易出现二义性。而内联函数不会出现二义性。
  6. 同其它函数不同的是，最好将inline函数定义在头文件，而不仅仅是声明，因为编译器在处理inline函数时，需要在调用点内联展开该函数，所以仅需要函数声明是不够的。

* C++和C的类型安全[[^cs]]:
  * C只在局部上下文中表现出类型安全，比如试图从一种结构体的指针转换成另一种结构体的指针时，编译器将会报告错误，除非使用显式类型转换（malloc函数的返回值）
  * C++提供了一些新的机制保障类型安全：
    1. 操作符new返回的指针类型严格与对象匹配，而不是void*；
    2. C中很多以void*为参数的函数可以改写为C++模板函数，而模板是支持类型检查的；
    3. 引入const关键字代替#define constants，它是有类型、有作用域的，而#define constants只是简单的文本替换；
    4. 一些#define宏可被改写为inline函数，结合函数的重载，可在类型安全的前提下支持多种类型，当然改写为模板也能保证类型安全；
    5. C++提供了dynamic_cast关键字，使得转换过程更加安全，因为dynamic_cast比static_cast涉及更多具体的类型检查。



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

[^19]: [https://www.cnblogs.com/sylar5/p/11523992.html](https://www.cnblogs.com/sylar5/p/11523992.html#:~:text=%E6%89%80%E4%BB%A5%EF%BC%8C%E8%99%9A%E5%87%BD%E6%95%B0%E5%A7%8B%E7%BB%88%E4%BB%85%E4%BB%85,%E6%9C%AC%E6%9D%A5%E6%83%B3%E8%A6%81%E7%9A%84%E6%95%88%E6%9E%9C%E3%80%82&text=%E5%8A%A8%E6%80%81%E8%81%94%E7%BC%96-,%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E5%92%8C%E6%9E%90%E6%9E%84%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E8%99%9A%E5%87%BD%E6%95%B0%E6%97%B6,%E8%87%AA%E8%BA%AB%E7%B1%BB%E5%9E%8B%E5%AE%9A%E4%B9%89%E7%9A%84%E7%89%88%E6%9C%AC%E3%80%82)

[^ds]: [https://zhuanlan.zhihu.com/p/71718231](https://zhuanlan.zhihu.com/p/71718231)

[^dsb]: [http://c.biancheng.net/view/1560.html](http://c.biancheng.net/view/1560.html)

[^db]: [https://blog.csdn.net/shichao1470/article/details/89893508#_2](https://blog.csdn.net/shichao1470/article/details/89893508#_2)

[^zc]: [https://blog.51cto.com/u_15127614/3384462](https://blog.51cto.com/u_15127614/3384462)

[^ci]: [https://blog.csdn.net/zzwdkxx/article/details/53409803](https://blog.csdn.net/zzwdkxx/article/details/53409803)

[^hw]: [https://blog.csdn.net/xp178171640/article/details/102674428](https://blog.csdn.net/xp178171640/article/details/102674428)

[^cd]: [https://www.cnblogs.com/ggjucheng/archive/2011/12/20/2294300.html](https://www.cnblogs.com/ggjucheng/archive/2011/12/20/2294300.html)

[^ilo]: [https://stackoverflow.com/a/13214310/8100655](https://stackoverflow.com/a/13214310/8100655)

[^il]: [https://en.cppreference.com/w/cpp/language/constructor](https://en.cppreference.com/w/cpp/language/constructor)

[^fc]: [https://www.cnblogs.com/sddai/p/9762968.html](https://www.cnblogs.com/sddai/p/9762968.html)

[^fcr]: [https://blog.csdn.net/bajianxiaofendui/article/details/103056825](https://blog.csdn.net/bajianxiaofendui/article/details/103056825)

[^vol]: [https://www.runoob.com/w3cnote/c-volatile-keyword.html](https://www.runoob.com/w3cnote/c-volatile-keyword.html)

[^cl]: [https://zhuanlan.zhihu.com/p/348311978](https://zhuanlan.zhihu.com/p/348311978)

[^cs]: [https://blog.csdn.net/a3192048/article/details/82499164](https://blog.csdn.net/a3192048/article/details/82499164)