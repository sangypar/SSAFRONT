# 10장 객체 리터럴

## 10.1 객체란?
1. 자바스크립트는 **객체(Object) 기반의 프로그래밍 언어**이며, 자바스크립트에서 **원시 값(숫자, 문자열, 불리언, undefined, null, 심벌)** 을 제외한 나머지 **(함수, 배열, 정규 표현식 등)** 은 모두 객체다. <br>
2. 또한 **원시 값은 변경 불가능한 값이지만, 객체는 변경 가능한 값**이다. <br>
3. 객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 **키(key)와 값(value)** 으로 구성된다. <br>
4. 자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. **자바스트립트의 함수는 일급 객체이므로, 함수도 프로퍼티 값으로 사용할 수 있다.** 이 경우 일반 함수와 구분하기 위해 **메서드(method)** 라 부른다.

## 10.2 객체 리터럴에 의한 객체 생성
인스턴스를 통해 객체를 생성하는 클래스 기반 객체지향 언어와는 달리, 자바스크립트는 다양한 객체 생성 방법을 지원한다.<br>
1. **객체 리터럴** : 가장 일반적이고 간단한 방법
2. Object 생성자 함수
3. 생성자 함수
4. Object.create 메서드
5. 클래스(ES6)

``` javascript
// 객체 리터럴은 중괄호 내에 0개 이상의 프로퍼티를 정의한다.

var person = {
  name: 'Lee',
  sayHello: function () {
    console.log('Hello! my name is ${this.name}.'};
  } 
};

console.log(type of person); // object
console.log(person); // {name: "Lee", sayHello: ƒ};
```
``` javascript
// 만약 중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체가 생성된다
var empty = {}; // 빈 객체
console.log(typeof empty); // object
```
1. 객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다. 따라서 세미콜론을 붙이지 않는다. 하지만 객체 리터럴은 값으로 평가되는 표현식이다.<br>따라서 객체 리터럴의 닫는 중괄호 뒤에는 세미콜론을 붙인다. <br><br>
2. 객체 리터럴은 자바스크립트의 유연함과 강력함을 대표하는 객체 생성 방식이다.<br> 클래스 기반의 언어와는 달리, 클래스를 정의하고 new 연산자와 함께 생성자를 호출할 필요가 없다. <br><br>
3. 객체 리터럴에 프로퍼티를 포함시켜 객체를 생성함과 동시에 프로퍼티를 만들 수도 있고, 객체를 생성한 이후에 프로퍼티를 동적으로 추가할 수도 있다.

