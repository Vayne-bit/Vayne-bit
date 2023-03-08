# 正则表达式

## 基础内容

### 转义字符

1. \（反斜杠） 能把他后面的一个符号或字母输出，而且不显示自身

```JavaScript
var str = "adb\"dd";//"adb"dd"
```
 
2. 配合一些字母有特殊用途

```JavaScript
\n;//换行 只能在控制台里显示换行 页面中会改为空格
\r;//代表行结束 windows里一个回车代表的就是 \r\n
\t;//制表符  \table（tab键）
```

## RegExp
- 正则表达式的作用：匹配特殊字符或有特殊搭配原则的字符的最佳选择

### 两种创建方式

- 直接量

```JavaScript
var reg = /abc/igm;
//在 / / 中间写东西，最后面写修饰符
```

- 对象方式

```JavaScript
var reg = new RegExp("abc","igm");
//第一个参数写需要判断的 第二个参数写修饰符
//第一个参数也可以写一个正则表达式
var reg1 = new RegExp(reg);
//这样两个正则表达式长得一样 但属性不相通
var reg1 = RegExp(reg);
//如果不写new  则两个表达式长得一样 属性也相通
```

### 修饰符 igm

```JavaScript
// i 代表不区分大小写
// g 代表全局匹配（有几个匹配就显示几个，无法多行匹配）
// m 代表多行匹配（如果有\n换行了 那么也会匹配下一行）
var reg = /^a/gm;// ^代表 匹配行的第一个
var str = "abcde\na";// 如果不加m 则只匹配第一个a
```

### 方法 

```JavaScript
var reg = /abc/;
var str = "abcd";
//检查（）里面的字符串与正则表达式的要求是否有符合的片段 返回true或false
reg.test(str);//true
//把str里符合（）里正则表达式的要求的返回出来，如果不加g 则只匹配第一个
str.match(reg);//["abc"];
```

### 表达式

```JavaScript
var reg = /[0-9] [A-z]g/;
//每个[] 都代表一位  每个[]里面都可以写范围 符合范围的就可以
//A-z 代表的就是所有的大小写的英文字母
//[^a]  ^在[]里代表的是非  
var reg = /[^a] [^b]/g;//代表的就是第一位不是a 和第二位不是b的
// | 在[] 代表的就是正则表达式的 或
var reg = /(abc|bcd)/g;//代表是abc或bcd都可以
```

### 元字符

```txt
.	           查找单个字符，除了换行和行结束符。
\w	         查找单词字符。   \w === [0-9A-z_]
\W	         查找非单词字符。 \W === [^\w]
\d	         查找数字。       \d === [0-9]
\D	         查找非数字字符。  \D === [^\d]
\s	         查找空白字符。    \s === [\n\t\r\v\f ] [] 打空格代表的就是空格
             空白字符代表换行符 制表符 回车符 垂直制表符 换页符 和 空格
\S	         查找非空白字符。   \S === [^\s];
\b	         匹配单词边界。      
\B	         匹配非单词边界
\0	         查找 NUL 字符。
\n	         查找换行符。
\f	         查找换页符。
\r	         查找回车符。
\t	         查找制表符。
\v	         查找垂直制表符。
\xxx	       查找以八进制数 xxx 规定的字符。
\xdd	       查找以十六进制数 dd 规定的字符。
\uxxxx	     查找以十六进制数 xxxx 规定的 Unicode 字符。
```

### 量词

```JavaScript
// n可以为元字符里的任意一个 如：var reg = /\w+/;
// 贪婪原则 能多就不少
// 打破贪婪匹配 能少不多， 在任何量词后加? 如：var reg = /\w+?/;
// 量词的意思就是 n 乘这个量词
n+		  匹配任何包含至少一个 n 的字符串。  {1， }
n*		  匹配任何包含零个或多个 n 的字符串。 {0， }
n?		  匹配任何包含零个或一个 n 的字符串。 {0,1}
n{X}	  匹配包含 X 个 n 的序列的字符串。    {x} 匹配x个
n{X,Y}	  匹配包含 X 至 Y 个 n 的序列的字符串。{x,y} 匹配x个或y个 能x就不y
n{X,}	  匹配包含至少 X 个 n 的序列的字符串。
n$		  匹配任何结尾为 n 的字符串。
^n		  匹配任何开头为 n 的字符串。

?=n	匹配任何其后紧接指定字符串 n 的字符串。
?!n	匹配任何其后没有紧接指定字符串 n 的字符串
//正向预查和非正向预查
var str = "abaaa";
var reg = /a(?=b)/g;//只会匹配后面跟着b的那个a
    reg1 = /a(?!b)/g;//除了后面跟着b的那个a 其他都匹配
```

