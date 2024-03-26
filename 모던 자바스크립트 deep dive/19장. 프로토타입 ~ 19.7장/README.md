# 프로토타입

자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어이다.
자바스크립트를 이루고 있는 거의 *모든 것*이 객체이다.

## 객체 지향 프로그래밍
여러 개의 독립적인 단위, 즉 객체 object의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.
시레는 특징이나 성질을 나타내는 **속성** attribute/property를 가지고 있고 이를 통해 인식, 구별할 수 있다.

#### 추상화
  
다양한 속성 중에서 프로그램에 필요한 속성만 간추려 표현하는 것
여러 개의 사람 객체들 중에서 속성을 통해 하나의 객체를 구별 할 수 있다. (김도은과 최이서는 다른 사람이다!)
→ 이렇게 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 **객체**라고 부른다.

```javaScript
const Circle = {
  radius: 5; //반지름 = "상태를 나타내는 데이터"

  //원의 지름을 구하는 메서드 = "동작"
  getDiameter(){
    return 2*this.radius;
  }
};
```
→ 객체지향 프로그래밍은 객체의 상태를 나타내는 데이터와 조작할 수 잇는 동작을 하나의 논리적 단위로 묶어 생각한다.
위의 예시에서 볼 수 있듯이 **객체는 상태 데이터와 동작을 하나의 논리저긴 단위로 묶은 복합적인 자료구조**라고 볼 수 있다.

<hr>

## 상속과 프로토타입
#### 상속이란?
  
어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것
자바 스크립트에서는 상속을 구현하여 불필요한 중복을 제거한다. 기존의 코드를 적극적으로 재사용하면 중복을 제거할 수 있다.
[생성자 함수](https://github.com/sangypar/SSAFRONT/tree/main/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20deep%20dive/17%EC%9E%A5.%20%EC%83%9D%EC%84%B1%EC%9E%90%20%ED%95%A8%EC%88%98%EC%97%90%20%EC%9D%98%ED%95%9C%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1)에서 봤듯이 동일한 프로퍼티 구조를 갖는 객체를 여러 개 생성할 때 유용하다.
그러나 동일한 내용의 메서드를 여러 인스턴스가 공유할 경우, **메서드를 단 하나만 만들어서 공유하는 것이 바람직하다.**
인스턴스를 생성할 때마다 메서드를 생성하기 때문에 같은 메서드가 10개가 생성되기 때문이다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/c1bcd535-151f-44ab-9498-5b07ffc68a92)

**프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거할 수 있다.**

```javaScript
function Circle(radius){
  this.radius = radius;
}

//Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해서 사용할 수 있도록 프로토타입에 추가
//프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩 되어 있다.
Circle.prototype.getArea = function() {
  return Math.PI * this.radius**2;
};

//인스턴스
const circle1 = new Circle(1);
const circle2 = new Circle(2);

//Circle 생성자함수가 생성한 모든 인스턴스는 부모 객체 역할을 하는 프로토타입 Circle.prototype로부터 getArea 메서드를 상속받는다.
//모든 Circle 인스턴스는 하나의 getArea메서드를 공유한다
console.log(circle1.getArea === circle2.getArea); //true
```

상속은 코드의 재사용이라는 관점에서 매우 유용하다.
생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해두면 따로 구현할 필요 없이 상위 부모 객체인 프로토타입의 자산을 공유하여 사용할 수 있다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/6d794f4c-1b76-4f13-8ee6-e6fe2c431b22)

<hr>

## 프로토타입 객체

프로토타입 객체(=프로토타입)란 객체 간 상속을 구현하기 위해 사용된다.
**모든 객체는 하나의 프로토타입을 갖는다. 모든 프로토타입은 생성자함수와 연결되어 있다.**
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/f8b1afa8-214b-4f9e-be7e-da9678f6321c)


### __proto__ 접근자 프로퍼티
**모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.**
```
person{name: "Lee"}

name: "Lee" person 객체의 프로퍼티

▼ _p roto_: person 객체의 프로토타입
► constructor: f Object()
► hasOwnProperty: f hasOwnPropertyf)
► isPrototyp은Of: f isPrototypeOff)
► propertylsEnumerable: f propertylsEnumerablef)
► toLocaleString: f toLocaleString()
► toString: f toStringO
► valueOf: f valueOff)
► _defineGetter_: f __defineGetter_()
► _defineSetter_ : f _defineSetter_()
► _lookupGetter_ : f _lookupGetter_()
► _lookupSetter_ : f _lookupSetter_()
► get _proto_: f _proto_()
► set _proto_: f _proto_()
```

