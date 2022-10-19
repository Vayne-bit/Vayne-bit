# JavaScript基础

## 基础内容

### 主流浏览器以及内核

|  浏览器  | 内核 |
|:-------:|:-------: |
|   IE  |   trident  |
|   Chrome  |   blink  |
|   Firefox  |   Gecko  |
|   Opera  |   presto  |
|   Safari  |   webkit  |

- 注：IE浏览器已经退役，目前Windows自带浏览器为Edge 内核为Chrome内核

### 引入JS代码的方式

- 内部引入方式

```html
<script type="text/javascript">

</stript>
```

- 外部引入方式

```html
<script type="text/javascript"  src=""></script>
<!-- src内写js文件地址 -->
```

- **为符合W3C标准中的一条：结构(HTML)、行为(JavaScript)、样式(CSS)相分离，所以通常会使用外部引入方式**

### 变量

- 变量声明步骤：声明 => 赋值 => 使用

```javascript
var a = 10;
console.log(a);
```

- **变量的命名规则**
  1. 变量必须以英文字母、_  、$开头
  2. 变量名可以包括英文字母、_  、$、数字
  3. 不可以用系统的关键字、保留字作为变量名

### JS数据类型

- **基本数据类型**
  + Number、String、Boolean、undefined、null
- **引用数据类型** 
  + Object、Array、Function

### 运算符

#### 基础运算符

  - \+
    + 可用于数学运算或者字符串拼接
    + 任何数据类型加字符串都等于字符串
  - -、*、/、%、=、()
  - ++、--、+=、-=、/=、%=、!=

#### 运算符优先级问题

|  <div style="width:50px">优先级</div>   | 运算符 | 简述   | <div style="width:65px">结合性</div> |
| :-----:   |:----- | :----- | :-----: |
|  1   | []、.、() | 字段访问、数组索引、函数调用、表达式分组   | 从左到右 |
|  2   | ++、--、!、delete、new、typeof、void |  一元运算符、返回数据类型、对象创建、未定义的值   | 从右到左 |
|  3   | *、/、% | 相乘、相除、取余   | 从左到右 |
|  4   | +、- | 加、减、拼接字符串   | 从左到右 |
|  5   | <<、>>、>>> | 左位移、右位移、无符号右位移   | 从左到右 |
|  6   | <、<=、>、>=、instanceof | 小于、小于等于、大于、大于等于、是否为特定类的实例对象   | 从左到右 |
|  7   | ==、!=、===、!== | 相等、不相等、全等、不全等   | 从左到右 |
|  8   | & | 按位与   | 从左到右 |
|  9   | ^ | 按位异或   | 从左到右 |
|  10   | | | 按位或   | 从左到右 |
|  11   | && | 逻辑与（短路与）   | 从左到右 |
|  12   | || | 逻辑或（短路或）   | 从左到右 |
|  13   | ?: | 条件运算符(三元运算符)   | 从右到左 |
|  14   | =、+=、-=、/=、%=、!=、*=、&=、|=、^=、<、<=、>、>=  | 混合赋值运算符 | 从右到左 |
|  15  | , | 多个运算  | 按优先级计算，然后从右向左 |

#### 逻辑运算符

- &&：有假返回
- ||：有真返回
- ! ：先转为布尔值然后取反

- 以下六个值都为False
  + undefined
  + null
  + NaN
  + ""
  + 0
  + false

#### 三目（三元）运算符（条件运算符）

```javascript
// 判定条件 ? 条件正确 : 条件错误
var num = 1 > 0 ? true : false
// num == true
```

### 循环语句

#### if循环

```javascript
if（bool表达式1）{
  console.log("如果bool表达式为true则执行")
}
else if（bool表达式2）{
  console.log("如果bool表达式1为false，则执行表达式2，如果为true执行else if")
}
else{
  console.log("如果表达式1和2都为false则执行else")
}
```

#### for循环

```javascript
// 打印 0-10
for(var i = 0; i <= 10; i++) {
  console.log(i);
}
```
#### while循环

```javascript
// 1-100 逢7过
var a = 1;
while(a <= 100) {
  if(a % 7 === 0 || a % 10 === 7) {
    console.log(a);
  }
  a++
}
```

#### 跳出循环语句

- break：用于跳出循环，或者终止这层循环语句
- continue：终止本次循环，立马进入下次循环

