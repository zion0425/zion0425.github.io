<script setup>
  import AppBoard from "./components/AppBoard.vue";
  import AppMain from "./components/AppMain.vue";
  import AppHeader from "./components/AppHeader.vue";
  import { ref } from "vue";

  const view = ref ('main');
</script>

<template>
  <div>
    <AppHeader />
    <div>
      <button @click = "view = 'main'"> main</button>
      <button @click = "view = 'board'"> board</button>
    </div>
    <AppMain v-if = "view === 'main'"/>
    <AppBoard v-if ="view === 'board'"/>
  </div>
</template>

<style scoped>

</style>
