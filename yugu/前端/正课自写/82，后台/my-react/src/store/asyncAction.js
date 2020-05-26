import {
	get,
	post
} from './http.js'
import {
	setUserInfo
} from './action.js'
// 登陆请求
function queryLogin(params) {
	return function (dispatch) {
		return post('/user/login', params)
			.then(res => {
				dispatch(setUserInfo(res.data.userInfo));
				return Promise.resolve(res)
			})
	}
}

function queryIsLogin(){
	return function (dispatch) {
		return get('/user/islogin')
			.then(res => {
				console.log(res);
				dispatch(setUserInfo(res.data.userInfo));
				return Promise.resolve(res)
			})
	}
}
export {
	queryLogin,
	queryIsLogin
}