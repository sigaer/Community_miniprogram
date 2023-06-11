<template>
	<view>
		<view class="wrapper" v-if="type == 'address'">
			<view style="margin-left:0.5rem">当前位置</view>
			<view style="width:70%;margin: 0 0.5rem 0 0.5rem;">
				<picker mode="multiSelector" :range="newProvinceDataList" @change="pickerChange" @columnchange="pickerColumnchange" :value="multiIndex">
					<view>{{ select }}</view>
				</picker>
			</view>
			<view style="margin-left:0.5rem;margin-top:1rem">详细地址</view>
			<!-- <input type="text" v-model="content" ref="inputer" auto-focus="true" /> -->
			<!-- <uni-easyinput  v-model="" placeholder="请填写详细地址" /> -->
			<view class=""><textarea class="uni-input" v-model="detailAddress" placeholder="请填写详细地址" placeholder-style="margin:0.2rem" /></view>
		</view>
		<view class="" v-else="type != 'address'">
			<view class="wrapper" v-if="type == 'phone'">
				<view style="margin-left:0.5rem">手机号码</view>
				<input type="text" v-model="content" ref="inputer" auto-focus="true" placeholder="请填写手机号码" />
			</view>
			<view class="wrapper" v-else-if="type == 'urgent'">
				<view style="margin-left:0.5rem">紧急联系人</view>
				<input type="text" v-model="content" ref="inputer" auto-focus="true" placeholder="请填写紧急联系人手机号码" />
			</view>
			<view class="wrapper" v-else-if="type == 'username'">
				<view style="margin-left:0.5rem">昵称</view>
				<input type="text" v-model="content" ref="inputer" auto-focus="true" placeholder="请填写昵称" />
			</view>
			<view class="wrapper" v-else-if="type == 'gender'">
				<view style="margin-left:0.5rem">性别</view>
				<view style="margin:0 5px">
					<radio-group @change="chooseGender">
						<label style="margin:0 5px"><radio :value="1" :checked="content == 1">男</radio></label>
						<label style="margin:0 5px"><radio :value="0" :checked="content == 0">女</radio></label>
					</radio-group>
				</view>
			</view>
			<view class="wrapper" v-else-if="type == 'age'">
				<view style="margin-left:0.5rem">年龄</view>
				<input type="text" v-model="content" ref="inputer" auto-focus="true" />
			</view>
		</view>
		<button type="primary" @click="onSave()">保存</button>
	</view>
</template>

