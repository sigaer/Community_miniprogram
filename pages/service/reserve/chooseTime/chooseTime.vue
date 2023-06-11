<template>
	<view>
		<uni-section title="选择预约时间" type="line">
			<uni-calendar @change="changeDate"></uni-calendar>
			<view style="padding-left:0.5em;margin-bottom:0.5em">
				<uni-list>
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
							<view style="margin:0.6em 0;">
								<radio :value="item.value" :checked="index === value" />
								{{ item.text }}
							</view>
						</label>
					</radio-group>
				</uni-list>
			</view>
			<view style="padding:0 1em"><uni-easyinput type="textarea" v-model="content" placeholder="输入服务的具体内容,可以不写" /></view>
			<button type="primary" style="margin:1em;" @click="submit">提交</button>
		</uni-section>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: 0,
			items: [
				{ value: 0, text: '8:00' },
				{ value: 1, text: '9:00' },
				{ value: 2, text: '10:00' },
				{ value: 3, text: '11:00' },
				{ value: 4, text: '12:00' },
				{ value: 5, text: '13:00' },
				{ value: 6, text: '14:00' },
				{ value: 7, text: '15:00' },
				{ value: 8, text: '16:00' },
				{ value: 9, text: '17:00' },
				{ value: 10, text: '18:00' },
				{ value: 11, text: '19:00' },
				{ value: 12, text: '20:00' }
			],
			parent: '',
			sub: '',
			content: '',
			fulldate: undefined
		};
	},
	onLoad(option) {
		this.parent = option.parent;
		this.sub = option.sub;
		const date = new Date();
		this.fulldate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
	},
	methods: {
		radioChange(e) {
			console.log('e:', e);
			this.value = parseInt(e.detail.value);
		},
		changeDate(e) {
			this.fulldate = e.fulldate.replaceAll('-', '/');
			console.log(this.fulldate);
		},
		submit() {
			const userid = uni.getStorageSync('openid');
			const reserveTime = this.fulldate + ' ' + this.items[this.value].text;
			if (Date.now() >= Date.parse(reserveTime)) {
				uni.showToast({
					icon: 'error',
					title: '请确认时间'
				});
				return;
			}
			const content = this.content;
			const service = this.parent + ' ' + this.sub;
			const data = {
				userid,
				reserveTime,
				content,
				service
			};
			console.log(data);
			this.request({
				url: '/user/service',
				method: 'post',
				data: {
					userid,
					reserveTime,
					content,
					service
				}
			}).then(r => {
				console.log(r);
				this.action('reserveService').then(
					res => {
						uni.showToast({
							icon: 'success',
							title: '预约成功！',
							success() {
								setTimeout(() => {
									uni.navigateBack({
										delta: 2
									});
								}, 1500);
							}
						});
					},
					rea => {
						uni.showToast({
							icon: 'error',
							title: '请检查网络'
						});
					}
				);
			});
		}
	}
};
</script>

<style scoped>
.uni-list-cell {
	justify-content: flex-start;
}
</style>
