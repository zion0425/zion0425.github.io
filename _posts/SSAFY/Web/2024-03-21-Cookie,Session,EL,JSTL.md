---
title: MVC
date: 2024-03-20
categories: [MVC]
tags: [MVC]
published: false
---

## 목차

1. Cookie
1. Session
1. EL
1. JSTL

## 개요

HTTP Protocol은 클라이언트가 서버에거 요청하면 서버가 클라이언트에게 응답 한 뒤 연결을 해제하는 방식이다.

Client단위로 상태 정보를 유지해야 하는 경우가 생길 경우 이 방식이 문제가 발생하게 된다.

이를 해결하기 위해 Cookie와 Session이 등장했다.

## Cookie

쿠키는 서버에서 사용자의 컴퓨터에 정보를 저장하는 방식이다.

사용자의 별도 요청 없이 Request시 Request Header에 쿠키 정보를 넣어 전달한다.

key, value 형식으로 String으로 이루어져 있다.

쿠키는 Browser 별로 저장된다.

> 세션 관리, 개인화, 트래킹에 사용된다.

주로 민감하지 않은 정보를 다루거나 개인에 맞춰져있는 데이터를 다룬다.

자동 로그인, 장바구니 등

| 구성요소 |
| -------- |
| 이름     |
| 값       |
| 유효기간 |
| 도메인   |
| 경로     |

쿠키는 클라이언트 요청에 따라 WAS에서 생성하여 Client에 전송하고 Client는 이를 PC에 저장한다. 다시 WAS가 Browser가 종료되도 쿠키는 유효기간이 지나지 않았다면 Client에 계속 보관한다. PC에 해당 Cookie가 존재하면 요청 페이지와 함께 Cookie를 전송한다.

쿠키는 클라이언트에 300개, 하나의 도메인에 20개, 하나의 쿠키는 4KB 까지 저장 가능하다.

`HTTP Header`

```
// Server에서 쿠키 생성
Set-Cookie: userid=ssafy; Expires=Wd, 15 Oct 2024 09:00:00 GMT; Domain=ssafy.com; Path=/user

// Client에서 서버로 쿠키 전달
Cookie: userid=ssafy
```

### 쿠키 생성 예제

```java
// Create
Cookie cookie = new Cookie(String name, String value);

// Set
cookie.setValue(String value);
cookie.setDomain(String domain);
cookie.setPath(String path);
cookie.setMaxAge(int expiry);

// Get
cookie.getValue();
cookie.getDomain();
cookie.getPath();
cookie.getMaxAge();

// delete
cookie.setMaxAge(0);

// client에 생성된 cookie 전송
response.addCookie(cookie);

// client에 저장된 cookie 조회
Cookie cookies[] = request.getCookies();
```

> LocalStorage Cookie 차이

## Session

방문자가 웹 서버에 접속해 있는 상태를 하나의 단위를 세션이라 한다.

WAS의 memory에 Object 형태로 저장된다.

memory 허용 용량까지 제한 없이 저장 가능하다.

### 동작 순서

일반적으로 사용자의 Request-Header 필드에 Cookie를 확인하여, 클라이언트가 session-id를 보냈는지 확인한다.

만약 session-id가 존재하지 않는다면 server가 session-id를 생성해서 클라이언트에게 돌려준다.

## EL

출력을 담당 HTML을 유지하고, ${변수명} 형식으로 사용

```jsp
<% String root = request.getContextPath(); %>

<a href ="${root}/user">
```

### 내장객체

- page -> PageScope
- request -> requestScope
- session -> sessionScope
- apllication -> applicationScope
- Cookie
  ...

```java
request.setAttribute("list", ...);
sesison.setAttribute("list", ...)

// ??, 디팔트로 page request session application 순으로 넓은 범위로 뒤진다.
${list}

// 아래처럼 명시 가능
${sessionScople:list}
```

## JSTL (Jakarta Standard Tag Library)

스크립트를 최대한 없애고 태그 형식으로 만들어 준다는데 의의를 둠

속성을 담당 \<c:if test = "조건식">

### 표준 Costom Tag

- Core
- sql
- xml

Core 사용 예제

```jsp
<%@ taglib prefix="c" uri="jakarta.tags.core" %>


<!-- 변수 선언 -->
<c:set>

<!-- if -->
<c:if test="${empty userinfo}">

</c:if>

<!-- foreach var = 변수명, items = 오브젝트 -->
<c:foreach var="article" items="${articles}">
    <!--
        .으로 가져올때, 프로퍼티로 가져온다.
        메소드처럼 사용하려면 ()를 사용해야 한다.
    -->
</c:foreach>

<!-- if elseif -->
<c:choose>
    <c:when>

    <c:otherwise>
```
