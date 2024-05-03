---
title: Single File Component
date: 2024-05-03
categories: [vuejs]
tags: [vuejs]
published : false
---

# 목차

1. [Single File Component](#single-file-component)
2. [SFC build tool](#sfc-build-tool)
3. [Vue Component](#vue-component)

# <font id="single-file-component">Single File Component</font>

View(HTML + CSS) + Action(JS)를 합친 것을 Component라고 한다.

하나의 파일이 하나의 Component가 된고, 이를 Single File Component라고 한다.

Component를 구성할 때, Slot을 사용하여 부모 Component에서 자식 Component에게 데이터를 전달할 수 있다.

```vue
<script setup>
	import { ref } from 'vue';

	const title = ref('Hello');
	const content = ref('World');
</script>

<template>
	<div>
		<h1>{{ title }}</h1>
		<p>{{ content }}</p>
	</div>
</template>

<style scoped>
 /* scoped를 사용하면 해당 Component에서만 적용된다. */
</style>
```
## NPM

Node Package Manager를 사용하여 다양한 라이브러리를 설치할 수 있다.

> (NPM)[https://www.npmjs.com/]

## Module, Bundle

프로그램을 구성하는 독립적인 코드 블록을 의미한다.

이런 여러 모듈과 파일을 하나 이상의 번들로 묶어 최적화 하여 애플리케이션을 사용자에게 제공한다. 이런 도구를 번들러라고 한다.

번들러는 모듈간의 의존성을 파악하여 충돌을 방지하고, 최적화된 번들을 생성한다. 이런 작업을 Bundling이라고 한다.

## Vite

Vite는 Vue3에서 권장하는 번들러이다. Vite는 Rollup을 기반으로 하고 있으며, 빠른 속도와 쉬운 설정을 제공한다.

Vite는 서버 구동 시, 빠른 속도를 제공한다.

디렉터리 구조는 다음과 같다.

```
├── node_modules
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   ├── components
│   │   └── HelloWorld.vue
│   ├── App.vue
│   └── main.js
├── .gitignore

```

#### public

정적 파일을 저장하는 디렉터리이다.

#### src

**assets**: 이미지, CSS, SCSS 등의 파일을 저장하는 디렉터리이다.

**components**: Vue Component 파일을 저장하는 디렉터리이다.

#### main.js

필요한 라이브러리를 import하고, 전역 설정을 하는 파일이다.

Vue App을 생성하고, 렌더링하는 파일이다.

#### App.vue

Vue App의 루트 Component이다.

# <font id="vue-component">Vue Component</font>

>(스타일 가이드)[https://ko.vuejs.org/style-guide/]
