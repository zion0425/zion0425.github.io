<script setup>
	import MainChildItem from "@/components/main/MainChildItem.vue"
	//defineProps(['myMsg'])
	const name = defineProps({
		myName : String
	})

	const emit = defineEmits(['changeName'])

	const changeName = (msg) => {
		emit('changeName', msg)
	}

</script>

<template>
	<div class ="child">
		<h1>MainChild</h1>
		<div>MainChild : {{ myName }}</div>
		<input type = "text" />
		<button @click = "changeName">up</button>
		<MainChildItem />
	</div>
</template>


<style scoped>
	.child {
		background-color : lightblue;
	}
</style>
