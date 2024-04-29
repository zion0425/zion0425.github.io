---
layout: post
title: "Bean, BeanDefinition"
date: 2024-04-22 22:00:00 +0900
categories: Spring
---

# Bean

빈은 스프링 컨테이너에 의해 관리되는 객체를 말한다.

스프링 컨테이너는 빈을 생성하고, 의존성을 주입하고, 생명주기를 관리한다.

이런 컨테이너의 최상위 인터페이스는 `BeanFactory`이다.

`BeanFactory`는 빈을 등록하고, 조회하고, 관리하는 역할을 한다.

`BeanFactory`의 하위 인터페이스로 `ApplicationContext`가 있다.

`ApplicationContext`는 `BeanFactory`의 기능을 모두 상속받아서 제공한다.

## ApplicationContext

`ApplicationContext`는 빈을 관리하는 기능을 제공하고, 다양한 부가기능을 제공한다.

`MessageSource`, `EnvironmentCapable`, `ResourceLoader`, `ApplicationEventPublisher`, `ApplicationEventMulticaster` 등의 인터페이스를 상속받아서 유요한 기능들을 제공한다.

그래서 일반적으로 `BeanFactory`보다 `ApplicationContext`를 더 많이 사용한다.

이런 `ApplicationContext`는 다양한 구현체가 있다.

어노테이션을 사용하여 빈을 등록하는 `AnnotationConfigApplicationContext`

XML을 사용하여 빈을 등록하는 `GenericXmlApplicationContext`

### XML

XML의 장점은 컴파일 없이 설정을 변경할 수 있다.

하지만 XML을 사용하면 오타나 잘못된 설정을 찾기 어렵다.

그래서 XML을 사용하는 방법은 최근에는 잘 사용하지 않는다.

```java

ApplicationContext ac = new GenericXmlApplicationContext("application.xml");

```

`application.xml`

```xml

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="memberService" class="com.example.demo.service.MemberService">
        <constructor-arg name="userRepository" ref="memoryUserRepository"/>
    </bean>

    <bean id = "memoryUserRepository" class="com.example.demo.repository.MemoryUserRepository"/>

    <bean id="orderService" class="com.example.demo.service.OrderService"/>

</beans>

xml을 통해 빈을 등록할 수 있다.

```

### Annotation

위의 코드를 어노테이션을 사용하여 빈을 등록할 수 있다.

```java

public class AppConfig {

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }

    @Bean
    public OrderService orderService() {
        return new OrderService(memberRepository());
    }

}

```

`@Bean`을 사용하여 빈을 등록할 수 있다.

`@Bean(name = "memberService")`와 같이 이름을 부여할 수도 있다.

## BeanDefinition

이토록 sping이 유연한 이유는 `BeanDefinition`이라는 추상화 덕분이다.

`Spring Container`는 여러 코드가 들어와도 이게 자바코드인지 XML인지 몰라도 된다. 오직 `BeanDefinition`만 알면 된다.

스프링 컨테이너는 오직 `BeanDefinition`만 의존하고 있다.

어떤 방식으로 구현체들이 `BeanDefinition`과 관계가 있는지 알아보자.

### AnnotationConfigApplicationContext

```java

public class AnnotationConfigApplicationContext {
    private final AnnotationBeanDefinitionReader reader;

    ...
}

```

`AnnocationBeanDefinitionReader`가 설정 정보인 `AppConfig`를 읽어서 `BeanDefinition`을 만들어준다.

### GenericXmlApplicationContext

```java

public class GenericXmlApplicationContext {
    private final XmlBeanDefinitionReader reader;

    ...
}
```

XML도 마찬가지로 `XmlBeanDefinitionReader`가 설정 정보인 `application.xml`을 읽어서 `BeanDefinition`을 만들어준다.

`BeanDefinition`을 만들어서 스프링 컨테이너에 등록하면 된다.

그렇다면 `BeanDefinition`은 무엇일까?

실제 `Definition`을 출력해보면 다음과 같다.

```java

@Test
@DisplayName("애플리케이션 빈 출력")
void findApplicationBean() {
    String[] beanDefinitionNames = ac.getBeanDefinitionNames();

    for (String beanDefinitionName : beanDefinitionNames) {
        BeanDefinition beanDefinition = ac.getBeanDefinition(beanDefinitionName);

        if (beanDefinition.getRole() == BeanDefinition.ROLE_APPLICATION) {
            Object bean = ac.getBean(beanDefinitionName);
            System.out.println("beanDefinitionName  "+ beanDefinitionName  +" bean = " + beanDefinitio );
        }
    }
}
```

Definition을 출력해보면, 등록된 빈들을 확인할 수 있고, Definition이 어떤 정보를 가지고 있는지 알 수 있다.

```
...

beanDefinitionName memberService
Root bean: class [null];
scope=;
abstract=false;
lazyInit=null;
autowireMode=3;
dependencyCheck=0;
autowireCandidate=true;
primary=false;
factoryBeanName=appConfig;
factoryMethodName=memberService;
initMethodNames=null;
destroyMethodNames=[(inferred)];
defined in com.spring.section1.core.AppConfig

...
```

스코프, 추상, 레이지, 오토와이어 모드, 의존성 체크, 오토와이어 후보, 프라이머리... 등 다양한 메타정보를 가지고 있다.

이런 메타정보를 통해 만든 정보로 스프링 컨테이너에 빈을 등록하고 관리한다.

결국, `BeanDefinition`을 통해 스프링의 다양한 형태의 설정 정보를 추상화해서 사용할 수 있다는 것을 알 수 있다.

## 정리

- 스프링 컨테이너는 빈을 생성하고, 의존성을 주입하고, 생명주기를 관리한다.

- 스프링 컨테이너의 최상위 인터페이스는 `BeanFactory`이다.

- `BeanFactory`의 하위 인터페이스로 `ApplicationContext`가 있다.

- `ApplicationContext`는 `BeanFactory`의 기능을 모두 상속받아서 제공한다.

- `ApplicationContext`는 빈을 관리하는 기능을 제공하고, 다양한 부가기능을 제공한다.

- `ApplicationContext`는 다양한 구현체가 있다.

- `BeanDefinition`은 스프링이 유연한 이유이다.

- `BeanDefinition`은 빈의 메타정보를 가지고 있다.

- `BeanDefinition`은 스프링 컨테이너에 빈을 등록하고 관리한다.
