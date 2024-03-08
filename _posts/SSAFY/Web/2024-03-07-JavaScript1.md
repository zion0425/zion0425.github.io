---
title: JavaScript1
date: 2024-03-07
categories: [javascript]
tags: [javascript]
published: false
---

## 목차

1. JavaScript 기본 문법
1. Web Browser와 Window 객체

## JavaScript

이벤트 처리를 담당하는 역할 - 기능 구현

`javascript`는 `Node.js`를 통해 `HTML`기반뿐만 아니라 `prompt` 기반으로도 실행이 가능하다.

`JavaScript(Netscape)`, `JScript(Microsoft)`가 존재했다가, `ECMAScript(ES6)`라는 표준이 생겼다.

### 선언

```html
<!-- <script src = "hello.js" type ="text/javascript" /> -->
<head>
  <script type="text/javascript">
    function hello(message) {
      alert("Hello " + message);
    }

    hello("JavaScript !!!");
  </script>
</head>
```

이 외에도 `<body>` 맨 아래에 `<script>` 를 선언하는 경우도 있다.

이 경우엔 브라우저가 `HTML`부터 읽어서 화면에 그리기 때문에 사용자가 빠르다고 느낄 수 있다.

하지만, `js`가 늦게 올라가기 때문에 해당 기능을 사용자가 사용하고자 하면 `undefined`가 발생할 수 있다.

### 기본 문법

```js
var a = 3;

console.log(a);

window.onload = function () {
  setInterval(showTime, 1000);
};

function showTime() {
  var view = document.getElementById("view");
  var date = new Date();
}
```

```html
<body>
  현재 시간 : <span id="view"> </span>
</body>
```

**결과**<br/>

```
현재 시간 : 오전 9:34:06
```

## 변수

`var a = 1`

변수는 값이 할당되는 과정에서 타입이 결정되는 동적 타입(Dynamic, Weak Type)언어이다.

변수에 값을 할당할 때마다 타입이 계속 바뀐다.

camelCase를 사용한다.

변수명은 키워드, 공백 문자, 숫자로 시작이 불가능하고, 특수 문자는 \_ \$만 허용한다.

### 자료형

| 자료형    | typeof    | 설명                            |
| --------- | --------- | ------------------------------- |
| 숫자형    | number    | 정수, 실수                      |
| 문자열형  | string    | 문자, \' ', \" "                |
| boolean   | boolean   | true, false                     |
| undefined | undefined | 변수 선언후 초기화 되지 않은 값 |
| null      | object    | 값이 존재하지 않음              |

> 부동 소수점 연산 유의

#### 특이한 규칙

```js
// 언더플로
0 / 100; // 0
-0 / 100; // -0

// 오버플로
100 / 0; // Infinity
-100 / 0; // -Infinity
Infinity / 0; // Infinity

0 / 0; // NaN
parseInt("3A"); // 3
parseInt("A1"); // NaN

new Number("1"); // 1
new Number("1A"); //NaN
```

### 백틱 ( ` )

`ES6`에 새롭게 추가된 문법이다.

문자열을 그대로 출력하면서, `$` 사용시 자바스크립트가 가지고 있는 변수로 해석하여 출력한다.

```js
var str = "World!";
console.log(`Hello  $(str)`);
```

**결과**

```
Hello  World!
```

### 자료형

`false` : 비어 있는 문자열, `null`, `undefined`, `0`

**자동 형변환**

```js
"40" - 5; // 35
"40" + 5; // 405

parseInt("123.45") + 1; // 124
parseFloat("123.45") + 1; // 124.45

"1.1" + "1.1"; // 1.11.1
+"1.1" + +"1.1"; // 2.2
```

## 변수 호이스팅

var는 중복해서 선언이 가능하다.

호이스팅은 모든 선언문이 Scope의 처음으로 옮겨진 것처럼 동작하는 것이다.

```js
console.log(a); // error
```

선언하지 않은 변수를 출력하게 되면 에러가 발생한다.

호이스팅의 특성은 아래와 같은 출력이 가능하다.

```js
console.log(a); // undefined

var a = 3;
```

## 상수

ECMA6부터 상수 표현(`const`)을 지원한다.

변수명 컨벤션은 대문자와 언더바로 작성한다.

```js
const COUNT = 1;

COUNT = 3; // error
```

### 변수 특징

| keyword | 구분 | 선언위치    | 재선언 |
| ------- | ---- | ----------- | ------ |
| var     | 변수 | 전역 스코프 | 가능   |
| let     | 변수 | 해당 스코프 | 불가능 |
| const   | 상수 | 해당 스코프 | 불가능 |

```js
var a = 3;
var a = 4;

var obj = { a: 1 };
obj.b = 2;

let b = 2;
let b = 3; // error
```

## 연산자

| 연산자 | 설명                 |
| ------ | -------------------- |
| delete | 프로퍼티 제거        |
| ===    | 타입과 값이 일치     |
| !==    | 타입이나 값이 불일치 |

## Object

앞서 살펴본 `string`, `nubmer`, `boolean`, `null`, `undefined` 을 제외한 값은 객체이다.

`js`의 함수는 객체다.

