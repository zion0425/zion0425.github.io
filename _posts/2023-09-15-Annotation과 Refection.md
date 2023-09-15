---
title: Annotation과 Refection
---

### Annotation

우리 블랙잭의 테스트 코드를 살펴보면 아래와 같은 코드가 있습니다.

```java
@Test
@DisplayName("club 문양이 13개 * 6팩 가 있으면 성공!")
void currectClubInDeck(){
	...
}
```

`@Test`와 `@DisplayName`은 무엇일까요?

`@Test`는 해당 메소드가 테스트 메소드임을 알려주는 `Annotation`이며,

`@DisplayName`은 해당 테스트 메소드의 이름을 지정해주는 `Annotation`입니다.

`Annotation`은 클래스, 메소드, 필드 등의 선언 시에 `@`를 사용하여 추가적인 정보를 제공하는 것입니다.

이처럼 우리는 이미 많은 코드를 통해 `Annotation`의 존재를 알고 있으며 사용하고 있습니다.

하지만 이 `Annotation`이 어떻게 동작하는 것인지는 잘 모르고 있습니다.

왜 `@`만 붙이면 런타임에 메타데이터를 자바에게 제공할 수 있는 것일까요?

> 메타데이터란, 런타임 과정에서 코드를 어떻게 컴파일하고 처리할 것인지 알려주는 정보입니다.

우리는 `Annotation`을 알기위해 먼저 `Refection`에 대해 알아야 합니다.

### Refection

`Refection`을 통해 클래스의 정보를 가져올 수 있고, 클래스의 인스턴스를 생성하거나, 메소드를 호출할 수 있습니다.

이를 통해 미식별된 클래스나 메서드등의 정보를 가져올 수 있습니다.

대표적으로 Class.forName()이 있습니다.

```java
	Class c = Class.forName("java.lang.String");
	String s = (String)c.newInstance();
```

위 코드는 `String` 클래스의 정보를 가져오고, `Refection`을 통해 가져온 클래스의 정보를 통해 인스턴스를 생성할 수 있습니다.

이처럼 `Reflection`은 런타임에 클래스의 정보를 가져올 수 있다는 특징이 있습니다.

여기서 눈치채셨을지 모르겠지만, `Annotation`은 런타임에 메타데이터를 제공한다는 특징이 있습니다.

이러한 메타데이터를 `Refection`을 통해 가져온다는 것을 알 수 있습니다.

### Annotation과 Refection

위에서 살펴보았듯 `Annotation`은 `Refection`을 통해 클래스의 정보를 가져올 수 있습니다.

![](https://media.geeksforgeeks.org/wp-content/cdn-uploads/reflection.png)

결국 `@`를 붙이면 `Reflection` 기능을 통해 그 메서드나 클래스가 메타데이터임을 인지하고 그에 맞는 동작을 수행하게 됩니다.
