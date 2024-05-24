<script setup>
defineProps({ article: Object })
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ article.articleNo }}</th>
    <td class="text-start">
      <a href="#" class="article-title link-dark">
        {{ article.subject }}
      </a>
    </td>
    <td>{{ article.userName }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.registerDate }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
