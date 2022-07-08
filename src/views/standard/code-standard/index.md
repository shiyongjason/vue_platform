# 书写规范
## 注释（建议）
##### 1. 业务代码注释

``` javascript
        /**
        * 业务代码注释
        */
        
        do something
```
    
##### 2. 变量注释

``` javascript
        interface IState {
        // 名字
        name: string;
        // 电话
        phone: number;
        // 地址
        address: string;
        }
```
##### 3. 函数业务代码注释
>  尽可能减少代码中的注释。可以通过让变量名更语义化、只注释复杂、潜在逻辑，来减少注释量，同时也提高了可维护性，毕 竟不用总在代码与注释之间同步了

##### 4.模块的注释

```javascript
/**
 * 拷贝数据
 * @param  {*}  data   要拷贝的源数据
 * @param  {boolean} [isDeep=false] 是否深拷贝，默认浅拷贝
 * @return {*}         返回拷贝后的数据
 */
```


## 引用组件顺序
- 先引用外部组件库,,再引用当前组件块级组件, 然后是 common 里的公共函数库最后是 css 样式
- 第三方组件库 ==> 公共组件 ==> 业务组件 ==>utils（公共函数库） ==> css 样式
- 装个插件 没有的会有提示 删删干净


```javascript
import * as React from 'react'
import { Dropdown, Menu, Icon } from 'antd'
import Header from './Header';
import toast from 'common/toast'
import './index.less'
```

## 括号规范
- 关键字后必须有大括号，格式化对对齐（即使代码块的内容只有一行）：if, else, for, while, do, switch, try, catch, finally, with
```javascript
// not good
if (condition) doSomething()
 
// good
if (condition) {
  doSomething()
}
```

## 各类命名

- 组件名

命名方法	 | 举例
---|---
Pascal命名法	 | ThisIsAnApple
场景

- 文件名：使用大驼峰命名法（PascalCase），如 MyComponent.jsx；
- 组件命名：组件名称和文件名一致，如 MyComponent.jsx 里的组件名应该是 MyComponent；一个目录的根组件使用 index.jsx 命名，以目录名称作为组件名称；
- 引用命名：React 组件使用大驼峰命名法（PascalCase）；

```
import MyComponent from './MyComponent'
```


- 各类型命名规范

名称|	命名方法|	词汇种类|	说明|	举例
---|---|---|---|---
局部变量名|	Camel命名法|	名词|		|fristName
全局变量名|	Camel命名法|	名词|	前缀:g|	gFristName
参数名|	Camel命名法|	名词|		|fristName
方法/属性|	Camel命名法|	名词|	|	fristName
私有（保护）成员|	Camel命名法|	名词|	前缀:_|	_fristName
常量名|	名词|	下划线+全体大写|	|	ADD_METHOD
类名|	Pascal命名法|	名词|		|AtiveDic
Bool类型|	Camel命名法|	名词|	前缀:is/has|	hasChild名称

- 函数命名
- 名字应该明确表达改类的作用

动词|	含义|	举例
---|---|---
Can|	判断是否可以执行某个权限|	CanLogin
Has|	判断是否含有某个值|	HasToken
Is|	判断是否为某个值|	IsShowModel
==Get|	获取某个值|	GetUserId==
==Set|	设置某个值|	SetCookie==
Load|	加载某些数据|	LoadList
Update|	更新某些数据|	UpdateUserInfo
Del|	删除某些数据|	DelMenu



## 使用私有属性取代state状态
- 渲染无关的状态，不会进行修改的值，尽量不要放在state中来管理，不然会触发渲染机制，造成性能浪费 例如请求翻页数据的时候,我们都会有个变量。

```javascript
// bad
state: IState = {
  pageNo:1,
  pageSize:10
};
 
// good 
queryParams:Record<string,any> = {
  pageNo:1,
  pageSize:10
}
```

## 渲染默认值（强制）
- 添加非空判断可以提高代码的稳健性,例如后端返回的一些值,可能会出现不存在的情况，应该要给默认值
- 在定义变量时候有时候又给null,ts会强制检查

