# 19장 프로토타입

## 19.8 오버라이딩과 프로퍼티 섀도잉

> 오버라이딩 : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식이다.

> 오버로딩 : 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식이다. 자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현할 수는 있다.

```javascript
const Person = (function () {
// 생성자 함수
  function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log( Hi! My name is ${this.name} );
};

// 생성자 함수를 반환
  return Person;
}());

const me = new Person('Park');

// 인스턴스 메서드
me.sayHello = function () {
  console.log( Hey! My name is ${this.name} );
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Park

// 인스턴스 메서드를 삭제한다.
delete me.sayHello;
// 인스턴스에는 sayHello 메서드가 없으므로 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Park

// 프로토타입 체인을 통해 프로토타입 메서드가 삭제되지 않는다.
delete me.sayHello;
// 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Park

// 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다.
// 즉, 하위객체를 통해 프로토타입에 get 액세스는 허용되나 set 액세스는 허용되지 않는다.

// 프로토타입 메서드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me. sayHello is not a function

//프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 직접 접근해야 한다.
```
프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가시 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가한다.

즉, sayHello는 프로토타입 메서드 sayHello를 오버라이딩했고 프로토타입 메서드 sayHello는 가려진다.

상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉이라 한다.

<br>

## 19.9 프로토타입의 교체
부모 객체인 프로토타입을 동적으로 변경할 수 있다. 이러한 특징을 활용해 객체 간의 상속관계를 동적으로 변경할수 있다.

프로토타입은 생성자 함수 또는 인스턴스에 의해 교체할 수 있다.

#### 19.9.1 생성자 함수에 의한 프로토타입의 교체
```javascript
const Person = (function () {
  function Person(name) {
  this.name = name;
}


// 1 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
Person.prototype = {
  sayHello() {
    console.log('Hi! My name is ${this.name}');
  }
};
  return Person;
}());
const me = new Person('Park');

// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototyped constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```
<p align="center"><img src="./img/1.png"></p>
프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없다.

constructor 프로퍼티는 자바스크립트 엔진이 프로토타입을 생성할 때 암묵적으로 추가한 프로퍼티다.

따라서 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다.

프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴되지만 프로토타입으로 교체한 객체 리터럴에
constructor 프로퍼티를 추가하면 프로토타입의 constructor 프로퍼티를 되살릴 수 있다.
```javascript
const Person = (function () {
  function Person(name) {
  this.name = name;
}
// 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
Person.prototype = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log('Hi! My name is ${this.name}');
    }
  };
  return Person;
}());

const me = new Person('Park');

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```
#### 19.9.2 인스턴스에 의한 프로토타입의 교체
프로토타입은 생성자 함수의 prototype 프로퍼티뿐만 아니라 인스턴스의 __proto__ 접근자 프로퍼티를 통해 접근할 수 있다.

따라서 인스턴스의 __proto__ 접근자 프로퍼티를 통해 프로토타입을 교체할 수 있다.
```javascript
function Person(name) {
  this.name = name;
}
const me = new Person('Park');
// 프로토타입으로 교체할 객체
const parent = {
sayHello() {
  console.log('Hi' My name is ${this.name} );
  }
};
// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Park

// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```
<p align="center"><img src="./img/2.png"></p>
파괴된 생성자 함수와 프로토타입 간의 연결을 되살리려면 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하고 생성자 함수의 prototype 프로퍼티를 재설정하면 된다.

```javascript
function Person(name) {
  this.name = name;
}
const me = new Person('Park');

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log( Hi! My name is ${this.name} );
  }
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Park

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

<br>

## 19.10 instanceof 연산자

instanceof 연산자 : 이항 연산자로서 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피 연산자로 받는다.
(우변의 피 연산자가 함수가 아닌 경우 TypeError가 발생한다. )

> 객체 instanceof 생성자 함수

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Park');

// Person.prototype me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true
// Object.prototype me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// Person.prototype me 객체의 프로토타입 체인 상에 존재하지 않기 때문에 false로 평가된다.
console.log(me instanceof Person); // false
// Object.prototype me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true

// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
Person.prototype = parent;
console.log(me instanceof Person); // true
```
Person.prototype이 me 객체의 프로토타입 체인 싱에 존재하지 않기 때문에 me instanceof Person은 false로 평가된다.
하지만 parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩해서 true로 평가되었다.

프로토타입이 교체되어 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴되어도 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결은 파괴되지 않으므로 instanceof는 아무런 영향을 받지 않는다.

<br>

