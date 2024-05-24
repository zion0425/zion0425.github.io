<script setup>
import AppHeader from "./components/AppHeader.vue"
import AppMain from "./components/AppMain.vue"
import AppBoard from "./components/AppBoard.vue"

import { ref } from "vue"

const view = ref("main")
</script>

<template>
  <div class="container">
    <AppHeader />
    <div>
      <button @click="view = 'main'">메인</button>
      <button @click="view = 'board'">게시판</button>
    </div>
    <AppMain v-if="view === 'main'" />
    <AppBoard v-if="view === 'board'" />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  text-align: center;
}

.main {
  margin-top: 20px;
}
</style>
