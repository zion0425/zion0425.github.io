<script setup>
import IconMain from "@/components/icons/IconMain.vue"
import MainChild from "@/components/main/MainChild.vue"

import { ref } from 'vue'

const name = ref('name')

const changeName = (msg) => {
  console.log("change" + msg)
  name.value = msg;
}

</script>

<template>
  <div class="main"><IconMain /> 화면입니다.</div>
  <MainChild :my-name="name" @change-name = "changeName" />
</template>

<style scoped></style>
