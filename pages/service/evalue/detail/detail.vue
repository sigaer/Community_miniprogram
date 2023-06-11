<template>
	<view>
		<view class="tip">
			<view class="" v-if="service.status == 0">
				<img src="/static/wait.png" />
				<text>您的预约正在等待处理，请耐心等待</text>
			</view>
			<view class="" v-else-if="service.status == 1">
				<img src="/static/process.png" />
				<text>您的预约正在处理中...</text>
			</view>
			<view class="" v-else>
				<img src="/static/success.png" />
				<text>您的预约已经处理完毕</text>
			</view>
		</view>
		<view class="content">
			<!-- <text style="color:grey;font-size:12px;padding:30rpx;">预约详情</text> -->
			<uni-list>
				<uni-list-item title="服务类型" :right-text="service.service"></uni-list-item>
				<uni-list-item title="预约时间" :right-text="service.reserveTime"></uni-list-item>
				<uni-list-item title="服务具体内容" :right-text="service.content"></uni-list-item>
			</uni-list>
			<button v-if="service.status == 1" type="primary" @click="finishService" style="width:80%;margin-top:80rpx;">确认服务完毕</button>
			<view class="rateBar">
				<uni-rate :touchable="true" allow-half :size="24" v-if="service.status >= 2" v-model="service.rate" @change="changeRate" :disabled="service.status == 3"></uni-rate>
			</view>
			<button v-if="service.status >= 2" type="primary" @click="submitRate" :disabled="service.status == 3" style="width:80%;margin-top:30rpx;">
				{{ service.status == 3 ? '感谢您的评价！' : '提交评价' }}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			service: {}
		};
	},
	onLoad(option) {
		const sid = option.id;
		this.request({
			url: '/user/service?id=' + sid
		}).then(
			res => {
				console.log(res.data);
				this.service = res.data;
			},
			rea => {
				uni.showToast({
					icon: 'error',
					title: '请检查网络'
				});
			}
		);
	},
	methods: {
		finishService() {
			const copy_service = { ...this.service };
			copy_service['status'] = 2;
			this.request({
				url: '/user/dispatchService',
				method: 'POST',
				data: copy_service
			}).then(r => {
				console.log(r);
				this.action('finishService').then(
					res => {
						uni.showToast({
							icon: 'success',
							title: '确认成功！'
						});
						this.service = { ...copy_service };
					},
					rea => {
						console.log(rea);
						uni.showToast({
							icon: 'error',
							title: '请检查网络'
						});
					}
				);
			});
		},
		changeRate(e) {
			console.log(e.value);
			console.log(this.service);
		},
		submitRate() {
			if(!this.service.rate){
				uni.showToast({
					icon:'error',
					title:'请选择评价'
				})
				return
			}
			this.service.status = 3;
			this.request({
				url: '/user/rateservice',
				method: 'POST',
				data: this.service
			}).then(r => {
				console.log(r);
				this.action('rateService').then(
					res => {
						uni.showToast({
							icon: 'success',
							title: '提交成功'
						});
					},
					rea => {
						uni.showToast({
							icon: 'error',
							title: '请检查网络'
						});
						this.service.status = 2;
					}
				);
			});
		}
	}
};
</script>

<style scoped lang="scss">
.tip {
	width: 100%;
	height: 500rpx;
	text-align: center;
	img {
		width: 350rpx;
		height: 350rpx;
		padding: 50rpx 0 20rpx 0;
	}
	text {
		padding: 20rpx;
		display: block;
		font-weight: bold;
	}
	border-bottom: 1px solid #7c7c7c;
}
.rateBar {
	margin: 30rpx calc(50% - 60px);
}
</style>
