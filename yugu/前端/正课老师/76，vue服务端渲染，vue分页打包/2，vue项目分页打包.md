###单页网站：
整个网站只有一个网页，所有的页面都打包在同一个页面中，使用前端路由方式进行切换。这种切换不会导致浏览器页面跳转，可以添加动画等特效。

vue-cli创建的项目默认就是单页网站，所有的组件和资源都打包到了一套js中，浏览器要一次性下载所有组件。

如果网站规模不大，可以做成单页，但是对于大型网站不适合做单页，因为一次性下载所有组件会导致页面速度加载过慢。

###服务端渲染不属于单页网站：
服务端渲染的网站路由是在服务端进行的，所有的页面切换都是跳转式的。


###分页打包：
将整个vue项目中不同的页面打包到不同的包中，相当于为每一个页面都进行一次单独的打包，最终打包成了多个目录。

1. 通过vue-cli创建的项目，如果要分页打包，那么每个页面都应该放在views文件夹下的一个文件夹中。
每个页面的文件夹中都要包含一个入口文件和一个页面级组件。

2. 修改项目配置文件vue.config.js，添加pages属性，其中要设置每一个页面的入口js文件，使用的模板以及打包之后存储的位置和文件名。
   
```javascript
module.exports = {
    pages:{
        index:{
            entry:"src/views/index/main.js",
            template: 'public/index.html',
            filename:"index.html",
            title:"首页"
        },
        second:{
            entry:"src/views/second/main.js",
            template: 'public/index.html',
            filename:"second/index.html",
            title:"二级页面"
        }
    }
}
```

3. 执行npm run build之后，不同页面就会被打包成不同的html文件。