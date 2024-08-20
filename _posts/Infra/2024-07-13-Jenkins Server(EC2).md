---
title: Jenkins Server(EC2)
date: 2024-07-13
categories: [Infra]
tags: [jenkins, ec2]

---

Jenkins 서버를 EC2 인스턴스에 구축하는 방법에 대해 알아보겠습니다.

## EC2 인스턴스 생성

https://aws.amazon.com/ko/ 에 접속하여 계정을 생성합니다.

좌측 상단의 `서비스`를 클릭하고 `EC2`를 검색하여 클릭합니다.

![alt text](image.png)

우측 상단의 지역(오사카, 서울 등)을 클릭하여 서울을 선택합니다.

`인스턴스 시작`을 클릭합니다.

![alt text](image-1.png)

이름 및 태그를 원하는 이름으로 설정합니다.(ex. Jenkins Server)

애플리케이션 및 OS를 선택합니다.(ex. Amazon Linux 2 AMI)

![alt text](image-2.png)

`보안 그룹 구성`에서 `새 보안 그룹 생성`을 클릭합니다.

### 키페어 설정

키 페어 로그인 항목에서 `새 키페어 생성`을 클릭합니다.

![alt text](image-3.png)

키 페어 이름을 설정하고 `RSA`, `ppk`를 선택한 후 `키페어 생성`을 클릭하여 `ppk` 파일을 다운합니다.

![alt text](image-4.png)

### 보안그룹 설정

보안 그룹 생성을 클릭하여 `HTTP(80)`, `HTTPS(443)`, `SSH(22), Jenkins(8080)`을 추가합니다.

이 때, `SSH`의 경우 `소스`를 `내 IP`로 설정하여 접근을 제한합니다.

![alt text](image-5.png)

### 스토리지 구성

프리티어에서 제공하는 최대 스토리지인 30 Gib로 설정한 뒤 진행합니다.

![alt text](image-6.png)


## 탄력적 IP

탄력적 IP는 고정된 Public IP를 할당 받는 것입니다. 

이 IP를 할당받아 인스턴스에 연결하지 않으면 인스턴스를 중지하거나 재부팅하면 매번 변경되는 Public IP의 주소를 받게 됩니다.

---

좌측의 네트워크 보안 탭에서 `탄력적 IP`를 클릭합니다.

![alt text](image-7.png)

우측 상단의 `탄력적 IP 주소 할당`을 클릭합니다.

![alt text](image-8.png)

`탄력적 IP 주소 설정`을 클릭하여 탄력적 IP를 할당받습니다.

![alt text](image-9.png)

인스턴스에 탄력적 IP를 연결합니다.

![alt text](image-10.png)

![alt text](image-11.png)