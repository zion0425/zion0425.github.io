---
title: AWS Bastion Server
date: 2023-11-02
categories: [aws]
tags: [aws]
---

# AWS

> `RESULTS.md`에는 제출물을 모아놨으니, 제출물만 확인하시려면 `RESULTS.md`를 확인해주시면 됩니다.

## 0. AWS 계정 생성

AWS는 `Root User`와 `IAM User`로 나뉘어져 있습니다.
<br/>
<br/>
`Root User`는 모든 리소스에 접근할 수 있는 강력한 접근 권한자입니다. 일반적으로 AWS 계약해지나 IAM 관리에 사용하는 것을 권장합니다.

또한, Root User는 모든 리소스에 접근할 수 있으므로, Root User를 사용하지 않는 것을 권장합니다.

이러한 Root User는 해커에게 노출되면 큰 피해를 입을 수 있으므로, AWS에서 제공하는 보안 옵션을 통해 계정을 보호해야 합니다.

대표적으로 AWS에서 제공하는 Access Key, MFA(Multi-Factor Authentication)등을 통해 보안을 강화할 수 있습니다.
<br/>
<br/>

`IAM`은 AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹 서비스입니다.

Root User를 통해 IAM(Identity and Access Management)을 설정해서, AWS 리소스에 대한 액세스를 안전하게 제어할 수 있습니다.

IAM 설정은 사용자별 혹은 사용자 그룹으로 각각 고유한 아이디를 제공할 수 있으며, 이를 통해 시스템에 대한 사용자 접근 권한을 부여합니다.

---

## 1. Create a new EC2 instance

Amazon은 전 세계의 거점 단위로 제공됩니다. 이러한 데이터 센터가 위치한 거점을 `Rigion`이라고 합니다.

EC2를 생성하기 전에, Rigion을 선택해야 합니다.

Rigion마다 제공되는 서비스가 다르며, 서비스 하는 지역에 따라 Latency에 영향을 줍니다.

`EC2`는 Elastic Compute Cloud의 약자로, 다음과 같은 기능을 제공합니다.

- 가상 서버 생성 및 관리 (= 인스턴스 메뉴)
- 가상 서버 방화벽 포트 설정 (= 보안 그룹 메뉴)
- 고정된 공인 IP 관리 (= 탄력적 IP 메뉴, Elastic IP)
- 가상 서버 여러대를 묶어서 로드 밸런서 운영 (= 로드 밸런서, Elastic LB)
  <br/><br/>

인스턴스를 생성하기 위해서는 다음과 같은 설정이 필요합니다.

- Create a new EC2 instance with the following settings:
  - AMI: Ubuntu Server 22.04 LTS (HVM), SSD Volume Type
  - Instance Type: t2.micro
  - Security Group: Create a new security group with the following settings:
    - Type: SSH
    - Protocol: TCP
    - Port Range: 22
    - Source: Anywhere
  - Key Pair: (u60172143) $ ~/.ssh/id_rsa.pub

`AMI`란 Amazon Machine Image의 약자로, AWS에서 제공하는 OS 이미지를 말합니다.

이를 통해, EC2 인스턴스를 생성할 때, AMI에서 제공하는 OS를 선택할 수 있습니다.

AMI는 이미 누가 만들어 놓은 OS 템플릿 입니다.

우리는 AMI에서 제공하는 Ubuntu Server 22.04 LTS를 사용할 것입니다.

`Instance Type`은 EC2 인스턴스의 사양을 의미합니다.

여기서는 t2.micro를 사용할 것입니다.

> AWS 인스턴스 유형 목록<br/> > https://aws.amazon.com/ko/ec2/instance-types/

`Security Group`은 EC2 인스턴스에 대한 보안 설정을 의미합니다.

EC2 인스턴스에 접근할 수 있는 IP와 Port를 설정할 수 있습니다.

여기서는 SSH를 통한 접근을 허용할 것입니다.

`Key Pair`는 EC2 인스턴스에 접근할 때 사용할 Key를 의미합니다.

우리는 key-gen으로 생성해놓은 RSA key를 사용할 것입니다.

당연히 로컬에서 key-gen으로 생성한 RSA public key가 AWS에 등록되어 있어야 합니다.

