---
title: SpringBoot
date: 2024-04-24
categories: [SpringBoot]
tags: [SpringBoot]
published: false
---

# SpringBoot

기존의 Spring은 library나 dependency를 추가하는 등의 많은 설정이 필요했다.

또한, WebApp배포[^1]를 위해서 별도의 서버를 설치해야 했다.

[^1]: war파일을 만들어서 tomcat 서버의 webapps에 넣어주면 된다.

SpringBoot는 `Spring`의 설정을 자동화하여 개발자가 빠르게 개발할 수 있도록 도와준다.

## SpringBoot 특징

- `SpringBoot`는 `Tomcat`을 내장하고 있어 별도의 서버를 설치할 필요가 없다.
- `SpringBoot`는 내장 톰캣을 사용하기 때문에 `jar` 파일로 배포할 수 있다.
- 웹 서버에 독립적이다.

## SpringBoot 구조

`application.properties`나 `application.yml`을 통해 설정을 할 수 있다.

`pom.xml`에 `dependency`를 추가하면 자동으로 설정이 된다.

`pom.xml`에는 `<parent>` 태그를 통해 `spring-boot-starter-parent`를 상속받는다.

`pom.xml`

```xml

<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.5</version>
</parent>
...
```

`spring-boot-dependencies-3.2.5.pom`에는 `dependency`의 `version`을 명시해놓았다.

`spring-boot-dependencies-3.2.5.pom`

```xml
...
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <version>3.2.5</version>
</dependency>
...
```

이를 통해 `pom.xml`에는 `spring-boot-starter-web`, `spring-boot-starter-test` 등 `dependency`의 `version`을 명시하지 않아도 사용할 수 있다.

## SpringBoot 실행

```java
package com.ssafy.hello;

@SpringBootApplication
@ComponentScan(basePackages = "com.ssafy")
public class HelloSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelloSpringBootApplication.class, args);
	}

}

```

기본적으로 정적 파일은 static에 들어가 있고 스프링에 특정 파일 경로를 입력하면 해당 폴더나 web-app 기준으로

`SpringBootApplication`은 basePacakger가 현재 main이 속하고 있는 package이다.

이를 변경해주기 위해서, CompoenentScan을 사용하여 basePackages를 변경해줄 수 있다.

이런 설정을 springboot에서 library중 autoconfigure를 통해 설정해준다.

실제 springboot의 autoconfigure.web을 보면 다음과 같이 설정되어 있다.

```java
public static class Resources {

		private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
				"classpath:/resources/", "classpath:/static/", "classpath:/public/" };

        ...
```
