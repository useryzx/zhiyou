//微信小程序中，组件也由js，json，wxml，wxss，4个文件组成。
// json配置文件中，"component": true,表明了这四个文件组成的是一个组件。
// 在页面或组件的json配置文件中，通过"usingComponents":{"num-ctrl":"/components/num-ctrl/num-ctrl"}使用组件，也可以在全局配置文件app.json中进行全局组件注册。

// 全局样式只能在pages中生效，对components中不生效
// components/num-ctrl/num-ctrl.js

Component({
  /**
   * 组件的属性列表，组件接收的传值
   */
  properties: {
    value:{
      type:Number,
      value:11
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    minusTapped(){
      // 向上发射事件可以进行数据传递
      this.triggerEvent('change',this.properties.value-1);
    },
    addTapped(){
      this.triggerEvent('change',this.properties.value+1);
    },
  },
  // 生命周期钩子函数
  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created() {},
    // 在组件实例进入页面节点树时执行
    attached() {},
    // 在组件在视图层布局完成后执行
    ready() {},
    // 在组件实例被移动到节点树另一个位置时执行
    moved() {},
    // 在组件实例被从页面节点树移除时执行
    detached() {},
    // 每当组件方法抛出错误时执行
    error() {}
  }
})