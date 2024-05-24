<script setup>
	const cardInfo = defineProps({
		name : String,
		title : String
	});

	const defilemit = defineEmits();

	const deleteCardFunc = (cardInfo) => {
		defilemit('deleteCardEvent', cardInfo);
	}

</script>

<template>
	<div>
		<h1>이름 : {{cardInfo.name}}</h1>
		<p>직함 : {{cardInfo.title}}</p>
		<button @click= "deleteCardFunc(cardInfo)">명함 삭제</button>
	</div>
</template>

<style scoped>

</style>
