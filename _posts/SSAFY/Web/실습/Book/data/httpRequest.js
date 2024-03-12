function sendRequest(url, params, callback, method) {
  // 비동기 요청 처리를 위한 XMLHttpRequest 객체 생성.
  var httpRequest = new XMLHttpRequest();

  // 요청시 method의 종류 설정.
  var httpMethod = method ? method : "GET";
  // GET, POST로 지정되지 않은 모든 요청을 GET으로 설정.
  if (httpMethod != "GET" && httpMethod != "POST") {
    httpMethod = "GET";
  }
  // 전송할 parameter를 설정.
  var httpParams = params == null || params == "" ? null : params;
  var httpUrl = url;
  // GET방식일 경우 QueryString 형식으로 지정.
  if (httpMethod == "GET" && httpParams != null) {
    httpUrl = httpUrl + "?" + httpParams;
  }

  //console.log("method == " + httpMethod + "\turl == " + httpUrl + "\tparam == " + httpParams);
  // open() 함수를 이용하여 method의 종류, 경로, 동기(true)/비동기(false) 여부 설정.
  httpRequest.open(httpMethod, httpUrl, true);
  //httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // httpRequest의 상태에 따라 호출될 callback 함수 지정.
  httpRequest.onreadystatechange = callback;
  //console.log(httpMethod == 'POST' ? httpParams : null);
  // POST일 경우 파라미터를 설정하고, send() 함수를 이용하여 서버에 전송.
  httpRequest.send(httpMethod == "POST" ? httpParams : null);
  return httpRequest;
}
