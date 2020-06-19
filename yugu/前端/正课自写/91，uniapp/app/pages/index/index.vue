<template>
	<view class="content">
		<view class="text-area">
			<input type="text" v-model="title" />
			<text class="title">{{title}}</text>
		</view>
		<view v-for="item in list" class="item" :key="item.id">
			<view class="f-name">
				{{item.name}}
			</view>
			<view class="f-age">
				{{item.age}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list:null
			}
		},
		onLoad() {

		},
		methods: {
			fetchdata() {
				uni.request({
					url: 'http://192.168.5.241:8000/data.json',
					success: res => {
						console.log(res);
						uni.showToast({
							title:"请求成功",
							icon:"success"
						})
						this.list = res.data.data;
					}
				})
			}
		},
		onLoad() {
			this.fetchdata()
		}
	}
</script>

<style scoped>
	.item{
		border-bottom: solid 2rpx #f00;
	}
	
		
	.f-name{
		font-size: 40rpx;
	}
		
	.f-age{
		font-size: 30rpx;
		color: #666;
	}
</style>