설정이 완료되면 아래와 같은 인스턴스가 생성 됩니다.

<p>
	<img src="imgs/ba1.png">
	<p align="center"><제출물 #1, Instance State ></p>
</p>

`Private IP`는 인스턴스가 생성된 VPC의 내부 IP를 의미합니다.

`Public IP`와 `Public Ipv4 DNS`는 인스턴스가 생성된 VPC의 외부 IP와 DNS를 의미합니다.

이는 외부에서 서버에 접근하기 위해 필요한 값입니다.

<p>
	<img src="imgs/ba2.png">
	<p align="center"><제출물 #1, Security Group></p>
</p>

방화벽 설정으로, `인바운드`와 `아웃바운드`가 있습니다.

각각 들어오는 트래픽과 나가는 트래픽의 방화벽 설정입니다.

여기서는 앞서 설정한, 22번 포트의 0.0.0.0/0(anywhere)에서 들어오는 트래픽을 모두 허용하고 있습니다.

일반적으로 인바운드 트래픽에 대해서만 방화벽을 설정하는 경우가 많습니다.

---

## Elastic IP

AWS에서는 인스턴스를 중지하고 키면 public IP가 변경됩니다.

Public Ipv4의 자원은 한정적이기 때문에, 사용되지 않는 주소는 낭비가 되므로 반납을 유도하기 때문입니다.

앞서 처음 실행시켰던 인스턴스의 Public ip는 `3.34.182.179` 였습니다.

인스턴스를 중지하고 다시 시작하면 아래와 같이 Public ip가 `43.201.47.229`로, 이전의 인스턴스와 전혀 다른 값으로 변경된 것을 확인할 수 있습니다.

<p>
	<img src="imgs/ba3.png">
	<p align="center"><제출물 #2, Public IP 동적 할당></p>
</p>

이러한 현상은 특히 DNS에 IP를 연결할 때 문제가 됩니다.

AWS에서는 Public ip의 동적 할당을 막기 위해 `Elastic ip`를 제공하고 있습니다.

`Elastic ip`는 인스턴스에 고정된 퍼블릭 IP를 부여하는 것입니다.

`Elastic ip`설정을 하면 아래와 같이 자동 할당된 IP주소가 사라지고, 고정된 IP주소가 할당된 것을 확인할 수 있습니다.

<p>
	<img src="imgs/ba4.png">
	<p align="center"> <제출물 #3, Elasstic IP></p>
</p>

이때, NAT의 Public ip와 DNS만 고정되고, VM 내부에는 변화가 없습니다.

> 실제론 인스턴스에 부착된 ENI(Elastic Network Interface)에 기록된 Private ip에 Elastic ip를 Associate 시켜서 고정된 퍼블릭 IP를 갖는 것입니다.

---

## 인스턴스 타입 변경

처음 EC2를 시작할 때, `t2.micro`로 인스턴스를 생성했습니다.

EC2는 언제든지 인스턴스 타입을 변경할 수 있습니다.

인스턴스 타입을 변경하면, CPU, 메모리, 네트워크 성능 등이 변경됩니다.

인스턴스 타입을 변경하기 위해서는 인스턴스를 중지해야 합니다.

인스턴스 타입을 t3.micro로 변경하고, 인스턴스를 다시 시작하면 아래와 같이 인스턴스 타입이 변경된 것을 확인할 수 있습니다.

<p>
	<img src="imgs/ba5.png">
	<p align="center"><제출물 #4, cat /proc/cpuinfo ></p>
</p>

이전의 `t2.micro`는 1 vCPU, 1 GiB 메모리를 제공했지만,
`t3.micro`는 2 vCPU, 1 GiB 메모리를 제공합니다.

`cat /proc/cpuinfo`를 통해 processor가 0, 1로 두 개가 생성된 것을 확인할 수 있습니다.

---

## Security Group, NACL

AWS에서 VPC의 트래픽을 제어하는 서비스는 대표적으로 두 가지가 있습니다.

`Security Group`과 `NACL(Network Access Control List)`입니다.

<br/>

`NACL`은 VPC의 서브넷에 대한 보안 설정을 관리합니다.

NACL은 서브넷에 대한 트래픽을 제어하는 가상 방화벽 역할을 합니다.

