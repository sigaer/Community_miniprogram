<template>
	<view>
		<view class="top">
			<img :src="avatar" style="width:3rem;height:3rem" />
			<text>
				王铁锋
				<text style="color:#7c7c7c;margin-left:5px;">23岁</text>
			</text>
		</view>
		<uni-card title="个人信息" thumbnail="/static/default/user.png">
			<uni-table stripe emptyText="暂无更多数据">
				<!-- 				<uni-tr>
					<uni-th align="center"></uni-th>
				</uni-tr> -->
				<uni-tr>
					<uni-td>姓名</uni-td>
					<uni-td></uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>性别</uni-td>
					<uni-td></uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>身份证号</uni-td>
					<uni-td></uni-td>
				</uni-tr>
			</uni-table>
		</uni-card>

		<uni-card title="体检记录" thumbnail="/static/default/detail.png"  @click="jump()">
				<!-- 				<uni-tr>
					<uni-th align="center"></uni-th>
				</uni-tr> -->
				<uni-tr>
					<uni-td>点击查看详情</uni-td>
					<uni-td></uni-td>
				</uni-tr>
<!-- 				<uni-tr>
					<uni-td>体重</uni-td>
					<uni-td></uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>血糖</uni-td>
					<uni-td></uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>血脂</uni-td>
					<uni-td></uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>肝功能</uni-td>
					<uni-td></uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>血常规</uni-td>
					<uni-td></uni-td>
				</uni-tr> -->
			<!-- </uni-table> -->
		</uni-card>
		<uni-card title="身体状态" thumbnail="/static/default/heart.png">
			<uni-tr>
				<uni-td>血压</uni-td>
				<uni-td></uni-td>
			</uni-tr>
			<uni-tr>
				<uni-td>心率</uni-td>
				<uni-td></uni-td>
			</uni-tr>
			<!-- <uni-tr>
					<uni-td>血常规</uni-td>
					<uni-td></uni-td>
				</uni-tr> -->
		</uni-card>
		<uni-card title="疫苗接种情况" thumbnail="/static/default/pushpin.png">
			<uni-table stripe emptyText="暂无更多数据">
				<!-- 				<uni-tr>
					<uni-th align="center"></uni-th>
				</uni-tr> -->
				<!-- 				<uni-tr>
					<uni-td>姓名</uni-td>
					<uni-td></uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>性别</uni-td>
					<uni-td></uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>身份证号</uni-td>
					<uni-td></uni-td>
				</uni-tr> -->
			</uni-table>
		</uni-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatar: ''
		};
	},
	onShow() {
		const { avatar } = JSON.parse(uni.getStorageSync('userinfo'));
		console.log(avatar);
		this.avatar = avatar;
	},
	methods: {
		jump(){
			uni.navigateTo({
				url:'/pages/me/archive/checkf/checkf'
			})
		}
	}
};
</script>

<style scoped>
.top {
	display: flex;
	border-bottom: 5px #cccccc solid;
	justify-content: space-evenly;
	align-items: center;
	height: 6rem;
}
</style>
