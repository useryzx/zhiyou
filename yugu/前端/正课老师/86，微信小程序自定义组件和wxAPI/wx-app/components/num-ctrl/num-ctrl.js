
// 微信小程序中，组件也由js,json,wxml,wxss4个文件组成，
// json配置文件中 "component": true, 配置表明了这4个文件组成的是一个组件。

// 在页面或组件的json配置文件中，通过usingComponents配置本页面(组件)需要使用的组件。
// 也可以在全局配置文件app.json中进行全局组件注册。

// 全局样式文件app.wxss只针对所有页面生效，对组件不生效。


// Component函数，注册一个组件


Component({
    /**
     * 组件的属性列表，组件接收的传值
     */
    properties: {
        value:{
            type:Number,
            value:0
        }
    },

    // 组件的数据
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        minusTapped(){
            // 向上发射事件，可以进行数据传递。
            this.triggerEvent("change",this.properties.value-1);
        },

        addTapped(){
            this.triggerEvent("change",this.properties.value+1);
        }
    },

    // 生命周期钩子函数。组件进入页面节点时
    attached(){

    },

    // 组件渲染完毕之后执行
    ready(){

    },

    // 当组件被移除页面节点时
    detached(){

    },

    // 组件所在的页面的生命周期对象，其中可以添加对所在页面的生命周期函数监听
    pageLifetimes:{

    }



})
