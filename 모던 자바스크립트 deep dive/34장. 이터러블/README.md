# 34장 이터러블 🔁

## 34.1 이터레이션 프로토콜

> 이터레이션 프로토콜 : 순회 가능한 자료구조를 만들기 위해 미리 약속된 규칙

<br>

이터레이션 프로토콜에는 두가지 프로토콜이 있습니다.

1. 이터러블 프로토콜
2. 이터레이터 프로토콜

이터레이션 프로토콜을 준수한 객체는

1. for…of 문으로 순회 가능
2. Spread 문법의 피연산자가 될 수 있다

#### 34.1.1 이터러블

> 이터러블 : 이터러블 프로토콜을 준수한 객체

이터러블은 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체를 말한다.

```javascript
// 이터러블인지 확인하는 함수 구현
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';
// Symbol.iterator는 객체가 반복 가능한지를 나타냄

// 배열, 문자열, Map, Set 등은 이터러블
isIterable([]); // true
isIterable(''); // true
isIterable(new Map()); // true
isIterable(new Set()); // true
isIterable({}); // false

// 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
const array = [1, 2, 3];

console.log(Symbol.iterator in array); // true

// 이터러블인 배열은 for... of 문으로 순회 가능하다.
for (const item of array) {
  console.log(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
console.log([…array]); // [l, 2, 3]

// 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, …rest] = array;
console.log(a, rest); // 1, [2, 3]
```

반대로 이터러블이 아닌 것들은 for ... of 문으로 순회할 수 없으며 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 없다.

```javascript
const obj = { a: 1, b: 2 };

// 일반 객체는 Symbol.iterator 메서드를 구현하거나 상속받지 않는다.
// 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false

// 이터러블이 아닌 일반 객체는 for... of 문으로 순회할 수 없다.
for (const item of obj) { // TypeError: obj is not iterable
  console.log(item);
}

// 이터러블이 아닌 일반 객체는 배열 디스트럭처링 할당의 대상으로 사용할 수 없다.
const [a, b] = obj; // TypeError: obj is not iterable

// 단 스프레드 프로퍼티 제안은 객체 리터럴 내부에서 스프레드 문법의 사용을 허용한다.
console.log({ ... obj }); // { a: 1, b: 2 }
```

#### 34.1.2 이터레이터

> 이터레이터 : 이터레이터 프로토콜을 준수한 객체

이터레이터는 next 메서드를 가지고 있어야 하며, next 메서드를 호출할 때마다 순회할 때의 다음 값을 가진 객체를 반환해야 한다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.
console.log('next' in iterator); // true

// next 메서드를 호출하면 이터러블을 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환한다.
// 이터레이터 리절트 객체는 value와 done 프로퍼티를 갖는 객체다.
console.log(iterator.next()); //{ value: 1, done: false }
console.log(iterator.next()); //{ value: 2, done: false }
console.log(iterator.next()); //{ value: 3, done: false }
console.log(iterator.next()); //{ value: undefined, done: true }
```

value는 현재 순회 중인 값이며, done은 순회가 끝났는지를 나타내는 불리언 값이다.

<br>

## 34.2 빌트인 이터러블

```javascript

```

<br>

## 34.3 for … of 문

```javascript

```

<br>

## 34.4 이터러블과 유사 배열 객체

```javascript

```

<br>

## 34.5 이터레이션 프로토콜의 필요성

```javascript

```

<br>

## 34.6 사용자 정의 이터러블

#### 34.6.1 사용자 정의 이터러블 구현

```javascript

```

#### 34.6.2 이터러블을 생성하는 함수

```javascript

```

#### 34.6.3 이터러블이면서 이터레이터인 객체를 생성하는 함수

```javascript

```

#### 34.6.4 무한 이터러블과 지연 평가

```javascript

```
