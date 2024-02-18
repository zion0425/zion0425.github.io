---
title: LinkedList
date: 2024-02-06
categories: [Algorithm]
tags: [linkedlist]
published : false
---

## 목차

1.  <a href = "#linked_list"> LinkedList </a>
1.  <a href = "#doubly_linked_list"> Doubly LinkedList </a>

## 개요

순서를 가진 데이터, 중복을 허용하는 데이터의 집합을 리스트라 한다.

**순차 리스트**는 관리하고자 하는 원소를 순차적으로 저장하여 관리한다. (Array)

삽입과 삭제가 빈번하게 발생하면 해당 작업시 발생하는 빈 인덱스의 자리를 메꾸기 위해 모든 요소를 조정하는 과정이 발생한다.

**연결 리스트**는 순서를 유연하게 변경할 수 있다. (LinkedList)

**데이터 필드**와 **링크 필드**로 구성된 **노드**(원소)들의 집합이다.

이 때, 링크 필드가 두 개(Doubly LinkedList)인 경우와 하나인 경우,

마지막 노드의 다음 노드를 첫 번째 노드의 주소값을 가리키는 Circular LinkedList가 있다.

## <font id = "#linked_list"> LinkedList </font>

자바에서 의미하는 Head는 더미노드가 아니다. 첫 번째 노드(주소)를 의미한다.

간혹, Tail을 통해 마지막 노드를 탐색하는 경우도 있다.

#### 단순 연결 리스트

Head = Node1(Data, Link -> NextNode(Node2)) Node2(Data, Link -> NextNode(null))

#### 이중 연결 리스트

Head = Node1(Data, Link -> PrevNode(null), Link -> NextNode(Node2)) Node2(Data, Link -> PrevNode(Node1), Link -> NextNode(null))

#### 원형 연결 리스트

단순 연결이나 이중 연결과 결합하여 사용한다.

Head = Node1(Data, Link -> NextNode(Node2)) Node2(Data, Link -> NextNode(Head))

> #### &nbsp; [C로 구현한 linkedList 자료구조](https://github.com/zion0425/42_born/tree/main/libft_bonus_relink_preventions)
>
> - ft_lstadd_back.c
> - ft_lstadd_front.c
> - ft_lstclear.c
> - ft_lstdelone.c
> - ft_lstiter.c
> - ft_lstlast.c
> - ft_lstmap.c
> - ft_lstnew.c
> - ft_lstsize.c

### 스택 구현

LinkedList 형식으로 스택 구현

`Node.java`

```java
class Node<T> {
	private T data;
	private Node<T> link;

	public Node(T data) {
		this.data = data;
	}

	public Node(T data, Node<T> link) {
		this.data = data;
		this.link = link;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public Node<T> getLink() {
		return link;
	}

	public void setLink(Node link) {
		this.link = link;
	}

}
```

`IStack.java`

```java
public interface IStack<E> {
	E pop();

	E peek();

	boolean isEmpty();

	int size();

	void push(E node);
}
```

`Stack.java`

```java
public class Stack<E> implements IStack<E> {

	private Node<E> top;

	@Override
	public E pop() {
		if (isEmpty())
			throw new EmptyStackException();
		Node<E> popNode = top;
		top = popNode.getLink();
		popNode.setLink(null);
		return popNode.getData();
	}

	@Override
	public E peek() {
		if (isEmpty())
			throw new EmptyStackException();
		return top.getData();
	}

	@Override
	public boolean isEmpty() {
		return top == null;
	}

	@Override
	public int size() {
		int cnt = 0;

		for (Node<E> temp = top; temp != null; temp = temp.getLink(), ++cnt);
		return cnt;
	}

	@Override
	public void push(E node) {
		top = new Node<E>(node, top);
	}

}
```

`Main.java`

```java
public class Main {

	private static IStack<Character> stack = new Stack<>();

	public static void main(String[] args) throws IOException {
		System.out.println(stack.isEmpty());
		stack.push('a');
		stack.push('b');
		System.out.println(stack.size());
		System.out.println(stack.peek());
		System.out.println(stack.pop());
		System.out.println(stack.size()) ;
	}
}
```

## <font id = "doubly_linked_list"> 이중 연결 리스트 </font>

양쪽 방향으로 순회하기 위한 리스트

역방향 탐색과, 이전 노드에 대한 관리가 용이하다.

link를 두 개로 앞 노드 뒤 노드로 관리한다.

삽입 삭제 시, 앞 뒤 노드의 prev link, next link를 고려하여 조작한다.