#### __proto__는 접근자 프로퍼티다.
  
내부 슬롯을 프로퍼티가 아니다. 따라서 자바스크립트에서는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 잇는 방법을 제공하지 않는다.
__proto__ 접근자 프로퍼티를 통해서 간접적으로 [[Prototype]]이라는 내부 슬롯의 값, 즉 프로토타입에 접근할 수 있다는 뜻이다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/d0b51d9f-b6d6-407a-b820-6fbb6d6ef10d)

__proto__는 getter/setter 함수인 접근자 합수 [[Get]], [[Set]]을 통해 프로토타입을 취득하거나 할당한다.
__proto__를 통해 프로토타입에 접근하면 내부적으로 getter 함수 [[Get]]가 호출되어 프로토타입을 가져올 수 있게 된다.
새로운 프로토타입을 할당할 시에는 setter 함수인 [[Set]]이 호출된다.

```javaScript
const obj = {};
const parent = { x: 1 };
// getter 함수인 get __proto__가 호출되어 obj 객처/의 프로토타입을 취득
obj._proto_;

// setter 함수인 set_______ _가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;
console.log(obj.x); // 1
```

#### __proto__ 접근자 프로퍼티는 상속을 통해 사용된다.
  
__proto__는 객체가 직접 소유하는 프로퍼티가 아니라 Obeject.prototype의 프로퍼티다. 모든 객체는 상속을 통해 접근자 프로퍼티를 사용할 수 있다.

**Object.prototype**
```
모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있다.
객체 프로퍼티에 접근하려고 할 때, 그 객체에 해당 프로퍼티가 없다면 참조를 따라 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.
그 종점에는 Object.prototype이 있다.
```

#### __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
  
접근자 프로퍼티는 사용하는 이유는 **상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해** 사용된다.

```javaScript
const parent = {};
const child = {};

// chiIc/의 프로토타입을 parent로 설정
child.__proto__ = parent;

// pa rent의 프로토타입을 chiId로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

서로를 참조하는 이런 코드가 정상 처리되면 비정상적인 프로토타입 체인이 만들어지기 때문에 에러를 발생시킨다.
이런 구조로 체인이 만들어지면 종점이 존재하지 않아서 무한루프에 빠지게 된다.
**프로토타입 체인은 단방향 링크드 리스트**로 구현되어야 한다.
아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다.

#### __proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.
  
모든 객체가 사용할 수 있는 것은 아니기 때문에 코드 내에서 접근자 프로퍼티를 직접 사용하는 것은 권장하지 않는다.
직접 상속을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문에 접근자 프로퍼티를 사용할 수 없는 경우가 있다.
```javaScript
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__S 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Obj은ct.__proto__를 상속받을 수 없다.
console.log(obj.__proto__); // undefined

// 따라서________보다 Object.getPrototypeOf 메서드를 人居하^ 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

접근자 프로퍼티 대신 프로포타입의 참조를 취득하고 싶을 때는 **Object.getPrototypeOf** 메서드를 사용하고, 교체하고 싶은 경우는 **Object.setPrototypeOf** 메서드를 사용할 것을 권장한다.

```javaScript
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;

// obj 객처/의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

### 함수 객체의 prototype 프로퍼티

**함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.**
일반 객체는 prototype 프로퍼티를 소유하지 않는다.
생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 생성하지도 않는다.
일반 함수는 prototype 프로퍼티를 갖고 있지만, 객체를 생성하지 않기 때문에 아무런 의미가 없다.

```javaScript
// 화살표 함수는 non-constructor다.
const Person = name => {
this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
foo() {}
};
// non-constr나ctor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

**모든 객체가 가지고 있는 __proto__ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.**
그러나 이들 프로퍼티를 사용하는 주체가 다르다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/3521f9c2-cd20-4d60-89fa-f0a53f9f9038)
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/3475ec24-5fac-4330-9c8e-772a5d55e90a)

### 프로토타입의 constructor 프로퍼티와 생성자 함수

**모든 프로토타입은 constructor 프로퍼티를 갖는다.** 이 프로퍼티는 자신을 참조하고 있는 생성자 함수를 가리킨다.

