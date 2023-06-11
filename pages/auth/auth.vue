<template>
	<view class="wrapper">
		<!-- <uni-forms ref="form" :rules=""> -->
		<uni-forms ref="form" label-position="left" :rules="rules" label-width="5rem" label-align="center" :modelValue="form">
			<uni-forms-item label="姓名" name="name"><uni-easyinput v-model="form.name" placeholder="请输入姓名" /></uni-forms-item>
			<uni-forms-item label="身份证号" name="idcode"><uni-easyinput v-model="form.idcode" placeholder="请输入身份证号" /></uni-forms-item>
			<button type="primary" @click="submit('form')">提交</button>
		</uni-forms>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				idcode: ''
			},
			rules: {
				name: {
					rules: [
						{
							required: true,
							errorMessage: '请输入姓名'
						}
					]
				},
				idcode: {
					rules: [
						{
							required: true,
							errorMessage: '请输入身份证号'
						},
						{
							minLength: 18,
							maxLength: 18,
							errorMessage: '请输入18位身份证号'
						},
						{
							pattern: '^([1-6][1-9]|50)\\d{4}(18|19|20)\\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',
							errorMessage: '身份证号格式错误'
						}
					]
				}
			}
		};
	},
	methods: {
		submit(ref) {
			const openid = uni.getStorageSync('openid');
			this.$refs[ref].validate().then(res => {
				console.log(res);
				this.action('auth').then(r => {
					console.log(r);
					uni.showToast({
						icon: 'success',
						title: '认证成功！',
						success() {
							setTimeout(() => {
								uni.navigateBack();
							}, 1500);
						}
					});
				});
			});
		}
	}
};
</script>

<style scoped>
.wrapper {
	margin-top: 2rem;
	margin-left: 1rem;
	margin-right: 1rem;
}
</style>