### 条件判断语句

#### switch case语句

- case后面可以跟任何类型的数据
- 如果case后不写break则会执行从正确的case到后面的所有语句

```javascript
// 例
var n = window.prompt('请输入周几');
switch(n){
  case "周一":
  case "周二":
  case "周三":
  case "周四":
  case "周五":
    console.log("工作！");
    break;
  case "周六":
  case "周日":
    console.log("休息");
    break;
}
```

### typeof

#### typeof

- 可以判断该数据的类型 例：
```javascript
var a = "123";
console.log(typeof(a)); // string
```

- typeof有六种基本数据类型
  + 分别是：number，string，boolean，object，undefined，function
- null对应的类型是object， 数组对应的类型也是object
- NaN返回的是 number
- typeof一个未定义的值 不会报错 会返回undefined

```javascript
typeof(typeof(a)); // string
// a 未定义，里面的结果是undefined
// 外层typeof判断里面的值结果为string
// 由此可知,typeof转化后的值类型为string
```

### 类型转换

#### 1.显式类型转换
- Number()
  + 把括号里的数据转化为number类型的数据
  + 括号里可以为字符串，true，false
  + 如果括号里为undefined和字符串里写英文字母和中文 则会打印NaN
  + true转化为number类型的值为：1；false为：0；null为：0；
- parseInt(string,radix)
  + 如果括号里只有第一个数，则把这个数转化为整形的数字类型
  + 如果有第二个数，radix表示 以radix为基底把这个数以十进制输出
  + 例如：parseInt("a",16)；就表示把a以十六进制转化，然后10进制输出
  + 结果就为：11；radix的取值范围是：2-36；
  + 括号里true、false、null、undefined的值都为NaN；
  + 例：parseInt("123.9abc")；打印的结果为：数字类型：123；
  + 他会从头检索，直到发现非数字的停止检索，输出前面抛弃后面
- parseFloat()
  + 把括号里的数据转化为浮点类型的数据
  + 括号里true、false、null、undefined的值都为NaN；
  + 例：parseFloat("123.9.3abc")；打印结果：数字类型：123.9；
  + 他从头检索，直到发现除一个小数点外的非数字停止检索，输出前面
- toString()
  + 使用方法：var num； num.toString()；
  + 可以num转换为字符串类型
  + 如果num的值为null或undefined则会报错
  + 第二种使用方法：var num=9; num.toString(2);num.toString(radix)
  + 表示把9（十进制）转换为二进制的数；
  + radix表示进制的基底取值范围为 2-36
- String()
  + 把括号里的数据转化为string类型的数据
  + 无论里面写什么都会被转化为string的数据
  + 例：String(true)；打印结果：string：true
- Boolean()
  + 把括号里的数据转化为boolean类型的数据
  + undefined、null、NaN、" "、0、false；这六个值的结果为false
  + 其余的所有打印结果都为：boolean：true；

#### 2.隐式类型转换

- isNaN()
  + 在括号里输入数据，判断数据是否为NaN 输出true或false
  + 其实在里面进行的是Number()显式类型转换，看转换的是NaN输出true，否则输出false
- ++/--  +/-(正/负)
  + 例：a++；先把a调用Number()显式类型转换，然后再进行++；
  + 如果转化后是NaN则 输出的是Number类型的NaN。--同理
  + +/-  加在数据前面，可以把数据转换为number类型的数据。
  + 如果转化后是NaN则 输出的是Number类型的NaN。-同理
- \+
  + 只要在加号两侧 都会被转成string类型的数据
- \- * / %
  + 把符号两边的数据都转化为number类型
  + 结果的类型为number
- <，>， >= <=
  + 如果符号两遍有一个数字一个字符串，则都转化为number类型进行比较
  + 如果符号两遍都是string类型 则比较ASC码顺序

#### 3.比较特殊的类型转换

```javascript
undefined > 0  // false
undefined < 0  // false
undefined == 0  // false
null > 0  // false
null < 0  // false
null == 0  // false
undefined == null // true
```

- 唯一一个不等于自己的数
```javascript
console.log(NaN == NaN); // false
```

- 不发生类型转换
  + ===
    1. 三个等号代表绝对相等，必须两边一样才能相等（NaN除外）
    2. 它的左右两遍不会产生隐式类型转换，例：1 === "1"（false）
  + !==
    1. 代表绝对不相等，例：1 !== "1"(true);

