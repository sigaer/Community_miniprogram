<template>
	<view>
		<!-- 聊天列表 -->
		<view class="main">
			<scroll-view id="scrollview" scroll-y :scroll-top="scrollTop" :scroll-with-animation="true" :style="{ height: style.contentH + 25 + 'px' }">
				<view v-for="(e, index) in chatlist" :key="index" class="chat-item">
					<view class="left msg" v-if="e.sender != openid && e.sender != 'system'">
						<image :src="e.avatar" class="avatar"></image>
						<view class="nr" @click="playRecord(e)">
							<view class="newmsg">
								<img :src="e.newmsg" v-if="e.type === 'image'" mode="aspectFill" style="max-height:150rpx" />
								<video :src="e.newmsg" v-else-if="e.type === 'video'"></video>
								<rich-text :nodes="textHandler(e)" v-else-if="e.type == 'message'"></rich-text>
								<!-- 								<view v-html="textHandler(e)"></view> -->
								<text v-else-if="e.type == 'record'" @longpress="recordToText(e)">{{ e.newmsg + '" ' }}</text>
								<img src="../../static/recordMsg.png" mode="aspectFit" v-if="e.type == 'record'" style="width:28rpx;height:28rpx;" />
							</view>
							<view class="nt">{{ e.username }} {{ timeFormat(e.createdAt) }}</view>
						</view>
					</view>
					<view class="right msg" v-else-if="e.sender == openid">
						<image :src="e.avatar" class="avatar"></image>
						<view class="nr">
							<view class="newmsg" @click="playRecord(e)" @touchstart="touchstart" @touchend="touchend" @longpress="recordToText(index)">
								<img :src="e.newmsg" v-if="e.type === 'image'" mode="aspectFill" style="max-height:150rpx" @click="previewImage(e.newmsg)" />
								<video :src="e.newmsg" v-if="e.type === 'video'" autoplay controls></video>
								<rich-text :nodes="textHandler(e)" v-if="e.type == 'message'"></rich-text>
								<!-- 								<view v-html="textHandler(e)"></view> -->
								<text v-if="e.type == 'record'" style="padding-right:0.2rem">{{ e.newmsg + '"' }}</text>
								<img src="../../static/recordMsg.png" mode="aspectFit" v-if="e.type == 'record'" style="width:28rpx;height:28rpx;" />
							</view>
							<view class="nt">{{ e.username }} {{ timeFormat(e.createdAt) }}</view>
							<view class="transferView" v-if="e.type === 'record' && e.showMenu">
								<zero-loading type="pulse" position="absolute" v-if="e.transferText === undefined"></zero-loading>
								<text v-else>{{e.transferText}}</text>
							</view>
						</view>

						<image src="/static/warning.png" style="width:48rpx;height:48rpx;align-self: center;margin-right:10rpx;" @click="resendMsg(e)" v-if="e.err"></image>
					</view>
					<view class="center" v-else>
						<view class="inner">{{ e.name }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="send">
			<image :src="imgPath" mode="aspectFit" @tap="changeMode" style="margin-left:16rpx"></image>
			<textarea
				type="text"
				confirm-type="send"
				class="chat-send"
				v-model="newmsg"
				auto-height="true"
				show-confirm-bar="false"
				maxlength="-1"
				v-if="inputMode == 'text'"
				style="text-align:left"
			/>
			<view :class="chatStyle" @longpress="recordMsg($event)" @touchend="sendRecordMsg" v-else>按住 说话</view>
			<image src="/static/default/image.png" mode="aspectFit" @click="chooseMedia" style="margin-right:16rpx"></image>
			<image src="/static/default/smile.png" mode="aspectFit" @click="toggleShow" style="margin-right:16rpx"></image>
			<image src="../../static/send.png" mode="aspectFit" @tap="sendMsg" style="margin-right:16rpx"></image>
			<view class="emoji-panel" v-if="isShow">
				<!-- <ul class="emoji-list">
					<li class="emoji-item" v-for="(item, i) in expressions" :key="i" @click.stop="pickerEmoji(item)"> -->
				<image :src="baseUrl + item.url" :alt="item.title" :title="item.title" v-for="(item, i) in expressions" :key="i" @click.stop="pickerEmoji(item)" />
				<!-- 					</li>
				</ul> -->
			</view>
		</view>
		<view class="bg" @tap="outotoChat" :style="{ display: bg }"></view>
	</view>
</template>

<script>
import { expressions } from '../../utils/emoji.js';
import { EMOJI_BASE_URL } from '../../utils/config.js';
export default {
	data() {
		return {
			baseUrl: EMOJI_BASE_URL,
			recordOption: {
				duration: 60000,
				sampleRate: 16000,
				numberOfChannels: 1,
				encodeBitRate: 96000,
				format: 'mp3'
			},
			newmsg: '', //消息内容
			name: '', //用户名称
			avatar: '', //用户头像
			openid: '', //用户id
			// uname: '',
			// fid: '',
			uid: 'a',
			chatlist: [], //聊天内容
			member: 0, //成员个数
			animationData: {},
			bb: false,
			bg: 'none',
			users: '',
			userlist: [],
			otochat: [],
			scrollTop: 0,
			style: {
				contentH: 0,
				itemH: 0
			},
			socketOpen: false,
			socket: undefined,
			inputMode: 'text',
			imgPath: '../../static/record.png',
			recorderManager: undefined,
			recordStart: undefined,
			recordEnd: undefined,
			audioManager: undefined,
			chatStyle: 'chat-send',
			isShow: false,
			expressions: expressions.slice(0, 59),
			touchT: 0,
			touchE: 0
		};
	},
	onLoad() {
		console.log(expressions);
		console.log(this.baseUrl);
		this.recorderManager = uni.getRecorderManager();
		this.audioManager = uni.createInnerAudioContext();
		this.recorderManager.onStop(res => {
			console.log('recorder stop' + JSON.stringify(res));
			console.log(res.tempFilePath);
			console.log(res.duration);
			if (res.duration < 1000) {
				uni.showToast({
					icon: 'error',
					title: '讲话时间太短'
				});
				return;
			}
			//关联自己的uniCloud服务空间
			uniCloud.uploadFile({
				cloudPath: `${new Date().getTime()}.mp3`,
				filePath: res.tempFilePath,
				onUploadProgress: progressEvent => {
					console.log(progressEvent);
					var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					console.log(percentCompleted);
				},
				success: r => {
					console.log('Upload successfully');
					const uploadUrl = r.fileID;
					console.log(uploadUrl);
					let onemsg = {
						type: 'record',
						duration: res.duration,
						record: uploadUrl,
						newmsg: Math.round(res.duration / 1000),
						username: this.name,
						avatar: this.avatar,
						createdAt: new Date().getTime(),
						sender: this.openid
					};
					let data = {
						record: uploadUrl,
						msg: Math.round(res.duration / 1000),
						createdAt: new Date().getTime(),
						sender: this.openid
					};
					this.chatlist.push(onemsg);
					console.log(this.chatlist);
					this.newmsg = ''; //清空
					// this.socket.emit('message', data);
					console.log(this.socketOpen);
					if (this.socketOpen) {
						uni.sendSocketMessage({
							data: JSON.stringify({
								event: 'message',
								data: {
									roomid: 'chatroom',
									content: {
										type: 'record',
										...data
									}
								}
							}),
							success: res => {
								console.log(res);
								this.pageToBottom();
							}
						});
					} else {
						//do some tips
					}
				}
			});
			console.log(this.recordEnd - this.recordStart);
		});
		const userinfo = uni.getStorageSync('userinfo');
		if (!userinfo) {
			uni.showToast({
				icon: 'error',
				title: '网络错误'
			});
			return;
		}
		const { username, avatar } = JSON.parse(userinfo);
		this.name = username;
		this.avatar = avatar;
		// uni.getStorage({
		// 	key:'openid',
		// 	success(res) {
		// 		console.log(res);
		// 		console.log(res.data);
		// 	},
		// 	fail(err) {
		// 		console.log(err);
		// 	}
		// })
		// 创建WebSocket连接
		const socketTask = uni.connectSocket({
			url: '', // 你的WebSocket服务器地址和端口
			success(res) {
				console.log('Success');
			},
			fail(err) {
				console.log('Error');
			}
		});

		// 监听WebSocket连接成功事件
		socketTask.onOpen(() => {
			console.log('WebSocket连接成功');
			this.socketOpen = true;
			this.socket = socketTask;
			this.openid = uni.getStorageSync('openid');
			uni.sendSocketMessage({
				data: JSON.stringify({
					event: 'message',
					data: {
						content: {
							type: 'pre',
							msg: this.openid
						}
					}
				})
			});
		});
		// 监听WebSocket接收到服务器的消息事件
		socketTask.onMessage(res => {
			const content = JSON.parse(res.data);
			console.log('收到服务器的消息：', content);
			if (content.code) {
				this.userlist = content.users;
				const preChatlist = content.message.map(value => {
					const chat = {
						avatar: value['avatar'],
						username: value['username'],
						...value['content']
					};
					chat['newmsg'] = chat['msg'];
					delete chat['msg'];
					return chat;
				});
				let cacheChatlist = JSON.parse(uni.getStorageSync('chatlist') || '[]');
				cacheChatlist = cacheChatlist.map((v)=>{
					if(v.record){
						delete v.showMenu
					}
					return v
				})
				this.chatlist = cacheChatlist.concat(preChatlist).sort((a, b) => a.createdAt - b.createdAt);
			} else {
				const msg = content.content;
				const sender = this.userlist.find(value => value.openid === msg.sender);
				msg['newmsg'] = msg['msg'];
				delete msg['msg'];
				if (sender) {
					msg['avatar'] = sender.avatar;
					msg['username'] = sender.username;
				} else {
					msg['avatar'] = '/static/images/f.png';
					msg['username'] = '潘展弛';
				}
				console.log(msg);
				this.chatlist.push(msg);
			}
			// this.chatlist.push(res.data)
		});

		// 监听WebSocket连接关闭事件
		socketTask.onClose(res => {
			console.log('WebSocket连接关闭');
			console.log(this.chatlist);
			uni.setStorageSync('chatlist', JSON.stringify(this.chatlist));
		});

		// 监听WebSocket连接错误事件
		socketTask.onError(res => {
			console.log('WebSocket连接错误');
			uni.showToast({
				icon: 'error',
				title: '请检查网络'
			});
		});
	},
	onUnload() {
		uni.closeSocket({
			success(res) {
				console.log(res);
			}
		});
	},
	onReady() {
		// 初始化参数
		try {
			const res = uni.getSystemInfoSync();
			this.style.contentH = res.windowHeight - uni.upx2px(230);
		} catch (e) {
			console.log(e);
		}
		this.pageToBottom(true);
	},
	methods: {
		toggleShow() {
			this.isShow = !this.isShow;
			console.log(this.isShow);
			console.log(this.expressions);
		},
		touchstart() {
			this.touchT = new Date().getTime();
		},
		touchend() {
			this.touchE = new Date().getTime();
		},
		recordToText(index) {
			const msg = {...this.chatlist[index]}
			const url = msg.record;
			this.chatlist[index].showMenu = true
			msg.showMenu = true;
			msg.transferText = undefined;
			if (url) {
				this.request({
					url: '/user/transfer',
					method: 'POST',
					data: {
						url
					}
				}).then(
					res => {
						console.log(res.data.result.Sentences[0].Text);
						msg.transferText = res.data.result.Sentences[0].Text;
						this.chatlist.splice(index,1,msg)
					},
					rea => {
						uni.showToast({
							icon: 'error',
							title: '请检查网络'
						});
					}
				);
			}
		},
		chooseMedia() {
			uni.chooseMedia({
				count: 9,
				sizeType: ['original', 'compressed'],
				mediaType: ['image'],
				sourceType: ['album'],
				// maxDuration: 30,
				success: res => {
					console.log('Choose successfully');
					console.log(res);
					uniCloud.uploadFile({
						cloudPath: `${new Date().getTime()}.png`,
						filePath: res.tempFiles[0].tempFilePath,
						success: r => {
							const uploadUrl = r.fileID;
							console.log('Upload successfully');
							console.log(uploadUrl);
							let onemsg = {
								type: res.type,
								newmsg: uploadUrl,
								username: this.name,
								avatar: this.avatar,
								createdAt: new Date().getTime(),
								sender: this.openid
							};
							let data = {
								type: res.type,
								msg: uploadUrl,
								createdAt: new Date().getTime(),
								sender: this.openid
							};
							this.chatlist.push(onemsg);
							console.log(this.chatlist);
							this.newmsg = ''; //清空
							console.log(this.socketOpen);
							if (this.socketOpen) {
								uni.sendSocketMessage({
									data: JSON.stringify({
										event: 'message',
										data: {
											roomid: 'chatroom',
											content: data
										}
									}),
									success: res => {
										console.log(res);
										this.pageToBottom();
									}
								});
							} else {
								//do some tips
							}
						}
					});
				}
			});
		},
		pickerEmoji(emoji) {
			this.newmsg += emoji.title;
		},
		pageToBottom(isfirst = false) {
			let q = uni.createSelectorQuery().in(this);
			let itemH = q.selectAll('.chat-item');
			this.$nextTick(() => {
				itemH
					.fields(
						{
							size: true
						},
						data => {
							if (data) {
								if (isfirst) {
									for (let i = 0; i < data.length; i++) {
										this.style.itemH += data[i].height;
									}
								} else {
									this.style.itemH += data[data.length - 1].height;
								}
								this.scrollTop = this.style.itemH > this.style.contentH ? this.style.itemH : 0;
							}
						}
					)
					.exec();
			});
		},

		//发送消息
		sendMsg() {
			if (this.newmsg.length > 0) {
				let now = new Date().getTime();
				let onemsg = {
					type: 'message',
					newmsg: this.newmsg,
					username: this.name,
					avatar: this.avatar,
					createdAt: now,
					sender: this.openid
				};
				let data = {
					msg: this.newmsg,
					createdAt: now,
					sender: this.openid
				};
				if (this.socketOpen) {
					this.chatlist.push(onemsg);
				} else {
					// 断网发送消息，感叹号提示
					this.chatlist.push({
						err: true,
						...onemsg
					});
				}
				console.log(this.chatlist);
				this.newmsg = ''; //清空
				console.log(this.socketOpen);
				if (this.socketOpen) {
					uni.sendSocketMessage({
						data: JSON.stringify({
							event: 'message',
							data: {
								roomid: 'chatroom',
								content: {
									type: 'message',
									...data
								}
							}
						}),
						success: res => {
							console.log(res);
							this.pageToBottom();
						}
					});
				}
			}
		},
		resendMsg(msg) {
			let data = {
				msg: msg.newmsg,
				createdAt: msg.createdAt,
				sender: msg.sender
			};
			// this.socketOpen = true
			if (this.socketOpen) {
				const reMsg = this.chatlist.find(v => v.createdAt === data.createdAt);
				//assign to update view
				// Object.assign(this.chatlist.find(v=>v.createdAt === data.createdAt),reMsg)
				// console.log(this.chatlist.find(v=>v.createdAt === data.createdAt));
				uni.sendSocketMessage({
					data: JSON.stringify({
						event: 'message',
						data: {
							roomid: 'chatroom',
							content: {
								type: 'message',
								...data
							}
						}
					}),
					success: res => {
						delete reMsg['err'];
						console.log(res);
						this.pageToBottom();
					}
				});
			} else {
				uni.showToast({
					icon: 'error',
					title: '请检查网络'
				});
			}
		},
		recordMsg(e) {
			console.log(e);
			this.recordStart = new Date().valueOf();
			this.chatStyle = 'chat-send-press';
			this.recorderManager.start(this.recordOption);
			console.log(this.recordStart);
		},
		sendRecordMsg() {
			this.recordEnd = new Date().valueOf();
			this.recorderManager.stop();
			this.chatStyle = 'chat-send';
		},
		playRecord(e) {
			console.log(this.touchE);
			console.log(this.touchT);
			if (this.touchE - this.touchT > 350) {
				// if(e.record){
				// 	this.recordToText(e)
				// }
				return;
			}
			if (e.type === 'record') {
				this.audioManager.src = e.record;
				this.audioManager.play();
			}
		},
		previewImage(url) {
			console.log(url);
			uni.previewImage({
				urls: [url],
				current: url,
				showmenu: true,
				success: res => {
					console.log(res);
				}
			});
		},
		textHandler(message) {
			// message is a object
			// type consists of video、image and text
			console.log(message);
			const { type, newmsg } = message;
			if (type === 'message') {
				if (newmsg.indexOf('[') > -1) {
					//text contains teex and emoji,extract emoji feature and process to html
					let emojiMap = {};
					expressions.forEach(item => {
						emojiMap[item.title] = item.url;
					});
					console.log(emojiMap);
					const reg = /\[.*?\]/g;
					const showMsg =
						'<div style="display: flex;align-items: center;">' +
						newmsg.replace(reg, r => (emojiMap[r] ? `<img width="28" height="28" src="${this.baseUrl + emojiMap[r]}"/>` : r)) +
						'</div>';
					// const showMsg = newmsg.replace(reg, r => `<img style="width:68rpx;height:68rpx" src="${this.baseUrl + emojiMap[r]}"/>`);
					// const parser = new DOMParser();
					// let doc = parser.parseFromString(showMsg, 'text/html');
					console.log(showMsg);
					return showMsg;
				} else {
					return newmsg;
				}
			}
		},
		//获取消息
		receiveMsg: function() {
			//获取即时信息渲染
			this.socket.on('sendMsg', data => {
				// this.chatlist.push(data);
				this.pageToBottom();
			});
		},
		changeMode() {
			this.inputMode = this.inputMode == 'text' ? 'record' : 'text';
			this.imgPath = this.imgPath == '../../static/record.png' ? '../../static/keyboard.png' : '../../static/record.png';
		}
	}
};
</script>

<style scoped lang="scss">
.main {
	padding: 40rpx 28rpx;
}
.avatar {
	flex: none;
	width: 64rpx;
	height: 64rpx;
	border-radius: 18rpx;
	margin: 10rpx 20rpx;
	align-self: flex-start;
}
.main {
	.msg {
		display: flex;
		align-items: flex-end;
		padding: 20rpx 0;
		.nr {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			.newmsg {
				max-width: 320rpx;
				padding: 16rpx 32rpx;
				min-height: 48rpx;
				font-size: 28rpx;
				color: rgba(25, 29, 35, 1);
				line-height: 48rpx;
				word-break: break-word;
				display: flex;
				align-items: center;
			}
			.nt {
				padding-top: 8rpx;
				font-size: 24rpx;
				color: rgba(25, 29, 35, 0.5);
				line-height: 34rpx;
			}
		}
	}
	.left {
		flex-direction: row;
		.newmsg {
			background:rgba(244,244,244,1);
			border-radius: 24rpx 24rpx 24rpx 0px;
			align-items: center;
		}
		.nr{
			align-items: flex-start;
		}
	}
	.right {
		flex-direction: row-reverse;
		.newmsg {
			background:rgba(255,234,222,1);
			border-radius: 24rpx 24rpx 0px 24rpx;
			align-items: center;
		}
		.nt {
			right: 132rpx;
		}
	}
	.center {
		text-align: center;
		// padding: 32rpx 0 20rpx;
		.inner {
			font-size: 24rpx;
			display: inline-block;
			color: rgba(25, 29, 35, 0.5);
			line-height: 34rpx;
		}
	}
}
.transferView {
	background-color: #cccccc;
	position:relative;
	min-width:120rpx;
	max-width: 300rpx;
	padding: 16rpx 32rpx;
	min-height: 48rpx;
	font-size: 28rpx;
	color: rgba(25, 29, 35, 1);
	line-height: 48rpx;
	word-break: break-word;
	border-radius: 24rpx 24rpx 24rpx 24rpx;
	display: flex;
	align-items: center;
}
.chat-send {
	margin: 12rpx 20rpx;
	flex: 1;
	width: 100%;
	min-height: 40rpx;
	background: rgba(242, 242, 242, 1);
	border-radius: 24rpx;
	font-size: 28rpx;
	color: rgba(25, 29, 35, 1);
	line-height: 40rpx;
	padding: 24rpx;
	text-align: center;
}
.chat-send-press {
	margin: 12rpx 20rpx;
	flex: 1;
	width: 100%;
	min-height: 40rpx;
	background: rgba(222, 222, 222, 1);
	border-radius: 24rpx;
	font-size: 28rpx;
	color: rgba(25, 29, 35, 1);
	line-height: 40rpx;
	padding: 24rpx 52rpx 24rpx 52rpx;
	text-align: center;
}
.send {
	position: fixed;
	z-index: 1002;
	bottom: 0;
	width: 100%;
	border-top: 1px solid #cccccc;
	// padding-bottom: var(--status-bar-height);
	min-height: 100rpx;
	background: rgba(255, 255, 255, 0.96);
	display: flex;
	.emoji-panel {
		image {
			margin-top: 0;
		}
	}
	image {
		width: 68rpx;
		height: 68rpx;
		margin-top: 22rpx;
		// position: absolute;
		// right: 68rpx;
		// top: 32rpx;
	}
}
.modify {
	position: fixed;
	overflow: hidden;
	left: 0;
	bottom: -90%;
	width: 100%;
	height: 90%;
	z-index: 1000;
	background: #fff;
	border-radius: 48rpx 48rpx 0px 0px;
}
.u-name {
	position: absolute;
	top: 0;
	background-color: #fff;
	height: 80rpx;
	text-align: center;
	width: 100%;
	line-height: 80rpx;
}
.bg {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.4);
}
.emoji-panel {
	// padding: 10rpx;
	border-radius: 4px;
	background-color: #ffffff;
	position: absolute;
	display: flex;
	flex-wrap: wrap;
	bottom: 100%;
	// width: calc(100% - 20rpx);
	box-shadow: 0 0 3px #d1dbe5;
	margin-bottom: 5px;
	// left: -40px;
}
.emoji-list {
	list-style: none;
	padding: 0;
	margin: 0;
}
.emoji-list:after {
	display: block;
	clear: both;
	content: '';
}
.emoji-item {
	float: left;
	width: 26px;
	height: 26px;
	padding: 2px;
	box-sizing: content-box;
	cursor: pointer;
	border-radius: 2px;
	user-select: none;
}
</style>
