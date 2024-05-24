 <script setup>
 import { computed } from 'vue';
 import { useRoute } from 'vue-router';

const route = useRoute();

const isCorrectAnswer = computed(() =>{
	return route.query.userAnswer == route.query.correctAnswer ? '정답입니다.' : '틀렸습니다.';
})

 </script>

<template>
	<h2>문제 번호: {{ $route.query.pk }}</h2>
	<h1>정답 확인</h1>
	<div :class= "isCorrectAnswer=='정답입니다.' ? 'co' : 'fa'">
		<p>{{ isCorrectAnswer }}</p>
	  	<p>나의 제출 답안: {{ $route.query.userAnswer }}</p>
	</div>
	<p>정답: {{ $route.query.correctAnswer }}</p>
 </template>

 <style scoped>
.co {
	color:green;
}
.fa {
	color:red;
}
 </style>