<script>
import city from '../../utils/location.js';
export default {
	data() {
		return {
			content: '',
			type: '',
			select: '请选择所在地区',
			oldProvinceDataList: city,
			newProvinceDataList: [[], [], []],
			multiIndex: [0, 0, 0],
			detailAddress: ''
		};
	},
	onLoad(option) {
		const { type, title, content } = option;
		uni.setNavigationBarTitle({
			title: title
		});
		this.content = content;
		this.type = type;
		// console.log(this.oldProvinceDataList);
		if (type === 'address') {
			// uni.request({
			// 	url:'https://restapi.amap.com/v3/ip?key=98596a91306884d6aef9cf2874404df3',
			// 	success: (res) => {
			// 		console.log(res);
			// 	}
			// })
			uni.request({
				url: 'https://apis.map.qq.com/ws/location/v1/ip?key=OIVBZ-MQZ6X-V2T4C-TLTXF-2X755-6CBAZ',
				success: res => {
					const { province, city, district } = res.data.result.ad_info;
					console.log(district);
					const provinceIndex = this.oldProvinceDataList.findIndex((v, i) => v.name === province);
					const cityIndex = this.oldProvinceDataList[provinceIndex].children.findIndex((v, i) => v.name === city);
					const districtIndex = this.oldProvinceDataList[provinceIndex].children[cityIndex].children.findIndex((v, i) => v.name === district);
					for (let i = 0; i < this.oldProvinceDataList.length; i++) {
						// console.log(this.oldProvinceDataList[i].name);
						this.newProvinceDataList[0].push(this.oldProvinceDataList[i].name);
					}
					for (let i = 0; i < this.oldProvinceDataList[provinceIndex].children.length; i++) {
						// console.log(this.oldProvinceDataList[0].children[i].name)
						this.newProvinceDataList[1].push(this.oldProvinceDataList[provinceIndex].children[i].name);
					}
					for (let i = 0; i < this.oldProvinceDataList[provinceIndex].children[cityIndex].children.length; i++) {
						// console.log(this.oldProvinceDataList[0].children[0].children)
						this.newProvinceDataList[2].push(this.oldProvinceDataList[provinceIndex].children[cityIndex].children[i].name);
					}
					this.multiIndex = [provinceIndex, cityIndex, districtIndex];
					this.select = `${this.newProvinceDataList[0][this.multiIndex[0]]} ${this.newProvinceDataList[1][this.multiIndex[1]]} ${
						this.newProvinceDataList[2][this.multiIndex[2]]
					}\n`;
				}
			});
		}
		// console.log(this.newProvinceDataList)
	},
	methods: {
		chooseGender(e) {
			this.content = parseInt(e.detail.value);
		},
		onSave() {
			const url = '/user/updateinfo';
			if (this.type == 'address') {
				this.content = this.select + ' ' + this.detailAddress;
			}
			const postdata = {
				type: this.type,
				content: this.content,
				openid: uni.getStorageSync('openid')
			};
			console.log(postdata);
			this.request({
				url: url,
				method: 'post',
				data: postdata
			}).then(res => {
				this.action('updateInfo').then(
					r => {
						if (res.data.code == 200) {
							uni.showToast({
								duration: 1500,
								icon: 'success',
								title: '保存成功',
								success: () => {
									const userinfo = JSON.parse(uni.getStorageSync('userinfo'));
									userinfo[this.type] = this.content;
									uni.setStorageSync('userinfo', JSON.stringify(userinfo));
									setTimeout(() => uni.navigateBack(), 1500);
								}
							});
						} else {
							uni.showToast({
								duration: 1500,
								icon: 'error',
								title: '请检查网络'
							});
						}
						console.log(res);
					},
					rea => {
						uni.showToast({
							duration: 2000,
							icon: 'error',
							title: '请检查网络'
						});
					}
				);
			});
		},
		// 省市区确认事件
		pickerChange(e) {
			this.multiIndex = e.detail.value;
			// 数组内的下标
			console.log(this.multiIndex);
			// 获取省
			// console.log(this.newProvinceDataList[0][this.multiIndex[0]])
			// 获取市
			// console.log(this.newProvinceDataList[1][this.multiIndex[1]])
			// 获取区
			// console.log(this.newProvinceDataList[2][this.multiIndex[2]])
			this.select = `${this.newProvinceDataList[0][this.multiIndex[0]]} ${this.newProvinceDataList[1][this.multiIndex[1]]} ${
				this.newProvinceDataList[2][this.multiIndex[2]]
			}\n`;
			console.log(this.select);
		},
		pickerColumnchange(e) {
			// 第几列滑动
			// console.log(e.detail.column);
			// 第几列滑动的下标
			// console.log(e.detail.value)
			// 第一列滑动
			if (e.detail.column === 0) {
				this.multiIndex[0] = e.detail.value;
				// console.log('第一列滑动');
				// this.newProvinceDataList[1] = [];
				this.newProvinceDataList[1] = this.oldProvinceDataList[this.multiIndex[0]].children.map((item, index) => {
					// console.log(item)
					return item.name;
				});
				// console.log(this.multiIndex)
				if (this.oldProvinceDataList[this.multiIndex[0]].children.length === 1) {
					this.newProvinceDataList[2] = this.oldProvinceDataList[this.multiIndex[0]].children[0].children.map((item, index) => {
						// console.log(item)
						return item.name;
					});
				} else {
					this.newProvinceDataList[2] = this.oldProvinceDataList[this.multiIndex[0]].children[this.multiIndex[1]].children.map((item, index) => {
						// console.log(item)
						return item.name;
					});
				}
				// 第一列滑动  第二列 和第三列 都变为第一个
				this.multiIndex.splice(1, 1, 0);
				this.multiIndex.splice(2, 1, 0);
			}
			// 第二列滑动
			if (e.detail.column === 1) {
				this.multiIndex[1] = e.detail.value;
				// console.log('第二列滑动');
				// console.log(this.multiIndex)
				this.newProvinceDataList[2] = this.oldProvinceDataList[this.multiIndex[0]].children[this.multiIndex[1]].children.map((item, index) => {
					// console.log(item)
					return item.name;
				});
				// 第二列 滑动 第三列 变成第一个
				this.multiIndex.splice(2, 1, 0);
			}
			// 第三列滑动
			if (e.detail.column === 2) {
				this.multiIndex[2] = e.detail.value;
				// console.log('第三列滑动')
				// console.log(this.multiIndex)
			}
		}
	}
};
</script>

<style scoped>
input {
	border: 1px solid #cccccc;
	border-radius: 0.5rem;
	margin: 0.5rem;
	height: 2rem;
	padding-left: 0.5rem;
}
.uni-input {
	border: 1px solid #cccccc;
	border-radius: 0.5rem;
	margin: 0.5rem;
	height: 5rem;
	padding-left: 0.5rem;
	padding-top: 0.3rem;
}
button {
	/* 	position: fixed;
	left:10%;
	bottom: 10%; */
	border-radius: 0.5rem;
	margin-left: 1rem;
	margin-right: 1rem;
}

.wrapper {
	display: flex;
	flex-wrap: wrap;
	/* height:100px; */
	align-items: center;
	margin-top: 0.6rem;
	margin-bottom: 0.6rem;
	overflow: hidden;
}
</style>
