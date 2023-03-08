# Vue2 基础

## Vue2语法

- Vue2 [官方文档](https://v2.cn.vuejs.org/v2/guide/)


### `Vue2`选项式`API`的常用的各个选项

```vue
<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1
      /** data： 对象return一个函数的形式
       * 不直接使用对象的原因是因为，各个组件之间的互相通信会影响到数据
       * data里面一般放可以操作的数据，在 template 也就是html中可以不带this使用
       * 在script 的其他选项中 需要 this来使用data里面定义的数据
       */
    }
  },
  methods: {
    /** 方法集合： methods: 是一个对象，里面存放各种函数
     *  使用data里面定义的数据时候需要使用this来指向
     *  如果想在methods一个方法中调用另一个方法，需要this来操作
     *  如：this.add()
     */
    add() {
      return this.num + 1
    },
  },
  watch: {
    /** 侦听属性 watch: 对象形式 里面存放 data里面已经定义的数据
     *  并且监控此数据 在数据发生修改时候触发
     *  有两种使用的形式
     */
    // 1. 简单的监听
    num(newData, oldData) {
      // newData 更新后的数据
      // oldData 更新前的数据
    }
    // 2. 高级监听，监控对象或者数据的属性修改(深度监控)
    num: {
      // 变成对象形式，还有其他可以更改的属性，参考官网API
      handle() {
        // 回调函数
      },
      deep: true // 开启深度监听
    }
  },
  computed: {
    /** 计算属性
     *  对象形式 这里要定义一个data里面没有的数据名，
     *  这个数据依赖data里面的数据来更新
     */
    numAdd() {
      // 直接返回 num + 1 之后每次num发生变化时候都会重新执行这个函数
      return this.num + 1
    }
  },
  filters: {
    /** 过滤器
     *  过滤html中的数据 eg: {{num | numFilters}}
     */
    numFilters(val) {
      // 这个val就是 num的值
      // return什么html就展示什么
      return 1111
    }
  },
  created() {
    // Vue的生命周期函数 是指在这个生命周期要做什么样的操作
    // 生命周期详细如下（写法都是函数写法）
    /**
     * beforeCrate: 创建前：当Vue对象创建之前触发的函数
     * created： 创建后：Vue对象创建完成触发的函数
     * beforeMount (挂载前)：当Vue对象开始挂载数据的时候触发的函数
     * mounted （挂载后）：当Vue对象挂载数据的完成的时候触发的函数
     * beforeUpdate （更新前）：Vue对象中的data数据发生改变之前触发的函数
     * updated   （更新后）：Vue对象中的data数据发生改变完成触发的函数
     * beforeDestroy（ 销毁前）：Vue对象销毁之前触发的函数
     * destroyed （销毁后）：Vue对象销毁完成触发的函数
     */
  },
}
</script>
```


### 插值语法

- 使用`{{}}` 语法来展示data中的数据，并可以进行一些简单的操作运算

```vue
<template>
  <div>
    {{ num + 1 }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 100
    }
  }
}
</script>
```

## 指令

### v-text&v-html

```vue
<template>
  <div>
    <!-- v-text内容按原始文本展示：也就是 <h1>123</h1> -->
    <div v-text="str"></div> 
    <!-- 等同于  <div>{{str}}</div> -->

    <!-- v-html内容会渲染HTML标签，也就是展示一号标题 123 -->
    <div v-html="str"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      str: '<h1>123</h1>'
    }
  }
}
</script>
```

### v-show&v-if

- v-if和v-show使用场景的区分
- **v-if 是操作DOM元素在DOM树中的添加和删除，所以适合不频繁切换展示和隐藏的元素**
  + v-if 是惰性的：如果在初始渲染时条件为假，则什么也不做一直到条件第一次变为真时，才会开始渲染条件块。
  + 切换性能消耗过大
  + 初始化渲染消耗小
- **v-show 是操作元素CSS的display属性来控制显示隐藏，所以适合频繁切换状态的元素**
  + v-show 不管初始条件是什么，元素总是会被渲染
  + 切换性能渲染消耗小
  + 初始化渲染消耗大

```vue
<template>
  <div>
    <!-- 和JS的if语句一样，表达式为true时候展示内容 -->
    <!-- v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。-->
    <div v-if="flag"></div> 
    <div v-else-if="flag === 1"></div> 
    <div v-else></div> 

    <!-- 和v-if原理一样，都是表达式为true时候就展示内容，false就不展示 -->
    <!-- 不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 
    只是简单地切换元素的 CSS property display。 -->
    <div v-show="flag">123</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  }
}
</script>
```

### v-for

- 可以接受的值 Array | Object | number | string | Iterable
- :key的使用
  + 官方对key的解释：key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。重复的 key 会造成渲染错误。

- Diff算法
  +  当页面的数据发生变化时，Diff算法只会比较同一层级的节点：如果节点类型不同，直接干掉前面的节点，再创建并插入新的节点，不会再比较这个节点以后的子节点了。如果节点类型相同，则会重新设置该节点的属性，从而实现节点的更新。
-  对于相同类型的节点更新，如下图：我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的：即把C更新成F，D更新成C，E更新成D，最后再插入E，很没有效率

![diff](/image/diff.png)

- 不用index做为key的原因也是如此，如果用index作为key,`[1,2,3]`那么删除第二项的时候，index就会从1,2,3变成1,2，index永远是连续的，同样无法解决上诉问题。

- <div style="color:red">所以一句话，key的作用主要是为了高效的更新虚拟DOM。另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。</div>

- 例：如一个列表，一共有三个元素`[A,B,C]`，我先选中第二个B，然后再在列表的头部添加一个元素`[1,A,B,C]`，那么在不加:key属性的情况下，选中的是第二个元素A，如果是加了:key且不是index的情况下，选中的就是第三个元素B
![diff](/image/key1.png)
![diff](/image/key2.png)
![diff](/image/key3.png)
```vue
<template>
  <div>
    <div v-for="item in list" :key="item.id">
      {{item.name}}
    </div>

    <!-- v-for 在循环元素是对象时候第二个参数会是对象的键值，是数组时就是数组的索引 -->
    <div v-for="(item, index) in items"></div>
    <div v-for="(val, key) in object"></div>
    <div v-for="(val, name, index) in object"></div>
  </div>
</template>
<!--  -->
<script>
export default {
  data() {
    return {
      list: [{id: 1,name: 'A'},{id: 2,name: 'B'},{id: 3,name: 'C'},{id:4,name:'D'}]
    }
  }
}
</script>
```

### v-on

- 缩写 @

- 修饰符
  + `.stop` - 调用 event.stopPropagation()。(阻止冒泡)
  + `.prevent` - 调用 event.preventDefault()。(阻止默认行为)
  + `.capture` - 添加事件侦听器时使用 capture 模式。()
  + `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  + `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
  + `.native` - 监听组件根元素的原生事件。
  + `.once` - 只触发一次回调。
  + `.left` - (2.2.0) 只当点击鼠标左键时触发。
  + `.right` - (2.2.0) 只当点击鼠标右键时触发。
  + `.middle` - (2.2.0) 只当点击鼠标中键时触发。
  + `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

```vue
<template>
  <div>

    <div v-on:click="add">123</div>
    <!--  串联修饰符 -->
    <button @click.stop.prevent="doThis"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    add() {},
    doThis() {}
  }
}
</script>
```

### v-bind

- 缩写  `:`

- 修饰符
  `.prop` - 作为一个 DOM property 绑定而不是作为 attribute 绑定。
  `.camel` - (2.1.0+) 将 kebab-case attribute 名转换为 camelCase。(从 2.1.0 开始支持)
  `.sync` (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

- 用法：动态绑定一个或多个属性，或一个组件prop到表达式

```vue
<template>
  <div>
    <!-- 绑定一个 attribute -->
    <img v-bind:src="imageSrc">

    <!-- class 绑定 -->
    <div :class="{ red: isRed }"></div>
    <div :class="[classA, classB]"></div>
    <div :class="[classA, { classB: isB, classC: isC }]"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: 'http://...'
      isRed: true,
      isB: true,
      isC: true,
    }
  },
}
</script>
```

### v-model

- 可用标签
  + `<input>`
  + `<select>`
  + `<textarea>`
  + components

- 修饰符
  + `.lazy` - 取代 input 监听 change 事件
  + `.number` - 输入字符串转为有效的数字
  + `.trim` - 输入首尾空格过滤

- 用法 表单控件或者组件上进行双向绑定

- **v-model 其本质就是语法糖，原理就是监听表单的值和触发事件来实现双向绑定**
  + text 和 textarea 元素使用 value property 和 input 事件；
  + checkbox 和 radio 使用 checked property 和 change 事件；
  + select 字段将 value 作为 prop 并将 change 作为事件。

```vue
<template>
  <div>
    <!-- 用户在输入框输入什么，p标签内就显示什么 -->
    <input v-model="message">
    <p>Message is: {{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
}
</script>
```



### 注

- **还有一些不是很常用的指令请参考官网文档**
- [Vue指令官方API](https://v2.cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4)

## 组件

### 组件的注册

- **全局注册**

- 这三个组件经过全局注册之后，可以在任何创建Vue实力的模板中使用
```javascript
// 创建
Vue.component('component-a', { /* ... */ })
Vue.component('component-b', { /* ... */ })
Vue.component('component-c', { /* ... */ })

new Vue({ el: '#app' })

// 使用
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```
- 这三个组件在各自内部也都可以相互使用。

- **局部注册**

- 局部注册的组件在其子组件中不可用

```javascript
// vue脚手架中使用的局部注册的方式
// 1. 引入
import ComponentA from './ComponentA.vue'

export default {
  components: {
    // 2. 注册
    ComponentA
  },
  // ...
}
//  3. 可以在template标签中使用
```
### prop

- 可以在子组件上传入自定义名字进行传参，子组件使用props进行接收

```vue
<!-- 父组件 -->
<template>
  <div>
    <ComponentA name='123'></ComponentA>
  </div>
</template>

<script>
import ComponentA from './ComponentA.vue'
export default {
  components: {
    // 2. 注册
    ComponentA
  },
  data() {
    return {
    }
  },
}

</script>

<!-- 子组件 -->
<template>
  <div>
    <div>{{name}}</div>
  </div>
</template>

<script>
import ComponentA from './ComponentA.vue'
export default {
  // 子组件接收时候可以进行一些操作检查
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    name: Number,
    // 多个可能的类型
    name: [String, Number],
    // 必填的字符串
    name: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    name: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    name: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    name: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  }
}
</script>
```

### 父子传参

- 父传子：<span style="color:red;font-weight:bold">父级组件添加自定义属性，  子组件用props</span>
- 子传父：<span style="color:red;font-weight:bold">子组件 使用$emit('msg',值)，父组件使用v-on+方法去接收</span>
- 兄弟传参：<span style="color:red;font-weight:bold">在mainjs里面实例化一个VUE，然后挂载到VUE上，然后一个组件使用vue 的$emit方法发送，在另一个组件的method使用$on接收</span>

```javascript
// 一般写在main.js 或者创一个新的js文件，在main.js引入
let eventBus  = new Vue()  //创建一个中转站 
	
	//发送方
	emit(){
		eventBus.$emit('addr','123')
	}
	
	
	// 接收方 一般放到生命周期里
	eventBus.$on('addr',function(msg){
		console.log(msg)
	})
