## 14.1 변수의 생명 주기

### 14.1.1 지역 변수의 생명 주기

변수는 자신이 선언된 위치에서 생성되고 소멸한다.
전역 변수의 생명주기는 애플리케이션의 생명 주기와 같다.
하지만 함수 내부에서 선언된 지역 변수는 함수가 호출되면 생성되고 함수가 종료하면 소멸한다.

```javascript
function foo() {
  var x = 'local';
  consolelog(x); // local
  return x;
}

foo();
console.log(x); // ReferenceError: x is not defined
```

변수 선언이 런타임 이전 단계에서 자바스크립트 엔진에 의해 먼저 실행되는 호이스팅은 엄밀히 말하면 전역 변수에 한정된 것이다.

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/19e043c9-eec3-4a4e-862f-a82bb9e658d9)

foo 함수를 호출하면 함수 몸체의 다른 문들이 순차적으로 실행되기 이전에 x 변수의 선언문이 자바스크립트 엔진에 의해 가장 먼저 실행되어 x 변수가 선언되고 undefined로 초기화된다.
그 후, 함수 몸체를 구성하는 문들이 순차적으로 실행되기 시작하고 변수 할당문이 실행되면 x 변수에 값이 할당된다.
그리고 함수가 종료하면 x 변수도 소멸되어 생명 주기가 종료된다.
따라서 함수 내부에서 선언된 지역 변수 x는 foo 함수가 호출되어 실행하는 동안에만 유효한 것이고 지역 변수의 생명 주기는 함수의 생명 주기와 일치한다.

> 지역 변수가 함수보다 오래 생존하는 경우인 클로저는 다음에 다루기로 하자.

```javascript
var x = 'global';

function foo() {
  console.log(x);
  var x = 'local';
}

foo(); // ?
```

호이스팅은 스코프를 단위로 동작한다.
즉, 호이스팅은 변수 선언이 스코프의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트의 고유의 특징을 말한다.

### 14.1.2 전역 변수의 생명 주기

함수와 달리 전역 코드는 특별한 진입점이 없고 코드가 로드되자마자 곧바로 해석되고 실행된다.
그리고 마지막 문이 실행되어 더 이상 실행할 문이 없을 때 종료한다.
var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되는데 이는 전역 변수의 생명 주기가 전역 객체의 생명 주기와 일치한다는 것을 말한다.
따라서 브라우저 환경에서 var 키워드로 선언한 전역 변수는 웹페이지를 닫을 때까지 유효하다.

> 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체다.
> 전역 객체는 표준 빌트인 객체(Object, String, Number, Function, Array,...)와 환경에 따른 호스트 객체(document, console, history, localstorage,...)
> 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.

## 14.2 전역 변수의 문제점

#### 암묵적 결합

전역 변수를 선언한 의도는 전역, 즉 코드 어디서든 참조하고 할당할 수 있는 변수를 사용하겠다는 것이다.
이는 모든 코드가 전역 변수를 참조하고 변경할 수 있는 암묵적 결합(implicit coupling)을 허용하는 것이다.

#### 긴 생명 주기

전역 변수는 생명 주기가 길다. 따라서 메모리 리소스도 오랜 기간 소비한다. 

#### 스코프 체인 상에서 종점에 존재

전역 변수는 스코프 체인 상에서 종점에 존재한다.
이는 변수를 검색할 때 전역 변수가 가장 마지막에 검색된다는 것을 말하며 속도가 가장 느린 것이다.

#### 네임스페이스 오염

자바스크립트의 가장 큰 문제점 중 하나는 파일이 분리되어있다 해도 하나의 전역 스코프를 공유한다는 것이다.
다른 파일 내에서 동일한 이름으로 명명된 전역 변수나 전역 함수가 같은 스코프 내에 존재할 경우 예상치 못한 결과를 가져올 수 있습니다.

```javascript
// 파일 1: script1.js
var message = "Hello from script1.js";

// 파일 2: script2.js
var message = "Hello from script2.js";

// 이 후에 다른 곳에서 script1.js와 script2.js를 모두 불러왔을 때,
console.log(message); 
```

## 14.3 전역 변수의 사용을 억제하는 방법

<b>변수의 스코프는 좁을수록 좋다!</b>

### 14.3.1 즉시 실행 함수

```javascript
(function() {
  var foo = 10; // 즉시 실행 함수의 지역 변수

}());

console.log(foo); // ReferenceError: foo is not defined
```

모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 된다.

### 14.3.2 네임스페이스 객체

전역에 네임스페이스 역할을 담당하는 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가하는 방법이다.

```javascript
var MYAPP = {}; // 전역 네임스페이스 객체
MYAPP.name = "Kim";
console.log(MYAPP.name); // Kim
```

### 14.3.3 모듈 패턴

```javascript
var myModule = (function() {
    // 모듈의 private 변수와 함수 선언
    var privateVariable = 10;
    
    function privateFunction() {
        console.log("This is a private function");
    }
    
    // 모듈의 public interface 반환
    return {
        publicFunction: function() {
            console.log("This is a public function");
        },
        getPrivateVariable: function() {
            return privateVariable;
        }
    };
})();

// 모듈의 public 함수 호출
myModule.publicFunction(); // "This is a public function" 출력

// 모듈의 private 변수 접근
console.log(myModule.getPrivateVariable()); // 10 출력

// privateFunction은 외부에서 직접 호출 불가
// myModule.privateFunction(); // 에러 발생
```

외부에 노출하고 싶은 변수나 함수를 담아 반환하면 이는 외부에 노출되는 퍼블릭 멤버(public member)가 되고
외부로 노출하고 싶지 않은 변수나 함수는 반환하는 객체에 추가하지 않으면 외부에서 접근할 수 없는 프라이빗 멤버(private member)가 된다.

> 반환에 내부 스코프의 변수나 함수의 참조가 유지되고 있다면 그 참조를 유지하고 있는 것이 클로저의 개념이다.

### 14.3.4 ES6 모듈

ES6 모듈을 파일 자체의 독자적인 모듈 스코프를 제공한다.
따라서 var 키워드로 선언한 변수는 더는 전역 변수가 아니며 window 객체의 프로퍼티도 아니게 된다.

```html
<script type="module" src="lib.mjs"></script>
```

특별한 세팅이 필요하기에 보통 Webpack 등의 모듈 번들러를 사용하는 것이 지금은 일반적이다 !
