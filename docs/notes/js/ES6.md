# ES6

## 基础内容

### 变量声明

#### let

1. let 用法与var相似，但是所声明的变量，只在let命令所在的代码块内有效。
2. let 只在块级作用域有效（“{ }”）
3. let 不能重复声明 
4. let 声明的变量不能提升
5. let 可以解决闭包

```JavaScript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
f1()
```

#### const
1. const是一个只读变量，声明之后，常量的值就不能改变
2. const一经声明必须立刻赋值，不然会报错
3. 不存在变量提升

```JavaScript
const FLAG = true 
// const 声明的常量命名一般使用全大写 方便区分
```

## 解构赋值

### 数组的解构赋值

- **ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构**

```JavaScript
let [a, b, c] = [1, 2, 3];
//交换两个变量的值
let a = 10;
let b = 20;
[a , b] = [b , a];
console.log(a , b)//20 10
```

- **只要等号两边的模式相同，左边的变量就会被赋予对应的值。**

```JavaScript
let [ , , third] = ["foo", "bar", "baz"];
console.log(third) // "baz"

let [head, ...tail] = [1, 2, 3, 4];
console.log(head) // 1
console.log(tail) // [2, 3, 4]
```

- 如果解构不成功，变量的值就等于undefined

```JavaScript
let [foo] = [];
console.log(foo);//undefined
```

- 默认值

```JavaScript
//第一步 先看 foo是否等于undefined 
//相当于 let [foo] = []; //foo = undefined
//第二步 如果等于undefined 则取默认值 
//      如果不等于，则等于后面括号内的值
let [foo = true] = [];
foo // true

let [a , b = 1] = [2 , 'undefined'];
console.log(`a = ${a}; b = ${b}`);//a = 2; b = undefined

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

> 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

- 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```JavaScript
function f() {
  console.log('aaa');
}

let [x = f()] = [1];//x = 1
//以上代码 x = 1  并且不会打印 aaa
//没有使用到默认值 所以函数并不会执行
```

### 对象的解构赋值

- **对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。**

```JavaScript
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```

- 对象的解构赋值可以很方便的将对象的方法，赋值到某个变量

```JavaScript
const { log } = console;
log('hello') // hello
```

- 如果**变量名与属性名不一致**，必须写成下面这样。

```JavaScript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
//foo是变量名 baz是属性名
//在匹配过程中 foo是匹配模式，baz是变量
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

- 也就是说，对象的解构赋值的内部机制，**是先找到同名属性**，然后再**赋给对应的变量**。真正被赋值的是后者，而不是前者。

```JavaScript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
//因为foo只是一个匹配模式 所以会报错 没有定义
//上面代码中，foo是匹配的模式，baz才是变量。
//真正被赋值的是变量baz，而不是模式foo
```

- 与数组一样，解构也可以用于嵌套结构的对象。

```JavaScript
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

- 嵌套赋值

```JavaScript
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
//必须带 （） 不然会当成代码块来执行，会报错
obj // {prop:123}
arr // [true]
```

- 默认值

```JavaScript
var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x : 1};
y // 1
```

- 与数组默认值雷同，默认值生效的条件是，对象的属性值严格等于undefined。

```JavaScript
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

- **注意点**

1. 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```JavaScript
let x;
{x} = {x: 1};
// SyntaxError: syntax error
//这种写法报错，因为{}写到行首时 JS会解释为一个代码块
//解决办法：
let x;
({x} = {x: 1});
```
2. 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```JavaScript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

### 字符串的解构赋值

- 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```JavaScript
let [a,b,c,d,e] = 'hello';
console.log(a);//h
console.log(b);//e
console.log(c);//l
console.log(d);//l
console.log(e);//o
```

- 默认值与数组一样

```JavaScript
let [a,b,c,d,e = 'ee'] = 'hell';
console.log(a);//h
console.log(b);//e
console.log(c);//l
console.log(d);//l
console.log(e);//ee
```

- 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```JavaScript
let {length : len} = 'hello';
len // 5
```

### 数组和布尔值的解构赋值

- 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```JavaScript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

- 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

```JavaScript
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 函数参数的解构赋值

```JavaScript
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3
```

- 函数参数的解构的默认值

```JavaScript
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

### 解构赋值的常见用途

1. 交换两个变量的值

```JavaScript
let x = 1;
let y = 2;
[x, y] = [y, x];
```

2. 从函数中返回多个值

