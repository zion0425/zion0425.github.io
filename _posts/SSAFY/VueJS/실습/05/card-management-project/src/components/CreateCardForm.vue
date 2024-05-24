<script setup>
	import {ref} from 'vue';

	const name = ref('');
	const title = ref('');

	const createCardEvent = defineEmits(['updateCard']);

	const createCardFunc = () => {
		const cardInfo = {
			'name' : name.value,
			'title' : title.value
		}
		createCardEvent('updateCard', cardInfo);

		name.value = '';
		title.value = '';
	}

</script>
<template>
	<div>
		<!-- submit 동작을 막고 createCardFunc 함수 호출 -->
		<form @submit.prevent="createCardFunc">
			<label>이름</label>
			<input type ="text" v-model = "name"/>
			<label>직함</label>
			<input type ="text" v-model = "title"/>
			<input type ="submit" value="명함 추가" />
		</form>
	</div>
</template>

<style scoped>

</style>
