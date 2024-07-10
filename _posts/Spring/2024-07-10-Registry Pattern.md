---
layout: post
title: Registry Pattern
date: 2024-07-10
categories: Spring
---

레지스트리 패턴은 여러 객체들을 하나의 클래스에서 중앙 관리하는 클래스를 의미합니다. 

중앙 저장소의 특성 상, Registry 패턴은 단독으로 쓰이지 않고 일반적으로 `Singleton Registry`로 쓰인다.

아래의 `Message Broker` 의 내부 구조를 뜯어보면, `MessageBrokerRegistry` 를 마주하게 된다.

Spring boot 특성상 config 파일에서 Bean 등록을 기본적으로 Singleton으로 저장하기 때문에 싱글톤 패턴의 특징은 생략되어 있지만, 

멤버변수로 다양한 객체들이 선언되어 있는 것을 확인할 수 있다.

```java
@Override
public void configureMessageBroker(MessageBrokerRegistry config) {
    // /topic으로 시작하는 목적지에 대한 신호 메시지를
    // 클라이언트로 다시 전달하기 위해 간단한 메모리
    // 기반 메시지 브로커를 활성화합니다.
    config.enableSimpleBroker("/topic");
    // /app으로 시작하는 메시지가 message-handling methods로
    // 라우팅되어야 함을 나타냅니다.
    config.setApplicationDestinationPrefixes("/app");
}
```

```java
public class MessageBrokerRegistry {
    private final SubscribableChannel clientInboundChannel;
    private final MessageChannel clientOutboundChannel;
    @Nullable
    private SimpleBrokerRegistration simpleBrokerRegistration;
    @Nullable
    private StompBrokerRelayRegistration brokerRelayRegistration;
    private final ChannelRegistration brokerChannelRegistration = new ChannelRegistration();
    @Nullable
    private String[] applicationDestinationPrefixes;
    @Nullable
    private String userDestinationPrefix;
    ...
}
```

위 코드에서는 `MessageBrokerRegistry` 클래스가 다양한 객체들을 멤버 변수로 가지고 있으며, 이를 통해 메시지 브로커의 동작을 설정하는 것을 볼 수 있습니다. 이러한 구조는 레지스트리 패턴의 핵심 아이디어인 중앙 관리의 예시를 잘 보여줍니다.

MSA를 구현하기위해 유레카를 사용할 때도, 이와 같은 패턴이 사용됩니다.