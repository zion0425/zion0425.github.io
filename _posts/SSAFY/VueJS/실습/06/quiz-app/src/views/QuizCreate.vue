<script setup>
import { useRouter } from 'vue-router'
import { ref,  defineEmits } from 'vue'

const emit = defineEmits()

const question = ref('')
const answer = ref('')

const router = useRouter()

router.beforeEach((to, from, next) => {
	if (question.value != '' || answer.value != '') {
		if (confirm('작성중이던 문제가 있습니다. 이동시 작성 내용 소멸, 이동하겠습니까?')) {
			question.value = '';
			answer.value = '';
			next();
		} else {
			next(false);
		}
	}
	next();
})


function onSubmit() {

	emit('createQuiz', {
		question: question.value,
		answer: answer.value
	})

	question.value = ''
	answer.value = ''
}

</script>

<template>
	<div>
		<form @submit.prevent="onSubmit">
			<div>
				<label for="question">문제</label>
				<input type="textarea"  v-model = "question" />
			</div>
			<div>
				<label for="answer">답안</label>
				<input type="text" v-model = "answer" />
			</div>
			<button type="submit">퀴즈 생성</button>
		</form>
	</div>
</template>

<style scoped>

</style>
