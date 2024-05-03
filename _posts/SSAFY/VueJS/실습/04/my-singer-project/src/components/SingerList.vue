<script setup>
import SingerDetail from './singer/SingerDetail.vue';

import {ref } from 'vue';

const singers = [{
	name: 'adele'
}, {
	name: 'maroon 5'
}, {
	name : 'Dua Lipa'
}]
</script>

<template>
	<div>
		<h1> 가수 목록 </h1>
		<div v-for="singer in singers" :key="singer.name" name="singer.name">
			<SingerDetail />
		</div>
	</div>
</template>

<style scoped>
	card {
		display:inline-block;
		width:40%;
		margin: 20px;
	}
	h1 {
		color:orangered;
	}
</style>
