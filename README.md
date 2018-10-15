# timoral

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



===========================

###########环境依赖
node v0.10.28+
reids ~

###########部署步骤
1. npm install  //安装node运行环境

2. npm run build   //前端编译,打上线包

4. 域名修改配置
    src/utils/config.js


###########目录结构描述
├── Readme.md                   // help
├── app                         // 应用
├── config                      // 配置
│   ├── index.js               // 配置控制
│   ├── dev.env.js             // 开发环境
│   └── prod.env.js            // 生产环境
├── src
│   ├── assets                 // 静态资源
│   ├── components             // 组件
│   └── mock
│   ├── router                 // 路由
│   └── store                  //状态管理
│   ├── utils                  // 共用js
│   └── views                  // 页面
│   ├── app.vue
│   └── main.js
├── doc                         // 文档
├── node_modules
├── package.json
├── postcssrc.js
├── static                      // web静态资源加载
│   └── resources
├── babelrc
├── editorconfig
└── index.html