### 函数

#### 函数的声明

```javascript
function theFirstName(){//声明函数
  console.log("Hello World")//代码块
}
theFirstName(); //调用函数 
//函数名符合小驼峰命名法规则。例：theFirstName
//theFirstName.name=theFirstName
```

#### 函数表达式
```javascript
var demo = function () {
  console.log('hello world')
}
```

#### 参数
```javascript
function sum(a, b) {
  var c = a + b;
  console.log(c)
}
sum(1,2);
```

#### arguments(实参列表)

```javascript
function sum(a){
  //系统会默认创建数组arguments保存实参（实参列表） 可以用for循环来访问其他实参
  for(var i = 0; i < arguments.length; i++){
      console.log(arguments[i]);
  }
  //打印的结果为 1 2 3 
}
sum(1,2,3)
//用 函数名.length 来求形参的个数
//用 arguments.length 求实参的个数
```

#### 返回值

- return 代表终止函数 return 后面的数据为返回值
- 如果函数没有 return一个数据，那么每个函数的默认返回值是undefined
```javascript
function sum(a，b){
  var result = a + b;
  return result;//代表终止函数并且返回result的值
}

var i = sum(1,2);//结果为3
```

### 预编译

#### 递归

- 递归的两个重要思路
  1. **找规律**
  2. **找出口**

```javascript
// 例如：求n的阶乘
//  n! = n * (n-1)!
function mul(n) {
  if(n == 1) {
    return 1
  }
  return n * mul(n-1)
}
```

#### JS的执行过程

1. 语法分析（通篇扫描代码，寻找低级错误（例如语法错误））
2. 预编译
3. 解释执行（解释一行，执行一行）

#### 预编译的两条规则

- 函数声明整体提升
```javascript
// 因为预编译 会把函数整体默认放在最前面 所以这个test可以访问到
test();//控制台打印结果为 123
function test(){
  console.log(123);
}
```

- 变量声明提升
```javascript
// 预编译会把变量的声明提升 所以打印出来的结果为 undefined
console.log(a);//结果为 Undefined
var a = 123;
```

#### 预编译过程

- window就是全局的一个域
1. imply global 暗示全局变量：即任何变量，如果变量未经声明就赋值，此变量就归全局变量所有。

```javascript
a = 123；
console.log(window.a);//值为123 window代表全局
```

2. 一切声明的**全局变量**，全是window的属性

```javascript
var a = 123;
var b = 223;
console.log(window.a);//123
console.log(window.b);//223
//局部变量 ↓
function test(){
    var ae = gd = 123;
}
test();
/*
控制台 window.ae 结果为 undefined
       window.ge 结果为 123
*/
//因为ae在函数内被声明  是局部变量
//ge 在函数内没有声明 直接赋值 所以是全局变量
```

### 作用域
- [[scope]]:指的就是我们所说的作用域，其中存储了运行期的上下文的集合。
- 作用域链:[[scope]]中所存储的执行期上下文对象的集合，这个集合呈链式链接，我们把这种链式链接叫做作用域链。
- 查找变量：从作用域链的顶端依次向下查找

### 闭包

- 当内部函数被保存到外部的时候，将会生成闭包。闭包会导致原有的作用域链不释放，造成内存泄漏。

```javascript
// 案例
function test() {
	var arr = [];
	for(var i = 0; i < 10; i ++){
		arr[i] = function () {
			document.write(i + " ");
		}
	}
	return arr;
}
var myArr = test() ;
for(var j = 0; j < 10; j++){
	myArr[j]();
}
//打印结果为 10 10 10 10 10 10 10 10 10 10
// 如果要求的是需要打印 0-9 那么就需要立即执行函数
```

#### 立即执行函数

- 针对初始化功能的函数
- 立即执行函数：只能使用一次，以后无法找到，无法使用，使用第一次之后立即释放空间。
- 适用于只需要执行一次，而且占用空间大的函数

```javascript
//要求打印0-9 
//解决方法：用立即执行函数，在for循环内形成10个立即执行函数
function test() {
	var arr = [];
	for(var i = 0; i < 10; i ++){
    (function (j) {
      arr[i] = function () {
          document.write(j + " ");
      }
    } (i))
	}
	return arr;
}
var myArr = test();
for(var j = 0; j < 10; j++){
	myArr[j]();
}
//打印结果为 0 1 2 3 4 5 6 7 8 9
```

