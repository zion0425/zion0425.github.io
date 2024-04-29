---
title: AWS Instance 기본 설정
date: 2023-11-03
categories: [aws]
tags: [aws]
---

### Install Debian on UTM

install utm
install debian .iso

### System

Standard PC (Q35 + ICH9, 2009) (alias of pc-q35–6.2)(q35)
https://browser.geekbench.com/v4/cpu/4155813

### QEMU

: 가상화 소프트웨어 가운데 하나다. Fabrice Bellard가 만들었으며 x86 이외의 기종을 위해 만들어진 소프트웨어 스택 전체를 가상머신 위에서 실행할 수 있다는 특징이 있다. 동적 변환기(Portable dynamic translation)를 사용한다.

### UTM (KVM, Kernel-based Virtual Machine)

Oracle의 virtual machine, VmWare와는 다르게 Kernel base의 VM이다.
KVM은 Linux를 하이퍼바이저로 전환시켜 VM등 virtual 환경에서 새로운 os를 실행.
다른 hypervisor는 새로운 OS를 만들기 위해 memory, process scheduler, I/O등의 권환을 받아야 하지만, KVM은 linux Kernel의 일부이므로 이러한 기능을 따로 구하지 않고 기존의 linux kernel 기반의 process를 사용

> debian softwares
> https://www.redhat.com/ko/topics/virtualization/what-is-KVM
> https://wiki.debian.org/ko/DesktopEnvironment

### iso

cd나 dvd를 파일로 만든 것

### Boot option