NACL은 허용 규칙과 DENY 설정이 가능합니다.

<br/>

`Security Group`은 인스턴스에 대한 보안 설정을 의미합니다.

인스턴스의 트래픽을 제어하는 가상 방화벽 역할을 합니다.

실제로 `Security Group`은 `ENI` 적용됩니다.

그렇기 때문에, EC2 외에도, ELB, RDS 등의 VPC 내에서 ENI가 탑제되는 모든 서비스에 적용할 수 있습니다.

`Security Group`은 NACL과 다르게 DENY 설정이 아닌 허용 규칙만을 설정할 수 있습니다.

그리고 Security Group의 가장 큰 특징은 `Stateful`이라는 점입니다.

예를 들어, 특정 포트에 대한 트래픽을 허용하면(인바운드 통과), 해당 포트에 대한 응답 트래픽도 자동으로 허용합니다.

즉, 인바운드를 통과한 트래픽은 아웃바운드의 규칙 무관하게 통과 된다는 것을 의미합니다.

Securiy Group의 수는 아래와 같이 제한이 있습니다.
| 이름 |기본값|
|--|--|
| 리전당 VPC 보안 그룹| 2,500 |
| 보안 그룹별 인바운드 또는 아웃바운드 규칙 | 60 |
| 네트워크 인터페이스당 보안 그룹| 5 |

> 기본값 이상으로 늘리고 싶을 경우, AWS에 요청해야 합니다.
> https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/amazon-vpc-limits.html?source=post_page-----3c6cdb6a8b09--------------------------------

AWS는 기본적으로 잘 알려진 서비스에 대한 인바운드 규칙을 제공하고 있습니다.

예를 들어, HTTP 서비스를 적용하고자 하면 유형에서 HTTP를 선택하면 그에 맞는 port 번호와 인바운드 규칙을 적용해 줍니다.

하지만 이번에는 사용자지정 TCP로 직접 80포트를 열어주겠습니다.

그리고, HTTP 서비스가 잘 동작하는지 확인하기 위해 `sudo python3 -m http.server 80` 명령어로 `web server`를 실행하겠습니다.

이를 확인하기 위해 Public IP(:80)로 접속하면 아래와 같은 화면이 출력됩니다.

<p>
	<img src="imgs/ba6.png">
	<p align="center"><제출물 #5, Test Web:80></p>
</p>

---

이제 서브넷 설정을 하기전에 Rigion, AZ, VPC, subnet등 이제껏 나왔던 용어들에 대해 알아보겠습니다.

<br/>

## Rigion

Rigion은 AWS의 데이터 센터가 위치한 지역을 의미합니다.

Rigion은 논리적인 개념입니다.

<br/>

## AZ(Availability Zone)

AZ는 Rigion 안에 있는 물리적인 데이터 센터를 의미합니다.

AWS 정책에 따라, 하나의 Rigion에는 최소 2개 이상의 AZ를 보유하고 있습니다.

AZ는 물리적으로 분리되어 있으며, 각각의 AZ는 독립적인 전원, 네트워크, 냉각 시스템을 갖고 있습니다.

<br/>

## VPC(Virtual Private Cloud)

VPC는 AWS에서 제공하는 가상 클라우드입니다.

VPC의 가장 큰 특징은 물리적인 장비 구축 없이도 사용자가 필요한 만큼의 가상 네트워크를 구성할 수 있다는 점입니다.

VPC 네트워킹은 하나의 서브넷을 구성해서 라우팅 테이블, ACL 등의 통제를 받는 것을 의미합니다.

<br/>

## subnet

subnet은 VPC의 IP 주소 범위를 나누어서 사용하는 것을 의미합니다.

subnet은 VPC안에 하나 이상 생성할 수 있지만, 동일한 VPC안에 있는 subnet은 AZ가 다르더라도 IP 주소 범위가 겹치지 않아야 합니다.

subnet은 단일 AZ에만 속할 수 있습니다.

<p>
	<img src="imgs/vpn.png">
	<p align="center"><그림1. VPN 구성 예시></p>
</p>

결론적으로, VPC는 계정 전용 가상 클라우드 공간이며, VPC는 하나 이상의 서브넷으로 구성됩니다.

또한, 각각의 VPN Subnet은 각각 다른 AZ에 위치할 수 있습니다.

