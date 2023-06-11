<template>
	<view class="container">
		<view class="box">
			<view class="atom"></view>
			<view class="atom"></view>
			<view class="atom"></view>
			<view class="dot"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'loading-atom',
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.box {
	position: relative;
	width: 120rpx;
	height: 120rpx;
}
.dot{
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #0396FF;
	animation: dotbreath 2s linear infinite;
}
.atom {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border-left-width: 6rpx;
	border-top-width: 6rpx;
	border-left-color: #0396FF;
	border-left-style: solid;
	border-top-style: solid;
	border-top-color: transparent;
	
}
.atom:nth-of-type(1) {
	left: 0%;
	top: 0%;
	animation: atom1 1s linear infinite;
}
.atom:nth-of-type(2) {
	right: 0%;
	top: 0%;
	animation: atom2 1s linear infinite;
}
.atom:nth-of-type(3) {
	right: 0%;
	bottom: 0%;
	animation: atom3 1s linear infinite;
}
@keyframes dotbreath {
	0% {
		opacity:1;
	}
	
	50%{
		opacity:0.5;
	}
	100%{
		opacity:1;
	}
}
@keyframes atom1 {
	0% {
		transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
	}
	100% {
		transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
	}
}
@keyframes atom2 {
	0% {
		transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
	}
	100% {
		transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
	}
}

@keyframes atom3 {
	0% {
		 transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
	}
	100% {
		 transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
	}
}
</style>
