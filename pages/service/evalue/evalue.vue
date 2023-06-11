<template>
	<view>
		<uni-section title="我的服务记录" type="line">
			<uni-list>
				<uni-list-item v-for="item in list" :key="item.id" showArrow :title="item.service" :note="item.content" link :to="'./detail/detail?id='+item.id" :right-text="item.reserveTime"/>
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
		onLoad(){
			this.request({
				url:'/user/servicelist'
			}).then(res=>{
				console.log(res.data)
				this.list=res.data.sort((a,b)=>Date.parse(b.reserveTime)-Date.parse(a.reserveTime))
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