함수를 인자로 넘겨줄 수 있다.

함수는 일급 객체이므로 값으로 사용할 수 있다.

객체는 `Prototype` 이라는 특별한 프로퍼티를 가지고 있다.

### 객체리터럴

`{ }`를 사용하여 객체를 생성한다.

```js
var obj = {};

var stuendt = {
  name: "Sion",
  area: "Seoul",
  info: function () {
    console.log(this.name + "live in" + this.area);
  }
};

console.log(student); // {name: "Sion", ..., info: f}
student.info(); // Sion live in Seoul
```

### Object 생성자

`new` 키워드로 객체를 생성한다.

```js
function Student(name, area) {
  this.name = name;
  this.area = area;
}

var stu1 = new Student("Sion", "Seoul");

console.log(stu1.name);
console.log(stu1["name"]);

// 유의사항
// "a-b" : 2 을 접근할 때, .으로 접근하면 이상하게 나오므로, []를 사용한다.

delete stu1.name;
console.log(stu1.name); // undefined
```

### 분류

- Built-in Object
  - Standard Built-in Object
  - Native Object
    - BOM(Browser Object Model)
    - DOM(Document Object Model)
- Host Object

`DOM` 은 `window(browser)` 내부의 `Document` 기능을 관리

## 함수

함수는 1급 객체이다.

변수 객체 배열, 인자(콜백 함수), 리턴값으로 사용 가능하다.

함수는 동적 생성이 가능하다.

```js
// 선언문
function a() {}

// 함수 표현식(리터럴)
var a = function () {};

// 생성자 방식
var a = new Function();
```

함수 또한, 호이스팅이 발생한다.

이를 통해 어느 곳이든 호출 가능하다.

> 함수 표현식의 경우 함수 호이스팅이 아니라 변수 호이스팅이 발생하므로 에러가 발생한다.

### 매개변수

```js
function printRes(x, y) {
  console.log(x + y);
}

printRes(1, 2, 3, 4, 5); // 1 + 2 = 3
printRes(1); // 1 + undefined = NaN
```

### 콜백 함수

콜백 함수는 시스템적으로 조건 만족 시 호출하는 함수다.

```js
// 콜백 함수
setInterval(function a() {}, 1000);
setInterval(b, 1000);

// 일반 함수, 한 번만 호출
setInterval(b(), 1000);

function b() {}
```

## window 객체

`location`, `history`

```js
location.href = "http://www.naver.com";

history.back();
history.forward();
```

## 예제

```html
<html>
  <head>
    <style>
      h1 {
        text-align: center;
      }
      #good-luck {
        text-align: center;
        width: 130px;
        height: 55px;
        background-color: blue;
        color: white;
        font-size: 20px;
        border: none;
        border-radius: 12px;
        margin: 0 auto 10px;
        display: block;
      }
      #view {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 600px;
        height: 200px;
        background-color: lightgray;
        margin: 0 auto;
      }
      .ball {
        width: 50px;
        height: 50px;
        background-color: black;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        font-size: 15px;
      }
      .ball0 {
        background-color: red;
      }
      .ball1 {
        background-color: orange;
      }
      .ball2 {
        background-color: blue;
      }
      .ball3 {
        background-color: yellow;
      }
      .ball4 {
        background-color: plum;
      }
    </style>
    <script>
      document
        .querySelector("#btn-id")
        .addEventListener("click", function () {});
    </script>
  </head>

  <body>
    <h1>Lotto 번호</h1>
    <button id="good-luck" onclick="click">번호뽑기</button>
    <div id="view">
      <div class="ball ball0">15</div>
      <div class="ball ball1">15</div>
      <div class="ball ball2">15</div>
      <div class="ball ball3">15</div>
      <div class="ball ball4">15</div>
      <div class="ball ball5">15</div>
    </div>
  </body>
</html>
```

<html>
  <head>
    <style>
      h1 {
        text-align: center;
      }
      #good-luck {
        text-align: center;
        width: 130px;
        height: 55px;
        background-color: blue;
        color: white;
        font-size: 20px;
        border: none;
        border-radius: 12px;
        margin: 0 auto 10px;
        display: block;
      }
      #view {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 600px;
        height: 200px;
        background-color: lightgray;
        margin: 0 auto;
      }
      .ball {
        width: 50px;
        height: 50px;
        background-color: black;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        font-size: 15px;
      }
      .ball0 {
        background-color: red;
      }
      .ball1 {
        background-color: orange;
      }
      .ball2 {
        background-color: blue;
      }
      .ball3 {
        background-color: yellow;
      }
      .ball4 {
        background-color: plum;
      }
    </style>
    <script>
      document
        .querySelector("#btn-id")
        .addEventListener("click", function () {});
    </script>
  </head>

  <body>
    <h1>Lotto 번호</h1>
    <button id="good-luck" onclick="click">번호뽑기</button>
    <div id="view">
      <div class="ball ball0">15</div>
      <div class="ball ball1">15</div>
      <div class="ball ball2">15</div>
      <div class="ball ball3">15</div>
      <div class="ball ball4">15</div>
      <div class="ball ball5">15</div>
    </div>
  </body>
</html>
