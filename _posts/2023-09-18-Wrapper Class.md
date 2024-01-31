---
title: Wrapper Class
date: 2023-09-18
categories: [Java]
tags: [wrapper class]
---

필자는 Suit(카드 문양)을 담는 String 변수와, Number(카드 숫자)를 담는 Integer 변수를 가지고 있는 `Card Class`를 만들었습니다.

그러면 왜 카드의 숫자를 int가 아닌 Integer로 선언했을까요?

이를 알기 위해선 먼저 원시타입과 참조타입에 대해 알아야 합니다.

### 원시타입과 참조타입

원시 타입는 우리가 흔히 말하는 일반 변수 타입을 의미합니다.

`int, char, double, float, boolean` 등의 논리 리터럴을 저장하는 이에 해당합니다.

원시 타입은 실제 값을 저장하는 타입을 의미하고, 스택 영역에 저장됩니다.

참조 타입은 오브젝트를 주소를 참조하여 저장하는 타입을 의미합니다.

참조 타입은 `Class, Interface, Array` 등이 있으며, 힙 영역에 저장되고 Garvie collector에 의해 관리됩니다.

하지만 참조 타입 중에서도 원시 타입의 용도와 비슷한 것처럼 보이는 것들이 있습니다.

바로, `Integer`, `Double`, `Boolean` 등이 있습니다.

그렇다면 원시 타입과 유사한 참조 타입이 존재하는 이유와 무엇인지 살펴보고 각각의 장단점을 알아보도록 하겠습니다.

> 현재는 Auto-Unboxing이 잘 되어 있어서 아래와 같이 사용해도 문제 없이 사용 가능합니다.

```java
int a = 1;
Integer b = a;
```

원시타입과 참조타입의 성능 측면에서 비교하면 원시타입이 훨씬 빠르다는 것을 것을 알 수 있습니다.

