<template>
	<view>
		<uni-section title="选择服务类型" type="line">
			<view class="uni-panel" v-for="(item, index) in list" :key="item.id">
				<view class="uni-navigate-item" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index, item.id)">
					<text class="uni-navigate-text">{{ item.name }}</text>
					<uni-icons type="bottom" size="16" v-if="item.open"></uni-icons>
					<uni-icons type="forward" size="16" v-else></uni-icons>
					<!-- <text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">{{ item.pages ? '&#xe581;' : '&#xe470;' }}</text> -->
				</view>
				<view class="uni-panel-c" v-if="item.open">
					<view
						class="uni-navigate-item"
						v-for="(item2, key) in item.pages"
						:key="key"
						@click="go(item, item2)"
					>
						<text style="font-size:14px;color:#7c7c7c">{{ item2.name ? item2.name : item2 }}</text>
						<!-- <text class="uni-navigate-icon uni-icon">&#xe470;</text> -->
					</view>
				</view>
			</view>
		</uni-section>
		<view class="intro">
			注：在使用预约功能之前，您需要补充您的家庭地址和联系方式。（如已补充请忽略此条）
			<br>
			<text @click="toInfor" style="display:block;color:blue;font-weight:bolder;font-size:24px;text-align: center;text-indent:0">点我去补充</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					id: 'home',
					name: '家政服务',
					open: false,
					pages: [
						'餐饮服务',
						'看护服务',
						'日常家务',
						'代办服务',
						'装修服务'
					]
				},
				{
					id: 'health',
					name: '健康服务',
					open: false,
					pages: ['康复护理服务', '体检服务','疫苗接种服务']
				},
				{
					id: 'mental',
					name: '心理支持服务',
					open: false,
					pages: [
						'心理咨询服务',
						'精神支持服务',
					]
				},
			]
		};
	},
	methods: {
		triggerCollapse(e, id) {
			if (!this.list[e].pages) {
				this.goDetailPage('', this.list[e].url);
				return;
			}
			for (var i = 0; i < this.list.length; ++i) {
				if (e === i) {
					this.list[i].open = !this.list[i].open;
				} else {
					this.list[i].open = false;
				}
			}
		},
		go(parent,sub){
			uni.navigateTo({
				url:`/pages/service/reserve/chooseTime/chooseTime?parent=${parent.name}&sub=${sub}`
			})
			console.log(parent.name,sub);
		},
		toInfor(){
			uni.navigateTo({
				url:'/pages/me/information/information'
			})
		}
	}
};
</script>

<style>
@import '../../../common/uni-nvue.css';
.uni-navigate-item {
	display:flex;
    align-items: center;
    background-color: #FFFFFF;
    border-top-style: solid;
    border-top-color: #f0f0f0;
    border-top-width: 1px;
}
.uni-navigate-text {
    flex: 1;
    color: #000000;
    font-size: 16px;
    font-weight: normal;
}
.intro{
	display: block;
	text-indent: 2em;
	margin-top: 1rem;
	padding: 0 0.5em;
}
</style>