```javascript
// bad
render(){
  {name}
}
 
// good
render(){
  {name || ''}
}

后端接口
// bad
const { list, totalCount } = await getPeopleList(keyword, page, pageSize);
list 可能是null或者undefined
list.length将直接导致前端报错
 
this.setState({
  status: STATUS.READY,
  list: list,
  total: totalCount,
  page: page,
});
 
 
// good 
const { list, totalCount } = await getPeopleList(keyword, page, pageSize);
this.setState({
  status: STATUS.READY,
  list: list || [],
  total: totalCount || 0,
  page: page,
});

```


## 不确定的属性，访问不存在的属性，需要校验
- 多端接口多为null，数组 字符串
- 不确定这个变量里面到底有什么，但自己觉得有，就疯狂的...,最明显的就是后端返回了一个对象给你，前端拿到之后判断都不判断直接data.dataList.forEach()


```javascript
// bad
const data = await getPeopleList(keyword, page, pageSize);
data.dataList.forEach() // 直接挂了
 
// good
const data = await getPeopleList(keyword, page, pageSize);
if (data && data.dataList && Array.isArray(data.dataList)){
    data.dataList.forEach() 
}
```

- 对所有定义的或者传入的变量，都进行默认设置或者判定是否为undefined，防止数据未定义时程序报错

```javascript
// Bad  
onChange(value => console.log(value.name))  

// not good  
onChange((value) => {   
    if (!value) {
          value = {}
    }    
    console.log(value.name)  
})  

// good  
onChange((value = {}) => console.log(value.name))  

// good  
onChange(value => console.log(value?.name))
```



## 简单常用的数据格式转换 常用
- 把字符串转整型
- 使用转换函数
- 强制类型转换
- 利用js变量弱类型特性进行转换

```javascript
百度一些
parseInt 
Number
Boolean
a*1
```



## 对于常用的属性进行定义 （强制）
- 很多时候写代码,重复使用的变量代码需要定义一次
- 在调用state，props时尽量使用扩展符在顶部解构
```javascript
// bad
this.props.app.openid;
this.state.time
 
// good
const { app } = this.props;
const { time } = this.state;
```

## 不要在 setState 前面加 await
- setState 前面也是可以带 await 的，会变成同步设置状态,但这是一种巧合，不确定未来哪个版本就不支持了，为了遵循 react 框架的设计原则，我们使用回掉函数的形式。


```javascript
// bad
func = async (name, value, status) => {
  await this.setState({
    name
  })
  // TODO
};
 
// good
func = (name, value, status) => {
  this.setState(
    {
      name
    },
    () => {
      // TODO
    }
  )
};
```

## input 输入框使用 trim()

```javascript
// bad
let searchContent = form.search.value
 
// good
let searchContent = form.search.value.trim()
```

## 使用 location 跳转前需要先转义（推荐）
- 这里我遇到过一次小程序携带参数跳转没有转义接收了错误的数据，类似下面的例子
```javascript
/ bad
window.location.href = redirectUrl + '?a=10&b=20'
 
// good
window.location.href = redirectUrl + encodeURIComponent('?a=10&b=20')
```

## 减少魔法数字
- 代码的时候尽量减少一些未知含义的数字，尽量用英文单词。例如type === 0的时候做了一些操作，让人不知所以然
- typescript枚举

```javascript
// bad
if (type !== 0) {
  // TODO
}
 
// good
const STATUS: Record<string, any> = {
  READY: 0,
  FETCHING: 1,
  FAILED: 2
};
 
if (type === STATUS.READY) {
  // TODO
}
 
// best
enum STATUS {
  // 就绪
  READY = 0,
  // 请求中
  FETCHING = 1,
  // 请求失败
  FAILED = 2,
}
```


## key (推荐)
- 对于组件中的 key 优化，起到最大化重用 dom
- 进来使用唯一 不重复的字段，避免使用index

```javascript
//bad
this.state.dataAry.map((item, index) => {
  return <span key={index} />
});
 
//good
this.state.dataAry.map(item => <span key={item.id} />)
```

## for-in 中一定要有 hasOwnProperty 的判断（即禁止直接读取原型对象的属性）
- 说简单点，它能帮你指向你当前循环的对象，而过滤掉原型链上其它对象，因为在工作中我们很难保证其他人是否会修改原型链，这样做会更为保险

```javascript
//bad
const arr = []
const key = ''
 
for (key in obj) {
  arr.push(obj[key])
}
 
//good
const arr = []
const key = ''
 
for (key in obj) {
  if (obj.hasOwnProperty(key)) {
    arr.push(obj[key])
  }
}
```

