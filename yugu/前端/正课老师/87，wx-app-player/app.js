//app.js

import {http} from "./utils/util.js";

import api from "./api.js";

import globalData from "./globalData.js";

App({
	onLaunch: function () {
		http(api.loginStatus)
		.then(res=>{
			// console.log(res);
			if(res.data.code==200){
				// this.globalData.isLogin = true;
				// this.globalData.userInfo = res.data.profile;
				this.globalData.setData({
					isLogin:true,
					userInfo:res.data.profile
				});
			}else{
				// this.globalData.isLogin = false;
				this.globalData.setData({
					isLogin:false,
				});
			}
		})
	},

	globalData:globalData
})