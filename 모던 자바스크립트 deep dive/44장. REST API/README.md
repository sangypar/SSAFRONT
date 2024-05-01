# 44장 REST API 🌙

> REST API : REST를 기반으로 서비스 API를 구현한 것

<br>

> REST : HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
1. HTTP URI를 통해 Resource(자원)을 명시
2. HTTP Method(POST, GET, PUT, DELETE, PATCH 등)를 사용
3. 해당 자원에 대해 CRUD를 적용하는 것을 의미

REST는 기본적으로 웹의 기존 기술과 **HTTP 프로토콜을 그대로 활용**하기 때문에 **웹의 장점을 최대한 활용할 수 있는 아키텍처 스타일**이다.
   
<br>

> RESTful : REST의 기본 원칙을 성실히 지킨 서비스 디자인

<br>

## 44.1 REST API의 구성

REST API는 자원, 행위, 표현의 3가지 요소로 구성된다. REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있다.

|구성 요소|내용|표현 방법|
|-|-|-|
|자원|자원|URI|
|행위|자원에 대한 행위|HTTP 요청 메서드|
|표현|자원에 대한 행위의 구체적 내용|페이로드|

```javascript
POST http://www.plusblog.co.kr/users Content-Type: application/json // 헤더 : 페이로드를 해석할 수 있게 명시
{ // 바디
  "username" : "newusers",
  "age" : "20"
}

호스트에 있는 users에 'newuser'라는 사용자를 추가하는 REST API이다.
새로운 유저를 입력하는데 사용자의 특성(이름, 나이, 성별 등)과 같은 정보들이 필요하게 되고,
이는 XML이나 JSON과 같은 다양한 표현 언어를 이용하게 된다.
이런 HTTP 메소드의 정보 표현 부분을 메서드 바디 혹은 페이로드라고 한다
```

<br>

## 44.2 REST API 설계 원칙

REST API 설계 원칙 두 가지는 **URI는 리소스를 표현**하는 데 집중하고 **행위에 대한 정의는 HTTP 요청 메서드**를 통해 하는 것이 설계하는 중요한 규칙


```javascript

```

<br>

## 44.3 JSON Server를 이용한 REST API 실습

#### 44.3.1 JSON Server 설치

```javascript

```

#### 44.3.2 db.json 파일 생성

```javascript

```

#### 44.3.3 JSON Server 실행

```javascript

```

#### 44.3.4 GET 요청

```javascript

```

#### 44.3.5 POST 요청

```javascript

```

#### 44.3.6 PUT 요청

```javascript

```

#### 44.3.7 PATCH 요청

```javascript

```

#### 44.3.8 DELETE 요청

```javascript

```
