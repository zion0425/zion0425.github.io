---
title: AWS Instance 기본 설정
date: 2023-11-03
categories: [aws]
tags: [aws]
---

> https://docs.aws.amazon.com/

AMI(amazon machine image)를 사용할 것이다.

EC2를 만들면 EC2자체에는 암호가 없으니까 인스턴스를 안전하게 보호하기 위한 키 페어를 생성해야 한다. 먼저 리전을 서울로 정하였다.

그 이후, 키 페어 생성을 누르고 새로 만들 키를 만들어 준다. 그리고 다운로드 된 .pem 파일을 안전한 곳에 보관하였다.

![](https://velog.velcdn.com/images/zion0425/post/f0c7f6cb-892c-4e68-9ec3-8ec5ebac737e/image.png)

### 인스턴스 생성

![](https://velog.velcdn.com/images/zion0425/post/006e3185-6ae1-47dc-9cab-485cb8414523/image.png)

#### 인스턴스 시작

---

![](https://velog.velcdn.com/images/zion0425/post/dc33ff5d-6a98-4ad8-8fc7-b7f0b9704ca9/image.png)

#### AMI선택

윈도우 서버나 우분투 등 편한 서버를 사용하면 된다. 나는 오픈소스인 리눅스 터미널이 탑재되어 있는 ubuntu server를 사용할 것이다.

---

![](https://velog.velcdn.com/images/zion0425/post/9a447658-7ab2-408a-a97d-41ae145507d7/image.png)

#### 인스턴스 유형 선택

인스턴스의 CPU, 메모리, 스토리지, 네트워킹 영량의 다양한 조합이 있으며, 이를 유연하게 선택하여 본인에게 필요한 유형을 선택할 수 있다.
프리티어는 t2.micro만 사용 가능하다.

---

### 용어 정리

#### 테넌트(Tenant)

Cloud Service User가 갖게 되는 자신만의 격리된 환경이다. 
Multi-Tenancy는 소프트웨어 아키텍처중 하나이며, SW Instance가 한 대의 서버 위에서 여러 개의 Tenant를 서비스 하는것을 말한다.
대표적으로 웹메일, 클라우드 서비스 등이 있다.

#### 리전(Region)

Region은 말 그대로 물리적인 데이터 센터들의 지역적인 위치를 의미한다. 각각의 리전은 독립적인 영역이다. 서비스 하는 지역에 알맞은 리전을 선택해서 지연 시간을 최대한 줄여줘야 할 것이다.
서울은 ap-south-1 이라는 Region 코드를 가지고 있다.

#### AZ(Availability Zone)

AZ는 Region 내의 서버를 분리 시켜 놓은 가용 영역들이다. 즉 IDC(Internet Data Center)이다. AZ는 동일한 Region이라도 멀리 떨어져 있게 구성되어있다.
각종 재해나 재난을 받아도 가용성 높게 서비스를 제공해 주기 위함이다.
latency의 경우 AWS는 동일한 Region내의 AZ간엔 low-latency link로 연결시켜 놓았다.
또한 ELB를 통해서 다른 AZ에서도 같은 서비스를 사용할 수 있게 트래픽을 분산 시켜준다.
![](https://velog.velcdn.com/images/zion0425/post/d4116d07-c89b-435b-9bcf-0ac250b0e915/image.png)

#### VPC(Virtual Private Cloud)

AWS VPC 서비스는 사용자의 계정 전용 가상 네트워크 영역이다. 즉 이 VPC안에서 Multi AZ를 기반으로 구성이 가능하고, 이는 물리적인 다수의 IDC를 사용하는 것과 동일한 효과를 볼 수 있다. 다양한 디자인을 할 수 있게 된다.

![](https://velog.velcdn.com/images/zion0425/post/7bd8ba97-7003-45fa-a56f-dd8c0f83bc91/image.png)

##### VPN 설정

이미 AMI에서 설정해준 VPC가 있으며, 추후에 private subnet이나 다른 subnet이 필요할 경우 추가로 설정하도록 할 것이다. 아래와 같이 구성되어 있다.
![](https://velog.velcdn.com/images/zion0425/post/d1f63b6a-17cb-4ca1-8d39-8407e7286900/image.png)
![](https://velog.velcdn.com/images/zion0425/post/704de03a-fa9a-41eb-b512-4d61d07cd326/image.png)
![](https://velog.velcdn.com/images/zion0425/post/4d629d22-eeec-4070-a15a-15f6620bdfb0/image.png)
현재 단계에서는 복잡한 VPC 설정이 필요 없으며 좀 더 상세한 설정을 원할 경우 아래 사이트를 참고하도록 할 것이다.

> https://bluese05.tistory.com/45

## IAM(Identity and Access Management)

IAM(Identity and Access Management)는 특정 계정이나 그룹에게 AWS의 기능들에 대한 접근 권한을 설정하는 서비스다.

이는 보안과 직결되는 문제이며, 사용자별 권한을 부여할 수 있다는 장점이 있다.

AWS에서도 AWS 계정의 루트 사용자 ACCESS KEY를 처음 IAM을 만들때를 제외하고는 꼭 필요한 경우가 아니라면 사용하지 말라고 권장하고 있다.

> 루트 사용자 권한이 꼭 필요한 경우
> https://docs.aws.amazon.com/ko_kr/accounts/latest/reference/root-user-tasks.html

### IAM 설정

Administrator 계정을 하나 생성할 것이다.
AWS 서비스 IAM에 들어가자.
왼쪽 목록에 사용자를 선택하고 사용자 추가를 누르자.
그리고 아래와 같이 세팅했다.
![](https://velog.velcdn.com/images/zion0425/post/f2260ec0-7f60-489e-adb0-9e57f6c1d15d/image.png)
여기서 프로그래밍 방식 액세스를 선택하면 access key, private access key를 받을 수 있지만, 현재는 AWS Management Console만으로 액세스 할 것이므로 액세스 유형을 선택하였다.

---

#### Admin 그룹 생성

![](https://velog.velcdn.com/images/zion0425/post/7ce0508d-425d-4634-a07f-f19b79e6d01f/image.png)

추후에 다른 관리자가 더 생길 수도 있으니 그룹 이름은 Administrator로 설정했다.

![](https://velog.velcdn.com/images/zion0425/post/0ba79d3c-fb16-4e58-9e7b-d9a37fc7c8b4/image.png)

그리고 정책 필터란에는 administrator를 검색해서 AdministratorAccess 정책을 추가해 주자.그 외에 다른 정책을 주고 싶다면 찾아서 정책 추가를 하면 된다.

여기에 있는 모든 정책이 맘에 안들거나 살짝 수정하고 싶다면 아까 사용자 목록이 있었던 왼쪽 목록에서 정책을 눌러 JSON형식의 정책들을 수정해서 사용하면 된다.
![](https://velog.velcdn.com/images/zion0425/post/a571b450-865e-4c34-b2a5-c7de236bc412/image.png)

#### tag 설정

> 태그명 권장사항
> https://medium.com/p/dbea367ec389/edit

![](https://velog.velcdn.com/images/zion0425/post/ec34a5e1-e16d-49e7-bdfe-9ecf6761245a/image.png)

#### IAM 사용자 추가

방금 설정한 사용자로 로그인 하기 위해서는 아래 주소로 들어가서 사용자 계정으로 접속할 수 있다. 참고로 나는 사용자 지정으로 로그인 링크를 바꿨다.
![](https://velog.velcdn.com/images/zion0425/post/b1d1eaa0-4532-4411-bf58-2208c4bffd9a/image.png)

링크를 외우기 어려우면 그냥 루트 계정 로그인 하는 곳에 똑같이 들어가서 이메일 입력란에 사용자 아이디를 입력하거나, 사용자 ARN 12자리를 입력해서 로그인 할 수 있다.

### MFA(Multi Factor Authentication) 설정

google otp다운 받아서 AWS에서 권장하는 사항을 준수하면 된다.

#### 기타 설정

##### 결제정보 권한설정

기본적으로 aws에서는 루트 계정 외에는 결제정보를 볼 수 없게 설정 되어 있다. 하지만 나는 administrator도 결제 정보를 볼 수 있게 할 것이다. 먼저 루트 계정에서 IAM 엑세스 권한을 허용해 주어야 한다. 그러면 Administrator에서결제정보에 정상적으로 접근이 가능하다.

##### log 추적

log추적은 CloudTrail에서 손쉽게 볼 수 있다.
