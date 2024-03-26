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


```javascript
const person = {
name: 'Park'
};

// 프로퍼티 동적 생성
person.age = 28;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
name: {value: "Park", writable: true, enumerable: true, configurable: true},
age: {value: 28, writable: true, enumerable: true, configurable: true}
}   //첫 번째 매개변수 : 객체의 참조, 두번째 매개변수 : 프로퍼티 키
*/

```

<br>

## 16.3 데이터 프로퍼티와 접근자 프로퍼티
프로퍼티 -> 데이터 프로퍼티 / 접근자 프로퍼티

데이터 프로퍼티 : 키와 값으로 구성된 일반적인 프로퍼티

접근자 프로퍼티 : 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티

#### 16.3.1 데이터 프로퍼티
|프로퍼티 어트리뷰트|프로퍼티 디스크립터 객체의 프로퍼티|설명|
|-------|-------|---------------------|
|[[Value]]|value|프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값|
|[[Writable]]|writable|프로퍼티 값의 변경 가능 여부를 불리언 값으로 가짐. false → 읽기 전용 프로퍼티|
|[[Enumerable]]|enumerable|열거 가능 여부를 불리언 값으로 가짐. fales → for ... in 문이나 Object. keys 메서드 등으로 열거 불가능|
|[[Configurable]]|configurable|프로퍼티의 재정의 가능 여부를 불리언 값으로 가짐. false → 해당 프로퍼티 삭제, 변경 금지|

#### 16.3.2 접근자 프로퍼티
|프로퍼티 어트리뷰트|프로퍼티 디스크립터 객체의 프로퍼티|설명|
|-------|-------|---------------------|
|[[Get]]|get|접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수|
|[[Set]]|set|접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수|
|[[Enumerable]]|enumerable|데이터 프로퍼티와 동일|
|[[Configurable]]|configurable|데이터 프로퍼티와 동일|

```javascript
const person = {
// 데이터 프로퍼티
firstName: 'SY',
lastName: 'P',

// getter 함수
get fullName() { // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
return '${this.firstName} ${this.lastName}';
},

// setter 함수
set fullName(name) {
[this.firstName, this.lastName] = name.split(’ ’);
}
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // SY P

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출
person.fullName = 'SangYong Park';
console.log(person); // {firstName: "SangYong", lastName: "Park"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // SangYong Park

// firstNam은은 데이터 프로퍼티다.
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
let descriptor = Object.getOwnPropertyDescriptor(person, firstName' );
console.log(descriptor);
// {value: "SangYong", writable: true, enumerable: true, configurable: true}

// fullNam은은 접근자 프로퍼티다.
// 접근자 프로퍼티는 [[Get]], 〔[Set]], [[Enumerable]], [[Configurable]]
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: /, set: f, enumerable: true, configurable: true}
```
접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트 [[Value]])을 가지지 않으며 다만 데이터 프로퍼티의 값을 읽거나 저장할 때 관여 함

프로토타입 : 어떤 객체의 부모 객체의 역할을 하는 객체, 자식 객체에게 자신의 프로퍼티와 메서드를 상속

```javascript
//접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법

// 일반 객체의 __proto__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__' );
// {get: f, set: f, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {... }, writable: true, enumerable: false, configurable: false}
```

<br>

## 16.4 프로퍼티 정의
프로퍼티 정의 : 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 어트리뷰트를 재정의 하는 것

```javascript
// Object.defineProperty 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다.

const person = {};

Object.defineProperty(person, 'firstName', {
value: 'SY',
writable: true,
enumerable: true,
configurable: true
});

Object.defineProperty(person, 'lastName', {
value: 'P'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "SY", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "P", writable: false, enumerable: false, configurable: false}

// lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(Object.keys(person)); // ["firstName"]

// lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
person.LastName = 'Kim'; // 에러 발생 X

// lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
delete person.lastName; // 에러 발생 X (재 정의할경우 에러 발생)

descriptor = Object.getOwnPropertyDescriptor(person, ’lastName');
console.log('lastName', descriptor);
// lastName {value: "P", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName1, {

get() {
return '${this.firstName} ${this.lastName}';
},

set(name) {
[this.firstName, this.lastName] = name.split(' ');
},
enumerable: true,
configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName’);
console.log( fullName , descriptor);
// fullName {get: f, set: f, enumerable: true, configurable: true}

person.fullName = 'SangYong Park';
console.log(person); // {firstName: "SangYong", lastName: "Park"}
```
프로퍼티 디스크립터 객체에서 어트리뷰트를 생략하면 다음과 같이 적용된다.

Value/ Get/ Set → undefined

writable/ enumerable/ configurable → false

```javascript
const person = {};

Object.defineProperties(person, {

firstName: {
value: 'SY',
writable: true,
enumerable: true,
configurable: true
},
lastName: {
value: 'P',
writable: true,
enumerable: true,
configurable: true
},

fullName: {
get() {
return '${this.firstName} ${this.lastName}';
},

set(name) {
[this.firstName, this.lastName] = name.split(' ');
},
enumerable: true,
configurable: true
}
});
person.fullName = 'SangYong Park';
console.log(person); // {firstName: "SangYong", lastName: "Park”}
```
<br>

