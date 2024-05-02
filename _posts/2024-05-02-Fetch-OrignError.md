---
title: Fetch OrignError
date: 2024-05-02
tags: [Fetch], [JavaScript], [OrignError]
category: [javascript]
---

## 목차

1. [REST API 호출](#rest-api-호출)
1. [CORS 정책](#cors-정책)
1. [CORS 정책 지정 방법](#cors-정책-지정-방법)
1. [해결 방안](#해결-방안)



## <a name="rest-api-호출"></a> REST API 호출

`REST API`를 호출할 때, `fetch`를 통해 다른 도메인의 API를 가져다 쓰려고 한다.

```js
function getWeather(code) {
	fetch(`http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=${code}`, {
		method: "GET",
	})
	.then((res) => res.xml())
	.then((data) => {
		makeList(data)
	})
}
```

이 코드를 작성하고 콘솔창을 켜보면 다음과 같은 에러가 발생한다.

```
http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=2915573000') from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

앞서, 공공 데이터 포털의 REST API를 fetch로 가져올 땐 문제가 없었는데, 기상청의 API를 가져오려고 하니 에러가 발생했다.

이는 `CORS` 정책 때문이다.

## <a name="cors-정책"></a> CORS 정책

`CORS`는 `Cross-Origin Resource Sharing`의 약자로, 다른 도메인 간의 자원 공유를 제한하는 정책이다.

`Origin`이란, `Protocol`, `Host`, `Port`를 합친 것을 의미한다.

`fetch`로 https://www.example.com의 API를 가져오려고 한다면, `Origin`은 다음과 같다.

|Protocol|Host|Port|
|:---: |:---: | :---: |
|https | www.example.com | 80|

`CORS` 정책은 이 `Origin`을 기준으로 적용되고, 크게 3가지로 나뉜다.

1. Simple Request
2. Preflight Request
3. Credential Request

### Simple Request

`Simple Request`는 두 가지 조건을 만족해야 한다.

1. `HTTP Method`는  `GET`, `HEAD`, `POST` 중 하나여야 한다.
2. `Content-Type`은 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain` 중 하나여야 한다.

`Simple Request`는 `CORS` 정책이 적용되지 않는다.

### Preflight Request

`Preflight Request`는 `Simple Request`가 아닌 경우, 브라우저가 서버에 요청을 보내기 전에 `OPTIONS` 메소드로 요청을 보내는 것이다.

`Preflight Request`는 다음과 같은 경우에 사용된다.

1. `HTTP Method`가 `GET`, `HEAD`, `POST`가 아닌 경우
2. `Content-Type`이 `application/json`이나 `application/xml`인 경우
3. `Custom Header`를 사용하는 경우

`Preflight Request`는 서버에서 `Access-Control-Allow-Origin` 헤더를 확인하고, 요청을 허용할지 말지 결정한다.

### Credential Request

`Credential Request`는 `Preflight Request`와 비슷하지만, `credentials` 옵션을 사용하는 경우이다.

`credentials` 옵션은 `same-origin`, `include`, `omit` 중 하나여야 한다.

- `same-origin` : 같은 도메인에서만 요청을 보낼 수 있다.
- `include` : 모든 도메인에서 요청을 보낼 수 있다.
- `omit` : 요청을 보낼 수 없다.

일반적으로 많은 서버에서는 `credentials` 옵션을 `include`로 설정하지 않는다.

`Network` 탭에서 `Request Headers`를 확인해보면 `credentials` 옵션 설정을 확인할 수 있다.

```
Access-Control-Allow-Origin: http://www.example.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```

대다수의 서버는 `Access-Control-Allow-Origin` 헤더를 사용하여 `CORS` 정책을 적용한다.

이는 동일 도메인에서만 요청을 허용하겠다는 의미이다.

## <a name="cors-정책-지정-방법"></a> CORS 정책 지정 방법

백엔드에선 `CORS` 정책을 지정할 수 있다.

실제 `memo` 프로젝트에서 진행했던 `exprees` 서버에서 `CORS` 정책을 지정하는 방법을 살펴보자.

설정 정보가 들어있는 (index.js)[https://github.com/zion0425/note_memo/blob/master/src/index.js]에서 `CORS` 정책을 지정할 수 있다.

`CORS` 정책 중, `Access-Control-Allow-Origin` 헤더를 사용하여 특정 도메인에서만 허용하기 위해선 다음과 같이 설정할 수 있다.

```js
...

const app = express();

app.use(logger(":date"), function(req, res, next) {
  next();
});
```

위의 기존 코드에서 `app.use`를 사용하여 `CORS` 정책을 지정할 수 있다.

```js

app.use((req, res, next) => {
	  res.header("Access-Control-Allow-Origin", "http://localhost:5500");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

...
```
이처럼 `Rest API`를 제공하는 측에서, `CORS` 정책을 지정하여 요청을 허용할 수 있다.

## 문제점

실제 우리가 `fetch`를 통해 다른 도메인의 API를 가져오려고 할 때, `CORS` 정책이 적용되어 있다면, 요청을 보낼 수 없다.

앞서 살펴봤던 코드의 경우, 기상청의 API를 가져오려고 했는데, `CORS` 정책이 적용되어 있어서 요청을 보낼 수 없었다.

이를 `network` 탭에서 확인해보면 다음과 같다.

```
...

Origin: http://127.0.0.1:5500
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
...
```
`Sec-Fetch-Mode`가 `CORS`로 설정되어 있다는 것은 `CORS` 정책이 적용되어 있다는 것을 의미한다.

또한, `Sec-Fetch-Site`가 `cross-site`로 설정되어 있다는 것은 다른 도메인의 API를 요청하고 있다는 것을 의미한다.

이 때문에 다른 도메인 즉, localhost:5500에서 기상청의 API를 가져오려고 했을 때, `CORS` 정책이 적용되어 있어서 요청을 보낼 수 없게된 것이다.

## `CORS` 정책 이유

이런 `CORS` 정책이 적용되어 있는 이유는 보안상의 이유이다.

대표적으로 `XSS`, `CSRF` 공격을 방지하기 위해 `CORS` 정책이 도입되었다.

`XSS`는 `Cross-Site Scripting`의 약자로, 다른 도메인에서 스크립트를 실행하는 공격이다.

`XSS`는 스크립트 코드를 사용하는 `InJection` 공격이다. 주로 input 태그에 스크립트 코드를 삽입하여 공격한다.

`CSRF`는 `Cross-Site Request Forgery`의 약자로, 다른 도메인에서 요청을 위조하는 공격이다.

만약 `CORS` 정책이 도입되어 있지 않다면 위장 사이트에서 사용자의 정보를 탈취할 수 있다.

기본적으로 `Fishing` 사이트를 기반으로 설명하겠다.

사용자가 www.sion.com에 로그인하려고 한다. 유사한 도메인의 www.sionhac.com을 만들어 사용자를 유도하여 로그인을 시도하게 한다.

사용자가 www.sion.com인 줄 알고 접속한 사이트에서 로그인을 시도하면, www.sionhac.com
에서는 이 정보를 www.sion.com에 전송하여 request를 탈취할 수 있다.

이를 방지하기 위해 `CORS` 정책의 SOP(Same Origin Policy)가 도입되었다.

## <a name="해결-방안"></a> 해결 방안

앞서, `fetch`로 다른 도메인의 API를 가져오려고 했을 때, `CORS` 정책이 적용되어 있어서 요청을 보낼 수 없었다.

앞서 보낸 `fetch` 요청은 `Simple Request` 방식으로 전송하고 있다.

`Simple Reqeust`의 경우, 본 요청 한 번만 보내므로, 서버에서 바로 `CORS` 정책을 확인하고, 요청을 허용할지 말지 결정한다.

만약 `options`으로 `preflight` 요청을 보내게 된다면, 네트워크 탭에서 `Request Method`인 `OPTIONS` 메소드로 예비 요청을 한 번 보내고, 본 요청을 보내게 된다.

이 때, 서버에서 예비 요청에 대한 요청을 확인하고 `CORS` 정책을 확인하고 위반 여부를 판단하여 응답을 보낸다.

그러므로, `CORS` 문제를 해결하기 위해선, 서버에서 `CORS` 정책을 변경해주어야 한다.

하지만, 서버에서 `CORS` 정책을 변경할 수 없다면, 다음과 같은 방법으로 해결할 수 있다.

1. Chrome 확장 프로그램

2. Proxy 서버

이 중, Proxy Server를 구현하여 해결하는 코드를 작성해보자.

먼저 `express`를 설치하고, `express`를 `require`하여 사용한다.

```bash
npm install express
```

```js

const express = require('express');
const app = express();

```

다음으로, REST API를 요청할 주소를 상수로 지정한다.

```js
const requestOrigin = 'https://www.kma.go.kr';
const requestPath = '/wid/queryDFSRSS.jsp';

// 요청 받을 port 지정
const proxyPort = 659;

```

다음으로, `express`에서 `get` 메소드를 사용하여 요청을 받는다.

```js
app.get(requestPath, async (req, res) => {
	try{
		const zone = req.query.zone;
		const url = `${requestOrigin}${requestPath}?zone=${zone}`;

		await fetch(url)
		.then(response => response.text())
		.then(data => {
			console.log(data)
			res.set('Access-Control-Allow-Origin', '*');
			res.send(data);
		});
	}catch (e) {
		console.error(e);
	}
});
```
마지막으로, `listen` 메소드를 사용하여 서버를 실행한다.

```js
app.listen(proxyPort, () => {
	console.log(`Proxy server is running on port ${proxyPort}`);
});

```

이제 `fetch`로 요청을 보낼 때, `localhost:659`로 요청을 보내면, `CORS` 정책이 적용되어 있지 않아서 요청을 보낼 수 있고, 이를 `express` 서버가 받아서 다시 요청을 보내준다.

추후엔, `app.use`를 사용해서 모든 요청에 대한 `proxy`를 설정할 수 있다.

> (proxy_server 코드)[https://github.com/zion0425/node_proxy_server]

---

### 출처

- (fetch API - crossorigin 공유 표준 정책)[https://fetch.spec.whatwg.org/#http-cors-protocol]

- (mozilla - CORS)[https://developer.mozilla.org/ko/docs/Web/HTTP/CORS]

- (XSS)[https://www.fis.kr/ko/major_biz/cyber_safety_oper/attack_info/security_news?articleSeq=3408]

- (CORS 정책 해결방안: tistory)[https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F]

- (app.use vs app.get)[https://www.inflearn.com/questions/383198/app-get-app-use-%EC%B0%A8%EC%9D%B4%EC%A0%90]

- (HSTS)[https://kyoung-jnn.com/posts/hsts]

- (fetch 메타데이터)[https://velog.io/@rnrn99/Fetch-metadata-request-header]