```JavaScript
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
a // 1
b // 2
c // 3
// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
foo // 1
bar // 2
```

3. 提取JSON数据

```JavaScript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

## 字符串&Number扩展

### 模板字符串

- 使用反单引号 (\` \`)来拼接字符串，他会保留字符串的空格和换行效果

```javascript
let str = 
`<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>`
```
- 还可以在模板字符串中拼接变量，需要 ${ }来包括起来

```javascript
let a = 1;
console.log(`a::${a}`);//a::1

//${}内可以放入任意的函数表达式，可以进行计算
let x = 1;
let y = 2;
console.log(`x + y = ${x+y}`);// x + y = 3

//${} 也可以调用函数
function fun () {
    return 'hello world';
}
console.log(`f00 ${fun()} bar`);//f00 hello world bar
```

### 字符串新增方法

- 新增方法用来判断一个字符串是否包括在另一个字符串之中

1. includes()：返回布尔值，表示是否找到了参数字符串。
2. startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
3. endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
```javascript
let str = 'hello world!';
s.includes('o') // true
s.startsWith('Hello') // true
s.endsWith('!') // true
```

- 这三个方法都支持第二个参数，表示开始搜索的位置

```javascript
s.includes('Hello', 6) // false
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
//使用第二个参数n时，endsWith的行为与其他两个方法有所不同。
//它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
```

- repeat方法返回一个新的字符串，表示将原字符串重复n次

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

//参数如果是小数 会自动进行取整
'na'.repeat(2.9) // "nana"

//参数如果是负数或者infinity 会报错
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError

//参数是NaN 等同于0
'na'.repeat(NaN) // ""

//参数是字符串 会先转换为数字
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```

- padStart() padEnd() 用于补全字符串

```javascript
padStart()//用于头部补全
padEnd()//用于尾部补全

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
//这两个方法都接收两个参数，第一个参数是需要补全的长度
//第二个参数是用来补全的字符串

//如果不写第二个参数，那么默认以空格填充
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

// 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

- trimStart()，trimEnd()  用来清除头尾的空格

```javascript
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"

//它们都是返回新的字符串，不会修改原始字符串
```

- replaceAll()匹配并修改字符串 ，返回新的字符串

```javascript
let str = 'abba';
let ne = str.replaceAll('b','_');//a__b
//会更换所有匹配到的数据进行更改
```

### Number的扩展

- Number.isInteger(); 判断一个数是不是整数

```javascript
Number.isInteger(25) // true
Number.isInteger(25.1) // false
Number.isInteger(25.0) // true
```

- Math.sign();用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

```javascript
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为 0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN。
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
```

- ** 指数运算符

```javascript
2**2; //4
2 ** 3 ** 2 //512
//运算顺序相当于 2 ** (3 ** 2)
//多个指数运算符连用时，是从最右边开始计算的。
```

## 数组扩展

### 扩展运算符

```javascript
let arr = [1,2,3,4];
function fn () {
    console.log(arguments);
}
fn(arr);//这样输出的是只有一位的数组
fn(...arr);//这样相当于分割数组，输出的是有四位
//相当于这样传参数 fn(1,2,3,4)
```

- 合并数组

```javascript
let one = [1];
let two = [2,3];
let three = [...one, ...two];
console.log(three);//[1,2,3]
```

- 把类数组转化为数组

```javascript
let div = document.getElementsByTagName('div');
let arrDiv = [...div];
console.log(arrDiv);//[div,div,div]
```

### 数组新增方法

- find()找出符合条件的第一个数组成员，如果没有则返回undefined

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

- findIndex()方法返回符合条件的第一个数组成员的位置，如果没有则返回-1

```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

- 数组填充方法fill()

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]/数组中已有的元素，会被全部抹去。
new Array(3).fill(7)
// [7, 7, 7]

//fill方法还可以接受第二个和第三个参数
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
//fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。
```

- **注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。**

```javascript
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```

- includes()方法检查数组中是否有给定的值，可以检查NaN，可以代替indexOf

```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

## 对象的扩展

### 链式判断运算符 ?.

```javascript
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

//?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行。
a?.[++x]
// 等同于
a == null ? undefined : a[++x]
```

### Null 判断运算符 ??

```javascript
const headerText = response.settings ?? 'Hello, world!';
const animationDuration = response.settings ?? 300;
const showSplashScreen = response.settings ?? true;
//上面代码中，默认值只有在左侧属性值为null或undefined时，才会生效。
//如果是|| 来判断的话 那么是false或者0 也会生效
```