## 16.5 객체 변경 방지
객체는 변경 가능함으로 프로퍼티를 추가하거나 삭제할 수 있고 갱신도 가능하다. 

또한 Object.defineProperty, Object.defineProperties 메서드를 사용하여 프로퍼티 어트리뷰트를 재정의할 수도 있다.
하지만 객체의 변경을 방지하는 다양한 메서드들이 있다.

|구분|메서드|프로퍼티 추가|프로퍼티 삭제|프로퍼티 값 읽기|프로퍼티 값 쓰기|프로퍼티 어트리뷰트 재정의|
|-------|--------------|-------|-------|-------|-------|-------|
|객체 확장 금지|Object.preventExtensions|X|O|O|O|O|
|객체 밀봉|Object.seal|X|X|O|O|X|
|객체 동결|Object.freeze|X|X|O|X|X|

#### 16.5.1 객체 확장 금지
확장이 금지된 객체는 프로퍼티 추가가 금지된다. 즉 프로퍼티 동적 추가와 Object.defineProperty 메서드로 추가할 수 없다.
```javascript
// 확장이 가능한 객체인지 여부는 Object.isExtensible 메서드로 확인할 수 있다.
const person = { name: 'Park' };

// person 객체는 확장이 금지된 객체가 아니다.
console.log(Object.isExtensible(person)); // true

// person 객체의 확장을 금지하여 프로퍼티 추가를 금지한다.
Object.preventExtensions(person);

// person 객체는 확장이 금지된 객체다.
console.log(Object.isExtensible(person)); // false

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시.
console.log(person); // {name: "Park"}

// 프로퍼티 추가는 금지되지만 삭제는 가능하다.
delete person.name;
console.log(person); // {}

// 프로퍼티 정의에 의한 프로퍼티 추가도 금지된다.
Object.defineProperty(person, 'age', { value: 20 });
// TypeError: Cannot define property age, object is not extensible
```

#### 16.5.2 객체 밀봉
밀봉된 객체는 읽기와 쓰기만 가능하다.
```javascript
// 밀봉된 객체인지 여부는 Object. isSealed 메서드로 확인할 수 있다.
const person = { name: 'Park' };

// person 객체는 밀봉된 객체가 아니다.
console.log(Object.isSealed(person)); // false

// person 객체를 밀봉하여 프로퍼티 추가, 삭제, 재정의를 금지한다.
Object.seal(person);

// person 객체는 밀봉된 객체다.
console.log(Object.isSealed(person)); // true

// 밀봉된 객체는 configurable이 false다.
console.log(Object.getOwnPropertyDescriptors(person));
// { name: {value: "Lee", writable: true, enumerable: true, configurable: false}, }

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시.
console.log(person); // {name: "Park"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시
console.log(person); // {name: "Park"}

// 프로퍼티 값 갱신은 가능하다.
person.name = 'Kim';
console.log(person); // {name: "Kim"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { configurable: true});
// TypeError: Cannot redefine property: name
```

#### 16.5.3 객체 동결
동결된 객체는 읽기만 가능하다.
```javascript
// 동결된 객체인지 여부는 Object.isFrozen 메서드로 확인할 수 있다.
const person = { name: 'Park' };

// person 객체는 동결된 객체가 아니다.
console.log(Object.isFrozen(person)); // false

// person 객체를 동결하여 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지한다.
Object.freeze(person);

// person 객체는 동결된 객체다.
console.log(Object.isFrozen(person)); // true

// 동결된 객체는 writable과 configurable이 false다.
console.log(Object.getOwnPropertyDescriptors(person));
// { name: {value: "Park", writable: false,, enumerable: true, configurable: false}, }

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시.
console.log(person); // {name: "Park"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시
console.log(person); // {name: "Park"}

// 프로퍼티 값 갱신이 금지된다.
person.name = 'Kim'; // 무시
console.log(person); // {name: "Park"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { configurable: true});
// TypeError: Cannot redefine property: name
```

#### 16.5.4 불변 객체
앞에 나온 변경 방지 메서드는 얕은 변경 방지로 직속 프로퍼티만 변경을 방지하고 중첩 객체에게는 영향을 미치지 못한다.
따라서 Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다.
```javascript
const person = {
name: 'Park',
address: { city: 'Seoul' }
};
// 얕은 객체 동결
Object.freeze(person);

// 직속 프로퍼티만 동결한다.
console.log(Object.isFrozen(person)); // true

// 중첩 객체까지 동결하지 못한다.
console.log(Object.isFrozen(person.address)); // false
person.address.city = 'Busan';
console.log(person); // {name: "Park", address: {city: "Busan"}}
```
중첩 객체까지 동결하여 변경 불가한 불변 객체를 만드려면 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 한다.
```javascript
function deepFreeze(target) {

if (target && typeof target === 'object' && !Object.isFrozen(target)) {
Object.freeze(target);

Object.keys(target).forEach(key => deepFreeze(target[key]));
}
return target;
}

const person = {
name: 'Park',
address: { city: 'Seoul' }
};

// 깊은 객체 동결
deepFreeze(person);
console.log(Object.isFrozen(person)); // true

// 중첩 객체까지 동결한다.
console.log(Object.isFrozen(person.address)); // true

person.address.city = 'Busan';
console.log(person); // {name: "Park", address: {city: "Seoul"}}
```
