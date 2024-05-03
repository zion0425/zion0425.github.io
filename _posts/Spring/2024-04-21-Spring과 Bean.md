---
layout: post
title: "Spring Core - 2"
date: 2024-04-21 16:00:00 +0900
categories: Spring
---

# Spring

이제 우리가 POJO기반의 Java 프로젝트를 만들어보았다.

DI Container부터 의존성 주입까지 우리가 직접 만들어서 구현해야 했다.

이제 DI Container 대신 Spring Container를 사용하여 의존성 주입을 해보자.

```java
@Configuration
public class AppConfig {
    @Bean
    public UserService memberService() {
        return new UserServiceImpl(userRepository());
    }

    @Bean
    public MemoryUserRepositoryImpl userRepository() {
        return new MemoryUserRepositoryImpl();
    }

    @Bean
    public OrderService orderService() {
        return new OrderServiceImpl(userRepository(), discountPolicy());
    }

    @Bean
    public DiscountPolicy discountPolicy() {
        return new FixDisountImpl();
    }
}
```

어노테이션(@)만 붙이면 뚝딱뚝딱 만들어지는것을 볼 수 있다.

> Annotaion이란? <br/>
> [Annotation과 Reflection](https://zion0425.github.io/posts/Annotation%EA%B3%BC-Refection/)

`@Configuration` 어노테이션을 사용하여 `AppConfig` 클래스를 설정파일로 만들었다.

`@Bean` 어노테이션을 사용하여 스프링 컨테이너에 빈을 등록했다.

이를 메인에서 활용하기 위해 `AnnotationConfigApplicationContext`를 사용하여 빈을 가져올 수 있다.

```java
public static void main(String[] args) {
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);

    UserService userService = applicationContext.getBean("memberService", UserService.class);
    OrderService orderService = applicationContext.getBean("orderService", OrderService.class);
}
```

단순히 이렇게 보면 POJO와 크게 다르지 않아 보인다. 오히려 더 복잡해 보이기도 한다.

다시 우리는 왜 Spring을 사용해야 하는가로 돌아오게 된다.

Spring이 제공하는 다양한 기능들을 사용하면서 Spring의 장점을 느껴보자.

## Spring Container

`Spring Container`는 빈을 생성하고 관리하는 역할을 한다.

`Spring Container`는 `ApplicationContext` 인터페이스를 구현한 클래스이다.

```java
public interface ApplicationContext() {
    Object getBean(String beanName);
    ...
}

public class AnnotationConfigApplicationContext implements ApplicationContext {
    ...
}
```

`AnnotationConfigApplicationContext`는 `ApplicationContext` 인터페이스를 구현한 클래스이다.

파라미터로 `AppConfig.class`를 넘겨주면 `AppConfig` 클래스에 있는 `@Bean` 어노테이션을 찾아 빈을 생성하고 관리한다.

이때, 메소드가 빈의 이름(key)으로 저장되고, 값은 메소드의 리턴값이 된다.

`@Bean(name = "memberService")`와 같이 이름을 부여할 수도 있다.

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
```

`Spring`의 빈을 가져오기 위해선, `ApplicationContext`의 `getBean` 메소드를 사용하면 된다.

```java
// 메서드 이름으로 빈을 가져올 수 있다.
// 등록할 때 이름을 지정하지 않으면 메서드 이름이 빈의 이름이 된다.
UserService userService = applicationContext.getBean("memberService", UserService.class);

// 구체 타입으로도 가져올 수 있다.
// 구현체로도 할 수 있지만 추상에만 의존하도록 하는 것이 좋다.
OrderService orderService = applicationContext.getBean(OrderServiceImpl.class);


```

## Spring Bean 가져오기

```java

@Test
@DisplayName("타입으로 조회")
void getBean() {
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);

    UserService userService = applicationContext.getBean("memberService", UserService.class);
    OrderService orderService = applicationContext.getBean("orderService", OrderService.class);

    assertThat(userService).isInstanceOf(UserService.class);
    assertThat(orderService).isInstanceOf(OrderService.class);
}

@Configuration
static class SameBeanConfig {
    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
}


```

## 빈의 상속관계

부모 타입을 불러오면 자식 타입을 다 불러온다.

```java


void findBeanByParentType() {
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SameBeanConfig.class);

    Child child = applicationContext.getBean("child", Parent.class);
}


```
