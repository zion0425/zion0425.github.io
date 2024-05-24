<script setup>
import { ref } from "vue"

const props = defineProps({ type: String })

const isUseId = ref(false)

const article = ref({
  articleNo: 0,
  subject: "",
  content: "",
  userId: "",
  userName: "",
  hit: 0,
  registerDate: "",
})

if (props.type === "modify") {
  article.value = {
    articleNo: 100,
    subject: "안녕하세요 뷰테스트 중입니다.",
    content:
      "뷰테스트 중입니다. 컴포넌트 연습하고 있으며, 앞으로 props와 custom event를 처리 할 예정입니다!!!",
    userId: "ssafy",
    userName: "김싸피",
    hit: 123,
    registerDate: "25.01.01",
  }
  isUseId.value = true
}
</script>

<template>
  <form>
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text"
        class="form-control"
        v-model="article.userId"
        :disabled="isUseId"
        placeholder="작성자ID..."
      />
    </div>
    <div class="mb-3">
      <label for="subject" class="form-label">제목 : </label>
      <input type="text" class="form-control" v-model="article.subject" placeholder="제목..." />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea class="form-control" v-model="article.content" rows="10"></textarea>
    </div>
    <div class="col-auto text-center">
      <button type="button" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">
        글작성
      </button>
      <button type="button" class="btn btn-outline-success mb-3" v-else>글수정</button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1">목록으로이동...</button>
    </div>
  </form>
</template>

<style scoped></style>