```

- <div style="color:red;font-weight:bold">父组件传参给孙组件</div>

```javascript
// $attrs可以把父组件的值传给孙组件
// 1.在引用的子组件里绑定要传的值（也就是父组件调用子组件的地方）
<template>
  <div id="app">
     <HelloWorld :test="hello"/>
  </div>
</template>
// 2.在引用的孙组件里用v-bind绑定$attrs
<child v-bind="$attrs"></child> // （也就是子组件调用孙组件的地方）
// 3.在孙组件里打印出this.$attrs,可以获取到父组件的数据
 mounted(){
    console.log(this.$attrs.test);
  this.cdata = this.$attrs.test
  }
```

### 父子组件声明周期

```javascript
父beforeCreate      -> 父created  ->  父beforeMount
-> 子beforeCreate   -> 子created  ->  子beforeMount 
-> 子mounted        -> 父mounted  ->  父beforeDestroy
-> 子beforeDestroy  -> 子destroyed->  父destroyed
```

### keep-alive

- 主要用于保留组件状态，避免重新渲染

- 被keep-alive包裹的组件会额外多出两个生命周期 `activated`和 `deactivated`

- 可选prop

```vue
<template>
  <div>
    <!-- include 和 exclude prop 允许组件有条件地缓存。
      二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：  -->
    <!-- 逗号分隔字符串 -->
    <keep-alive include="a,b">
      <component :is="view"></component>
    </keep-alive>

    <!-- 正则表达式 (使用 `v-bind`) -->
    <keep-alive :include="/a|b/">
      <component :is="view"></component>
    </keep-alive>

    <!-- 数组 (使用 `v-bind`) -->
    <keep-alive :include="['a', 'b']">
      <component :is="view"></component>
    </keep-alive>

    <!-- max 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，
      已缓存组件中最久没有被访问的实例会被销毁掉。 -->
    <keep-alive :max="10">
      <component :is="view"></component>
    </keep-alive>
  </div>
</template>
<!--  -->
<script>
export default {
  data() {
    return {
    }
  },
}
</script>
```