## 使用函数式组件，拆分代码

```javascript
function RenderHeader(props) =  {
    return (<div />)
  }
 function RenderBody(props) =  {
    return (<div />)
  }
 function RenderFooter(props) =  {
    return (<div />)
  }
function Component （iProps, iState){  
    return(
      <div>
        <RenderHeader />
        <RenderBody />
        <RenderFooter />
      </div>
    )
  }
```


## 代码粒度
- 超过两次使用的代码用函数分离





# TS书写规范

## interface声明顺序（建议）
- 日常用到比较多的是四种，只读参数放第一位，必选参数第二位，可选参数次之，不确定参数放最后，举个🌰

```javascript
interface iProps {
  readonly x: number;
  readonly y: number;
  name: string;
  age: number;
  height?: number;
  [propName: string]: any;
}
```

## interface 拓展
- & 或者 extends
```javascript
interface Name { 
 name: string; 
}
interface User extends Name { 
 age: number; 
}
```

## ts好用的相关工具泛型（推荐）
- 方便大家操作，循环的对象之类
- Record<keys, type> 用这个来声明对象结构的类型 keys 代表键的类型 type代表值的类型


```javascript
用于定义一个javascript的对象，key是字符串，value是任意类型
//bad 
const people:{name：any，age：any,...} = {
    name: 'chengfeng',
    age: 10，
    ...
}
const people:any = {
    name: 'chengfeng',
    age: 10，
    ...
}
//good
const people:Record<string,any> = {
    name: 'chengfeng',
    age: 10
}
```
- Partial作用是将传入的属性变为可选项.

```javascript
定义：type Partial<T> = { [P in keyof T]?: T[P] };

interface data {
  title: String,
  desc: String,
  say?: String
}

const testPartial = (dataOne: data, dataTwo: Partial<data>) => {
  return {...dataOne, ...dataTwo}
}
console.log(testPartial({title: '测试1', desc: '描述1'}, {desc: '我只需要传入一个'}))

定义的结构可以是接口iPeople的任意key

```

- Required 的作用是将传入的属性变为必选项

    ```javascript
        interface iPeople {
            title?: string;
            name?: string;
        }
        
        const people1: Props = { title: 'ts' } // OK
        
        const people22: Required<iPeople> = { title: 'ts' } 
        // Error: property 'name' missing
    ```

## TS 常用的类型断言

```javascript
// bad
function getLength(something: string | number): number {
    return something.length;
}
 
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
 
// bad 
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
 
// good
function getLength(something: string | number): number {
  if (typeof something === 'string') {
    return something.length;
  } else {
    return something.toString().length;
  }
}
用as方式 相当于js的typeof
function getLength(something: string | number): number {
  if ((something as string).length) {
    return something.length;
  } else {
    return something.toString().length;
  }
}

```



## Event 事件对象类型 整理
1. ClipboardEvent<T = Element> 剪贴板事件对象
1. DragEvent<T = Element> 拖拽事件对象
1. ChangeEvent<T = Element> Change 事件对象
1. KeyboardEvent<T = Element> 键盘事件对象
1. MouseEvent<T = Element> 鼠标事件对象
1. TouchEvent<T = Element> 触摸事件对象
1. WheelEvent<T = Element> 滚轮事件对象
1. AnimationEvent<T = Element> 动画事件对象
1. TransitionEvent<T = Element> 过渡事件对象


```javascript
import { MouseEvent } from 'react';
 
interface IProps {
  onClick(event: MouseEvent<HTMLDivElement>): void;
}

```


## HOOKS 两个强制性规则
##### 1. 只在最顶层使用 Hook
记住别在循环，条件或嵌套函数中定义即可，因为hook它必须按顺序执行，它对state的控制才正确。
参考：
https://react.docschina.org/docs/hooks-rules.html
###### 2. 只在 React 函数中调用 Hook：
不要在普通的 JavaScript 函数中调用 Hook，即只能在React的函数组件中调用，另外也可以在自定义hook中调用其它的hook.
这块不多讲，看文档


## 通用规范
- 不要使用 var 声明变量
- 不会被修改的变量使用 const 声明
- 变量解构（数组与数组合并，对象与对象合并，）
- 去除声明但未被引用的代码
- 及时去除log打印
- 不允许有空的代码块
- word-break: break-all; 数字汉子换行
- flex 布局主要自适应 文字过长情况