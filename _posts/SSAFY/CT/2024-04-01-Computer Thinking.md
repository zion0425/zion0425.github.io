---
title: Computer Thinking
date: 2024-04-01
categories: [CT]
tags: [CT]
published: false
---

## 명제와 논리

명제: `p -> q`, 대우: `~p -> ~q`

기약분수 서로소

A % B == 0 B는 A의 약수

## 중간값 정리

$f(b) > 0, f(a) < 0, f(a) * f(b) < 0, f(c) = 0$

$ X^2 = 5, X = 5/X $

```java
double a = 5;
while (true)
    if a - 5.0 / a > 10E-15
        a = (a + 5.0 / a) / 2.0
    else break;
```

연속된 세 수는 6의 배수이다.

## 자리수 표현

$[log_{10}123] = 2$

## Collatz

$(3 * odd + 1, even/2 to 1)$

```java
if (n <= 1) return n;
else if (n % 2 == 0) return DP[(int)(n/2)] = rec(n * 3 + 1 ) + 1;
else if (n % 2 == 1) return DP[(int)(n *3 + 1)] = rec(n / 2) + 1;

```

## 유클리즈 호제

$GCD(A, B) = d$
$= Ax + By = d$

**GCD LCM**

## 페르마

$a^P = a(mod P)$
$= a^{p-1} = 1(mod P)$

## 정수

## N-Queen

(3 X 3 adj)

$2 <= 3 + row - col + 1 <= 6$

depth <- 3

$DP[N + (row - col) + 1] == 1$

---

```
  0
 000
00000
 000
  0
```

| i   | j   | k   |
| --- | --- | --- |
| 0   | 2   | 1   |
| 1   | 1   | 3   |
| 2   | 0   | 5   |
| 3   | 1   | 3   |
| 4   | 2   | 1   |

$j = | i - N / 2 |$

## 별찍기

전체 문제를 작은 부분으로 쪼개서 작은 부분의 식을 도출

## 방향 전환

A에서 B로 이동하기 위해서 최단거리 좌표 n, n에서 B의 좌표 만큼의 맨해튼 거리를 구한다.

문제조건, X축 이동과 Y축 이동을 번갈아가면서 이동해야 한다.

원점인 0 좌표로 이동할 수 있는지 판별 홀수 군과 짝수 군을 계산해서 유효한지 판별

## 행렬

플로이드 워셜로 행렬곱 계산 가능
