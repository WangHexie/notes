---
layout: post
title: C++ STL 
---

## pair[[^1]]
> Pair is used to combine together two values that may be different in type.

* 初始化需要声明类型` pair<int, int> `。或者使用`make_pari()`函数，就可以使用auto了
* 初始化可以是：(下面没声明类型，没法跑的)
  ```c++ 
  pair  g1;         //default
  pair  g2(1, 'a');  //initialized,  different data type
  pair  g3(1, 10);   //initialized,  same data type
  pair  g4(g3);    //copy of g3
  ```
* `tie(int &, int &) = pair1; `: unpack values, like python, but have to use tie
  * 不能嵌套

* 操作符比较：
  * == ：两个都要比
  * != : 两个都要比
  * <=,>=: 两个都要比
* swap

## tuple
> A tuple is an object that can hold a number of elements. The elements can be of different data types. The elements of tuples are initialized as arguments in order in which they will be accessed.

* get
  ```c++
  // Use of get() to change values of tuple
  get<0>(geek) = 'b';
  get<2>(geek) =  20.5;
  ``` 
* make_tuple
* tuple_size
  ```c++
  tuple <char,int,float> geek(20,'g',17.5);
  // Use of size to find tuple_size of tuple
  cout << tuple_size<decltype(geek)>::value << endl;
  ``` 
* swap
* tie
* tuple_cat
  ```c++
  // Concatenating 2 tuples to return a new tuple
  auto tup3 = tuple_cat(tup1,tup2);
  ``` 

## Vecotr
> Vectors are the same as dynamic arrays with the ability to resize itself automatically when an element is inserted or deleted, with their storage being handled automatically by the container. Vector elements are placed in contiguous storage so that they can be accessed and traversed using iterators. 

* begin:
* end:
  ```c++
  vector<int> myvector{ 1, 2, 3, 4, 5 };
 
  // using end() to print vector
  for (auto it = myvector.begin(); it != myvector.end(); ++it)
      cout << ' ' << *it;
  ``` 
* rbegin: reverse
* rend:
  ```c++
  vector<int> myvector{ 1, 2, 3, 4, 5 };
 
  // using end() to print vector
  for (auto it = myvector.rbegin(); it != myvector.rend(); ++it)
      cout << ' ' << *it;
  ``` 
* cbegin: const, 不能修改vector里面的值
* cend:
  ```c++
  vector<int> myvector{ 1, 2, 3, 4, 5 };
 
  // using end() to print vector
  for (auto it = myvector.cbegin(); it != myvector.cend(); ++it)
      cout << ' ' << *it;
  ``` 
* crbegin: const, reverse
* crend:
  
Capacity

* size() – Returns the number of elements in the vector
* max_size() – Returns the maximum number of elements that the vector can hold.(这个应该是可以申请得到但是没申请的)
* capacity() – Returns the size of the storage space currently allocated to the vector expressed as number of elements.（这个是已经申请的）
* resize(n) – Resizes the container so that it contains ‘n’ elements.
* empty() – Returns whether the container is empty.
* shrink_to_fit() – Reduces the capacity of the container to fit its size and destroys all elements beyond the capacity.
* reserve() – Requests that the vector capacity be at least enough to contain n elements.

Element access:
* reference operator [g] – Returns a reference to the element at position ‘g’ in the vector
* at(g) – Returns a reference to the element at position ‘g’ in the vector
* front() – Returns a reference to the first element in the vector
* back() – Returns a reference to the last element in the vector
* data() – Returns a direct pointer to the memory array used internally by the vector to store its owned elements.
```c++
cout << "\nReference operator [g] : g1[2] = " << g1[2];

cout << "\nat : g1.at(4) = " << g1.at(4);

cout << "\nfront() : g1.front() = " << g1.front();

cout << "\nback() : g1.back() = " << g1.back();

// pointer to the first element
int* pos = g1.data();

cout << "\nThe first element is " << *pos;
return 0;
``` 

Modifiers:
* assign() – It assigns new value to the vector elements by replacing old ones
  ```c++
  vector<int> vect1{1, 2, 3, 4};

  // Declaring another vector
  vector<int> vect2;

  // Copying vector by assign function
  vect2.assign(vect1.begin(), vect1.end());
  ```
* push_back() – It push the elements into a vector from the back
* pop_back() – It is used to pop or remove elements from a vector from the back.
* insert() – It inserts new elements before the element at the specified position
* erase() – It is used to remove elements from a container from the specified position or range.
* swap() – It is used to swap the contents of one vector with another vector of same type. Sizes may differ.
* clear() – It is used to remove all the elements of the vector container
* emplace() – It extends the container by inserting new element at position
* emplace_back() – It is used to insert a new element into the vector container, the new element is added to the end of the vector(比push_back 快一点？不需要构造临时变量？)[[^2]]
  ```c++
  std::vector<std::pair<std::string, std::string> > vec;
  vec.emplace_back(std::string("Hello"), std::string("world"));  
  ```

```c++
vector<int> v;

// fill the array with 10 five times
v.assign(5, 10);

cout << "The vector elements are: ";
for (int i = 0; i < v.size(); i++)
    cout << v[i] << " ";

// inserts 15 to the last position
v.push_back(15);
int n = v.size();
cout << "\nThe last element is: " << v[n - 1];

// removes last element
v.pop_back();

// prints the vector
cout << "\nThe vector elements are: ";
for (int i = 0; i < v.size(); i++)
    cout << v[i] << " ";

// inserts 5 at the beginning
v.insert(v.begin(), 5);

cout << "\nThe first element is: " << v[0];

// removes the first element
v.erase(v.begin());

cout << "\nThe first element is: " << v[0];

// inserts at the beginning
v.emplace(v.begin(), 5);
cout << "\nThe first element is: " << v[0];

// Inserts 20 at the end
v.emplace_back(20);
n = v.size();
cout << "\nThe last element is: " << v[n - 1];

// erases the vector
v.clear();
cout << "\nVector size after erase(): " << v.size();
```


## 参考文献

[^1]: [https://www.geeksforgeeks.org/cpp-stl-tutorial/](https://www.geeksforgeeks.org/cpp-stl-tutorial/)
[^2]: [https://stackoverflow.com/questions/4303513/push-back-vs-emplace-back](https://stackoverflow.com/questions/4303513/push-back-vs-emplace-back)