### 对象

#### 创建对象

```javascript
var obj = {
  name: 'c',
  sex: 'boy',
  age: 19,
  health: 100,
  drink: function () {
    console.log('i am drink')
    this.health ++ // 使用this可以访问同一个对象的属性
  }
}
```

#### 对象的增删改查

```javascript
// 1、增
// 对象名.属性 = 值 即可添加 
obj.like = "game";
// 2、删
// delete 对象名.属性 即可删除
delete obj.sex;
// 3、改
// 在原有的属性上进行修改即可 对象名.原有属性 = 新值
obj.age = 20;
// 4、查
// 对象名.属性
obj.name //结果为c
// 查询一个未经声明赋值的属性时不会报错 会打印undefined
```

#### 对象的创建方法

```javascript
// 1. 对象字面量
var obj = {}
// 2. 构造函数
  // 系统内置对象
  var obj = new Object()
  // 自定义构造函数
  function Person () {
    this.name = 'c'
    this.age = 18
  }
  var person1 = new Person()
  var person2 = new Person()
// person1 和 person2 不相等，但是都有构造函数Person的属性
```

#### 构造函数的内部原理
1. 在函数体最前面隐式的加上this = {}
2. 执行this.xxx = xxx
3. 隐式的返回this

#### 借用构造函数

- 解决原型中包含引用值带来问题的解决方法

```javascript
function Father () {
    this.color = ['red','pink','skyblue'];
}
function Son () {
    
}
Son.prototype = new Father();

let s1 = new Son();
s1.color.push = 'black';
console.log(s1.color);
//["red", "pink", "skyblue", "black"]
let s2 = new Son();
console.log(s2.color);
//["red", "pink", "skyblue", "black"]

//借用构造函数
function Father () {
    this.colors = ['red','pink','skyblue'];
}

function Son () {
    Father.call(this);
}

let s1 = new Son();
s1.colors.push('black');
console.log(s1.colors);
// ["red", "pink", "skyblue", "black"]

let s2 = new Son();
console.log(s2.colors);
//["red", "pink", "skyblue"]
```

### 原型&原型链