- ** 运算符优先级问题

```javascript
//??有一个运算优先级问题，如果多个逻辑运算符一起使用，
//必须用括号表明优先级，否则会报错。
// 报错
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || rhs
//上面四个表达式都会报错，必须加入表明优先级的括号。
(lhs && middle) ?? rhs;
lhs && (middle ?? rhs);

(lhs ?? middle) && rhs;
lhs ?? (middle && rhs);

(lhs || middle) ?? rhs;
lhs || (middle ?? rhs);

(lhs ?? middle) || rhs;
lhs ?? (middle || rhs);
```

### 对象新增方法

- Object.is();用来判断两个值是否相等

```javascript
Object.is('foo', 'foo') // true
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

- Object.assign();方法用于对象的合并，将源对象的所有属性复制到目标对象。第一个参数是目标对象，后面的参数都是源对象

```javascript
let target = {
    name : 'bb',
    age : 7,
}
let age = {
    age : 13,
    eat : () => {
      console.log(this);
    }
}
let sex = {
    sex : 'man',
}

Object.assign(target,age,sex);
console.log(target);//{name: "bb", age: 13, sex: "man"}
//如果有同名属性 则源对象属性会覆盖目标对象的属性
//只拷贝原对象自身的属性，不会拷贝继承或者不可枚举的属性
```

- Object.getOwnPropertyDescriptors();他会返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是描述对象

```javascript
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

- Object.setPrototypeOf();用来设置一个对象的原型对象，返回参数本身；

```javascript
let proto = {
    x : 1,
    y : 2,
    z : 3,
}

let obj = {
    x : 10
}

Object.setPrototypeOf(obj,proto);

console.log(obj.x,obj.y,obj.z);//10 2 3
// 是把 proto 对象当成obj的原型所以obj对象可以读取 proto 的值
```

- Object.getPrototypeOf();用于读取一个对象的原型对象

```javascript
function Rectangle() {
  
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
```

- Object.create();用来创造一个新对象，

```javascript
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}
```

- Object.keys();返回一个数组，成员是所有可遍历属性的键名

```javascript
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

- Object.values();返回一个数组，成员是所有可遍历属性的键值

```javascript
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
```

- Object.entries();返回一个数组，成员是所有可遍历属性的键值对的数组

```javascript
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

- Object.fromEntries();是上面方法的逆操作，传进一个键值对数组转为对象

```javascript
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

## Symbol

### 创建与简述

- 创建Symbol

```javascript
let s1 = Symbol('dd');
let s2 = Symbol('dd');
console.log(s1 === s2);//false

let s3 = Symbol.for('dd');
let s4 = Symbol.for('dd');
console.log(s3 === s4);//true

//第一种方法是每次创建都会生成一个新的symbol对象，
//但是第二种方法是每次会检查是否有重名的参数，如果有就使用，如果没有就重新创建一个
```

- symbol的值是独一无二的，所以可以向对象内添加独一无二的方法

```javascript
// 假设不知道obj对象中有没有up和down方法，但是需要添加与up和down相关的方法，并且不能冲突，就需要用到symbol
let obj = {
    name : 'dd',
    up : function () {  
        console.log('shang ');
    },
    down : function () {  
        console.log('xia');
    }
}
let sym = {
    up : Symbol('上'),
    down : Symbol('下'),
}
obj[sym.up] = function () {  
    console.log('我可以向上');
}
obj[sym.down] = function () {  
    console.log('我可以向下');
}
//这样调用添加进去的symbol方法
obj[sym.up]()//我可以向上;
```

- Symbol作为属性名的方法
- **只有在外面声明才能调用，如果像 [Symbol()] 作为属性名，那么无法被调用**
- **在写属性名时候，必须要使用 `[]` 调用，不然不会被当做Symbol值，调用时候必须使用`[]`不能使用`.`调用**

```javascript
let str = '123';
let str2 = '123';
let symbol1 = Symbol('move');
let symbol2 = Symbol('a');
let symbol3 = Symbol('a');
let lol = {
    name : 'lol',
    [symbol1] : function () {  
        console.log('我可以移动');
    },
    [symbol2] : function () {  
        console.log('我可以攻击');
    },
    [symbol3] : function () {  
        console.log(1);
    },
    [str] : 1,
    [str2] : 2
}
//声明了两个值一样的字符串然后拿来当做属性名，发现会覆盖，
//这就体现出symbol作为属性名的好处了
//必须这样调用
lol[symbol1]();
```

- 内置的symbol值，其实就是symbol对象上的方法，是对其他对象的一种扩展方法

```javascript
1、Symbol.hasInstance;//在其他对象使用instance运算符判断时，调用这个方法
2、Symbol.isConcatSpreadable//布尔值 表示对象用于concat时 是否可以展开
```

## Set&Map

### Set

- Set结构类似于数组，但他的成员的值都是唯一的，Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```javascript
// 初始化
let s = new Set([1,1,2,3,4,4]);
console.log(s);//[1,2,3,4]
// 会自动去重 因为里面的值是唯一的
```

- 使用Set进行数组去重

```javascript
let arr = [1,2,3,3,7,6,7,2,5,3,5];
let s = [...new Set(arr)];
console.log(s);//[1, 2, 3, 7, 6, 5]

