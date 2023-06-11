<template>
	<view>
		<div class="top_search">
			<uni-search-bar placeholder="搜索想要咨询的问题" bgColor="#EEEEEE" @confirm="search" @input="search" v-model="prompt"/>
			<view class="sort_method">
				<image src="/static/sort.png" style="width:24px;height:24px;padding:0 10px;"></image>
				<text @click="sortList('rate')">按相关性排序</text>
				<text @click="sortList('time')">按发布时间排序</text>
			</view>
		</div>
		<div style="height:90px"></div>
		<uni-list><uni-list-item v-for="item in questionList" :key="item.id" link showArrow @click="jumpTo(item)" :title="item.title" :note="item.subscription" /></uni-list>
		<view class="tips">
			<div class="tip_message">
				没找到问题？
				<br />
				点击这里提问吧
			</div>
			<div class="triangle"></div>
		</view>
		<uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" @fabClick="fabClick" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			pattern: {
				color: '#7A7E83',
				backgroundColor: '#fff',
				selectedColor: '#007AFF',
				buttonColor: '#007AFF',
				iconColor: '#fff'
			},
			questionList: [],
			prompt:''
		};
	},
	onShow() {
		this.request({
			url: '/question'
		}).then(
			res => {
				console.log(res.data);
				this.questionList = res.data;
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
		fabClick() {
			uni.navigateTo({
				url: '/pages/consult/createQuestion/createQuestion'
			});
			uni.showToast({
				title: '点击了悬浮按钮',
				icon: 'none'
			});
		},
		jumpTo(question) {
			uni.navigateTo({
				url: '/pages/question/question?id=' + question.id
			});
		},
		sortList(sortMethod){
			if(sortMethod === 'rate' && this.prompt === ''){
				uni.showToast({
					icon: 'error',
					title: '请先搜索'
				});
			}
			else if(sortMethod === 'time'){
				this.questionList.sort((a, b) => Date.parse(b.c_time) - Date.parse(a.c_time))
			}
			else{
				this.questionList.sort((a, b) => b.rating - a.rating)
			}
		},
		search(prompt) {
			console.log(prompt);
			this.request({
				url: '/question/search?prompt=' + prompt
			}).then(
				res => {
					console.log(res.data);
					this.questionList = res.data;
				},
				rea => {
					uni.showToast({
						icon: 'error',
						title: '请检查网络'
					});
				}
			);
		}
	}
};
</script>

<style scoped>
.sort_method {
	display: flex;
	justify-content: space-around;
	padding:10rpx 0 20rpx 0;
}
.top_search {
	position: fixed;
	top: 0;
	z-index: 10;
	width: 100%;
	background-color: #ffffff;
}
.tips {
	font-size: 12px;
	position: fixed;
	z-index: 10;
	width: 300rpx;
	/* height:42px; */
	right: 75px;
	bottom: calc(42px - 10rpx);
}
.tip_message {
	padding: 10rpx;
	display: inline-block;
	background-color: #39c5bb;
	border-radius: 8px;
	width: 260rpx;
}
.triangle {
	display: inline-block;
	width: 0;
	height: 0;
	border-top: 20rpx solid transparent;
	border-bottom: 20rpx solid transparent;
	border-left: 20rpx solid #39c5bb;
}
</style>
