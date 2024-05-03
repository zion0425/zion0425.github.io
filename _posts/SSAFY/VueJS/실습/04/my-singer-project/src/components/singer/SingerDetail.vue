<script setup>
import SingerAlbum from './SingerAlbum.vue';
</script>

<template>
	<card>
		<h1>가수 이름</h1>
		<img src="../../assets/singer.jpg" width =200 />
		<p>가수 소개글</p>
		<div class ="albums">
			<SingerAlbum />
			<SingerAlbum />
		</div>
	</card>
</template>

<style scoped>
	.albums {
		display: flex;
		justify-content: space-around;
	}
</style>