//使用Array.from() 也可以把Set结构转化为数组
Array.from(s)//[1, 2, 3, 7, 6, 5]
```

- Set属性和方法

```javascript
let s = new Set([1,2,3,3]);
// 1.检查Set的长度（成员总数）
console.log(s.size);//3
// 2.向Set结构里添加值
s.add(5);
console.log(s);//{1, 2, 3, 5}
// 3.删除一个值
s.delete(2);
console.log(s);//{1, 3}
// 4.检查Set中有没有这个值
console.log(s.has(1));//true
// 5.清空Set里的所有值
s.clear();
console.log(s);//{}
```

- 使用Set来写并集，差集，交集

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

### Map
- Map其实就是一个升级版的对象，对象只能拿字符串当做键名，但是Map可以那任何数据类型当做键名，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，

```javascript
 let m = new Map();
//添加成员 
m.set(name,'vn');
m.set('age',13);
//可以拿对象当键名
let key = {
    lol : 'hero' 
}
m.set(key,['vn','ez','eve'])
//size
console.log(m.size);//3

//删除成员
// m.delete(name);
// m.delete('age');

//获取成员
console.log(m.get(key));// ["vn", "ez", "eve"]

//has
console.log(m.has(name));//true

//clear
m.clear();//清空
```

- Map使用for...of方法会分别打印出键名和键值的对应

```javascript
// for of 方法的特殊使用
// 如果单声明打印一个i 那么打印出的是键值对
for(let [i,k] of m){
    console.log(i);//打印键名
    console.log(k);//打印键值
}
```

## 对象简写、箭头函数

### 对象简写

- ES6允许把变量，函数放进对象的大括号内，还允许在大括号内简写对象的声明格式

```javascript
let name = 'd';
let age = '12';
let obj = {
    sName : name,
    age,  // key value 名字一样时候，可以进行简写
    eat(){
        console.log('i am eating');
    }
};
```

### 箭头函数

- ES6允许使用箭头来简写函数的声明

```javascript
let fn = () => {console.log('箭头函数')}
```

- **特性**
1. 箭头函数里的this是静态的，始终执行函数在声明时候所在的作用域下的this的值

```javascript
var name = '陈';
function getName () {
    console.log(this.name);
}

let getName2 = () => {
    console.log(this.name);
}

var obj = {
    name : 'chen',
}
getName();//陈
getName2();//陈

getName.call(obj);//chen
getName2.call(obj);//陈
```
2. 不能作为构造函数构造对象
3. 不能使用arguments
4. 箭头函数的简写

```javascript
//1.省略小括号（形参有且只有一个）
let add = n => {
    return n + n;
}
//2.省略大括号（代码体只有一条的时候）return 也要省略
//语句的执行结果就是函数的返回值
let pow = n => n*n;
```
- **箭头函数适用于与this无关的回调，定时器，数组方法的回调**
- **箭头函数不适合与this有关的回调，事件回调，对象的方法**

### 函数参数赋值初始值

- 形参初始值 具有默认的参数 一般位置要靠后

```javascript
function fn(a,b,c=10) {
    return a+b+c;
}

