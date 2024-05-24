<script setup>
import BusinessCardDetail from '@/components/BusinessCardDetail.vue'
import CreateCardForm from '@/components/CreateCardForm.vue'
import { reactive, ref, watch } from 'vue'

const cardLength = ref(5);

const cards =  reactive([
{
	name : '일론 머스크',
	title : '테슬라 테크노킹'
}, {
	name : '래리 엘리슨',
	title : '오라클 창업주'
}, {
	name : '빌 게이츠',
	title : '마이크로소프트 공동창업주'
}, {
	name : '래리 페이지',
	title : '구글 공동창업주'
}, {
	name : '세르게이 브린',
	title : '구글 공동창업주'
}
])

const props = defineProps({
	newCard : Object
})

console.log(props.newCard)


const deleteCard = (cardInfo) => {
	const index = cards.findIndex(card => card.name == cardInfo.name);
	if (index != -1) {
		cards.splice(index, 1);
		cardLength.value = cards.length;
	}
}

watch(() => props.newCard.name, (card) => {
	cards.push(props.newCard)
	cardLength.value = cards.length
})

</script>

<template>
	<div>
		<h3 v-if="cardLength > 0">현재 보유중인 명함 수 {{ cardLength }}</h3>
		<h3 v-else>명함이 없습니다. 새로운 명함을 추가해 주세요. </h3>
		<BusinessCardDetail @delete-card-event = "deleteCard" v-for="card in cards" :key="card.name" :name="card.name" :title="card.title"/>
	</div>
</template>

<style scoped>

</style>
