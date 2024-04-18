---
title: Interceptor
date: 2024-04-18
categories: [spring interceptor, spring filter]
tags: [spring, interceptor, filter]
published: false
---

## FileUpload

Form의 input type으로 data와 file이 존재한다.

HTTP payload를 살펴보면 file의 데이터도

POST로 multipartResolver로 등록해야 한다.

CommonsMultipartResolver는 java의 서블릿

StandardServletMultipartResolver는 jakarta

제약조건 발생

1. Servlet 3.0 이후부터 사용 가능하다.

2. servlet-context.xml에 bean에 multipartResolver를 등록해야 한다.

3. web.xml에 DIspatcherServlet이 Servlet 3의 Multipart를 처리하도록 설정

```xml
<servlet>
    ...
    <multipart-config>
        <max-file-size> 업로드 파일의 최대 바이트 크기
        <file-size-threshold> Threshold 사이즈(사이즈보다 크면 임시 파일 저장)
    </multipart-config>
</servlet>
```

> !(multipart-tomcat)[https://tomcat.apache.org/tomcat-11.0-doc/servletapi/jakarta/servlet/annotation/MultipartConfig.html]

```html
<form method="post" enctype="multipart-">
  <input type="text" />
  <input type="file" name="uploadFile" />
</form>
```

```java
public class FileInfoDto {
    private String saveFolder;
    // 원본 데이터
    private String originFile;
    // 유일 값으로 변환
    private String saveFile;

}

public class BoardController {
    @PostMapping("/write")
    public String write() {
        // saveFolder가 존재하지 않으면 폴더 생성
        // file의 원본 파일 이름을 저장
        // 원본 파일을 랜덤한 UUID값으로 확장자명과 같이 저장
    }
}

public class BoardDaoImpl {
    public void write(BoardDto b) {
        ...

        conn.setAutoCommit(false);
        try {
            ...
            conn.commit();
        } catch (Exception e) {
            conn.rollback();
        }
    }
}
```

| 1 | 43| 240418 | te.txt | d00794fb-9446-4a0b-978a-c836a328de78.txt |

## FileDownload

```jsp

<a href="#" class="filedown" sfolder="240418" sfile="d00794fb-9446-4a0b-978a-c836a328de78.txt" ofile="te.txt">
    [다운로드]
</a>

```

```java
public class Controller {
    @mapping(download)

    return new ModelAndView("viewName", "modelName", fileInfo)
}
```

위의 경우 첫 번째 파라메터가 생성자의 첫 번째 파라메터값은 View다.

실제로 View로 이동하는게 아니라, Download를 위해서 아래와 같이 xml을 설정해야 한다.

servlet-context.xml에서 첫 번째 파라메터를 view로 이동하지 않게 설정해야 한다.

```xml
    <beans:bean ... id = "viewResolver" .. class = "... BeanNameViewResolver">
        <beans:property name ="order" value = "0" />
    </beans:bean>
```

위의 설정을 통해 xml에서 id값이 일치하는 viewName을 찾게된다.

이렇게 설정하면 FileDownloadView에서 extends AbstractView를 상속받아 가상의 뷰로 다운로드 로직을 처리

이때, FileDownloadView에서 response의 content-type을 application:download로 설정한다.

# 개요

공통 관심사항을 분리하는 것은 중복되는 코드를 줄여 가독성을 높일 수 있고, 코드 재사용에 용이하다는 이점이 있다.

이런 공통 관심 사항을 추출하는 방법 중 하나인, AOP는 Controller 메소드 앞의 Proxy 패턴의 형태로 실행된다.

Dispatcher의 전후로 존재하는 Servlet Filter와 Spring Interceptor가 존재한다.

주요 특징은 Http request와 response 파라메터를 제공한다는 특징이 있어, 주로 Web에서 공통 관심사 추출에 용이하다.

# Servlet Filter

Servlet Filter는, Dispatcher의 전, 후에 부가작업을 처리하는 객체이다.

```java

public interface Filter {
    // XML의 정보들이 filterConfig에 담긴다.
    // Java로 등록할 경우 따로 처리해줄 필요 없다.
    public void init(final FilterConfig filterConfig)

    // Filter가 여러개 모여 형성된 chain
    public void doFilter(ServletRequest, Servlet Request, FilterChain chain)
}
```

LoginFilter를 빈에 등록하면 모든 URL에 등록된다.

```java
@WebFilter(urlPatterns = "/users/me/*")
public class LoginFilter implements Filter {

}
```

## Interceptor

Interceptor는 특정 Controller의 전/후 처리가 가능하고, ViewResolver의 후처리가 가능하다.

Interceptor는 여러개를 등록할 수 있고, 순서를 지정할 수 있다.

요구사항으로 특정 서비스를 접근할 때, login을 하지 않은 사용자는 login 페이지로 이동시킨다.

HandlerInterceptorAdapter를 상속받아 preHandle, postHandle, afterCompletion을 오버라이딩한다.

`preHandle`은 Controller의 메소드가 실행되기 전에 호출되는 메소드이다.

```java
boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
```

`postHandle`은 Controller의 메소드가 실행된 후 호출되는 메소드이다.

```java
boolean postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
```

`afterCompletion`은 View가 렌더링된 후 호출되는 메소드이다.

```java
void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
```

일반적으로 `preHandle`를 주로 사용한다.

`preHandle`에서 return 값이 true이면 Controller의 메소드가 실행되고, false이면 실행되지 않는다.

이를 통해 login 여부를 판단하여, 로그인이 되어있지 않으면 login 페이지로 이동시킬 수 있다.

여러 interceptor를 등록할 수 있고, 순서를 지정할 수 있다.

```xml
<!-- 순서 예제 작성 -->
<interceptors>
    <interceptor>
        <mapping path="/users/me/*" />
        <bean class="com.example.interceptor.LoginInterceptor" />
    </interceptor>
    <interceptor>
        <mapping path="/users/me/*" />
        <bean class="com.example.interceptor.AuthInterceptor" />
    </interceptor>
</interceptors>
```

이렇게 설정할 경우, preHandle의 순서는 LoginInterceptor -> AuthInterceptor 순서로 실행된다.

postHandle과 afterCompletion 역순으로 실행된다.

```xml
<!-- mapping 예제 -->
<interceptors>
    <interceptor>
        <mapping path="/article/write" />
        <mapping path="/article/update" />

        <beans:ref bean="loginInterceptor" />
    </interceptor>
</interceptors>
```

mapping을 통해 여러 URL에 대해 interceptor를 등록할 수 있다.

해당 URL을 호출할 때, interceptor가 실행된다.

```java
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        HttpSession session = request.getSession();
        Object obj = session.getAttribute("userinfo");
        if (obj == null) {
            response.sendRedirect("/login");
            return false;
        }
        return true;
    }
}
```

위의 코드는 preHandle에서 session에 userinfo가 없으면 login 페이지로 이동시킨다.

JWT에서도 이를 활용하여, token을 검증하고, 유효하지 않으면 login 페이지로 이동시킬 수 있다.

위에서 request.getSession() 로직을 token 검증으로 변경하면 JWT를 사용할 수 있다.

### AOP vs Interceptor vs Filter

| 구분 | AOP           | Interceptor                       | Filter        |
| ---- | ------------- | --------------------------------- | ------------- |
| 위치 | 메소드 앞, 뒤 | Controller 앞, 뒤 ViewResolver 뒤 | Dispatcher 앞 |

Architecture 실행 순서

Client에서 요청이 들어오면, ServletContextListener가 실행된다.

Filter에서 요청을 가로챈다.

DispatcherServlet이 실행되어, HandlerMapping을 통해 Controller를 찾기전에 Interceptor가 실행된다.

Controller에서 로직을 처리하고, ViewResolver를 통해 View를 찾기전에 Java 객체를 Interceptor가 가로챈다.

ViewResolver를 통해 View를 찾아서 응답을 보내기전에 Interceptor가 가로챈다.

Filter에서는 주로 서버에 대한 설정을 하고, Interceptor에서는 주로 로직을 처리한다.

AOP는 Controller의 Service나 Repository등 메소드의 앞, 뒤에 실행되는 `Proxy` 패턴이다.

#### 요약

- Filter는 DispatcherServlet 사이에 위치하며, Servlet의 요청과 응답을 가로챈다.
- Interceptor는 DispatcherServlet 사이에 위치하며, Controller의 요청과 응답을 가로챈다.
- AOP는 Proxy 패턴으로 메소드의 횡단 관심사항을 분리한다.
