# JavaScript思路&方法

## 给自己的浏览器添加跨域

- <div style="color:red;font-weight:bold;">只适用于开发阶段</div>

```txt
在电脑上新建一个目录，例如：C:\MyChromeDevUserData
右键浏览器点击属性 在属性页面中的目标输入框里加上
(原有的路径后面添加空格) --disable-web-security --user-data-dir=C:\MyChromeDevUserData
点击应用和确定后关闭属性页面，并打开chrome浏览器。
再次打开chrome，发现有“--disable-web-security”相关的提示，说明chrome能正常跨域工作了。
```

## 添加的知识点

### file文件属性说明

- 每个file都有一个files属性 包含以下信息

- name ：文件名。
- lastModified ：一个数字，指定文件最后一次修改的日期和时间，以 UNIX 新纪元（1970年1月1日午夜）以来的毫秒数表示。
- lastModifiedDate ：一个 Date 对象，表示文件最后一次修改的日期和时间。这被弃用，并且不应使用。使用 lastModified 作为替代。
- size ：以字节数为单位的文件大小。
- type：文件的 MIME 类型。

![file图片](/image/file.png)


### FormatDate(格式化时间)

```javascript
function formatDate(v) {
  // v == Date
  let year = v.getFullYear()
  let month = v.getMonth() + 1 < 10 ? '0' + (v.getMonth() + 1) : v.getMonth() + 1
  let day = v.getDate() < 10 ? '0' + v.getDate() : v.getDate()
  let hour = v.getHours() < 10 ? '0' + v.getHours() : v.getHours()
  let minute = v.getMinutes() < 10 ? '0' + v.getMinutes() : v.getMinutes()
  let second = v.getSeconds() < 10 ? '0' + v.getSeconds() : v.getSeconds()

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
} 

```

### 浏览器中复制事件

```javascript
navigator.clipboard.writeText("复制的内容").then(function() {
  /* 复制成功之后的回调 */
}, function() {
  /* 复制失败之后的回调 */
});
```

### 浏览器点击全屏

- **谷歌、火狐、Edg、360极速模式都可以实现全屏，360兼容模式不生效**

```javascript
var el = document.documentElement;
el.requestFullscreen
  || el.mozRequestFullScreen
  || el.webkitRequestFullscreen
  || el.msRequestFullScreen 
  ?
el.requestFullscreen()
  || el.mozRequestFullScreen()
  || el.webkitRequestFullscreen()
  || el.msRequestFullscreen()
  :null;
```

### 输入框onblur与下拉框click执行问题

- 场景说明：输入框有一个下拉的列表，focus显示，blur不显示，如果点击下拉列表 会造成 直接消失 也就是 blur>下拉列表的click执行了

- 解决方法：给blur一个setTimeout 时间为0，让他排在click任务的后面执行即可（微任务和宏任务）

## 通用方法

### 检查数据类型

```javascript
// 普通方法 typeof
// 银弹方法（通用方法） Object.prototype.toString.call(要检测的数据)
Object.prototype.toString.call(arr) 数组
'[object Array]'
Object.prototype.toString.call(str) 字符串
'[object String]'
```

### 删除数组中的元素返回一个新数组

```javascript
let arr = [1,2,3];
/**
 * arr: 要删除数据的数组
 * item: 要删除的值
 */
function remove(arr, item) {
  return arr.filter(i => i != item)
}
let arr2 = remove(arr,2)
```

### 删除数组中的元素（在原数组上进行修改）

```javascript
// 使用if会出现数组长度的问题
function removeWithoutCopy(arr, item) {
  for(let i = 0; i < arr.length; i++){
    while(arr[i] == item) {
      arr.splice(arr.indexOf(item),1)
    }
  }
  return arr
}
let arr = [1, 2, 2, 3, 4, 2, 2];
console.log(removeWithoutCopy(arr, 2));
```

### 数组求和

```javascript
function sum(arr) {
  return arr.reduce((a,b)=> a+b);
}
let a = sum([1,2,3]);
console.log(a);
```

### 在数组尾部新添加一个元素（创建新数组）

```javascript
function append(arr, item) {
  return [...arr,item]
}
let arr = [1, 2, 3, 4]
console.log(append(arr,10));
// 或者
function append(arr, item) {
    return arr.concat([item]);
}
```

### 删除最后一个元素（创建新数组）

```javascript
function truncate(arr) {
  return arr.slice(0,arr.length-1);
}
let arr = [1, 2, 3, 4]
let a = truncate(arr)
```

### 判断两个数据是否完全相等

```javascript
// 使用=== 会出现问题
// 比如说+0===-0 应该是false的，但是返回是true
// 还有NaN === NaN 应该是true的，但是会返回false 
// 所以推荐使用Object.is(val1,val2)
Object.is(NaN,NaN)
true
Object.is(+0,-0)
false
```

### 查看对象自身属性（不会获取到原型链上的属性）

```javascript
var C = function () {
  this.foo = 'bar';
  this.baz = 'bim';
};
C.prototype.bop = 'bip';
let a = new C();
Object.getOwnPropertyNames(a)
// 该方法返回一个数组 [foo,baz]
```

### 数组中出现最多的字符是哪个,出现了几次

```javascript
let str = 'daswvbvsf233dasldfrtyyuyu43mcixvcxvc5q'
let arr = str.split('')
let obj = {}
arr.forEach((e,i) => {
  if (!obj[e]) {
    obj[e] = 1;
  } else {
    obj[e]++
  }
})
let max = 0;
let maxChar = ''
for(let i in obj) {
  if(obj[i] > max) {
    max = obj[i]
    maxChar = i
  }
}
console.log(obj);
console.log(max,maxChar);
```

### 关于随机数Random

```javascript
// 一个比较准确的公式
let num = 最大数-最小数+1;
Math.floor(Math.random() * num)+小数
eg： 1-10
let num = 10 -1 +1
Math.floor(Math.random() * num)+1
```

### 多次点击定时器会产生问题（解决方法）
- 多次点击定时器会导致多个定时器一直执行

- 在开始执行时候，清除上一个定时器即可