let result = fn(1,2);
console.log(result);//13
//当参数没有给实参的时候走默认值
```

- 与解构赋值结合

```javascript
function fn({name,age,sex = 'man'}) {
    console.log(name);//d
    console.log(age);//13
    console.log(sex);//man
}
//当参数没有给实参的时候走默认值
fn({
    name: 'd',
    age : '13',
})
```

### rest参数
- 与arguments功能相似，都是接受传入的实参列表，但是返回的结果不一样，arguments返回的是一个类数组，但rest返回的是一个数组
```javascript
function fn(a,b,...args) {
    console.log(a);//1
    console.log(b);//2
    console.log(args);//3,4,5,6
}
fn(1,2,3,4,5,6);
//rest参数必须放在形参的最后一位，不然会报错
//...后面的名字可以自定义
```

## Class
### 简述
- class就是语法糖，本质就是构造函数，但是这样写能更清晰，更像面向对象的写法

```javascript
class Phone{
    //构造方法
    constructor (name,price){
        this.name = name;
        this.price = price;
    }
    
    //定义方法
    //不需要使用function关键字 直接 函数名() {}
    call(){
        console.log('我可以打电话');
    }
}

let huawei = new Phone('huawei',4333);
console.log(huawei);//{name: "huawei", price: 4333}
huawei.call();//我可以打电话
```

- get和set 可以为某个属性设置get和set属性，当调用这个属性的时候，会执行函数

```javascript
class Phone{
    //构造方法
    constructor (name,price){
    this.name = name;
    this.price = price;
    }
    //定义方法
    call(){
    console.log('我可以打电话');
    }
    
    //取值函数
    get prop() {
    console.log('get');
    return 1;
    }
    
    //存值函数
    set prop (value){
    console.log(value);
    } 
}

let huawei = new Phone('huawei',4333);
console.log(huawei.prop);//返回值是1 打印get
huawei.prop = 123;//打印123
```

- 静态属性和静态方法，表示该属性或方法不会被继承，而是通过直接类来调用

```javascript
class Phone{

//静态属性和静态方法
static age = 'age';

static lo () {
    console.log('lol');
}
//构造方法
constructor (name,price){
    this.name = name;
    this.price = price;
}

//定义方法
call(){
    console.log('我可以打电话');
}           
    }
let huawei = new Phone('huawei',4333);
console.log(huawei.age);//undefined
console.log(Phone.age);

huawei.lo();//TypeError
Phone.lo();//lol
```

### Class继承

- Class 可以通过`extends`关键字实现继承

```javascript
//继承
class Father {
    constructor (name,age) {
        this.name = name;
        this.age = age;
    }

    callName () {
        console.log(this.name);
    }
}

// let father = new Father('ez',18);

class Son extends Father {
    constructor (name,age,sex){
        super(name,age);//调用父类
        this.sex = sex;
    }
    
    call () {
        super.callName();//调用父类方法
    }
}

let son = new Son('vn',20,'woman');
console.log(son);//Son {name: "vn", age: 20, sex: "woman"}
son.call();//vn
```

## iterator、Generator函数

### iterator接口

- 任何数据只要部署iterator接口（其实就是属性） ，就可以完成遍历操作。

```javascript
for... of 和 for ... in
let arr = ['first','two','three'];

for(let i in arr){
    console.log(i);// 0 1 2
}
//in   遍历的是键值对的键名
for(let v of arr){
    console.log(v);// first two three
}
//of   遍历的是键值对的值
```

- iterator接口工作原理

```javascript
1. 创建一个指针对象，指向当前数据结构的起始位置
let obj = arr[Symbol.iterator];
2. 调用对象上的 next()方法 指向数据结构的第一个成员
3. 然后反复调用 next()方法 直到最后一个成员
4. 每个成员都会有一个value属性 和done属性 done代表循环是否完成
```

- 使用iterator 自定义遍历对象

```javascript
需求：使用for of遍历对象中的arr数组中的每一个元素
let obj = {
  name : 'dd',
  arr : ['first','two','three'],

  [Symbol.iterator]() {
    let This = this;
    let index = 0;
    return {
      next: function () {
        if(index < This.arr.length){
          let result = {
            value : This.arr[index],
            done : false,
          }
          index ++;
          return result;
        }else{
          return {
            value : undefined,
            done : true,
          }
        }
      }
    }
  }
}

