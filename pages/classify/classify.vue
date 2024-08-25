<template>
	<view class="classifyLayout">
		<!-- #ifndef MP-TOUTIAO -->
		<custom-nav-bar title="分类"></custom-nav-bar>
		<!-- #endif -->
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item" @click="goClassList"></theme-item>
		</view>
	</view>
</template>

<script setup>
	import serverApi from '@/api/apis.js';
	import { ref } from 'vue';

	const goClassList = () => {
		uni.navigateTo({
			url: '/pages/classify/classList'
		})
	}


	const classifyList = ref([]);


	const getClassify = async () => {
		let res = await serverApi.apiGetClassify({
			pageSize:15
		});
		classifyList.value = res.data
	}

	getClassify();
</script>

<style lang="scss">
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx
	}
</style>