boot error 발생시 boot manager로 boot 파일 잡아줌.Boot Loader (LILO(Linux LOader), GRUB(GRand Undefined Bootloader)
Rom-BIOS에서 정보를 읽어들인 후, 가장 먼저 인식 된 부팅매체에서 Boot Loader를 읽어들임

> https://www.coredump.id.au/debian-arm64-and-utm-on-apple-m1-macs/

### create at least 2 encrypted partitions using LVM

os 설치시 설치 옵션중에 encrypted partition이 있다. 이 중 /home을 enctyped partition으로 설정한다.
![](https://velog.velcdn.com/images/zion0425/post/6a0ae15a-264b-4736-8f38-b87e41a2c5d6/image.png)

### Partition

물리적인 저장 공간을 논리적인 공간으로 나눈 것, os에서는 다른 영역으로 판단.

### encryped partition

> https://www.jetico.com/file-downloads/web_help/bcve4/html/01_introduction/02_what_is_ve.htm

encryped partition은 아래와 같이 HDD등 물리적인 디스크 공간에 위치한다. 이 파티션은 유저가 비밀번호를 입력하고 접근할 수 있는 공간이다. 아래와 같이 각각 다른 파티션에 독립되어 있는 encryped partition에 접근하기 위해선 비밀번호를 입력해 엑세스 해야만 한다. 아래의 경우 c 드라이브 즉 HDD1이 전부다 암호화된 파티션이므로 HDD1을 접근하기 위해선 암호가 필요하다.

![](https://velog.velcdn.com/images/zion0425/post/3505aa34-2786-4e26-a37a-f5a1b8cc454a/image.png)

### LVM(Logical Volume Manager)

물리적인 볼륨 장치를 추상화를 통해 보여주는데 이를 관리하는 manager이다.

### PV(Physical Volume)

hard disk or partition, 등 물리적 공간

### VG(Volume Groups)

하나 이상의 Physical Volume을 담고있는 그룹

### LV(Logical Volume)

VG에 속해있는 form, 가상의 논리적 구조

### PE(Physical Extents)

실제 데이터를 조작하기 위해 블록으로 나뉘어져 있는 물리적 작업 공간,

### LE(Logical Extents)

PE와 유사하지만 LV level을 다루기 위한 공간, 블록의 사이즈는 각각의 VG 그룹과 LV 영역의 블록만큼이다

> https://medium.com/r/?url=https%3A%2F%2Ftech.gluesys.com%2Fblog%2F2019%2F04%2F08%2FLVM.html

```
||-------------------------OS----------------------------||
||-------------------------LVM---------------------------||
||  LV-1 (/)    |LV-2 (swap)|  LV 3 (/home) | LV-4 (/tmp)|| Logical Volumes(LV)
||------------------------------------------|------------||
||                  VG 1                    |    VG 2    || Volume Groups(VG)
||------------------------------------------|------------||
||  /dev/sda2 |    /dev/sda3    | /dev/sdb2 | /dev/sdd4  || Physical Volumes(PV)
||-------------------------------------------------------||
```

## OS(Operating System ), Debian VS CentOS

두 OS는 리눅스 배포판에서 생성된 것들이다. 각각 칩셋에 지원되는지 여부와 PM이 다르다는 특징이 있다.

둘다 네트워크 기반으로, 네트워크를 통해서 종송석 검사와 저장소를 관리한다.

### debian

Debian은 리눅스 커뮤니티에 의해서 무료로 오픈되어 있는 오픈 소스 기반 운영체제이다.
Debian은 DEB(Debian) package format을 (실제로는 아카이브와 유사)사용하고 dpkg/APT를 사용한다.
정기적으로 보안 업데이트를 제공한다.
Ubuntu Knoppix PureOS등 많은 리눅스 배포판의 기반이 되는 OS다

### CentOS

CentOS는 유료 리눅스 운영체제인 RHEL(ReadHat Enterprise Linux)를 기반으로 만들어진 무료 소프트웨어이다. 기업용으로 만들어진 운영체제이므로 안정성을 우선시하여 개발되었다. 
CentOS는 RPM(Readhat Package Manager) package format을 사용하고 YUM/DNF를 사용한다.
하지만 최근 2021년 12월에 들어 CentOS Linux(ReadHat이 이미 인수함)의 개발을 중단하고 CentOS Stream을 중점적으로 개발하겠다고 하였다.
CentOS Stream은 RHEL의 Preview 버전이다. 즉, 기업용 OS를 유료로 사용하게 만드려는 전략으로 보인다.

## PM(Package Manager), apt VS aptitude

### apt

apt는 .deb 패키지를 위해 설계되었지만, 현재는 RPM package manager(ReadHat Package manager)와 호환된다. CLI가 특징
'etc/apt/sources.list'에 지정된 소스 목록에서 패키지와 종속성 목록을 정렬하여서 패키지 종속성 문제를 유저가 고민하지 않아도 된다.

### aptitude

aptitude는 CLI와 더불어 GUI를 제공한다. 이 또한 debian을 위해 설계되었지만 RPM 기반의 배포판에서도 사용 가능하다
사용하지 않는 패키지를 자동으로 제거해주고, apt-mark, apt-cache, why-not등 apt-get에서는 추가 옵션 없이 처리 하는 기능들을 aptitude는 직관적인 명령어를 제공하며, 틀린 이유들과 해결방안을 제시해주기도 한다. 좀 더 high-level에 가깝다.

## AppArmor

### DAC(Discretionary Access Control)

임의 접근 통제는 시스템 객체에 대한 접근을 사용자나 그룹의 권한(o, g, u)을 기준으로 제한하는 방법이다.

접근 권한을 가지고 있는 주체 즉, 소유자가 해당 객체에 대한 접근을 다른 유저들에게 줄 수 있는 방식이다. root는 모든 권한을 다 가지고 있다.

### MAC(Mandatory Access Control) 

강제적 접근 통제는 관리자가 모든 객체에 대한 접근 권한을 할당하는 방식이다.

### AppArmor

MAC를 제공함으로써 전통적인 유닉스 접근 통제모델인 DAC를 지원한다.

네트워크, raw 소켓, I/O 등의 작업을 제한하고 관리한다.

프로그램 동작 제한 사항을 AppArmor Profile 파일을 통해 AppArmor에게 전달한다.

Enforcement Mode : 프로그램의 동작을 제한하고 Log를 기록
Complain Mode : 프로그램 동작을 제한하지 않고 Log만 기록한다.

### SSH(Secure SHell)

원격 호스트에 접속하기 위해 사용되는 보안 프로토콜
debian openssh-server package 설치 - os설치 단계에서 체크해줘서 설치한다.
vi /etc/ssh/sshd_config 에서 Port 4242, PermitRootLogin no
systemctl restart ssh - system deamon(systemd)을 관리하는 명령어

### UFW(Uncomplicated Firewall)

IP Table을 직접 컨트롤 하지 않고 유저 친화적인 UFW를 통해 방화벽 설정
ufw default deny : 모든 접근 차단
ufw allow 4242 : 4242포트 열기

원격 접속 오류시 아래 명령어 입력 후 해당 라인 삭제 후 재접속
find / -name known_hosts find ~/ -name known_hosts -> /home/계정명/.ssh/known_hosts

> https://webdir.tistory.com/206

<figure style="display:block; text-align:center;">
  <img src="https://velog.velcdn.com/images/zion0425/post/b2e34af7-5315-461a-93dc-c2641675498a/image.png"
       style=" margin:0px auto">
  <figcaption style="text-align:center; font-size:15px; color:#808080">
    ss -tunlp, delete dhcp port
  </figcaption>
</figure>

### 포트포워딩

각 가정마다 할당받은 네트워크 ip 주소가 있다.12.34.56.78 여기서 뻗어 나가는 공유기 주소가 있다. 192.168.xxx.xxx … 내가 공유기 서버에 80포트로 웹 서버를 열어 놨다. 외부에서 이 공유기 서버에 접근하기 위해서는 12.34.56.78:80 으로 접근해야 한다. 이 때 포트 포워딩을 통해 12.34.56.78:80으로 접근하는 사람들을 192.168.xxx.xxx:80으로 연결시켜 준다.

ip a 로 ssh서버의 ip주소를 알아냄.

```bash
ssh {username}@{hostname or ip} -p {port)
```

### password rule

암호 사용기간 30일
암호 최소 사용 기간 2일
암호 사용기간 만료 7일 전 경고

<figure style="display:block; text-align:center;">
  <img src="https://velog.velcdn.com/images/zion0425/post/88778d0f-ca27-481e-8d28-7c7927087a53/image.png"
       style=" margin:0px auto">
  <figcaption style="text-align:center; font-size:15px; color:#808080">
    /etc/login.defs
  </figcaption>
</figure>

### 비밀번호 변경 규칙

```bash
apt-get install libpam-pwquality
```

암호 강도(password strength)를 확인하는 PAM 모듈
retry=3 : 암호 입력 가능 횟수

- minlen=10 : 암호 최소 길이
- difok=7 : 기존 암호와 달라야 하는 문자 수
- ucredit=-1 : 대문자 1개 이상 포함
- lcredit = -1 : 소문자 1개 이상 포함
- dcredit=-1 : 숫자 1개 이상 포함
- reject_username : username 정방향/역방향 일치 시 거부
- enforce_for_root : root 암호의 동일한 암호 정책 적용 여부
- maxrepeat=3 : 연속된 문자 최대 3개
<figure style="display:block; text-align:center;">
  <img src="https://velog.velcdn.com/images/zion0425/post/e6916fd6-3e88-4743-bb71-e4209ad3f5e4/image.png"
       style=" margin:0px auto">
  <figcaption style="text-align:center; font-size:15px; color:#808080">
    /etc/pam.d/common-password
  </figcaption>
</figure>

방금의 설정은 새로 생성한 계정에 적용되는 정책으로 이미 생성된 계정의 비밀번호 정책은 수동으로 세팅해주어야 한다.

chage -l [확인할유저명] 명령으로 이를 확인할 수 있다.

```bash
chage -m 2 [user_name] - minimum
chage -M 30 [user_name] - maximum
```

### addgroups

```bash
groupadd user42
```

user + modify의 합성어로 유저의 속성을 변경하는 명령어이다. -aG 옵션과 -g옵션을 사용하게 되는데 의미는 다음과 같다.

-aG == - append: 반드시 -G옵션과 함께 써야 하며 인수로 넘겨진 유저가 속한 그룹에 인수로 넘긴 그룹을 추가해준다.
 -g == - gid: 인수로 그룹과 유저를 받고 해당 유저의 초기 로그인 그룹(primary group)을 넘겨진 그룹으로 세팅한다.

유저 홈디렉터리에 있는 모든 파일들의 소유 그룹 명의 또한 새로운 그룹으로 갱신한다.

```bash
usermod -aG sudo,user42 [user_name] 
usermod -g user42 [user_name]
```

> https://techdebt.tistory.com/18?category=833728

<figure style="display:block; text-align:center;">
  <img src="https://velog.velcdn.com/images/zion0425/post/82627f90-9ffe-48fd-80d5-3b3cfd0a7f3a/image.png"
       style=" margin:0px auto">
  <figcaption style="text-align:center; font-size:15px; color:#808080">
    sudo option, visudo
  </figcaption>
</figure>

### secure path 보안

> https://www.tuwlab.com/ece/24044

requiretty : tty node 실행

![](https://velog.velcdn.com/images/zion0425/post/e0a2bbfb-9d17-4fdb-838e-1643792214e3/image.png)

### monitering.sh

일정시간마다 OS의 상태를 출력하는 monitering.sh를 실행할 수 있도록 설정한다.

![](https://velog.velcdn.com/images/zion0425/post/218c894f-4f93-41d9-9751-2daaf24e641b/image.png)

```bash
crontab -e
MAILTO=""
* * * * * /home/monitoring.sh | wall
```
