<script setup>
import { defineProps, ref, } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
	question: String,
	answer: String,
	pk : Number
})

const userAnswer = ref('')

const router = useRouter()

const onSubmit = () => {
	if(confirm(userAnswer.value +'을/를 답안으로 제출합니다. 확실합니까?')) {
		router.push({
			path: '/answer',
			component: () => import('@/views/AnswerView.vue'),
			query: {
				pk: props.pk,
				'userAnswer': userAnswer.value,
				'correctAnswer': props.answer
			}
		})
	} else {
		userAnswer.value = ''
	}
}

</script>

<template>
	<div>
		<form @submit.prevent="onSubmit">
			<label>{{ question }}</label>
			정답입력 <input type ="text" v-model="userAnswer" :id = "pk"/>
		</form>
	</div>
</template>

<style scoped>

</style>