```javaScript
// 생성자 함수
function Person(name) {
this.name = name;

const me = new Person('Lee');

// me 객체의 생성자 함수는 Personom,
console.log(me.constructor === Person); // true
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/df2be7a2-e442-4f42-a343-122d40008a10)

<hr>

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
생성자 함수에 의해 생성된 인스턴스는  프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다. 하지만 리터럴 표기법에 의한 객체 생성 방식처럼 new 연산자를 쓰지 않고 인스턴스를 만드는 방식이 있다. 이 경우, **프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.**
```javaScript
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

Object 생성자 함수에 인수를 전달하지 않거나 undefined 또는 null을 인수로 전달하면서 호출하면 내부적으로는 추상연산 OrdinaryObjectCreate를 호출하여 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/20e32e8a-b53e-4cd0-8c58-4b8d5067e8e5)

* 추상 연산 : ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현

```javaScript
// 2. Object 생성자 함수에 의한 객체 생성
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// 1. new. target이 undefined나 Object가 아닌 경우
// 인스턴스 一 Foo.prototype — Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객처/ 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String 객체 생성
obj = new Object('123');
console.log(obj); // String {"123"}
```

객체 리터럴이 평가될 때도 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/d6638b22-4882-4e02-b4cf-b52852edf80d)
Object 생성자 함수 호출과 객체 리터럴은 추상 연산을 호출하여 빈 객체를 생성한다는 점은 동일하나 세부 내용(new.target의 확인, 프로퍼티 추가 처리 등)이 다르다.
**객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.**

함수 선언문과 함수 표현식으로 함수 객체를 생성한 것은 Function 생성자 함수가 아니다. 하지만 constructor 프로퍼티를 통해 확인해보면 함수의 생성자 함수는 Function의 생성자 함수이다.
리터럴 표기법에 의해 생성된 객체도 *상속을 위해 프로토타입이 필요하다.* → 가상적인 생성자 함수를 갖는다.
프로토타입은 생성자함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다. 즉, **프로토타입과 생성자함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.**
```
프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수 = 리터럴 표기법으로 생선한 객체를 생성한 생성자 함수
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/6255df7c-6cce-4812-8295-7aeab82fdaa8)

<hr>

## 프로토타입의 생성 지점
**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.**

### 사용자 정의 생성자 함수와 프로토타입 생성 시점
constructor(생성자 함수로서 호출할 수 있는 함수)는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
```javaScript
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: f}

