브라우저가 HTML, CSS, 자바스크립트로 작성된 텍스트 문서를 어떻게 파싱(해석)하여 브라우저에 렌더링하는지 살펴보자

> 파싱(구문 분석)은 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 들여 실행하기 위해 텍스트 문서의 문자열을 토큰으로 분해하고,
> 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스 트리를 생성하는 일련의 과정

> 렌더링은 HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/a7bc5fac-0fc1-478b-84dd-804f1cb9208b)

1. 브라우저는 HTML, CSS, 자바스크립트, 이미지, 폰트 파일 등 렌더링에 필요한 리소스를 요청하고 서버로부터 응답을 받는다.
2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하고 이들을 결합하여 렌더 트리를 생성한다.
3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST를 생성하고 바이트코드로 변환하여 실행한다. 이 때 자바스크립트는 DOM API를 통해 DOM이나 CSSOM을 변경할 수 있다. 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합된다.
4. 렌더 트리를 기반으로 HTML 요소의 레이아웃(위치와 크기)을 계산하고 브라우저 화면에 HTML 요소를 페인팅한다.

## 38.1 요청과 응답

- 브라우저의 핵심 기능은 필요한 리소스를 서버에 요청하고 서버로부터 응답받아 브라우저에 시각적으로 렌더링하는 것
- 서버에 요청을 전송하기 위해 브라우저는 주소창을 제공
- 주소창에 URL을 입력하고 엔터 키를 누르면 URL의 호스트 이름이 DNS를 통해 IP 주소로 변환되고 이 IP 주소를 갖는 서버에게 요청 전송

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/c04c9ba6-cdaf-4ea7-9189-286127d3f0f1)

1. 주소창에 "https://poiemaweb.com" 을 입력하고 엔터를 누르면 프로토콜과 호스트만으로 구성된 URI에 의한 요청이 poiemaweb.com 서버로 전송
2. 루트 요청에는 명확한 리소스 요청이 없기에 일반적으로 서버는 암묵적으로 index.html을 응답하도록 기본 설정 ("https://poiemaweb.com" == "https://poiemaweb.com/index.html")
3. 만약 index.html이 아닌 다른 정적 파일을 서버에 요청하려면 브라우저 주소창에 "https://poiemaweb.com/assets/data/data.json"과 같이 요청할 정적 파일의 경로와 파일 이름을 패스에 기술하여 요청
4. 반드시 브라우저 주소창을 통해 서버에게 정적 파일만을 요청할 수 있는 것은 아니면 ajax, REST API를 통해 정적/동적으로 요청 가능

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/cd970f98-cbf6-4a98-94d1-e9762425ac83)

- index.html 뿐만 아니라 CSS, 자바스크립트, 이미지, 폰트 파일들도 응답
- 이는 브라우저 렌더링 엔진이 HTML을 파싱하는 도중 외부 리소르를 로드하는 태그, 즉 CSS 파일을 로드하는 link 태그, 이미지 파일을 로드하는 img 태그, 자바스크립트를 로드하는 script 태그 등을 만나면 HTML의 파싱을 일시 중단하고 해당 리소스 파일을 서버로 요청

## 38.2 HTTP 1.1과 HTTP 2.0

HTTP는 웹에서 브라우저와 서버가 통신하기 위한 프로토콜(규약)

- HTTP/1.1은 기본적으로 커넥션당 하나의 요청과 응답만 처리, 여러 개의 요청을 한 번에 전송할 수 없고 응답 또한 마찬가지
- 이는 요청할 리소스의 개수에 비례하여 응답 시간도 증가

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/d87fbb8f-7e48-4166-b549-00bb38c799e0)

- HTTP/2는 커넥션당 여러 개의 요청과 응답, 즉 다중 요청/응답이 가능
- HTTP/1.1에 비해 페이지 로드 속도가 약 50% 정도 빠름

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/65d16a9d-1ea7-40d2-bd47-548f8e9030cb)

## 38.3 HTML 파싱과 DOM 생성

- 브라우저의 요청에 의해 서버가 응답한 HTML 문서는 문자열로 이루어진 순수한 텍스트
- HTML 문서를 브라우저에 시각적인 픽셀로 렌더링하려면 HTML 문서를 브라우저가 이해할 수 있는 자료구조로 변환

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/7cb841a5-9b3d-4c19-aee5-c3f46ac82a06)

1. 서버에 존재하던 HTML 파일이 브라우저의 요청에 의해 응답, 이때 서버는 브라우저가 요청한 HTML 파일을 읽어 들여 메모리에 저장한 다음 메모리에 저장된 바이트(2진수)를 인터넷을 경유하여 응답
2. 브라우저는 서버가 응답한 HTML 문서를 바이트 형태로 응답 수신, 응답된 바이트 형태의 HTML 문서는 인코딩 방식 기준으로 문자열로 변환
3. 문자열로 변환된 HTML 문서를 읽어 들여 문법적 의미를 갖는 코드의 최소 단위인 토큰들로 분해
4. 각 토큰들을 객체로 변환하여 노드 생성, 토큰의 내용에 따라 문서 노드, 요소 노드, 어트리뷰트 노드, 텍스트 노드 생성
5. HTML 문서는 HTML 요소들의 집합으로 이루어지며 HTML 요소는 중첩 관계를 가지며 이에 의해 부자 관계가 형성, 이러한 관계를 반영하여 모든 노드들을 트리 자료구조로 구성하고 이를 DOM이라 함

## 38.4 CSS 파싱과 CSSOM 생성

- 렌더링 엔진은 HTML을 처음부터 한 줄씩 순차적으로 파싱하여 DOM을 생성해 나가다 CSS를 로드하는 link 태그나 style 태그를 만나면 DOM 생성을 일시 중단
- link 태그의 href 어트리뷰트에 지정된 CSS 파일을 서버에 요청하여 로드한 CSS 파일이나 style 태그 내의 CSS를 HTML과 동일한 파싱 과정(바이트 -> 문자 -> 토큰 -> 노드 -> CSSOM)을 거치며 해석하여 CSSOM 생성
- CSS 파싱을 완료하면 HTML 파싱이 중단된 지점부터 다시 HTML을 파싱하기 시작하여 DOM 생성 재개

```css
body {
  font-size: 18px;
}

ul {
  list-style-type: none;
}
```

- CSSOM은 상속을 반영하여 생성됨
- 위 예제에서 body 요소에 적용한 font-size 프로퍼티와 ul 요소에 적용한 list-style-type 프로퍼티는 모든 li 요소에 상속되며 이러한 관계가 반영됨

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/51627c49-4ec0-4942-9f49-41c0488afc51)

## 38.5 렌더 트리 생성

668p

## 38.6 자바스크립트 파싱과 실행

## 38.7 리플로우와 리페인트

## 38.8 자바스크립트 파싱에 의한 HTML 파싱 중단

## 38.9 script 태그의 async/defer 어트리뷰트
