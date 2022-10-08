# Flex布局
- 参考原文链接：https://zhuanlan.zhihu.com/p/25984121
## 父元素属性

### display
- 用来定义父元素是一个 flex布局容器。如果设置为flex则父元素为块状元素，设置为inline-flex父元素呈现为行内元素。

```css
.content {
  display: flex; /* or inline-flex */
}
```

### flex-direction
- flex-direction定义flex布局的主轴方向

```css 
.content {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
- row：默认值，行方向，从左到右
- row-reverse：行反方向
- column：列方向，从上到下
- column-reverse：列反方向

### flex-wrap
- 默认情况下，flex布局会把子元素尽可能的排在同一行，通过flex-wrap来决定是否换行。

```css
.content {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- nowrap：默认值，不折行，所有元素排在一列
- wrap：折行，子元素会从上到下折成多行
- wrap-reverse：从下到上折行

### flex-flow
- flex-flow是flex-direction和flex-wrap属性的缩写形式，默认值是 row, nowrap

```css
.content {
  flex-flow: flex-direction || flex-warp
}
```

### justify-content
- justify-content属性定义子元素沿主轴方向的对齐方式，用来当子元素大小最大的时候，分配主轴上的剩余空间。

```css
.content{
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

- flex-start：默认值，朝主轴方向对齐。
- flex-end： 朝主轴结束的方向对齐。
- center： 沿主轴方向居中。
- space-between：沿主轴方向两端对齐，第一个子元素在起点，最后一个元素在重点。
- space-around：沿主轴子元素之间均匀分布。

### align-items
- align-items定义了子元素在交叉轴的对齐方向

```css
.content {
  align-items: flex-start | flex-end | center | baseline | stretch
}
```

- flex-start：按照交叉轴的起点对齐
- flex-end：按照交叉轴的终点对齐
- center：沿交叉轴方向居中
- baseline：按照项目的第一行文字的基线对齐。
- stretch：默认值，满足height设置的情况下拉伸填满整个父元素。

### align-content
- align-content是父元素所包含的行在交叉轴方向有空余部分时如何分配空间。
- **当只有一行时，此属性不起作用。**

```css
.content{
  align-content: flex-start | flex-end | center | space-between | space-around |stretch
}
```
- 该属性六个属性值与justify-content中六个属性意思相似
- justify-content和align-content区别，前者是指单行内的子元素的对齐方式，后者是指多行之间的对齐方式。

## 子元素属性

### order

- 默认情况下子元素按照代码书写的先后进行布局，但是order属性可以改变子元素出现的顺序
```css
.item {
  order: 数字
}
```
- order默认值为0 子元素的order值越小，布局就越在前面。

### flex-grow

- 该属性规定在空间允许的情况下，子元素如何按照比例分配可用的剩余空间。如果所有子元素设定都为1，则父元素中剩余空间会等分给所有子元素。如果有一个子元素的属性值为2，则分配剩余空间时候将会获得其他元素两倍的空间。

```css
.item {
  flex-grow: 数字;
}
```

- flex-grow默认值为0，**且不接受负值**

### flex-shrink

- flex-shrink默认值为1， 当所有子元素都为默认值时，则空间不足时子元素会同比例缩小。如果其中某个子元素的flex-shrink值为0，则空间不足时该子元素并不会缩小。如果其中某个子元素的flex-shrink值为2时，则空间不足时该子元素会以二倍速度缩小。

```css
.item {
  flex-shrink: 数字;
}
```

- **不接受负值**

### flex-basis

- flex-basis定义了在计算剩余空间之前子元素默认的大小。

```css
.item {
   flex-basis: 数字 | auto;
}
```

- 如果设置为0, 则子元素内容周围的空隙不会根据flex-grow按比例分配，如果设置为auto，则子元素周围额外的空袭会根据flex-grow按照比例分配


### flex

- flex是flex-grow、flex-shrink、flex-basis三个属性的缩写。其中第二个和第三个参数(flex-grow,flex-basis)是可选的。默认值为0 1 auto。

```css
.item {
   flex: none | [flex-grow || flex-shrink || flex-basis]
}
```

### align-self

- 通过设置某个子元素的align-self属性，可以覆盖align-items所设置的对齐方式。属性值与align-items中的意义相同

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```