---
title: LoadBalancer
date: 2024-04-18
categories: [loadbalancer]
tags: [loadbalancer]
---

## 개요

이더넷 스위치는 초기의

지역망이 복잡해지고, 단일 LAN 환경이 WAN 영역으로 확장되면서, 스위치의 성능이 중요해졌다.




## LoadBalancer

`Loadbalancer`는 애플리케이션을 지원하는 리소스 풀 전체의 네트워크 트래픽을 균등하게 배포하는 방법이다.

OSI7 계층에서 4계층과 7계층에 동작하는 로드밸런서 `L4 Loadbalancer`, `L7 Loadbalancer`가 있다.

L4 Loadbalancer는 IP 주소와 포트 번호를 기반으로 트래픽을 분배한다.

> [AWS LoadBalancer](https://aws.amazon.com/ko/what-is/load-balancing/)<br/> [Network 동작원리](../network/2024-04-18-Network%20동작원리.md)

## L4 구동원리

L4에서 Switch는 그 자체로 Loadbalancer로 동작된다.

L4는 TCP, UDP의 헤더를 보고 FTP, HTTP, HTTPS 등의 프로토콜을 판단하여 스위칭의 우선순위를 판단한다.

L4의 `SLB(Server LoadBalancer)`로도 불린다.



## L7 Loadbalancer

기기 성능이 좋지 않았던 시절에는 L4 Loadbalancer를 사용했지만,




1. In-line 방식

	`In-line` 방식은 하나의 `Line` 으로 연결된 방식이다.




2. One-armed 방식


L4는 TCP, UDP 헤더를 기반으로 VLAN, 그룹화, 부하 분산등의 기능을 제공한다.

## Loadbalancing 알고리즘

1. Round Robin

2. Least Connections

---

## 참고

- https://velog.io/@makeitcloud/%EB%9E%80-L4-load-balancer-vs-L7-load-balancer-%EB%9E%80

- https://www.nginx.com/resources/glossary/layer-4-load-balancing/
- https://blog.nextinnovation.kr/tech/Loadbalancer/
- https://www.incodom.kr/Load_Balancing
- https://thinkground.studio/2019/04/12/l4loadbalancer-slb-%EA%B5%AC%EC%84%B1-%EB%B0%A9%EC%8B%9D/
- http://wiki.hash.kr/index.php/L4_%EC%8A%A4%EC%9C%84%EC%B9%98
- https://velog.io/@anjaekk/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%8A%A4%EC%9C%84%EC%B9%AD%EC%9D%98-%EB%B0%A9%EB%B2%95%EA%B3%BC-%EC%A2%85%EB%A5%98