## 10.3 프로퍼티
1. **객체는 프로퍼티의 집합이며, 프로퍼티는 키(key)와 값(value)으로 구성된다.**<br>
2. 프로퍼티를 나열할 때는 쉼표로 구분한다. 마지막 프로퍼티 뒤에는 쉼표를 사용하지 않으나, 사용해도 무방하다.
3. 프로퍼티 키에는 모든 문자열 또는 심벌 값을 사용할 수 있고, 프로퍼티 값에는 자바스크립트에서 사용할 수 있는 모든 값을 사용할 수 있다.
4. 프로퍼티 키의 생성시 [식별자 네이밍 규칙](https://github.com/sangypar/SSAFRONT/tree/main/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20deep%20dive/04%EC%9E%A5.%20%EB%B3%80%EC%88%98#04-7-%EC%8B%9D%EB%B3%84%EC%9E%90-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EA%B7%9C%EC%B9%99)을 따른다면 따옴표를 생략할 수 있다.

``` javascript
var person = {
  firstName = 'Sang-young', // 식별자 네이밍 규칙을 준수하는 프로퍼티 키
  'last-name' = 'Jeong' // 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키, 따옴표가 없다면 '-'를 연산자로 해석한다
};

console.log(person); // {firstName: "Sang-young", last-name: "Jeong"}
```
5. 문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다.<br>
이 경우에는 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 한다.
``` javascript
var obj = {};
var key = 'hello';

// ES5: 프로퍼티 키 동적 생성
obj[key] = 'world';

// ES6: 계산된 프로퍼티 이름
// var obj = { [key]: 'world' };

console.log(obj); // {hello: "world"}
```
6. 빈 문자열을 프로퍼티 키로 사용해도 에러가 발생하지 않는다. 하지만 키로서 의미를 갖지 못하므로 권장하지 않는다.
7. 프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다.
``` javascript
   var foo = {
     0: 1,
     1: 2,
     2: 3
   };

console.log(foo); // {0: 1, 1: 2, 2: 3}
```
8. 예약어를 프로퍼티 키로 사용해도 에러가 발생하지 않는다. 하지만 에러가 발생할 여지가 있으므로 권장하지 않는다.
9. 이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다. 에러가 발생하지 않는다.
``` javascript
var foo = {
  name: 'Lee',
  name: 'Kim'
};

console.log(foo); // {name: "Kim"}
```

## 10.4 메서드
프로퍼티 값으로 사용된 함수를 **메서드(method)** 라 부른다. 즉 메서드는 객체에 묶여 있는 함수를 의미한다.

``` javascript
var circle = {
  radius: 5, // <- 프로퍼티

  // 원의 지름
  getDiameter: function () { // <- 메서드
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter()); // 10;
```

## 10.5 프로퍼티 접근
프로퍼티 접근 방법은 두 가지가 있다.
1. 마침표 프로퍼티 접근 연산자를 사용하는 **마침표 표기법(dot notation)**
2. 대괄호 프로퍼티 접근 연산자를 사용하는 **대괄호 표기법(bracket notation)**

프로퍼티 키가 식별자 네이밍 규칙을 준수하는 이름이라면 두 가지 방법 모두 사용할 수 있다.

``` javascript
var person = {
  name: 'Lee'
  };

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name);

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']);
```

대괄호 표기법의 경우, **대괄호 프로퍼티 접근 연사자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.**<br>
따옴표로 감싸지 않으면 자바스크립트 엔진은 식별자로 해석한다.

``` javascript
var person = {
  name: 'Lee'
  };

console.log(person[name]); // ReferenceError: name is not defined
```

**객체에 존재하지 않는 프로퍼티에 접근하면 undefined를 반환한다.** 이때는 ReferenceError가 아니다.

``` javascript
var person = {
  name: 'Lee'
  }

console.log(person.age); // undefined
```

프로퍼티 키가 식별자 네이밍 규칙을 준수하지 않는 이름, 즉 자바스크립트에서 사용 가능한 이름이 아니라면 반드시 대괄호 표기법을 사용해야 한다.<br>
단 프로퍼티 키가 숫자로 이루어진 문자열인 경우, 따옴표를 생략할 수 있다.

``` javascript
var person = {
  'last-name': 'Lee',
  1: 20
};

person.'last-name'; // SyntaxError: Unexpected string
person.last-name; // 브라우저 환경: NaN
                  // Node.js 환경: ReferenceError: name is not defined
person[last-name]; // ReferenceError: last is not defined
person['last-name']; // Lee

// 프로퍼티 키가 숫자로 이루어진 문자열인 경우 따옴표를 생략할 수 있다.
person.1; // SyntaxError: Unexpected number
person.'1'; // SyntaxError: Unexpected string
person[1]; // 10
person['1']; // 10
```

## 10.6 프로퍼티 값 갱신
이미 존재하는 프로퍼티에 값을 할당하면, 프로퍼티 값이 갱신된다.

``` javascript
var person = {
  name: 'Lee'
};

person.name = 'Kim';

console.log(person); // {name: "Kim"}
```

## 10.7 프로퍼티 동적 생성
존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고, 프로퍼티 값이 할당된다.

``` javascript
var person = {
  name: 'Lee'
};

person.age = 20;

console.log(person); // {name: "Lee", age: 20}
```

## 10.8 프로퍼티 삭제
**delete 연산자는 객체의 프로퍼티를 삭제한다.** 이때 delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야한다.<br>
만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시된다.

``` javascript
var person = {
  name: 'Lee'
};

person.age = 20;

delete person.age;
delete person.address;

console.log(person); // {name: "Lee"}
```

## 10.9 ES6에서 추가된 객체 리터럴의 확장 기능

1. 프로퍼티 축약 표현
ES6에서는 프로퍼티 값으로 변수를 사용하는 경우, 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있다.

``` javascript
let x = 1, y = 2;

const obj = {x, y};

console.log(obj)l // {x: 1, y: 2}
```
2. 계산된 프로퍼티 이름
문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다.<br>
단 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 한다.<br>
<br>
ES5에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 대괄호 표기법을 사용해야했다.<br>
그러나 ES6에서는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있다.

``` javascript
var prefix = 'prop';
var i = 0;

var obj = {};

obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```
```
const prefix = 'prop';
let i = 0;

const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

3. 메서드 축약 표현
ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당했어야했다.

``` javascript
var obj = {
  name: 'Lee',
  sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다.

``` javascript
const obj = {
  name: 'Lee',
  sayHi() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```