for(let i of obj){
console.log(i);
}
```

### Generator函数

- 声明
```javascript
//在function 和函数名之间有 * 
function * myFn () {
    yield first;
    yield second;
    return end;
}
let gen = myFn();
```

- 执行

```javascript
console.log(gen.next());//{value: "first", done: false}
console.log(gen.next());//{value: "second", done: false}
console.log(gen.next());//{value: "end", done: false}
console.log(gen.next());//{value: "undefined", done: false}
```

- 必须使用next方法执行 如果直接myFn();则会生成一个指向内部状态的指针对象，
- yield表达式 是一种暂停执行的标记  next方法可以恢复执行

- 参数 原函数和next方法都可以进行传参

```javascript
//yield表达式本身没有返回值，或者说总是返回undefined。
//next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
function * myFn (arg) {
    console.log(arg);//aaa
    let a = yield 'first';
    console.log(a);//bbb
    let b = yield 'second';
    console.log(b);//ccc
    let c = yield 'end';
    console.log(c);//ddd
}
let gen = myFn('aaa');
console.log(gen.next());
console.log(gen.next('bbb'));
console.log(gen.next('ccc'));
console.log(gen.next('ddd'));
```

- 例子

```javascript
// 需求： 用户数据 商品数据 订单详情 这些环环相扣 
        //有第一个数据 才能执行第二个
function user () {
    setTimeout(() => {
        let data = '用户数据';
        gn.next(data);
    }, 1000);
}

function sp () {
    setTimeout(() => {
        let data = '商品数据';
        gn.next(data);
    }, 1000);
}

function dd () {
    setTimeout(() => {
        let data = '订单详情'; 
        gn.next(data);
    }, 1000);
}

function * gen () {
    let one = yield user();
    console.log(one);//用户数据
    let second = yield sp();
    console.log(second);//商品数据
    let three = yield dd();
    console.log(three);//订单详情
}

let gn = gen();
gn.next();
```

## Promise、async函数

### Promise

- Promise是一个构造函数，需要实例化来创建，创建时需要两个参数

```javascript
//Promise有三个状态 进行中，成功，失败
//调用resolve函数会把状态改为成功，
//调用reject函数会把状态改为失败
let p = new Promise(function (resolve , reject) {  
    //里面写异步操作
    setTimeout(() => {
        let data = 'd';
        let data2 = 'c'
        resolve(data);//成功
        // reject(data2);//失败
    },1000)
    
}).then(res => {
    console.log(res);//成功打印这个
},
error => {
    console.log(error);//失败打印这个
});
```

- Promise的主要作用 就是封装多个异步操作，避免回调地狱

```javascript
//then方法也可以链式调用，

let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        let num = 1;
        resolve(num);
    },1000)
});
p.then(value => {
    return new Promise((resolve,reject) => {
        setTimeout(() =>{
            let num = 2;
            let result = [num,value];
            resolve(result);
        },1000);

    })
}).then(value => {
    console.log(value);//2s后 打印[2,1]
});
```

### async函数

- async的返回值是一个Promise对象，可以用then方法添加回调函数当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句， **使异步变同步**

- async函数 await命令 其实就是Generator函数 和yield命令的一个语法糖

- await后面**只能是一个Promise对象**，await的值也是后面Promise对象成功的返回值，如果是错误的值 需要用try catch来处理 await


- Promise和async的结合让异步变为同步

```javascript
function time () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('定时器');
            resolve();
        },1000)
    });
}

async function asyncFun() {  
    await time();
    console.log('定时器执行完了');
}

asyncFun();
//打印的结果为    1s后
// 定时器
//定时器执行完了
```

## 模块化

### export

- export命令用于规定模块的对外接口

```javascript
//对外暴露的三种语法
//1、
export let a = 123;
export function say() {
    console.log('i can');
}
//2、
let b = 456;
function say2 () {
    console.log('i can ');
}
export{
    b , say2 as say3
}
//使用as可以添加别名
//3、 默认暴露
export default {
    c : 1,
    say5 : function () {
        console.log('i can ');
    }
}
```

### import

- import命令用于输入其他模块提供的功能

```javascript
//1、最常用
import {a} from "./dist";
console.log(a);
//2、引入dist文件里所有暴露的元素， e1是别名
import * as e1 from "./dist";
console.log(e1);
// 3.只针对默认暴露的方法 其他方法报错 e1是别名
import e1 from "./dist";
console.log(e1);
```

- 动态import
- 可以按需加载，在任何地方去加载import


```javascript
// import(sp); 必须有一个参数来接受路径
//参数sp也可以是一个函数的返回值 根据返回结果来加载不同的模块
//使用then方法来获取输出接口
import(`./dist.js`).then(({export1, export2}) => {
    console.log(export1,export2);
})

//可以使用别名
import(`./dist.js`).then(({export1 : the}) => {
    console.log(the);
})
```
