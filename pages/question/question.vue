<template>
	<view>
		<view class="top">
			<view class="title">{{ question.title }}</view>
			<view class="c_time">发布于 {{ question.c_time }}</view>
		</view>
		<view class="content">{{ question.subscription }}</view>
		<view class="comment">
			<view class="answer_count">{{ answerList.length }} 回答</view>
			<view class="answer" v-for="item in answerList" :key="item.id">
				<view class="answer_left">
					<img :src="favorImgList[item.favorStatus === 1 ? 1 : 0]" alt="" @click="favor(item, $event)" />
					{{ item.likes }}
					<img :src="unfavorImgList[item.favorStatus === -1 ? 1 : 0]" alt="" @click="unfavor(item, $event)" />
				</view>
				<view class="answer_right">
					<view class="sender_info">
						<img :src="item.sender_avatar" />
						<text>{{ item.sender_name }}</text>
					</view>
					<view class="main_content">{{ item.content }}</view>
					<view class="footer">{{ item.c_time }}</view>
				</view>
			</view>
		</view>
		<view class="bottom_blank"></view>
		<view class="comment_bar">
			<view class="input_wrapper"><uni-easyinput type="textarea" auto-height v-model="comment" placeholder="输入评论" /></view>
			<button type="primary" size="mini" style="margin:0" @click="sendComment">发送</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			openid: '',
			question: {},
			answerList: [],
			favorImgList: ['/static/default/up.png', '/static/favor.png'],
			unfavorImgList: ['/static/default/down.png', '/static/unfavor.png'],
			comment: ''
		};
	},
	onLoad(res) {
		this.openid = uni.getStorageSync('openid');
		this.request({
			url: '/question/id/' + res.id
		}).then(res => {
			console.log(res.data);
			this.question = res.data;
		});
		console.log(res);
		let tmpList = [];
		this.request({
			url: '/question/comment?id=' + res.id
		}).then(res => {
			console.log(res.data);
			tmpList = res.data;
		});
		this.request({
			url: '/user/info',
			method: 'POST',
			data: {
				openid: this.openid
			}
		}).then(res => {
			const info = res.data.data;
			const favorList = JSON.parse(info.favorList);
			const unfavorList = JSON.parse(info.unfavorList);
			let favorCursor = 0;
			let unfavorCursor = 0;
			console.log(JSON.stringify(tmpList));
			// 遍历算法，寻找问题下面是否有用户点赞/点踩操作过的评论，复杂度O(n)
			// 依赖于favorList、unfavorList和tmpList的id有序性
			for (let comment of tmpList) {
				let id = comment.id;
				let favorId = favorCursor >= favorList.length ? -1 : favorList[favorCursor];
				let unfavorId = unfavorCursor >= unfavorList.length ? -1 : unfavorList[unfavorCursor];
				let flag = id == favorId ? 1 : id == unfavorId ? 2 : 0;
				if (flag) {
					//用户有过点赞/踩操作
					//按操作移动对应数组指针
					flag & 1 ? favorCursor++ : unfavorCursor++;
					//赋值，标记用户操作
					comment['favorStatus'] = flag & 1 ? 1 : -1;
				} else {
					//用户没有点赞/踩操作
					if (id < Math.min(favorId, unfavorId)) {
						//当前评论id小于用户有过操作的最小id
						//继续检查下一条评论
						continue;
					} else if (id > Math.max(favorId, unfavorId)) {
						//当前评论id大于用户有过操作的最大id
						//遍历两个用户操作数组，直到有更大id出现或遍历结束
						while (id > Math.max(favorId, unfavorId) && (favorId !== -1 || unfavorId !== -1)) {
							favorCursor++;
							unfavorCursor++;
							favorId = favorCursor >= favorList.length ? -1 : favorList[favorCursor];
							unfavorId = unfavorCursor >= unfavorList.length ? -1 : unfavorList[unfavorCursor];
						}
						if (favorId === -1 && unfavorId === -1) {
							//超出数组上限
							break;
						} else {
							//找到更大的id
							flag = id == favorId ? 1 : id == unfavorId ? 2 : 0;
							if (flag) {
								//用户有过操作，和之前一样
								flag & 1 ? favorCursor++ : unfavorCursor++;
								comment['favorStatus'] = flag & 1 ? 1 : -1;
								continue;
							} else if (id < Math.min(favorId, unfavorId)) {
								//用户没有点赞/踩操作，同上
								continue;
							} else {
								//当前评论id处在两个数组目前指向id的中间，分别检查
								if (id > favorId) {
									//favor < 当前评论id < unfavor
									while (id > favorId && favorId !== -1) {
										//继续遍历favorList，直到不小于当前评论id
										favorCursor++;
										favorId = favorCursor >= favorList.length ? -1 : favorList[favorCursor];
									}
									if (id === favorId) {
										comment['favorStatus'] = 1;
									}
								} else {
									//unfavor < 当前评论id < favor
									while (id > unfavorId && unfavorId !== -1) {
										//继续遍历unfavorList，直到不小于当前评论id
										unfavorCursor++;
										unfavorId = unfavorCursor >= unfavorList.length ? -1 : unfavorList[unfavorCursor];
									}
									if (id === unfavorId) {
										comment['favorStatus'] = -1;
									}
								}
							}
						}
					} else {
						//当前评论id处在两个数组目前指向id的中间，同上
						if (id > favorId) {
							while (id > favorId && favorId !== -1) {
								favorCursor++;
								favorId = favorCursor >= favorList.length ? -1 : favorList[favorCursor];
							}
							if (id === favorId) {
								comment['favorStatus'] = 1;
							}
						} else {
							while (id > unfavorId && unfavorId !== -1) {
								unfavorCursor++;
								unfavorId = unfavorCursor >= unfavorList.length ? -1 : unfavorList[unfavorCursor];
							}
							if (id === unfavorId) {
								comment['favorStatus'] = -1;
							}
						}
					}
				}
			}
			console.log(this.answerList);
			tmpList.sort((a,b)=>b.likes-a.likes)
			this.answerList = tmpList;
		});
		console.log(res);
	},
	methods: {
		favor(comment, e) {
			console.log(this.answerList);
			// console.log(e.currentTarget.id)
			if (comment.favorStatus === -1) {
				comment.likes += 2;
				comment.favorStatus = 1;
			} else if (comment.favorStatus === 1) {
				comment.likes--;
				comment.favorStatus = 0;
			} else {
				comment.likes++;
				comment.favorStatus = 1;
			}
			this.request({
				url: '/user/favorQuestion',
				method: 'POST',
				data: {
					openid: this.openid,
					comment_id: comment.id,
					question_id: this.question.id
				}
			}).then(
				res => {
					console.log(res);
				},
				rea => {
					uni.showToast({
						icon: 'error',
						title: '请检查网络'
					});
				}
			);
		},
		unfavor(comment) {
			console.log();
			if (comment.favorStatus === -1) {
				comment.likes++;
				comment.favorStatus = 0;
			} else if (comment.favorStatus === 1) {
				comment.likes -= 2;
				comment.favorStatus = -1;
			} else {
				comment.likes--;
				comment.favorStatus = -1;
			}
			this.request({
				url: '/user/unfavorQuestion',
				method: 'POST',
				data: {
					openid: this.openid,
					comment_id: comment.id,
					question_id: this.question.id
				}
			}).then(
				res => {
					console.log(res.data);
					uni.showToast({
						icon: 'success',
						title: 'ok'
					});
				},
				rea => {
					uni.showToast({
						icon: 'error',
						title: '请检查网络'
					});
				}
			);
		},
		sendComment() {
			const postdata = {
				question_id: this.question.id,
				sender_id: this.openid,
				c_time: new Date().toLocaleString('chinese', { hour12: false }),
				content: this.comment,
				likes: 0
			};
			this.request({
				url: '/user/comment',
				method: 'POST',
				data: postdata
			}).then(r => {
				console.log(r);
				this.action('publishComment').then(
					res => {
						uni.showToast({
							icon: 'success',
							title: '发布评论成功！'
						});
						this.comment = '';
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/question/question?id=' + this.question.id
							});
						}, 1500);
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

<style scoped lang="scss">
.title {
	font-weight: bold;
	font-size: 22px;
	margin-top: 16rpx;
	padding: 0 16rpx;
}
.content {
	border-top: 1px solid #e3e6e8;
	border-bottom: 1px solid #e3e6e8;
	font-size: 20px;
	text-indent: 1em;
	padding: 0.5em 0;
	margin: 0 0.5em;
	min-height: 400px;
}
.c_time {
	text-indent: 0.5em;
	margin: 0.3em 0;
}
.answer {
	display: flex;
	padding: 0.5em 0;
	border-bottom: 1px solid #e3e6e8;
	align-items: center;
}
.answer_left {
	display: flex;
	flex-direction: column;
	text-align: center;
	margin: 5rpx 20rpx 0 25rpx;
	// width:40px;
	image {
		width: 36px;
		height: 36px;
	}
}
.answer_right {
	padding-top: 5rpx;
}
.main_content {
	min-height: 160rpx;
	padding: 10rpx 0 30rpx 0;
}
.footer {
	color: grey;
	font-size: 12px;
}
.sender_info {
	display: flex;
	image {
		width: 64rpx;
		height: 64rpx;
		border-radius: 10%;
		margin-right: 20rpx;
		margin-top: 5rpx;
	}
	align-items: center;
	margin-bottom: 15rpx;
}
.answer_count {
	font-weight: 800;
	margin: 0.5em 1em;
}
.bottom_blank {
	height: calc(92px + 1.2em);
}
.comment_bar {
	background-color: rgba(233, 233, 233, 1);
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	// height:calc(80px + 2em);
	padding: 0.6em 0 0.6em 0;
	align-items: center;
	justify-content: space-evenly;
}
.input_wrapper {
	width: 550rpx;
}
</style>
