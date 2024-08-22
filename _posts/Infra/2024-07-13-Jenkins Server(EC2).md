---
title: Jenkins Server(EC2)
date: 2024-07-13
categories: [Infra]
tags: [jenkins, ec2, IAM]

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

## IAM 설정

AWS를 관리하기 위해 루트 계정을 사용하는 것은 보안상 위험합니다.

루트 계정은 결제 정보, 개인정보 등 모든 정보에 접근할 수 있는 권한을 가지고 있기 때문입니다.

따라서 `IAM(Idenity and Access Management)`을 사용하여 사용자를 생성하고 권한을 부여하는 것이 좋습니다.

예전에는 `IAM`을 일일히 생성하고 관리해야 했지만, 최근엔 `IAM Identity Center`를 사용하여 사용자를 쉽게 생성하고 관리할 수 있습니다.

`EC2` 생성과 마찬가지로 `IAM Identity Center`를 검색 후 클릭합니다.

### 사용자 생성

좌측의 목록에서 `사용자`를 클릭합니다.

우측 상단의 `사용자 추가`를 클릭합니다.

사용자 정보를 입력 후 추가합니다.

![alt text](image-12.png)

### 권한 세트 생성

좌측의 다중 계정 권한 탭의 하위 항목인 `권한 세트`를 클릭합니다.

권한 세트를 생성 후 사용자에게 부여합니다.

원하는 권한을 선택하여 추가합니다.

![alt text](image-13.png)


### 계정에 사용자 할당

좌측의 다중 계정 권한의 하위 목록인 AWS 계정을 클릭합니다.

가운데 본인 계정 체크박스를 클릭한 후 `사용자 할당 또는 그룹 할당`을 클릭합니다.

![alt text](image-14.png)

원하는 사용자를 선택한 후 할당합니다.

![alt text](image-15.png)

앞서 생성한 권한세트를 클릭하여 할당합니다.

### 엑세스 포털 URL

액세스 포털은 `IAM`을 통해 생성한 사용자가 로그인하여 AWS를 사용할 수 있는 URL입니다. 

다시 `IAM Identify Center`의 대시보드로 돌아와서 우측의 설정 혹은 가운데에 설정하기를 클릭합니다.

설정으로 이동한 후 `엑세스 포털 URL`을 클릭합니다.

원하는 URL을 설정한 후 저장합니다.

![alt text](image-16.png)

이제 사용자가 이메일을 통해 계정을 활성화하고 로그인할 수 있습니다.

