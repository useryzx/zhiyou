// pages/user/user.js
// 登陆页面，表单提交访问登陆接口
import {login} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e){

    console.log(e.detail.value);
    login(e.detail.value)
    .then(res=>{
      console.log(res);
      console.log("登陆成功");
      
    })
    .catch(err=>{
      console.log(err);
      console.log('登陆失败');
      
      
    })
  }
})