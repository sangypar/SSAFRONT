# 20장 strict mode 

## 20.1 strict mode란?

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```
전역 스코프에서도 x 변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 
x프로퍼티를 동적 생성한다. 이때 전역 객체의 x 프로퍼티는 마치 전역 변수처럼 사용가능 하고 이런 현상을 암묵적 전역이라고 한다.

암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 크기 때문에 var, let. const 키워드를 사용하여 변수를 선언하는게 좋다. 그래서 잠재적인 오류를 발생시키기 어려운 개발 환경을 만든 것이 strict mode(엄격 모드)이다.

<br>

## 20.2 strict model의 적용

```javascript
'use strict'; // 스크립트 전체에 strict mode가 적용된다.
function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

```javascript
function foo() {
'use strict'; // 함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict mode가 적용된다.
  x = 10; // ReferenceError: x is not defined
}
foo();
```

```javascript
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  'use strict'; // 제대로 동작하지 않음
}
foo();
```

<br>

## 20.3 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 strict mode는 스크립트 단위로 적용된다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.
    console.log(x); // 1
  </script>
  <script>
  'use strict';

  y = 1; // ReferenceError: y is not defined
  console.log(y);
  </script>
</body>
</html>
```
  외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 non-strict mode인 경우도 있기 때문에 전역에 strict mode를 적용하는 것은 바람직하지 않다. 이러한 경우 즉시 실행 함수로 스크립트 전체를 감사서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.

```javascript
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  'use strict';

  // Do something...
}());
```

<br>

## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

```javascript
(function () {
  // non-strict mode
  var let = 10; // 에러가 발생하지 않는다.
  function foo() {
  'use strict';
  let =20; // SyntaxError: Unexpected strict mode reserved word
  }
foo();
}());
```
어떤 함수는 strict mode를 적용하고 어떤 함수는 strict mode를 적용하지 않는 것은 바람직하지 않고 모든 함수에 일일이 strict mode를 적용하는 것은 번거로운 일이다. 

따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

<br>

## 20.5 strict mode가 발생시키는 에러

#### 20.5.1 암묵적 전역

```javascript
(function () {
  'use strict';

  x = 1; // 선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.
  console.log(x); // ReferenceError: x is not defined
}());
```

#### 20.5.2 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수 삭제 시 에러가 발생한다.
```javascript
(function () {
  'use strict';

  var x = 1;
  delete x; // SyntaxError: Delete of an unqualified identifier in strict mode.
  function foo(a) {
    delete a; // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo; // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

#### 20.5.3 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 에러가 발생한다.
```javascript
(function () {
  'use strict';
//SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
  return x + x;
}
  console.log(foo(l, 2));
}());
```

#### 20.5.4 with문의 사용

with 문 : 
```javascript

```

## 20.6 strict mode 적용에 의한 변화

#### 20.6.1 일반 함수의 this

```javascript

```

#### 20.6.2 arguments 객체

```javascript

```
