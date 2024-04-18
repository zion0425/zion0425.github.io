---
title: Spring MVC
date: 2024-04-17
categories: [spring]
tags: [spring]
published: false
---

# Spring MVC

쿼리스트링을 받아, action에 따른 실행 메소드를 지정하는 기능은 spring이 처리가능

    Spring Front Controller
    WAS가 Dispatcher Servlet을 생성

### DispatcherServlet

클라이언트 요청 받기

### HandlerMapping

Servlet이 URL을 핸들러에게 전송하고 처리할 컨트롤러 선택

### Controller

### ModelAndView

컨트롤러가 뷰에게 데이터 전송할 데이터를 보유한 객체

Client -> Servlet -> Mapping -> Controller -> ViewResolver -> View -> Servlet

Controller, Context 설정파일 등록

servlet-context.xml - Web
root-context.xml - 기타

<-- SSAFY
--> 테코톡

Servlet은 http request의 처리를 간소화하기 위해 등장

`HTTP request`

    GET /test/products HTTP/1.1
    Content-Type: application/json
    User-Agent: ...

    Location: http://localhost:8080
    ...

header와 body 등의 포멧을 String형태로 변환하고, HTTP 에 맞는 형식으로 response를 보내줘야 하는 과정의 복잡한 과정이 생긴다다.

이를 해결하기위해 Servlet이 등장

Servlet 인터페이스를 실체화한 다양한 클래스 중, HTTPServlet의 서비스 메소드를 호출하여 requst를 처리

URL과 매핑된 서블릿을 설정 파일에 저장

`web.xml`

```xml
<servlet>
    <servlet-name>TestServlet</servlet-name>
    <servlet-class>test.TestServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>TestServlet</servlet-name>
    <url-pattern>/test</url-pattern>
</servlet-mapping>

```

Servlet Container에서는 설정파일을 읽어, request의 url이 들어오면 매핑된 Servlet이 있는지 확인

Servlet은 싱글톤 형태로 관리하므로, Servlet Container 내부에 Servlet 인스턴스가 존재하면 그대로 실행하지만 없다면 매핑된 클래스를 찾아 인스턴스를 생성한다.

여러 요청이 동시에 들어오면 요청당 쓰레드를 생성해서 Servlet을 매핑해준다.

쓰레드 생성의 비용과 Context Switching의 오버헤드가 발생할 위험이 존재한다.

Handler의 공통 로직이 발생한다는 문제점이 발생한다.

프론트 컨트롤러를 통해 공통 로직을 처리하는 컨트롤러를 Dispacher Servlet이 담당하게 하고, 각각의 요청에 맞는 서블릿을 매핑한다.

하지만 이렇게 되면, Dispatcher Servlet이 모든 요청을 담당하게 되므로 과부화 발생 가능

요청을 분산하는 Handler Mapping과 뷰를 검색하거나 생성하는 View Resolver를 만들어 역할을 분담한다.

## Spring framework

spring을 적용하지 않으면 Handler와 Dispatcher, View Resolover 등을 모두 구현하여 처리해야 하지만,
Spring Container를 통해 Root webAcpplicationContext와 ServletWebApplicationContext를 통해 Handler Adapter, View Resolver를 관리할 수 있다.

이를 통해 개발자는 Handler와 비즈니스 로직만을 구현할 수 있다.

### 추가사항

Exception 분리
@ControlelrAdvice

fetch 비동기 처리

```java
GetMapping("/{userid}")
@ResponseBody
public String test() {
    return + " "
}
```
