## 15.1 var 키워드로 선언한 변수의 문제점

### 15.1.1 변수 중복 허용

var 키워드로 선언한 변수는 같은 스코프 내에서 중복 선언을 허용한다.

```javascript
var x = 1;
var y = 1;

var x = 100;
var y;

console.log(x); // 100
console.log(y); // 1
```

### 15.1.2 함수 레벨 스코프

var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다.

### 15.1.3 변수 호이스팅

변수 호이스팅에 의해 var 키워드로 선언한 변수 선언문 이전에 참조할 수 있다.

```javascript
console.log(foo); // undefined

foo = 123;

console.log(foo); // 123

var foo;
```

## 15.2 let 키워드

### 15.2.1 변수 중복 선언 금지

```javascript
let bar = 123;
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

### 15.2.2 블록 레벨 스코프

let 키워드로 선언한 변수는 모든 코드 블록(함수, 조건문, 반복문 등)을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

### 15.2.3 변수 호이스팅

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/6934471f-a53c-4621-a01d-bdf12b38982e)

```javascript
let foo = 1;

{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo = 2;
}
```

변수 호이스팅이 발생하지 않는다면 1을 출력해야 하지만 발생하기에 참조 에러가 발생한다.

### 15.2.4 전역 객체와 let

```javascript
var x = 1;
let y = 2;

console.log(window.x); // 1
console.log(window.y); // undefined
```

## 15.3 const 키워드

### 15.3.1 선언과 초기화

const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.

```javascript
const foo; // SyntaxError: Missing initializer in const declaration
```

### 15.3.2 재할당 금지

const 키워드로 선언한 변수는 재할당이 금지된다.

### 15.3.3 상수

const 키워드로 선언된 변수에 원시 값을 할당한 경우 원시 값은 변경할 수 없는 값(immutable value)이고 const 키워드에 의해 재할당이 금지되므로 할당된 값을 변경할 수 있는 방법은 없다.

```javascript
const API_URL = 'https://api.example.com';
const PROFILE_PAGE_URL = '/profile';

const PRIMARY_COLOR = '#3498db';
const SECONDARY_COLOR = '#2ecc71';
```
### 15.3.4 const 키워드와 객체

```javascript
const person = {
  name: 'Lee';
}

person.name = 'Kim';

console.log(person); // {name: "Kim"}
```

객체를 할당하면 값을 변경할 수 있기에 const 키워드는 재할당을 금지할 뿐 "불변"을 의미하지는 않는다.

## 15.4 var vs. let vs. const

var는 최대한 지양하고 const를 기본으로 사용하고 재할당이 필요한 변수라고 판단되면 그 때 let으로 바꿔도 늦지 않다.
