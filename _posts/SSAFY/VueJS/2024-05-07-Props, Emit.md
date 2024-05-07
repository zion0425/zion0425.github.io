---
title: Single File Component
date: 2024-05-07
categories: [vuejs]
tags: [vuejs]
published : false
---

# 목차

1. [Component State Flow](#component-state-flow)
2.
3.


vue의 경로 지정 방법

`@` : src 디렉토리를 가리킴

`~` : node_modules 디렉토리를 가리킴

`/` : public 디렉토리를 가리킴

`package.json`에 `@`의 경로를 지정해줄 수 있다.

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

# <font id="component-state-flow"> Component State Flow </font>

동일한 데이터가 여러 컴포넌트에 포함되어 있을 때, 이 데이터를 변경하기 위한 기존의 방법은 모든 컴포넌트에서 이벤트를 발생시켜 데이터를 변경해야 한다.

`A.vue`

```vue
<script>

</script>

<template>

</template>

```
`B.vue`

```vue
<script>
</script>

<template>

</template>
```

## Passing Props

부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법을 통해 데이터를 관리할 수 있다.

`$emit`을 통해 이벤트를 발생시키고, 발생된 이벤트를 부모 컴포넌트에 전달한다.

부모 컴포넌트에서는 `props`를 통해 자식 컴포넌트에게 데이터를 전송하고 이를 `Pass Props`라고 한다.

자식은 부모에게 참조한 데이터에 이벤트가 발생하면, 부모에게 이벤트를 알리고 이를 `Emit event`라고 한다.

부모 컴포넌트는 `v-on`을 통해 이벤트를 받아 처리한다.

### Props

`Props`는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는데 사용되는 속성이다.


`Props`는 부모에서 자식으로의 하향식 단방향 바인딩(One-Way down binding)이다.

즉, 자식 컴포넌트 내부에서 `props`를 변경하면 안 된다. (변경 가능하지만 동작 하지 않음)

만약 자식 컴포넌트에서 `props`를 변경할 수 있다면, 데이터의 변경을 추적하기 어려워진다.

`Parent.vue`

```vue
<template>
  <Child :my-msg="message" @changeMessage="changeMessage"/>
</template>
```

부모에서 자식에게 데이터를 전달할 때 아래와 같은 규칙을 따라야 한다.

| 속성 | 설명 |
| --- | --- |
|`my-msg`|`"message"`|

> html 태그이므로 케밥 케이스를 사용한다.

`Props`는 문자열 배열 또는 객체를 사용하여 정의할 수 있다.

`Child.vue`

```vue
<script setup>
	//	배열 선언
	defineProps(['myMsg'])

	// 객체 선언, props 객체를 리턴
	const props = defineProps({
		myMsg: String,
		required: true,
		default : 'default value',
		validates: (value) => value.length > 0
	})

	const childMsg = props.myMsg + " World"
</script>

<template>
	<div>
		<div>{{ myMsg }}</div>
		<Child :child-msg ="childMsg" />"
	</div>
</template>
```

`defineProps`를 사용하여 `props`를 정의할 수 있다.

> script에서 사용하므로 camelCase를 사용한다.

#### Props Name Casing

`props`는 케밥 케이스를 사용하여 선언하여 자식 컴포넌트에 전달하고, `camelCase`를 사용하여 자식 컴포넌트에서 참조한다.

#### Static Props & Dynamic Props

`props`는 정적으로 선언할 수도 있고 동적으로 선언할 수도 있다.

`v-bind`(:)를 사용하여 동적으로 `props`를 전달할 수 있다.

## Component Events

`Component Events`는 자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달하는 방법이다.

`Component Events`는 자식 컴포넌트에서 `$emit`을 사용하여 이벤트를 발생시키고, 부모 컴포넌트에서 `v-on`을 사용하여 이벤트를 수신한다.

`Child.vue`

```vue
<script setup>
	// 부모 컴포넌트로 전달할 이벤트 정의, 인자 생략 가능
	const emit = defineEmits(['changeName'], ['changeMessage'])

	// const emit = defineEmits();

	const emitEvent = () => {
		emit('changeMessage', 'Hello')
	}
</script>
```

`emit`을 사용하여 이벤트를 발생시킨다.

> `$`표기는 Vue 인스턴스나 컴포넌트 인스턴스를 가리킨다.

`Parent.vue`

```vue
<script setup>
	const message = ref('Hello')

	const changeMessage = (msg) => {
		message.value = msg
	}
</script>

<template>
  <Child :my-msg="message" @change-message="changeMessage"/>
</template>

```