### Gateway

Internet Gateway를 생성하여서 각각의 다른 가용 영역에 인스턴스들을 연결해줍니다.

외부와의 네트워크 연결을 위해 사용합니다.

### NAT Gateway

Public IP를 외부에 공개하고 Natework Address Translation을 제공해서 Private IP에 접근할 수 있도록 도외줍니다.

---

## Subnet 생성

이제 앞서 만들었던 인스턴스를 위해 생성된 Default VPC에 새로운 subnet을 생성해보겠습니다.

이 때, subnet의 IP 주소 범위는 VPC의 IP 주소 범위 내에 있어야 합니다.

VPC의 CIDR 블록이 겹치지 않게 주의해야 합니다.

이렇게 생성한 서브넷으로 인스턴스를 생성하면, 인스턴스는 해당 서브넷에 속하게 됩니다.

이렇게 VCP안에 ap-northeast-2a에 두 개의 Subnet이 존재하는 것을 확인할 수 있습니다.

이 떄, 생성한 서브넷은 NAT 설정이 되어 있지 않으므로, Private Subnet이 되게 됩니다.

이 Private Subnet에 접근하기 위해선 두 가지 방법이 있습니다.

첫 번째는 Public IP를 부여하는 방법이 있고,

두 번째는 첫 번째 가상서버를 통해 Private Subnet에 접근하는 방법이 있습니다.

이번에는 두 번째 방법을 사용하겠습니다.

그러기 위해선, 첫 번째 가상서버가 두 번째 가상서버의 네트워크에도 속할 수 있도록 설정해야 합니다.

이를 위해 첫 번째 가상서버에 새로운 ENI를 생성하여서 두 번째 가상서버의 네트워크에 연결해야 합니다.

```bash
	eth0:
		...
	eth1:
		dhcp4: false
		dhcp6: false
		match:
			macaddress: 02:0f:c4:9d:64:e2
		addresses:
			- 172.31.146.212/24
```

새롭게 추가된 ENI를 인식시켜 주기 위해 위의 내용을 아래에 추가시켜서 줍니다.

/etc/netplan/50-cloud-init.yaml

`sudo netplain apply` 명령어를 통해 변경사항을 적용시켜 줍니다.

이렇게 하면 인스턴스1에 아래와 같은 네트워크가 생성된 것을 확인할 수 있습니다.

<p>
	<img src="imgs/ip a.png">
	<p align="center"><그림 2. instance 1, ip a></p>
</p>

인스턴스2와 비교하기 위해 인스턴스2에도 `ip a` 명령어를 입력해보겠습니다.

<p>
	<img src="imgs/ba7.png">
	<p align="center"><제출물 #6, Insatance2. ip a></p>
</p>

두 개의 inet을 살펴보면 호스트 IP와 broadcast가 동일한 것을 알 수 있습니다.

이는 두 개의 인스턴스가 같은 네트워크에 속해있음을 의미합니다.

이제 인스턴스1에서 인스턴스2로 접근해보겠습니다.

그러기 위해선 먼저 Agent 설정을 해줘야 합니다.

```bash
	eval {ssh-agent}
	ssh-add ~/.ssh/id_rsa
```

그 이후 Agent를 통해 인스턴스2에 접근합니다.

```bash
	# 첫 번째 인스턴스
	ssh -A ubuntu@3.39.155.196
	# 두 번째 인스턴스
	$ubuntu@ip-172-31-146-212:~$ ssh ubuntu@172.31.146.136
```

## 스냅샷

스냅샷은 특정 볼륨의 데이터나 인스턴스의 다중 볼륨의 특정 순간의 정보를 저장하는 것을 의미합니다.

<p>
	<img src="imgs/ba8.png">
	<p align="center"><제출물 #7, Snapshot></p>
</p>

---

> 틀린부분이 있거나 미흡한 부분이 있으면 알려주시면 감사하겠습니다!

출처

- https://ko.linux-console.net/?p=7102#gsc.tab=0
- https://dev.classmethod.jp/articles/amazon-vpc-eni-deep-dive/
- https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/amazon-vpc-limits.html?source=post_page-----3c6cdb6a8b09--------------------------------
- https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/what-is-amazon-vpc.html
