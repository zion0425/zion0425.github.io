---
title: Collection #7
---

## 목차

1. <a href="#collection">Collection</a>
1. List
1. Set
1. Map
1. Sort
1. Lambda

---

## <font id = "collection"> Collection</font>

자료 구조는 컴퓨터 과학에서 효율적인 접근 및 수정을 위해 데이터에 적용할 수 있는 함수나 명령이다.

타입이 다른 객체를 관리하기 위해 매번 다른 배열이 필요하다.

다형성을 위해, Object 객체를 사용하면 실체 객체의 타입 사용시 형 변환 과정이 필요.

Generic을 통해 컴파일 시점에 타입 결정.

`java.util.*`

![Collection]](./image/collection.png)

---

3대 주요 인터페이스

- List
- Set
- Map

### List

입력에 순서가 있는 데이터들의 집합이다.

순서가 있으니, 데이터의 중복을 허락한다.

구현체로는 `ArrayList`, `LinkedList` 가 있다.

> 줄서기

### Set

입력 순서를 유지하지 않는 데이터의 집합이다.

순서가 없으니, 같은 데이터를 구별할 수 없으므로 중복을 허용하지 않는다.

구현체 `HashSet`, `TreeSet`

### Map

key-value의 쌍으로 데이터를 관리한다.

순서가 없고 key는 중복이 불가하고 value는 중복이 가능하다.

구현체 `HashMap`, `TreeMap`

> 지역번호 - 지역

## <font id = "list"> List </a>

입력 순서가 있는 데이터의 집합

중복데이터를 허용

### ArrayList

#### 추가

```java
boolean add(E e);
void add(int index, E element);
boolean addAll(int index, Collection <? extends E> c);

// List는 인터페이스 이므로 List로 객체 생성 불가
List<String> list = new ArrayList<>();

list.add("A");
list.add("B");
list.add(1, "C");
list.add(D);
```

#### 조회

```java
indexOf(E e);

int index = list.indexOf("B");
```

> `toString`같은 `Object`함수를 오버라이딩 할 수 없다.

#### 수정

```java
set(index index, E e);

list.set(0, "1");
```

#### 삭제

```java
Element remove(int index);
boolean remove(Object o);
clear();

list.remove(0);
list.remove("C");
list.clear();

```

List는 내부적으로 배열을 사용한다.

칸이 부족하면 계속 새로운 배열을 복사하여 생성한다.

배열의 장단점을 모두 계승한다.

비순차적 데이터를 다룰 때 많은 시간이 걸린다.

조회가 빠르고 순차적 데이터를 다룰 때 빠르다.

> remove를 통해 앞의 인덱스를 삭제하면 뒤의 요소들의 인덱스가 당겨진다.
> for-each에서 Collection 크기는 불변

### LinkedList

각 요소를 노드로 정의하고 각 노드는 다음 노드의 참조 값만을 가리킨다.

연속적인 구성이 불필요

비순차적 데이터를 다룰 때 빠르다.

> 추가 조회 삭제는, `List`를 구현했던 `ArrayList`와 동일한 함수를 사용한다.

## <font id = "set">Set</font>

입력 순서가 없다. 주머니에 데이터를 넣는 형태

중복이 허용되지 않는다.

Set의 CRUD 함수와 형태가 비슷함

```java
Set<Object> hSet = new HashSet<>();

hSet.add(1);
hSet.add(1);
hSet.add("A");

hSet.remove(1);

```

인덱스가 없어서 수정이 불가능하다.

#### 객체의 중복

```java
class A {
    String name;

    public a(String name) {
        this.name = name;
    }

    @Override
    public boolean equlas(Object o) {
        if (o != null && o instanceof A)
            return this.name.equlas(o.name);
    }
}

class B {
    A a1 = new A("1");
    A a2 = new A("1");

    Set<A> set =  new HashSet<>();

    set.add(a1);
    set.add(a2);

    // 2
    set.size();
}
```

Set에서의 동일한 데이터의 기준은 객체의 `equlas()`가 `true`를 리턴하고, `hashCode()` 값이 같을 때 동일한 데이터로 정의한다.

이를 해결하기 위해 `hashCode()`도 `Override`해야 한다.

```java
@Override
public int hashCode() {
    return this.name.hashCode();
}
```

## <font id = "map">Map</font>

`key`-`value`를 하나의 `entry`로 묶어서 데이터 관리

`key`: `Object` 형태로 중복 금지

`value`: `Object` 형태로 중복 허용

![Map](./image/map`.png`)

> 추가와 수정 기능이 같음

### HashMap

```java
Map<String, String> map = new HashMap<>();


// return type String
Map<String, String> map = new HashMap<>();

System.out.println(map.put("B", "1"));

// null
System.out.println(map.put("A", "1"));

// 1
System.out.println(map.put("A", "@"));

// 해당 키가 없을 경우만 추가, 있을 경우 value return - @
map.putIfAbsent("A", "3");

// @
map.get("A");

// true
map.containsKey("A");

Set<Entry<String, String>> entries = map.entrySet();
for(entry<String, String> entry: entries) {
    if (entry.getValue().equlas("@")) {
        System.out.println(entry.getKey() + ": " + entry.getValue());
    }
}

map.remove("A");

map.clear();
```

## 정렬

순서를 가진 Collection들만 정렬 가능

List 계열

Set에서 SortedSet의 자식객체

Map에서 SortedMap의 자식 객체(key 기준)

```java
Collections.sort(List<T> list);

List<String> names = Arrays.asList("1", "2");
Collections.sort(names);

List<A> names = Arrays.asList(new A(), new A());
Collections.sort(names); // compile error

// Comparable 해야 한다, 크기를 비교할 수 있는 것
// Integer와 String은 Comparable을 구현체로 구현함
sort(T extends Comparable<? super T>> void sort(List<T> list));
```

이를 해결하기 위해 아래와 같이 `implements Comparable<A>`

```java
class A implements Comparable<A> {
    String name;

    // 반드시 Override
    @Override
    public int compareTo(A o) {
        return name.compareTo(o.name);
    }
}
```

```java
public interface Comparable<T> {
    // 음수 자리 유지, 양수 자리 바꿈, 0 동일 위치
    public int compareTo(T o);
}
```

### Comparator

Comparable을 구현하지 않고 있거나 사용자 정의 알고리즘으로 정렬하려는 경우

> String을 알파벳 순이 아닌 글자 수로 정렬 하려면?

두 인터페이스 사용시 우선순위

Comparator > Comparable

### Anonymous type

```java
Collections.sort(names, new Comparator<String>() {
    @Override
    public int compare(String o1, String o2) {
        return o1.length() - o2.length();
    }
});
```

### 함수형 인터페이스

@FunctionalInterface, 미구현된 메소드가 하나만 존재

함수명을 몰라도, 컴파일러가 선택지가 하나인 메소드를 선택

파라미터만 넘겨주면 함수명을 적지 않아도 사용

```java
// 기존 코드
Collections.sort(names, new Comparator<String>() {
    @Override
    public int compare(String o1, String o2) {
        return o1.length() - o2.length();
    }
});

// 함수형
Collections.sort(names, (String o1, String o2) -> {
    return o1.length() - o2.length();
});

Collections.sort(names, (o1, o2) -> {
    return o1.length() - o2.length();
});

Collections.sort(names, (o1, o2) -> o1.length() - o2.length(); );
```
