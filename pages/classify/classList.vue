<template>
	<view class="classlist">
		<view class="content">
			<navigator :url="'/pages/preview/preview?'+'id=' + item._id" class="item" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
import serverApi from '../../api/apis.js'
import {onLoad,onUnload,onReachBottom,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import {ref} from 'vue'
//分类列表数据
const classList = ref([]);
// 下拉无数据
const noData = ref(false);

//定义data参数
const queryParams = {
	pageNum:1,
	pageSize:12,
	classid:''
}
let pageName;

onLoad((e)=>{
	let {id=null,name=null} = e;
	pageName = name
	uni.setNavigationBarTitle({
		title:name
	})
	queryParams.classid = id
	getClassList()
})

onReachBottom(()=>{
	if(noData.value) return;
	queryParams.pageNum ++
	getClassList()
})
const getClassList = async() =>{
	const {data} = await serverApi.apiGetClassList(queryParams)
	if(data.length === 0) noData.value = true
	classList.value = [...classList.value,...data]
	uni.setStorageSync('classList',classList.value)
}
</script>

<style lang="scss" scoped>
.classlist{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap:5rpx;
		padding:5rpx;
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
