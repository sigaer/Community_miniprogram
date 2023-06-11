<template>
	<view class="container">
		<view class="eye"></view>
		<view class="eye"></view>
	</view>
</template>

<script>
export default {
	name: 'loading-eyes',
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 110rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.eye {
	width: 50rpx;
	height: 50rpx;
	background: linear-gradient(135deg, #1fa2ff, #12d8fa);
	border-radius: 50%;
	position: relative;
}

.eye:after {
	background-color: #ffffff;
	width: 18rpx;
	height: 18rpx;
	border-radius: 50%;
	left: 20rpx;
	top: 24rpx;
	position: absolute;
	content: '';
	-webkit-animation: eyeball 1s linear infinite alternate;
	-moz-animation: eyeball 1s linear infinite alternate;
	animation: eyeball 1s linear infinite alternate;
}

@-webkit-keyframes eyeball {
	0% {
		left: 30rpx;
	}

	100% {
		left: 2rpx;
	}
}

@-moz-keyframes eyeball {
	0% {
		left: 30rpx;
	}

	100% {
		left: 2rpx;
	}
}

@keyframes eyeball {
	0% {
		left: 30rpx;
	}

	100% {
		left: 2rpx;
	}
}
</style>
