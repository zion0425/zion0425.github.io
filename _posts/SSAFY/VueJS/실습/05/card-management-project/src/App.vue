<script setup>
import BusinessCard from '@/components/BusinessCard.vue'
import CreateCardForm from '@/components/CreateCardForm.vue'

import { reactive } from 'vue'

const newCard = reactive({
    name  :'',
    title: ''
})


const updateCard = (userInfo) => {

  //const newCard = userInfo;

  newCard.name = userInfo.name
  newCard.title = userInfo.title
}

</script>

<template>
  <header>
    명함 관리 페이지
  </header>

  <main>

    명함을 관리하는 페이지 입니다.
    <article>
		  <CreateCardForm @update-card = "updateCard" />
    </article>

    <article>
      <h1> 보유 명함 목록</h1>
      <BusinessCard :new-card="newCard" />
    </article>
  </main>

  <footer>

  </footer>
</template>

<style scoped>

</style>
