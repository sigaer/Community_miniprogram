<template>
	<view>
		<uni-section title="发布咨询" type="line">
			<view class="example">
				<!-- 自定义表单校验 -->
				<uni-forms ref="customForm" :rules="customRules" :modelValue="form">
					<uni-forms-item label="标题" required name="title"><uni-easyinput v-model="form.title" placeholder="请输入问题标题" /></uni-forms-item>
					<uni-forms-item label="描述" required name="subscription">
						<uni-easyinput type="textarea" v-model="form.subscription" placeholder="请输入问题描述" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('customForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 自定义表单数据
			form: {
				title: '',
				subscription: ''
			},
			// 自定义表单校验规则
			customRules: {
				title: {
					rules: [
						{
							required: true,
							errorMessage: '标题不能为空'
						}
					]
				},
				subscription: {
					rules: [
						{
							required: true,
							errorMessage: '描述不能为空'
						}
					]
				}
			}
		};
	},
	methods: {
		submit(ref) {
			const openid = uni.getStorageSync('openid');
			this.$refs[ref]
				.validate()
				.then(res => {
					console.log('success', res);
					this.request({
						url: '/question',
						method: 'POST',
						data: {
							...this.form,
							c_time: new Date().toLocaleString('chinese', { hour12: false }),
							userid: openid
						}
					}).then(r => {
						console.log(r);
						this.action('publishQuestion').then(
							res => {
								uni.showToast({
									icon: 'success',
									title: `发布成功！`,
									success() {
										setTimeout(() => {
											uni.navigateBack();
										}, 1500);
									}
								});
							},
							err => {
								uni.showToast({
									icon: 'error',
									title: `请检查网络`
								});
							}
						);
					});
				})
				.catch(err => {
					console.log('err', err);
				});
		}
	}
};
</script>

<style scoped>
.example {
	padding: 15px;
	background-color: #fff;
}
</style>
