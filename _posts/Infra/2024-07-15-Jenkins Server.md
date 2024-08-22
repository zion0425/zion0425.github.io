---
title: Jenkins
date: 2024-07-15
categories: [Infra]
tags: [ami, ec2]

---

`Jenkins`는 소프트웨어 구축, 테스트, 배포와 관련된 모든 종류의 작업을 자동화 할 수 있는 독립적인 오픈 소스 자동화 서버입니다.

`Jenkins`는 기본 시스템 패키지나 `Docker`에 설치할 수 있습니다. 이 외에도 `JRE`가 설치된 모든 시스템에서 독립 실행형으로 사용할 수 있습니다.

## Jenkins 설치

> 특정 프로그램을 설치할 때, 옵션으로 --[옵션명]을 사용하면 해당 옵션을 사용할 수 있습니다. 또는 -[약어]로 사용할 수 있습니다. 여기서는 직관적으로 설명하기 위해 옵션명을 사용하겠습니다.

```bash
docker run --name jenkins --detach \ # 컨테이너명 jenkins, 백그라운드 실행
    --user root \ # 컨테이너 내에서 root 관리자로 실행
    --volume jenkins-data:/var/jenkins_home \ # 호스트의 jenkins-data 폴더와 젠킨스의 /var/jenkins_home 공간을 공유(마운트)
    --volume /var/run/docker.sock:/var/run/docker.sock \ # 호스트의 도커 소켓 파일을 젠킨스로 마운트해서 젠킨스에서 호스트의 도커 사용 가능
    --port 8080:8080 --port 50000:50000 \ # 호스트의 8080포트와 jenkins의 8080매핑 50000도 같음
    jenkins/jenkins:lts # jenkins 이미지 사용

# 도커에 실행된 젠킨스 컨테이너에 접속
docker exec -it jenkins /bin/bash

apt-get update

# 젠킨스 내부에 도커 설치
apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"

# docker cli 설치
apt-get update
apt-get install -y docker-ce-cli
```

### 설명

여기서 유심히 볼 점은 `Jenkins` 컨테이너 내부에 `Docker`를 설치하는 부분입니다. `Jenkins` 컨테이너 내부에서 `Docker`를 사용하기 위해서는 호스트의 `Docker` 소켓 파일을 마운트해야 합니다. 이를 통해 `Jenkins` 컨테이너 내부에서 호스트의 `Docker`를 사용할 수 있습니다.

Jenkins는 Debian을 기반으로 구성되어 있습니다. Debian은 `apt` 패키지 관리 시스템을 사용합니다.
우리가 `www.naver.com`을 입력하면 네이버의 실제 IP 주소로 연결되는 과정처럼, `apt-get install` 명령어를 실행할 때도 시스템은 패키지를 다운로드할 위치를 알아야 합니다. 

이를 위해 `apt`는 미러 서버(mirror server)를 사용합니다. 미러 서버는 원본 패키지 내용을 복사하여 여러 지역에 분산된 서버에서 제공함으로써 패키지 다운로드 속도를 높이고 접근을 빠르게 합니다. 

실제로 젠킨스 내부에서 `cat /etc/apt/source.list...` 에 들어가면 다양한 미러서버를 확인할 수 있습니다. 하지만 위에선 미러 서버가 아닌 공식 서버를 사용합니다.

그래서 명령어를 보면 먼저 도커를 설치를 하기위해 HTTPS, SSL, CURL, GPG, PPA 관련 패키지를 다운받고, (엄밀히 따지면 PPA는 받을 필요 없을 것 같다. 그런 걸 테스트해볼 여유가 없기에 일단 제공하는 명령어를 따라하자.)

Docker의 GPG키를 받아 다운하고 이를 `apt`의 키 목록에 추가합니다. 이후, 공식 Docker저장소를 apt 소스목록에 추가합니다.

### GPG(GNU Privacy Guard)

GPG는 개인키와 공개키를 사용하여 암호화를 할 수 있는 프로그램입니다. 이를 통해 암호화된 메시지를 전송하거나, 전자서명을 할 수 있습니다.

PGP라는 암호화 방식의 오픈소스 버전입니다.

### PGP

PGP는 공개키 방식의 암호화 알고리즘 입니다.

A와 B라는 두 사람이 있다고 가정해봅시다.

A와 B는 private key와 public key키를 가집니다.

A가 B에게 메시지를 보낼 때,

본문 메시지는 B의 공개키로 암호화 하고 B는 본인의 비밀키로 복호화합니다.

그리고 메시지 한 켠에 A의 private key로 서명을 합니다.

B는 이 내용을 보기위해 B의 private key로 잠금을 해제합니다.

그리고 A가 보낸 메시지인지 확인하기 위해 A의 public key로 서명을 검증합니다.
 
그러면 B가 A의 private key 본다고 생각할 수 있습니다.

하지만, 실제 서명과정을 살펴보면 더 복잡하여 해당 문제에 대한 해결책이 있습니다.

H = 본문 메시지를 해시코드로 변환합니다.
S = 해시코드 값인 H를 A의 비밀키로 암호화합니다.

이렇게 추출된 값을 본문 내용과 함께 B에게 전달합니다.

B는 A의 공개키로 S를 복호화합니다. 그리고 H와 동일한지 확인합니다.

H와 동일하다면, A가 보낸 메시지임을 알 수 있습니다.

즉, H를 A의 비밀키로 잠궈서 S가 됐으니, S를 A의 공개키로 풀면 H와 동일해야 됩니다. 이를 통해 A가 보낸 메시지임을 알 수 있습니다.

해시코드는 암호화는 되지만 복호화는 할 수 없습니다. (비둘기집 원리) 이런 특징을 통해 A가 보낸 메시지임을 확인할 수 있습니다.

### PPA

`PPA(Personal Package Archive)`는 우분투에 공식 패키지가 아닌 소프트웨어 패키지 저장소입니다.