## 19.11 직접 상속

#### 19.11.1 Object.create에 의한 직접 상속

Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.

```javascript
/**
* 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체를 생성하여 반환한다.
* @param {Object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
* @param {Object} [propertiesObject] - 생성할 객체의 프로퍼티를 갖는 객체
* ©returns {Object} 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체
*/
Object.create(prototype[, propertiesObject])

// 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다.
// obj → null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototyped 상속받지 못한다.
console.log(obj.toString()); // TypeError

// obj → Object.prototype → null
// obj = {};와 동일하다.
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj → Object.prototype → null
// obj = { x : 1 };와 동일하다.
obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true }
});
// 위 코드는 아래와 동일하다.
// obj = Object.create(Object.prototype);
// obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
// 임의의 객체를 직접 상속받는다.
// obj → myProto → Object.prototype → null
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}
// obj → Person.prototype → Object.prototype → null
// obj = new Person('Park')와 동일하다.
obj = Object.create(Person.prototype);
obj.name = 'Park';
console.log(obj.name); // Park
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```
Object.create 메서드의 장점은
> - new 연산자가 없이도 객체를 생성할 수 있다.
> - 프로토타입을 지정하면서 객체를 생성할 수 있다.
> - 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

```javascript
// Object.prototype의 빌트인 메서드인 Object.prototype.hasOwnProperty와 같은 메서드는
// 모든 객체의 프로토타입 체인의 종점, 즉 Object.prototype의 메서드이므로 모든 객체가 상속받아 호출할수 있다. (권장 X)

const obj = { a: 1 };
obj.hasOwnProperty('a'); // true
obj.propertyIsEnumerable('a'); // true

// 프로토타입 체인의 종점에 위치하는 객체는 Object.prototype의 빌트인 메서드를 사용할 수 없기 때문에 빌트인 메서드는 간접적으로 호출하는것이 좋다

// 프로토타입이 null인 객체를 생성한다.
const obj1 = Object.create(null);
obj1.a = 1;

// console.log(obj1.hasOwnProperty('a'));
// TypeError: obj1.hasOwnProperty is not a function

// Object.prototyped 빌트인 메서드는 객체로 직접 호출하지 않는다.
console.log(Object.prototype.hasOwnProperty.call(obj1, 'a' )); // true
```

#### 19.11.2 객체 리터럴 내부에서 __proto__에 의한 직접 상속

Object.create는 두 번째 인자로 오는 프로퍼티를 정의하는 것은 번거롭다. 

그래서 객체 리터럴 내부에서 __proto__ 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다.

```javascript
const myProto = { x: 10 };
// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y: 20,
// 객채를 직접 상속받는다.
// obj → myProto → Object.prototype → null
__proto__: myProto
};
/* 위 코드는 아래와 동일하다.
const obj = Object.create(myProto, {
  y: { value: 20, writable: true, enumerable: true, configurable: true }
});
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

<br>

## 19.12 정적 프로퍼티/메서드

정적 프로퍼티/메서드 : 생성자 함수로 인스턴스를 생성하지 않아도 참조, 호출할 수 있는 프로퍼티/메서드

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log( `Hi! My name is ${this.name}` );
};

// 정적 프로퍼티

Person.staticProp = 'static prop';

// 정적 메서드
Person.staticMethod = function () {
  console.log('staticMethod');
};

const me = new Person('Park');

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
```
<p align="center"><img src="./img/3.png"></p>
Person 생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드라고 한다. 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.

```javascript
// Object.create는 Object 생성자 함수의 정적 메서드다.
// Object 생성자 함수가 생성한 객체로 호출할 수 없다.
const obj = Object.create({ name: 'Park' });

// Object.prototype.hasOwnProperty는 프로토타입 메서드다.
// Object.prototype의 메서드이므로 모든 객체가 호출할 수 있다.
obj.hasOwnProperty('name'); // false

function Foo() {}
// 프로토타입 메서드
// this를 참조하지 않는 프로토타입 메서드는 정적 메서드로 변경하여도 동일한 효과를 얻을 수 있다.
Foo.prototype.x = function () {
  console.log('x');
};

const foo = new Foo();
// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
foo.x(); // x

// 정적 메서드
Foo.x = function () {
console.log('x');
};

// 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
Foo.x(); // x
```
> 프로토타입 프로퍼티/메서드를 표기할 때 prototype을 #으로 표기(예를 들어, Object.prototype.isPrototypeOf를 Object#isPrototypeOf으로 표기)

<br>

