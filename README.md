## 后台管理系统框架(vue版本)
为了方便以后的开发流程 开发了一套vue为基础的后台管理系统框架
项目的整体结构如下所示

```
├── build                      webpack的配置和loader配置
├── config                     一些开发配置
├── node_modules               node模块目录
├── src                        所有和页面相关资源
│   ├── api                    api文件夹
│   ├── assets                 资源文件
│   ├── components             自己封装的一些组件
│   ├── constants              项目所需常量
│   │   ├── city.js            城市三级联动
│   │   ├── urls.js            接口文件
│   ├── mock                   mock数据的存放地址
│   ├── pages                  所有页面文件
│   ├── router                 
│   │   ├── index.js           路由配置信息
│   ├── util 
│   │   ├── utils.js           封装的工具方法
│   ├── App.vue                主容器文件
│   ├── main.js                项目入口文件
├── .babelrc                   
├── .eslintignore              
├── .eslintrc                  
├── .gitignore
├── package.json               
├── README.md
```

## Quick Start
* 项目拉下来之后 

    ```
    安装依赖
    yarn || npm install
    启动服务
    yarn || npm start
    ```
* 此单页面app可以配合后台使用 烦请各位移步至<br>[https://github.com/xinghe94/node-server]
按照流程部署<br>
最终效果如下
![效果图](https://github.com/xinghe94/markdownimg/blob/master/vue_admin.gif)
    
**demo**: [https://github.com/xinghe94/vue-admin]<br>
有任何vue方面问题可以加我git地址上企鹅联系我 欢迎探讨