그럼에도 불구하고 `Integer`와 같은 참조타입을 사용하는 이유는 무엇일까요?
![](https://velog.velcdn.com/images/wkdwoo/post/23b8a89f-801b-460c-8a42-f961906b73da/image.png)

`Integer`나 `String` 같은 참조 타입은 `Wrapper Class`이며, `불변(immutable)` 객체입니다.

불변 객체는 값을 처음 저장하면 변하지 않는다는 의미이고,

`Wrapper Class`는 원시타입의 변수를 감싸는 형태로 만들어진 클래스입니다.

그렇다면 왜 `Wrapper Class`를 사용하는 것일까요?

#### Null

`Wrapper Class`의 가장 큰 특징 중 하나는 `Null`을 허용한다는 것입니다.

`int`는 `Null`을 허용하지 않습니다.

`Null`은 아무것도 없다는 의미이며, `int`는 `Null`을 허용하지 않기 때문에 `0`을 사용하여 `Null`을 표현합니다.

하지만 `0`은 `Null`과 다른 의미를 가지고 있습니다.

`0`은 말그대로 숫자 `0`이며, `Null`은 아무것도 없다는 의미입니다.

이처럼 `Null`을 허용하는 `Integer`를 사용하면 `0`과 `Null`을 구분할 수 있습니다.

또한, `Integer`는 다양한 메소드를 제공합니다.

```java
Integer a = 1;
Integer b = 2;

a.compareTo(b); // -1
a.equals(b); // false
a.hashCode(); // 1
a.toString(); // "1"
...
```

#### Generic Type

`Generic`은 클래스나 메소드에서 사용할 내부 데이터 타입을 외부에서 지정하는 기법입니다.

```java
ArrayList<T> arr = new arrayList<>();
```

일반적으로 `Generic`은 다음과 같은 컨벤션이 있습니다.

| Type | 설명    |
| ---- | ------- |
| \<T> | Type    |
| \<E> | Element |
| \<K> | Key     |
| \<V> | Value   |

`Generic`에서는 원시타입을 사용할 수 없습니다.

```java
ArrayList<int> arr = new ArrayList<>(); // 컴파일 에러
```

이렇게 구성된 이유는 `Generic`은 컴파일 시점에 타입을 체크하기 때문입니다.

`Generic`은 컴파일 시점에 타입을 체크하기 때문에 `Generic`에 원시타입을 사용하면 컴파일 에러가 발생합니다.

앞서 말했듯 원시 타입은 스택 영역에 저장되고, 참조 타입은 힙 영역에 저장됩니다.

그렇기 때문에 컴파일 시점에는 타입을 알 수 없는 원시타입을 `Generic`에 사용할 수 없습니다.

그러면 왜 `Generic`은 컴파일 시점에 타입을 체크할까요?

이는 `Generic` 타입 안정성을 보장하기 위함입니다.

타입 안정성(Type safety)이란, 프로그램이 의도하지 않은 타입의 객체를 사용할 때 발생하는 문제를 컴파일 시점에 방지하는 것을 의미합니다.

예를 들어보겠습니다.

```java
ArrayList<Integer> arr = new ArrayList<>();
arr.add(1);
arr.add("2"); // 컴파일 에러
```

위 코드는 컴파일 에러가 발생합니다.

이는 `Generic`이 컴파일 시점에 타입을 체크하기 때문입니다.

만약 `Generic`이 컴파일 시점에 타입을 체크하지 않는다면, `ArrayList`에 `String`을 넣을 수 있습니다.

이는 `Generic`의 타입 안정성을 보장하지 못하는 것이며, 런타임 에러를 발생시킬 수 있습니다.

이처럼 `Generic`은 컴파일 시점에 타입을 체크하여 타입 안정성을 보장합니다.

만약 `Generic`에 원시타입을 사용하면 `Generic`이 타입을 체크하지 않기 때문에 타입 안정성을 보장할 수 없습니다.

`Generic`에 원시 타입을 사용하는 예를 들어보겠습니다.

```java
ArrayList arr = new ArrayList();
arr.add(1);
arr.add("2");
```

위 코드는 컴파일 에러가 발생하지 않습니다.

이는 `Generic`이 타입을 체크하지 않기 때문입니다.

이처럼 `Generic`에 원시타입을 사용하면 타입 안정성을 보장할 수 없습니다.

#### Boxing, Unboxing

`Boxing`은 원시타입을 참조타입으로 변환하는 것을 의미합니다.

`Unboxing`은 참조타입을 원시타입으로 변환하는 것을 의미합니다.

`Wrapper Class`는 원시타입을 참조타입으로 변환하는 `Boxing`과 참조타입을 원시타입으로 변환하는 `Unboxing`을 제공합니다.

예를 들면, `Integer`는 `int`를 `Boxing`하고, `int`는 `Integer`를 `Unboxing`합니다.

```java
Integer a = 1; // Boxing
int b = a; // Unboxing
```

이러한 과정을 통해 `Wrapper Class`는 원시타입과 참조타입을 자유롭게 변환할 수 있습니다.

#### Wrapper Class를 사용해야 하는 이유

이처럼 `Wrapper Class`는 원시타입과 참조타입을 자유롭게 변환할 수 있습니다.

또한, `Null`을 허용하고, 다양한 메소드를 제공합니다.

`Wrapper Class`는 원시타입에 비해 다양한 기능을 제공하며 유연하게 사용할 수 있습니다.

하지만, `Wrapper Class`는 원시타입에 비해 성능이 떨어집니다.

그렇기 때문에 성능이 중요한 상황에서는 원시타입을 사용하는 것이 좋습니다.

원시 타입을 사용하는 경우는 다음과 같습니다.

- 컬렉션의 원소로 사용되는 경우
- 제네릭의 타입 파라미터로 사용되는 경우
- 매개변수화 타입이나 매개변수화 메서드의 타입 파라미터로 사용되는 경우
- 단순한 값의 저장과 읽기를 주 목적으로 하는 경우

이처럼 원시타입과 참조타입은 각각 장단점이 있습니다.

그렇기 때문에 위의 상황들을 고려하여 원시타입과 참조타입을 사용해야 합니다.

---

### String

이렇게 참조타입과 원시타입에 대해 알아보았습니다.

참조타입읜 객체들을 비교하기 위해선, `equals()`를 사용해야 합니다.

하지만, `String`은 `equals()`를 사용하지 않고 `==`를 사용하여 비교합니다.

```java
String a = "a";

System.out.println(a == "a" ? "true" : "false");
```

하지만 아래와 같이 `new` 키워드를 사용해서 `String` 객체를 생성하면 같은 문자열을 넣은것처럼 보이지만 결과는 `false`가 출력되게 됩니다.

```java
String a = new String("a");

System.out.println(a == "a" ? "true" : "false");
```

참조 변수는 객체의 주소를 저장하고 있기 때문에 `==`를 사용하면 객체의 주소를 비교하게 됩니다.

그렇다면 String은 어떻게 같은 문자열을 비교할 수 있을까요?

이를 알아보기 위해 실제 주소값들을 찍어봤습니다.

```java
public static void main(String[] args) {
	String a = "1";
	String b = "1";
	String c = new String("1");

	printRef(a);
	printRef(b);
	printRef(c);
}

private static void printRef(String str){
	System.out.println((Integer.toHexString(System.identityHashCode(str))));
}
```

그 결과 아래와 같이 결과값이 나오는 것을 확인할 수 있습니다.

!["diffRef"](/assets/img/favicons/diffRef.png)

참조타입은 불변객체라고 했습니다.

`String`은 불변객체이기 때문에 `String`의 값을 변경하면 새로운 `String` 객체를 생성하는 것이 일반적인 참조변수의 생성동작 입니다..

그래서 `String`도 `new` 키워드를 사용하면 새로운 객체를 할당 받아 새로운 주소값을 가지게 됩니다.

하지만, `String`의 변수를 리터럴로 받게되면, 힙 영역 안의 `String Pool` 영역에서 `String` 객체를 찾아서 리턴합니다.

이미 존재하는 `String` 객체가 있으면 새로 생성하지 않고, 존재하는 `String` 객체를 리턴합니다.

그렇기 때문에, 같은 문자열의 `String`의 경우 같은 주소값을 반환받게 되는 것이고, 이를 통해 비교 연산자를 통해 String의 값들을 비교할 수 있는 것입니다.

---

#### 블랙잭

이제 우리의 블랙잭에 카드의 number의 타입이 int가 아닌 Integer로 선언한 이유를 알 수 있습니다.

카드들은 각각 1~13의 숫자를 가지고 있습니다.

이 중 10, J, Q, K는 모두 10으로 표현되기 때문에 int로 선언하면 10, J, Q, K를 구분할 수 없습니다.

추후에 `Integer`의 내부 API를 사용하여서, 10, J, Q, K를 구분할 수 있습니다.

그렇기 때문에 `Card`의 number를 int가 아닌 Integer로 선언한 것입니다.
