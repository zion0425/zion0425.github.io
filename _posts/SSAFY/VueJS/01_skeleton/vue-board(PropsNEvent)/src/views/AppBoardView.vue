<script setup>
import BoardList from "@/components/board/BoardList.vue"
import BoardDetail from "@/components/board/BoardDetail.vue"
import BoardWrite from "@/components/board/BoardWrite.vue"
import BoardModify from "@/components/board/BoardModify.vue"
</script>

<template>
  <div>
    <BoardList></BoardList>
    <BoardDetail></BoardDetail>
    <BoardWrite></BoardWrite>
    <BoardModify></BoardModify>
  </div>
</template>

<style>
mark.sky {
  background: linear-gradient(to top, #54fff9 20%, transparent 30%);
}
</style>
