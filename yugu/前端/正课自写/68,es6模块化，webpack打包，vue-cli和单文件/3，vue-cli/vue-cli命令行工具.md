**vue-cli是vue官方提供的脚手架工具，可以快速创建一个使用webpack打包的单文件组件的项目**
## vue create xxxxx创建一个vue项目
project name：**要求小写**。
description：默认即可。
vue-router：需要。
ESlint：语法检查，初学者可以暂时不需要。
单元测试：暂时也不需要。
e2e test：不需要。

## npm run serve
**启动项目，vue-cli会将当前项目打包，并启动一个http服务区，将打包之后的项目放到服务器中**

#### 项目中
**public**项目启动之后服务器的静态文件夹
**src**文件夹中是项目的源代码
**assets**文件夹中存放项目的静态资源(图片，字体文件等),assets中的文件会参与打包，也就是说 assets中的文件可以在代码中通过import引用
**components**文件夹存放非页面级组件
**views**文件夹中存放页面级组件
**App.vue**是项目的入口组件，可以简单认为是根组件
**main.js**是整个项目的入口文件，也就是webpack打包的入口文件。


