## 43.1 Ajax란?

- Asynchronous Javascript and XML
- 브라우저가 서버어게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식
- 브라우저에서 제공하는 Web API인 XMLHttpRequest 객체 기반 동작

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/392cfbb6-c26b-4e51-9a90-b441328220e8)


1. 이전 웹페이지와 차이가 없어서 변경할 필요가 없는 부분까지 포함된 완전한 HTML을 서버로부터 매번 다시 전송받음
2. 변경할 필요가 없는 부분까지 처음부터 다시 렌더링
3. 클라이언트와 서버와의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을 때까지 다음 처리 블로킹

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/b6d5e4c5-a691-4060-b8b9-0bd1d907cd78)


1. 변경할 부분을 갱신하는데 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신 발생 없음
2. 변경할 필요가 없는 부분은 다시 렌더링하지 않음
3. 통신이 비동기 방식으로 동작하기 때문에 서버에게 요청을 보낸 이후 블로킹 없읍

## 43.2 JSON

- Javascript Object Notation
- 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷
- 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷

### 43.2.1 JSON 표기 방식

- JSON은 자바스크립트의 객체 리터럴과 유사하게 키와 갑으로 구성된 순수한 텍스트

```json
{
  "name": "Kim",
  "age": 20,
  "alive": true,
  "hobby": ["cleaning", "climbing"]
}
```

### 43.2.2 JSON.stringify, 43.2.3 JSON.parse

- JSON.stringify 메서드는 객체를 JSON 포맷의 문자열로 변환
- 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 직렬화라 함

```javascript
const o = { name: 'Lee', gender: 'male', age: 20 };

// 객체 => JSON 형식의 문자열
const strObject = JSON.stringify(o);
console.log(typeof strObject, strObject);
// string {"name":"Lee","gender":"male","age":20}

// 객체 => JSON 형식의 문자열 + prettify
const strPrettyObject = JSON.stringify(o, null, 2);
console.log(typeof strPrettyObject, strPrettyObject);
/*
string {
  "name": "Lee",
  "gender": "male",
  "age": 20
}
*/

// replacer
// 값의 타입이 Number이면 필터링되어 반환되지 않는다.
function filter(key, value) {
  // undefined: 반환하지 않음
  return typeof value === 'number' ? undefined : value;
}

// 객체 => JSON 형식의 문자열 + replacer + prettify
const strFilteredObject = JSON.stringify(o, filter, 2);
console.log(typeof strFilteredObject, strFilteredObject);
/*
string {
  "name": "Lee",
  "gender": "male"
}
*/

const arr = [1, 5, 'false'];

// 배열 객체 => 문자열
const strArray = JSON.stringify(arr);
console.log(typeof strArray, strArray); // string [1,5,"false"]

// replacer
// 모든 값을 대문자로 변환된 문자열을 반환한다
function replaceToUpper(key, value) {
  return value.toString().toUpperCase();
}

// 배열 객체 => 문자열 + replacer
const strFilteredArray = JSON.stringify(arr, replaceToUpper);
console.log(typeof strFilteredArray, strFilteredArray); // string "1,5,FALSE"
```

- JSON.parse 메서드는 JSON 포맷의 문자열을 객체로 변환
- 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열
- 이 문자열을 객체로서 사용하려면 JSON 포맷의 문자열을 객체화해야 하는데 이를 역직렬화이라 함

```javascript
const o = { name: 'Lee', gender: 'male', age: 20 };

// 객체 => JSON 형식의 문자열
const strObject = JSON.stringify(o);
console.log(typeof strObject, strObject);
// string {"name":"Lee","gender":"male","age":20}

const arr = [1, 5, 'false'];

// 배열 객체 => 문자열
const strArray = JSON.stringify(arr);
console.log(typeof strArray, strArray); // string [1,5,"false"]

// JSON 형식의 문자열 => 객체
const obj = JSON.parse(strObject);
console.log(typeof obj, obj); // object { name: 'Lee', gender: 'male' }

// 문자열 => 배열 객체
const objArray = JSON.parse(strArray);
console.log(typeof objArray, objArray); // object [1, 5, "false"]
```

## 43.3 XMLHttpRequest

- 브라우저는 주소창이나 HTML의 form 태그 또는 a 태그를 통해 HTTP 요청 전송 기능 기본 제공
- 자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체 사용

### 43.3.1 XMLHttpRequest 객체 생성

- XMLHttpRequest 객체는 XMLHttpRequest 생성자 함수를 호출하여 생성
- XMLHttpRequest 객체는 브라우저에서 제공하는 Web API이므로 브라우저 환경에서만 정상적 실행

```javascript
const xhr = new XMLHttpRequest();
```

### 43.3.2 XMLHttpRequest 객체의 프로퍼티와 메서드

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/ae12fb52-5dff-4986-97f5-caec13139ebe)
![image](https://github.com/sangypar/SSAFRONT/assets/106229016/9fadf4ff-7a05-4bb9-99db-68dcca76d526)
![image](https://github.com/sangypar/SSAFRONT/assets/106229016/089c2496-3b2b-4057-9473-be2d859c2fc0)
![image](https://github.com/sangypar/SSAFRONT/assets/106229016/078c4b9c-025d-4c11-bd45-0fbd47a5e9da)

### 43.3.3 HTTP 요청 전송

```javascript
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화 - 비동기 방식으로 Request 오픈
xhr.open('GET', '/users');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send();
```

<b>XMLHttpRequest.prototype.open</b>

open 메서드는 서버에 전송할 HTTP 요청 초기화

```
xhr.open(method, url[, async])
```

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/2b38dd98-569a-47a8-bb41-ae96d37ecc08)

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/071fd206-a527-42fe-aecd-ab68097217d9)

<b>XMLHttpRequest.prototype.send</b>

send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송

- GET 요청 메서드의 경우 URL의 일부분인 쿼리 문자열로 서버에 전송
- POST 요청 메서드의 경우 데이터(페이로드)를 요청 몸체에 담아 전송

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/17eb14eb-d92b-4d75-9623-2c40ed925537)

- HTTP 요청 메서드가 GET인 경우 send 메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정

<b>XMLHttpRequest.prototype.setRequestHeader</b>

- setRequestHeader 메서드는 특정 HTTP 요청 헤더 값 설정
- 반드시 open 메서드를 호출한 이후에 호출

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/9890d69e-b697-4c0e-82e5-3b282023664c)

```javascript
// json으로 전송하는 경우
xhr.open('POST', '/users');

// 클라이언트가 서버로 전송할 데이터의 MIME-type 지정: json
xhr.setRequestHeader('Content-type', 'application/json');

const data = { id: 3, title: 'JavaScript', author: 'Park', price: 5000};

xhr.send(JSON.stringify(data));
```

### 43.3.4 HTTP 응답 처리

- 서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 함
- HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티 값이 변경된 경우 발생하는 readystatechanges 이벤트를 캐치하여 응답 처리

```javascript
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

xhr.send();

// XMLHttpRequest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 onreadystatechange 이벤트 핸들러가 호출된다.
xhr.onreadystatechange = function (e) {
  // readyStates는 XMLHttpRequest의 상태(state)를 반환
  // readyState: 4 => DONE(서버 응답 완료)
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // status는 response 상태 코드를 반환 : 200 => 정상 응답
  if(xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.log('Error!');
  }
};
```

- readystatechange 이벤트를 통해 HTTP 요청의 현재 상태 확인
- readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가 변경될 때마다 발생
- load 이벤트로 캐치해도 좋으며 load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생
- 따라서 load 이벤트를 캐치하는 경우 xhr.readyState를 확인할 필요 없음