## 19.13 프로퍼티 존재 확인

#### 19.13.1 in 연산자

in 연산자 : 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인

```javascript
/**
* key: 프로퍼티 키를 나타내는 문자열
* object: 객체로 평가되는 표현식
*/
key in object

const person = {
  name: 'Park',
  address: 'Seoul'
};

// person 객체에 name 프로퍼티가 존재한다.
console.log('name' in person); // true
// person 객체에 address 프로퍼티가 존재한다.
console.log('address' in person); // true
// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log('age' in person); // false
// toString은 Object.prototype의 메서드다.
console.log('toString' in person); // true

//Reflect.has 메서드는 in 연산자와 동일하게 동작
const person = { name: 'Park' };

console.log(Reflect.has(person, 'name')); // true
console.log(Reflect.has(person, 'toString’)); // true
```

#### 19.13.2 Object.prototype.hasOwnProperty 메서드

Object.prototype.hasOwnProperty 메서드 : 객체에 특정 프로퍼티가 존재하는지 확인

```javascript
console.log(person.hasOwnProperty('name')); // true
console.log(person.hasOwnProperty('age')); // false

// 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환
console.log(person.hasOwnProperty('toString')); // false
```

<br>

## 19.14 프로퍼티 열거

#### 19.14.1 for...in문

for...in문 : 객체의 모든 프로퍼티를 순회하며 열거

```javascript
const person = {
  name: 'Park',
  address: 'Seoul'
  __proto__: { age: 28 }
};

// in 연산자는 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
console.log('toString' in person); // true

// for... in 문의 변수 prop에 person 객체의 프로퍼티 키가 할당된다.
for (const key in person) {
  console.log(key +': ' + person[key]);
}
// name: Park
// address: Seoul
// age: 28

// toString과 같은 Object.prototype의 프로퍼티가 열거되지 않는다.
// Object.prototype.string 프로퍼티의 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false이기 때문이다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString'));
// {value: f, writable: true, enumerable: false, configurable: true}

// 상속받은 프로퍼티는 제외하고 객체 자신의 프로퍼티만 열거하려면
for (const key1 in person) {
  // 객체 자신의 프로퍼티인지 확인한다.
  if (!person.hasOwnProperty(key1)) continue;
  console.log(key1 + ": " + person[key]);
}
// name: Park
// address: Seoul
```
for ... in 문은 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.

```javascript
const sym = Symbol();
const obj = {
  a: 1,
  [sym]: 10
};
for (const key in obj) {
  console.log(key + ' : ' + obj[key]);
}
// a : 1
```
for... in 문은 프로퍼티를 열거할 때 순서를 보장하지 않음

```javascript
const obj = {
2: 2,
3: 3,
1: 1,
b: 'b',
a: 'a'
};
for (const key in obj) {
  if (!obj.hasOwnProperty(key)) continue;
  console.log(key +': ' + obj[key]);
}
/*
1: 1
2: 2
3: 3
b: b
a: a
*/

// 배열에는 for... in 문을 사용하지 말고 일반적인 for 문이나 for ... of 문
// 또는 Array.prototype.forEach 메서드를 사용하기를 권장.

const arr = [l, 2, 3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질 수 있다.

for (const i in arr) {
  // 프로퍼티 x도 출력된다.
  console.log(arr[i]); // 1 2 3 10
};

// arr. length는 3이다
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1 2 3
}

// forEach 메서드는 요소가 아닌 프로퍼티는 제외한다.
arr.forEach(v => console.log(v)); // 1 2 3

// for... of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당한다.
for (const value of arr) {
  console.log(value); // 1 2 3
};
```

#### 19.14.2 Object.keys/values/entries 메서드

Object.keys/values/entries 메서드 : 객체 자신의 고유 프로퍼티만 열거하기 위해 사용

for... in 문은 객체 자신의 고유 프로퍼티뿐 아니라 상속받은 프로퍼티도 열거함으로 Object.prototype.hasOwnProperty 메서드를 사용하여 객체 자신의 프로퍼티인지 확인하는 추가 처리가 필요했습니다.

```javascript
const person = {
  name: 'Park',
  address: 'Seoul',
  __proto__: { age: 20 }
};

console.log(Object.keys(person)); // ["name", "address"]
console.log(Object.values(person)); // ["Park", "Seoul"]
console.log(Object.entries(person)); // [["name", "Park"], ["address", "Seoul"]]
Object.entries(person).forEach(([key, value]) => console.log(key, value));
//name Lee
//address Seoul
```