### 对象属性

```JavaScript
global	RegExp对象是否具有标志 g。	
ignoreCase	RegExp对象是否具有标志 i。	
multiline	RegExp 对象是否具有标志 m。	
source	正则表达式的源文本。 //就是打印正则表达式里的东西

lastIndex	一个整数，标示开始下一次匹配的字符位置。
//也就是返回当前游标的位置，和	exec一起用  lastIndex的值可以手动更改
```

### Reg对象方法

```JavaScript
// compile()	编译正则表达式。	
// test()	检索字符串中指定的值。返回 true 或 false。	
// exec()	检索字符串中指定的值。返回找到的值，并确定其位置。

var reg = /ab/g; // 如果后面不加g的话 就会一直返回index：0
var str = "ababab";
console.log(reg.exec(str));//返回游标位置 index ： 0
console.log(reg.exec(str));//返回游标位置 index ： 2
console.log(reg.exec(str));//返回游标位置 index ： 4
console.log(reg.exec(str));//返回null
console.log(reg.exec(str));//返回游标位置 index ： 0
//如果reg里面有子表达式，那么也会把每个子表达式打印到类数组中

var str = "aaaabbbb";//写一个正则表达式 匹配这个
var reg = /(\w)\1\1\1\1/g;// ["aaaa","bbbb"]
//（）里的被称为子表达式 \1 就是引用第一个子表达式的值 所以就可以匹配 
//以此类推 那么：
var str = "aabb";
var reg = /(\w)\1(\w)\2/g;// ["aabb"]
```

### 支持Reg的String方法

```JavaScript
// search	检索与正则表达式相匹配的值。
// 匹配到了会返回游标位置，加不加g一样。匹配不到就会返回-1

// match	找到一个或多个正则表达式的匹配。
// 加g只会返回符合要求的值 不加g的话 还会返回出子表达式

// replace	替换与正则表达式匹配的子串。
// 要把aabb 换位 bbaa
var reg = /(\w)\1(\w)\2/g;
var str = "aabb";
console.log(str.replace(reg,"$2$2$1$1"));
// 第一位代表需要替换的，第二位值替换的结果 第二位必须是字符串的形式，
// 他可以访问到reg里的子表达式，用 $ 来访问即可
// 如果想把里面的内容替换成$ 那么需要这样写 ： $$

// split	把字符串分割为字符串数组。
//按split()里的正则表达式的规则来分割，如果有子表达式则会返回子表达式
```

### 几个正则的例子

- the-first-name 改为小驼峰写法：theFirstName

```JavaScript
var reg = /-(\w)/g;
var str =  "the-first-name";
console.log(str.replace(reg,function ($,$1) {
    //第一个参数代表匹配到的全局，第二个参数就是子表达式
    return $1.toUpperCase();
    //str.toUpperCase()可以把里面的字母都替换为大写
}))
```

- 把100000000000 转化为 100.000.000.000

```JavaScript
var str = "100000000000";
var reg = /(?=(\B)(\d{3})+$)/g;
// ?=(\B)空字符匹配后面跟不是单词边界 
// (\d{3})而且还是三位数字
// +代表1-3位
// $代表从后面开始
console.log(str.replace(reg,"."));//100.000.000.000
```

- 手机号格式校验

```JavaScript
var reg = /^1[3-9]\d{9}$/;
/** 手机号码只能是整数。                 /\d+/
 * 手机号码必须以数字为开头，数字结尾     /^\d+$/
 * 所有的手机号码都是以 1 开头           /^1\d+$/
 * 手机号码都是 11 个数字               /^1\d{10}$/
 * 手机号码的第二位是 3 至 9 的数字      /^1[3-9]\d{9}$/
 */
```
