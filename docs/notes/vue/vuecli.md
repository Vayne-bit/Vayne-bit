# Vue CLI

## Vue CLI介绍

- 基于Vue进行快速开发的完整系统

### 安装Vue CLI

```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

完成之后可以使用以下命令进行验证

```sh
vue --version
```

### 创建一个脚手架项目

- 使用以下命令进行创建

```sh
vue create hello-world(这是项目名称)
```

- 然后进行默认模板或者自定义模板的选择

## vue.config.js配置参考

- 这里只写一部分 详细参考[官网API](https://cli.vuejs.org/zh/config/#vue-config-js)

### publicPath

- 替代了BaseUrl 部署应用包时的基本 URL。

- 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。

- 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径

```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
}
```

### devServer.proxy

- 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': { // 匹配访问路径中含有 '/api' 的路径
        target: '<url>', // 目标路径
        ws: true, // 是否开启 webSocket 代理
        changeOrigin: true, // 将主机标头的原点更改为目标URL
        pathRewrite: { // 请求路径重写
          '^/api': '' //重写请求路径
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
```