// 생성자 함수
function Person(name) {
this.name = name;
}
-----------------------------------------------------------------------------------------------
// 화살표 함수는 non-constructor
const Person = name => {
this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다. = 생성자 함수로서 호출할 수 없는 함수이기 때문
console.log(Person.prototype); // undefined
```

함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행된다. 그래서 함수 선언문으로 정의된 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 된다. 이때 프로토타입도 더불어 생성된다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/dbcdc805-1ebb-48f9-8ab7-9bac0cbd692c)

생성된 프로토타입은 오직 constructor 프로퍼티만을 갖는 객체다. 프로토타입도 자신의 프로토타입으로 Object.prototype를 갖는다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/625fcec9-95ef-4027-bfa9-50a910acae1f)

### 빌트인 생성자 함수와 프로토타입 생성 시점
Object, String, Number, Function, Array, RegExp, Date, Promise 등과 같은 빌트인 생성자 함수도 일반함수처럼 생성되는 시점에 프로토타입이 생성된다.
모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/e680117d-28d9-4c9c-8ecc-86c9551899cd)

* 전역객체? <br>
코드가 실행되기 이전에 자바스크립트 엔진에 의해 생성되는 특수한 객체이다. (브라우저 : window, 서버사이드(Node.js) : global)

**이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 객체의 [[Prototype]] 내부 슬롯에 할당된다.**

## 객체 생성 방식과 프로토타입의 결정
```
객체 생성 방법?
- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

→ 위에서 말했던 바와 같이 추상 연산 OrdinaryObjectCreate에 의해 생성된다.
```
추상 연산 OrdinaryObjectCreate에는 객체에 추가할 프로퍼티 목록들이 인수로 전달된다. 그 프로퍼티들에 의해서 프로토타입이 결정된다. 이 인수들은 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다.

### 객체 리터럴에 의해 생성된 객체의 프로토타입
객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype이 되고, 그것을 객체가 상속받는다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/1f5ea0d3-d6f5-4416-ad75-901b2a1ae680)
```javaScript
const obj = { x:1 };

console.log(obj.constructor === Object); //true
console.log(obj.hasOwnProperty('x'));    //true
//이 객체는 constructor 프로퍼티와 hasOwnProperty 메서드 등을 소유하진 않지만 프로토타입의 그것들을 자신의 자산인 것처럼 사용할 수 있다.
```
### Object 생성자 함수에 의해 생성된 객체의 프로토타입
Object 생성자 함수를 인수 없이 호출하면 빈 객체가 되고, 이때는 객체 리터럴과 마찬가지로 추상연산 OrdinaryObjectCreate가 호출된다. 이에 해당하는 프로토타입은 Object.prototype이다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/14711ae6-5220-43ae-8e43-893cc168c451)
```javaScript
const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototyped 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true
```
객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만 Object 생성자 함수 방식은 일단 빈 객체를 생성한 후 프로퍼티를 추가해야 한다.

### 생성자 함수에 의해 생성된 객체의 프로토타입
new 연산자와 함께 인스턴스를 생성하면 추상연산 OrdinaryObjectCreate가 호출된다. 여기에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩 되어 있는 객체이다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/274bd4f9-580f-4238-a829-ea41f9ff0bb6)
Object.prototype은 다양한 빌트인 메서드를 갖고 있지만, *사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입 Person.prototype의 프로퍼티는 constructor 뿐이다.*
```javaScript
function Person(name) {
this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
console.log( . My name is ${this.name} );
};

const me = new Person('Lee');
const you = new Person('Kim’);

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```
이렇게 Person 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello 메서드를 상속받아 자신의 메서드처럼 사용할 수 있다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/8d6077ac-df0a-4330-9c64-65ac150d67e4)

<hr>

## 프로토타입 체인
```javaScript
function Person(name) {
this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
console.log( Hi! My name is ${this.name} );
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype 메서드다.
console.log(me.hasOwnProperty('name')); // true

//여기서 me 객체의 프로토타입은 Person.prototype이고, 이는 Object.prototype도 상속받았다는 것을 의미한다.

Object.getPrototypeOf(me) === Person.prototype; //true
Object.getPrototypeOf(Person.prototype) === Object.prototype; //true
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/3e2f2689-0d40-4042-be60-10e1d0efae30)

**프로토타입 체인**
객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.
상속을 구현하는 메커니즘이다.
위의 예시에서 hasOwnProperty는 Object.Prototype의 메서드인데, 프로토타입 체인을 따라 Object까지 올라가서 그 메서드를 검색하여 사용하는 것이다.

프로토타입 체인을 계속 타고 올라가다 보면 최상위에 위치하는 객체는 언제나 Obejct.prototype이다. = 모든 객체는 Object.prototype을 상속받는다.
**Object.prototype을 프로토타입 체인의 종점**이라고 부른다. 여기서도 프로퍼티를 검색할 수 없다면 undefined를 반환한다. *에러가 발생하지 않는다*

**프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘**이라고 할 수 있다. 
이와 달리 식별자는 [스코프 체인]([![Uploading image.png…]()](https://github.com/sangypar/SSAFRONT/tree/main/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20deep%20dive/13%EC%9E%A5.%20%EC%8A%A4%EC%BD%94%ED%94%84#1331-%EC%8A%A4%EC%BD%94%ED%94%84-%EC%B2%B4%EC%9D%B8%EC%97%90-%EC%9D%98%ED%95%9C-%EB%B3%80%EC%88%98-%EA%B2%80%EC%83%89)https://github.com/sangypar/SSAFRONT/tree/main/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20deep%20dive/13%EC%9E%A5.%20%EC%8A%A4%EC%BD%94%ED%94%84#1331-%EC%8A%A4%EC%BD%94%ED%94%84-%EC%B2%B4%EC%9D%B8%EC%97%90-%EC%9D%98%ED%95%9C-%EB%B3%80%EC%88%98-%EA%B2%80%EC%83%89)
에서 검색한다. 스코프의 계층적 구조에서 식별자를 검색한다. **스코프 체인은 식별자 검색을 위한 메커니즘**이라고 할 수 있다.

**_스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용된다._**
