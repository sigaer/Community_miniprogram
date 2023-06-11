<template>
	<view>
		<uni-section title="我发布的问题" type="line">
			<uni-list>
				<uni-list-item v-for="item in list" :key="item.id" :title="item.title" :note="item.subscription" :right-text="item.cTime" showArrow :to="'/pages/question/question?id='+item.id" />
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			const openid = uni.getStorageSync('openid')
			this.request({
				url:'/user/questionlist?openid='+openid
			}).then(res=>{
				console.log(res.data.questionlist)
				this.list=res.data.questionlist
			},rea=>{
				uni.showToast({
					icon:'error',
					title:'请检查网络'
				})
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
