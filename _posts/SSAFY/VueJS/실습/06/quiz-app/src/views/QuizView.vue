<script setup>

import QuizDetail from '@/views/QuizDetail.vue'
import QuizCreate from './QuizCreate.vue';

import { computed, ref } from 'vue'

const sortedQuiz = computed(() => {
    // 배열을 정렬하여 반환합니다.
    return quiz.value.slice().sort((a, b) => b.pk - a.pk);
});

let localPk = 6;

const quiz = ref([{
	question: 'python 마이크로 웹 프레임워크 중 하나',
	answer: 'flask',
	pk: 5
}, {
	question: 'HTML 텍스트 입력란 태그',
	answer: 'input',
	pk: 4
} , {
	question: 'HTTP 메서드 중 하나',
	answer: 'post',
	pk: 3
}, {
	question: 'Python의 가상 환경을 만드는 명령어',
	answer: 'Virtualenv',
	pk: 2
}, {
	question: '웹에서 사용자 렌더링을 담당하는 언어',
	answer: 'html',
	pk: 1
}])


const updateQuiz = (newQuiz) => {
	newQuiz.pk = localPk++
	quiz.value.push(newQuiz)
	// computed 적용

	console.log(quiz.value)
}

</script>

<template>
	<div>
		<QuizCreate @create-quiz ="updateQuiz" />
		<QuizDetail v-for="q in sortedQuiz" :question="q.question" :answer="q.answer" :pk="q.pk" :key="q.pk" />
	</div>
</template>

<style scoped>

</style>
