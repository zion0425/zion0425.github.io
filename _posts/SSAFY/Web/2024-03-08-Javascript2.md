---
title: JavaScript2
date: 2024-03-08
categories: [javascript]
tags: [javascript]
published: false
---

## 목차

1. HTML과 DOM
1. Event
1. Json
1. Web Storage

## DOM

DOM(Document Object Model)은 트리 형태의 계층 구조로 HTML을 표현한다.

가장 상단 노드에는 document가 존재한다.

### 문서 객체 만들기

| 함수명                 | 설명                |
| ---------------------- | ------------------- |
| createElement(tagName) | element node 생성   |
| createTextNode(text)   | text node 생성      |
| appendChild(node)      | a.appendChild(node) |

```javascript
var elementNode = createElement("a");
var textNode = createTextNode("네이버");
elementNode.appendChild(textNode);
document.body.appendChild(elementNode);

// <a>네이버</a>
```

### 속성 설정

| 함수명                    | 설명                 |
| ------------------------- | -------------------- |
| setAttribute(name, value) | 객체 속성 지정       |
| getAttribute(name)        | 객체 속성값 가져오기 |

element에 없는 Attribute를 dot으로 접근하는 방식은 웹 브라우저마다 지원여부가 다르다

### innerHTML, innerText

| 속성      | 설명                       |
| --------- | -------------------------- |
| innerHTML | 문자열을 HTML태그로 삽입.  |
| innerText | 문자열을 text node로 삽입. |

```javascript
html.innerHtml = "<h1>hello World</h1>";
text.innerText = "<h2>hi</h2>";
```

### 문서 객체 가져오기

| 속성                   | 설명                            |
| ---------------------- | ------------------------------- |
| getElementById         | id가 일치하는 태그 가져옴       |
| getElementsByClassName | 클래스가 일치하는 배열을 가져옴 |
| querySelector(All)     | selector로 가져옴               |

```javascript
let id = getElementById("name").value;
// id가 name인 Attribute가 value의 값을 가져온다.

let class = getElementesByClassName("name");
for (var a of class ) {
  console.log(a);
}

let tag = querySelector(".name");
let tag = querySelectorAll(".name");
```

### 문서 객체 제거

removeChilde(nodeName) : element 삭제

```javascript
let element = document.querySelector(".name");
removeChild(element);
```

## Event

`Handler`와 `Listener`를 통해 Event를 처리한다.

`Listener`는 이벤트 발생 여부를 감시하고 있다가, 이벤트가 발생하면 이벤트의 종류에 따라 해당 이벤트를 처리할 `Handler`를 부른다.

```javascript
addEventListner("이벤트 이름", "콜백 함수");

addEventListner("click", function () {
  alert("Hello");
});
```

- MouseEvent

- KeyboardEvent

- FormEvent

```html
<div onlick="javascript:alert('click')">click</div>
;
```

```javascript
<script>
  document.getElementById("div1").onclick = function(){alert("hello")};
</script>
```

만약 `addEventListner`의 두 번째 인자에, 콜백함수가 아닌 메서드 호출 방식을 채택하면 메서드를 한 번 호출한다.

그러면 인자를 넣어주기 위해선, 콜백함수에서 인자를 어떻게 넘기기 위해선 아래와 같이 한다.

```javascript
a.addEventListner("mouseover", function () {
  alert("hello");
});
```

## JSON

`Json(JavaScript Object Notation)`은 텍스트 기반의 데이터 교환 표준이다.

텍스트 기반이므로, 어떤 플랫폼에서도 호환된다.

MIME type = 'application / json'

### Json vs XML

|          | Json       | XML       |
| -------- | ---------- | --------- |
| 종료태그 | 없음       | 존재      |
| 구문길이 | 짧음       | 김        |
| 처리속도 | 빠름       | 느림      |
| 배열     | 가능       | 불가능    |
| 접근방법 | 즉시 파싱  | DOM       |
| 파서     | 함수로변환 | DOMParser |

### Json구조

```js
let user = {
  uid: "ssafy",
  pass: 1,
  arr: [1, 2, 3],
  tmp: {
    2: {'b' : 'c'},
    3: 'd';
  },
  "w" : 5
};
```

json은 xml이 문자만 저장할 수 있는데 비해, javascript의 모든 자료형을 사용할 수 있다. (undefined 제외?)

### Json 변환

```js
// JSON(객체)를 문자열로 변환
JSON.stringify();

// 문자열을 JSON으로 변환
JSON.parse();
```

### 브라우저 랜더링

HTML과 CSS를 각각 파싱하여, DOM Tree, CSSOM Tree를 생성한다.

#### SSR(Server Side Rendering)

서버가 클라이언트의 요청을 받아 페이지를 서버가 만들어 HTML을 응답

첫 페이지만 해당하는 문서만 브라우저에게 전달하여 랜더링하기 때문에 로딩 속도가 CSR에 비해 빠르다. JS를 통한 랜더링이 아니므로 검색최적화(SEO)가 가능하다.

하지만, 초기 페이지 로딩 이후 새 페이지를 로딩할 때마다 서버에게 데이터를 요청하고 응답하므로, 페이지 전환속도가 CSR에 비해 느리다. 이는 곧 서버의 부하로 직결된다.

#### CSR (Client Side Rendering)

Client가 필요한 부분만 응답(JSON, XML)받아 렌더링하는 방식

초기 페이지 로딩이 전체 페이지에 대한 모든 문서 파일을 받기 때문에 SSR에 비해 로딩속도가 느리다.

처음 로딩 후 동적으로 빠르게 렌더링이 되므로 UX가 좋다. 처음에만 다 받고 다음엔 추가적으로 필요한 부분만 받기 때문에 서버 부하가 적다. 이를 SPA(Single Page Application)방식이라 한다.

JSON을 화면에 보여주는 역할로 Front-end Framework를 사용한다.

![Alt text](image.png)

## Web Storatge

key - value의 쌍으로 저장된다.

도메인과 브라우저별로 저장된다.

값은 문자열로 저장된다.

`Local Storage`와 `Session Stroage`로 구분된다.

`Session Storage`은 해당 탭에서만 존재하고 탭을 지우면 사라진다.(새로고침은 유지)

`Local Storage`은 유저가 삭제하기 전까지 남아있는다.

| 공통 메소드         |
| ------------------- |
| setItem(key, value) |
| getItem(key)        |
| removeItem(key)     |
| clear()             |
| key(index)          |
| length              |

> value에 문자열이 아닌 값을 넣어도 자동 형변환 된다.
>
> string과 json등 typeof를 잘 구분
