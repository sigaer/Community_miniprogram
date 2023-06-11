<template>
	<view>
		<uni-section title="我的健康档案" type="line">
			<uni-list>
				<uni-list-item title="我的健康状况" showArrow link to="./detail/detail" />
				<uni-list-item title="历史记录" showArrow link to="./history/history" />
				<uni-list-item title="添加身体数据" showArrow link to="./addinfo/addinfo" />
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