参考链接：[知乎](https://zhuanlan.zhihu.com/p/35790971)

1. 原型的定义：原型是function对象的一个属性，他定义了构造函数制造出的对象的公共祖先。通过该构造函数产生的对象，可以继承该原型的属性和方法。原型也是对象。

- 构造函数名.prototype 就是原型 可以往原型后面加属性和方法
- 之后构造函数产生的对象，可以继承原型的方法和属性

2. 利用原型的特点，可以提取共有属性

```javascript
// 有相同属性的话可以属性给 prototype 
// prototype加属性也可以这样
/** 构造函数名.prototype = {
    name : "c";
    sex : "boy";
} */
// 这种写法如果在添加值的时候用的话就会产生和原有的prototype不一样的问题
// 简而言之，对象方式赋值的话，在创建新对象之后赋值，就没有作用
// 但是用Person.prototype.name = "sunny"; 赋值 就一直有作用,因为修改的是原型链
// 原因是因为 new Person出来的实例指向的是 proto 指向的是Person
/** Person.prototype = {} 这样赋值 会改Person 的prototype的指向
 *  但是已经实例出来的对象的 __proto__指向没有发生变化
 * */ 
// eg：
Person.prototype.name = "sunny";
function Person() {
    //var this = {__proto__ : Person.prototype}
}
var person = new Person();
Person.prototype = {
  name : "cherry";
}
//打印person.name 结果为 "sunny";
```

3. prototype 和 \_\_proto\_\_

- **每个对象都有一个__proto__属性，并且指向他的prototype原型对象**
- **每个构造函数都有一个prototype原型对象**
  + **prototype原型对象里的constructor指向构造函数本身**
  + **constructor属性是系统定义的，但是可以被更改**

#### 原型链

1. 定义：当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

```javascript
var arr = [1,2,3]
arr.valueOf() // [1,2,3]
```

2. 以上代码查找valueOf大致流程
  - 当前实例对象obj，查找obj的属性和方法，找到后返回
  - 没有找到，通过obj.\_\_proto\_\_，找到obj的构造函数的prototype并且查找上面的属性和方法，找到后返回。
  - 没有找到的话，把 Array.prototype 当做obj，重复以下步骤
  - 如果一直找不到的情况下，会查找到原型链的终点，最后查找到Object.prototype时
Object.prototype.\_\_proto\_\_ === null，意味着查找结束

### 继承

- 继承是指对一个对象直接使用另外一个对象的属性和方法

#### 继承属性

```javascript
// 创建一个Person类
function Person (name, age) {
  this.name = name
  this.age = age
}

// 方法定义在构造函数的原型上
Person.prototype.getName = function () {
  console.log(this.name)
}
```

- 添加一个新类，student，继承Person的所有属性并拥有新的属性grade

```javascript
function Student (name, age, grade) {
  Person.call(this, name, age),
  this.grade = grade
}

// 属性的继承是通过在一个类内执行另一个类的构造函数，通过 call 指定this 为当前执行
// 环境，这样就可以实现继承另一个构造函数的所有属性。
```

#### 继承方法

- 方法都定义在prototype里面，那其实我们只需要把Person.prototype的备份赋值给Student.prototype即可

```javascript
Student.prototype = Object.create(Person.prototype)
// Object.create()就是新建一个对象，使用现有的对象赋值给新建对象的__proto__

// 如果直接赋值 也就是 Student.prototype = Person.prototype
// 也是可以达成继承方法的目的，但是他们两个就会变成引用关系，也就是说如果要修改了
// Student.prototype，同时也会修改Person.prototype
```

- **在给Teacher类添加方法时，应该在修改prototype以后，否则会被覆盖掉，原因是赋值前后的属性值是不同的对象。**

- **构造函数的prototype里有一个constructor属性，他会指向构造函数本身，但是因为是继承了Person构造函数，所以Student的constructor属性指向的是Person构造函数。**

- **为了避免出现指向紊乱的情况，所以需要修正一下Student的constructor指向**

> Student.prototype.constructor = Student

- **继承方法只需要两步**

```javascript
Son.prototype = Object.create(Father.prototype)
Son.prototype.constructor = Son
```

#### hasOwnProperty

- 当访问一个不存在的属性时候，js会遍历整个原型链，对性能会有所损耗，所以js提出了`hasOwnProperty()`方法作为解决方案，

- hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

- **注：即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。**

### call&apply 

- 两者的作用：改变this的指向

```javascript 
//借用别人的方法实现自己的功能
function Person(name,age){
    this.name = name;
    this.age = age;
}
var person = new Person('s',10);
var obj = {
    
}
Person.call(obj , 'c' , 100);//用call方法时 
// 调用Person的方法 实现obj的功能
// 第一位是表面this的指向，之后是实参
// 打印obj的结果为 name：c  age ：100;
```

- 两者的区别

```javascript
// call  对象后面 需要把实参按照形参的个数传进去
Person.call(obj , 'c' , 100)
// apply 对象后面 需要传一个arguments（数组/实参列表）
Person.apply(obj , ['c' , 100])
```

### 实现简易的链式调用

```javascript
var obj = {
  eat : function () {
      console.log("i am eating");
      return  this;//对象里的this指的是第一人称的我，在这也就是obj
  },
  drink : function () {
      console.log("i am dringking");
      return  this;
  },
  sleep : function () {
      console.log("i am sleeping")
      return  this;
  },
}
obj.eat().drink().sleep();
//这样可以是因为 在执行完后 会返回this 然后继续执行
```

### 属性的表示方法

1. `obj.name` 常用的表示方法，在使用时会隐式的使用第二种方法来访问属性
2. `obj['name']`  两种方法基本上一样，但是第二种更灵活，[]内必须是字符串形式

```javascript
//想要实现输入几就输出第几个人的名字， 就用第二种 然后字符串拼接
var callName = {
  name1 : {name: "aaa"},
  name2 : {name: "bbb"},
  name3 : {name: "ccc"},
  callName : function (num) {
      return this["name" + num];
  }
}
console.log(callName.sayName(1));//aaa
console.log(callName.sayName(2));//bbb
console.log(callName.sayName(3));//ccc
```

### 对象的枚举

- for...in

```javascript
var obj = {
  name = "aa",
  age = 123,
  sex = "male",
  height = 180
}
for(var key in obj){
    console.log(key);//这个可以查看对象内都有什么属性 都是string类型
    console.log(obj[key]);//这个可以查看对象所有属性的值
    //这里的[ ] 不用加 "" 的原因是因为要把key 当成一个变量来看
    //如果加了"" 则会打印出等于属性个数的 undefined
    //for in 会将里面的属性每个都查看一遍 把key当成变量 属性时string类型
    //所以可以直接打印出值
}
```

- hasOwnProperty

```javascript
//每个对象都有一个这样的方法 来判断这个属性是自身的属性还是原型的属性
//如果手动改变 __proto__ 的属性则在枚举时会打印出来
//解决方法：
var obj = {
    name = "aa",
    age = 123,
    sex = "male",
    height = 180
    __proto__ = {
        lastName : "cccc";
    }
}
for(var key in obj){
  if(obj.hasOwnProperty(key)){//这个方法需要传进去参数 参数就是string类型的属性
      //这个方法打印出来的是一个bool值 则需要用if来判断 
      //如果是自己属性就是true就会打印出来 如果不是就不会打印
      console.log(obj[key]);
  }
}
```

- in

```javascript
//查看这个属性是不是属于这个对象  使用方法:
console.log("age" in obj);//true
console.log("lastName" in obj); //true
//in 不管是自己的对象还是自己原型的对象 都会返回true
```

- instanceof

```javascript
// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
function Person () {   
}
var person = new Person();
console.log(person instanceof Person);//true
//A instanceof B (理论上:看 A对象 是不是 B构造函数构造函数造出来的)
//实际上：看 A对象的原型链上 有没有 B的原型   例如下面的
console.log(person instanceof Object);//true
console.log([] instanceof Object);//true
//区别object和 array
//1.constructor
var obj = {};
console.log([].constructor);//Array
console.log(obj.constructor);//Object
//2.instanceof
console.log([] instanceof Array);//true
console.log(obj instanceof Array);//false
//3.call toString
console.log(Object.prototype.toString.call([]));//"object Aarry"
console.log(Object.prototype.toString.call(obj));//"object Object"
//在这个里面本来this指向的是prototype前面的对象
//然后使用call改变了this的指向 改变到了括号内的数据
```

### this

1. **函数预编译的过程中：this => window**
2. **全局作用域：this => window**
3. **call/apply可以改变this的指向**
4. **obj.a(); a函数里面的this指向obj**

```javascript
var name = "222";
var a = {
  name : "111",
  say : function () {
    console.log(this.name);
  }
}
var fun = a.say;
fun();//222
a.say();//111

var b ={
  name : "333",
  say : function (fun) {
    fun();//这个fun是形参传入的实参是 a.say这个函数体，
    //由于没有人调用 走预编译 所以this指向的是全局
  }
}
b.say(a.say);//222
b.say = a.say;
b.say();//333
```

### 克隆

- 指的是把一个对象里的所有属性都克隆到另一个对象中，且两者没有引用关系。

- 思路
  1. 遍历对象 for...in 循环取出来所有属性
  2. typeof 判断是不是原始值(判断类型)
  3. 判断引用值是数组还是对象 最好选择toString()判断
  4. 建立相应的数组或者对象
  5. 递归

```javascript
obj = {
    name : "abb",
    sex : "male",
    card : ['visa', 'master'],
    eat : {
    	food : "cc",
    	drink : {
    		water : 'bb'
    	}
    }
}
obj1 = {

}
function deepClone(origin, target){
  var target = target || {}, //如果有target就用前面的 如果没有就新建一个空对象
      toStr = Object.prototype.toString,
      arrStr = "[object Array]";
  for (var prop in origin) {
    if(origin.hasOwnProperty(prop)){//为了防止调用原型上的属性
      //让属性绝对不等于空  值是引用值
      if(origin[prop]	!== "null" &&  typeof(origin[prop]) == 'object'){
        if(toStr.call(origin[prop]) == arrStr){
          target[prop] = [];
        }
        else{
          target[prop] = {};
        }
        deepClone(origin[prop], target[prop]);
        //用到递归 如果对象或数组内还有对象或数组的话 就继续来
      }
      else{
        target[prop] = origin[prop];//如果是原始值 则直接赋值 
      }
    }
  }
  return target;
}
```

### 数组

- 定义数组的方法

```javascript
//1. 构造器方法 new Array(length/content)
var arr = new Array(1,2,3);
var arr = new Array(10) // 这种方法如果只传一位参数的话，会将他识别为长度
console.log(arr) // [empty x 10];

new Array(4).toString(); // 结果：' , , , '
/**new Array(4) 执行的结果是empty x 4 转化为字符串就是 ' , , , ' */

// 2. 数组字面量
var arr = [1,2,3]
```

- 数组的读写和length

```javascript
var arr = []
console.log(arr[5]) // 不可以溢出读 不会报错，但值为 undefined
arr[10] = '555' // 可以溢出写，没有第11位的数组会扩展到11位，之前的位数的值都为undefined

/** length是每个数组的属性，他会返回一个数组中的元素个数 */
var arr = [1, 2, 3]
console.log(arr.length) // 3
```

#### 常用的方法

- 会改变原数组的

```javascript
// 1. arr.push() 在数组的最后一位添加数据
var arr = []
arr.push(1,2,3) // 可以push多位，arr = [1,2,3]

// 以下演示方法 arr默认 = [1, 2, 3]
// 2. arr.pop() 把数组的最后一位剪切出来
var a = arr.pop() // a = 3  arr = [1, 2]

// 3. arr.shift() 把数组的第一位剪切出来
var a = arr.shift() // a = 1 arr = [2, 3]

// 4. arr.unshift() 在数组的第一位添加数据
arr.unshift(-1, 0) // 不限制添加位数， arr = [-1, 0, 1, 2, 3]

// 5. arr.reverse() 让原数组发生逆转，不会产生新数组
arr.reverse() // arr = [3, 2, 1]

// 6. arr.splice(从第几位开始，截取多少位的长度，在切口处添加的新数据) 三个参数
// 最后一个参数可以不写，最后一个参数可以添加多位 
var arr = [1,2,3,4,5]
var arr2 = arr.splice(0, 4) // arr = [5]  arr2 = [1,2,3,4]
arr.splice(1,0,6,7) // arr = [5,6,7]

// 7. arr.sort() 排序方法，括号内可以定义一个函数来排序，如果不定义，默认比较ASCII码
// 括号内定义个函数规则
// 1). 必须有两个参数
// 2). 看返回值
//    -返回值为负数时 (a-b) 从小到大，正序
//    -返回值为正数时 (b-a) 从大到小，倒序
//    -返回值为0 不排序
//升序
var arr = [5,1,3,2,8,10];
arr.sort(function (a, b){
  if(a > b){
      return 1;
  }
  else{
      return -1;
  }
  //也可以简化为 return a - b;
}) // arr = [1, 2, 3, 5, 8, 10]
```

- 不能改变原数组

```javascript
//concat, join <==> split, toString, slice
//arr.concat(arr1); 把后面的数组拼接到前面的数组 产生一个新的数组 不会影响原数组
var arr = [1,2,3,4,5],
    arr1 = [6,7,8];
let arr3 = arr.concat(arr1);// arr3 = [1,2,3,4,5,6,7,8];
//arr.toString (); 把数组内的东西变为字符串
arr.toString(); "1,2,3,4,5"
//arr.slice() 截取数组 但不影响原数组
//没有参数 arr.slice()  会把整个数组截取下来
//一个参数 arr.slice(从该位开始截取到最后)
//两个参数 arr.slice(从该位开始截取，截取到该位)
var a = arr.slice(1,3);
console.log(a);//[2,3];

//join <==> split 两个互逆的方法
//join 是让数组用这个东西连接为字符串 arr.join("")括号内规定是字符串
//split是让字符串按这个东西拆分为数组
var arr = [1,2,3,4,5];
var str = arr.join("-");//"1-2-3-4-5"
str.split("-");//["1","2","3","4","5"]
```

- 常用的循环方法(包含ES6新增)

```javascript
// 1. arr.forEach((ele, index, array) => {}) 对数组的每个元素都执行一次给定的函数
// forEach 不会更改原数组  返回值为undefined
/** 循环方法的参数大多都是这三个
 * ele: 数组正在处理的元素
 * index: 数组正在处理的元素的下标
 * array: forEach 方法正在处理的数组（原数组）
 */
var arr = [1,2,3]
arr.forEach(ele => {
  ele = ele * 3 
  console.log(ele)// 三次打印 3 6 9
})
// arr = [1,2,3] // 原数组不会改变
// 但是如果元素组的元素是引用数据类型，那么就会发生改变
var arr = [{num: 1},{num: 2},{num: 3}]
arr.forEach(ele => {
  ele.num = ele.num * 3
  console.log(ele.num) // 三次打印 3 6 9
})
// arr = [{num: 3},{num: 6},{num: 9}]
// 引用数据类型发生了改变 因为只是改了引用数据类型里面的属性，并没有改动内存地址
// 注： 除了抛出异常以外，没有办法中止或跳出 forEach() 循环。如果你需要中止或跳出循环，请使用其他循环方法


// 2. arr.filter((ele,index,array) => {]})
// filter()方法，会返回通过所提供函数的测试的所有数组元素
// filter() 不会改变原数组。
// 一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
var arr = ['aaa', 'bb', 'ccc', 'ddddd', 'eeee']
var result = arr.filter(i => i.length >= 4)
console.log(result) // ['ddddd', 'eeee']


// 3. arr.map((ele, index, array) => {})
/** map()方法创建一个新数组，这个数组由提供执行函数的返回值组成
 * 返回值：一个新数组，每个元素都是回调函数的返回值
 * map不更改他的原数组本身
 */
var arr = [1,2,3]
var map1 = arr.map(ele => ele * 3)
console.log(map1) // [3,6,9]


// 4. arr.reduce((previousValue, currentValue, index, array) => {}, initialValue)
/** 回调函数参数： previousValue：上一次回调函数的返回值 第一次调用时 若指定了初始值
 * initialValue,则值为initialValue,否则为数组的第0位 arr[0]
 * 
 * currentValue: 数组正在处理的元素，在第一次调用时，若指定了初始值initialValue，
 * 则值为 arr[0]，否则为 arr[1]
 * 
 * index: 数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，
 * 否则从索引 1 起始。
 * 
 * array: 用于遍历的数组
 * 
 * reduce的参数(可选参数)：initialValue 用来指定第一次调用时的值
 * 
 * reduce用于遍历数组元素，每一步都将当前元素的值与上一步的计算结果相加
 * （上一步的计算结果是当前元素之前所有元素的总和）——直到没有更多的元素被相加。
 * 返回值：使用“reducer”回调函数遍历整个数组后的结果。
 *  
 */
var arr = [1,2,3,4]
var initialValue = 1;
var sum = arr.reduce((previousValue, currentValue) => {
  return previousValue + currentValue
}, initialValue)
console.log(sum) // 11
/** 指定了初始值initialValue = 1  
 * 所以顺序是 1(previousValue = initialValue) + 1(arr[0]) + 2 + 3 + 4
*/
var arr = [1,2,3,4]
var sum = arr.reduce((previousValue, currentValue) => {
  return previousValue + currentValue
})
console.log(sum) // 10
/** 没有指定了初始值initialValue
 * 所以顺序是 1(previousValue = arr[0]) + 2(arr[1]) + 3 + 4
*/


// 5. arr.every((ele, index, array) => {})
/** 测试一个数组内的元素是否都能通过回调函数的测试，
 * 如果回调函数每次返回的值都是 true 则 every返回值为 true 否则为 false
 * 注： 如果是一个空数组调用此方法，那么任何情况下都会返回 true
 */
var arr = [1,2,3,4]
var flag = arr.every(ele => ele < 5)
console.log(flag) // true


// 5. arr.some((ele, index, array) => {})
/** 数组中至少有一个元素通过测试就会返回 true 所有元素都没有通过返回值是false
 *  注：空数组调用此方法，任何情况下都返回 false
 */
var arr = [1,2,3]
var flag = arr.some(ele => ele % 2 == 0)
console.log(flag) // true


// 6. arr.find((ele, index, array) => {})
/** 返回数组中满足回调函数的第一个元素的值
 *  数组中第一个满足所提供测试函数的元素的值，如果找不到 返回undefined
 */
var arr = [1,2,3]
var num = arr.find(ele => ele % 2 == 0)
console.log(num) // 2


// 6. arr.findIndex((ele, index, array) => {})
/** 返回数组中满足回调函数的第一个元素的索引
 *  数组中第一个满足所提供测试函数的元素的索引，如果找不到 返回-1
 */
var arr = [1,2,3]
var index = arr.findIndex(ele => ele % 2 == 0)
console.log(index) // 1
```




```javascript

```
