# mhm

> A Vue.js project

## Build Setup

``` bash
#新建项目
vue init webpack mhm

#进入mhm项目
cd mhm

#启动vue运行的环境
npm run dev

#安装axios 
npm install axios --save

#安装less与全局less的使用
npm install less less-loader
npm install sass-resources-loader --save-dev

#安装vuex
npm install vuex --save

#安装vue 优化组件
npm install vue-meta-info --save

#安装swpier
npm install vue-awesome-swiper --save 

#打包上线
npm run build
```
```
#百度商桥 点击失效问题解决
#因为id的唯一性，使得ins点击事件失效，打开打包好的未上传前的index.html文件，删除预渲染出来的ins标签，这样上线后，百度代码再次渲染，就避免了ins标签重复问题。点击失效问题也就自然而然解决了。

#单页面 收录问题
cnpm install --save prerender-spa-plugin
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
