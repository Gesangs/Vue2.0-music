# Vue2.0全家桶-- Music（1.0）
**vue + vue-router + vuex + axios**


**在线演示**👉 [轻听](www.gesangs.com:3000)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

## 插件

- better-scroll
这可能是移动端最好用的滚动插件了

- jsonp
axios不支持跨域，只好用这货咯

- js-base64 
Decode拉取过来的歌词文件

- lyric-parser
用来控制歌词文件，配合BS还能让歌词动起来

- good-storage
本地存储

## 技术栈

- express
vue-cli用的这货，上线的时候也是用的这货

- webpack
vue-cli自带咯，用起来很顺手，图片转base64啊，热更新啊，模块化打包啊该有的都有

## 一点小总结

在接触vue之前，一直用jq，习惯了频繁的DOM操作，接触vue之初真的很不习惯（在vue里是不提倡DOM操作的，DOM操作是很耗性能的），但是深入以后体会到了vue的轻量，双向绑定，计算属行computed和watch真的不要太爽。

## 难点

1. *异步编程*：因为是在线音乐，涉及到很多数据拉取，异步编程尤为重要，这里没运用好promise，用了很多定时器、$nextTick 导致后端数据交互接有点混论
这个问题将在2.0版本解

2. *组件抽象*：vue的一大特色就是组件化开发，组件的结构设计就很重要了，正确地抽取组件复用组件可以省下很多功夫，同时整体框架也更清晰明朗
