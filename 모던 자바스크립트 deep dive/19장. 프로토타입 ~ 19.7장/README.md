![image](https://github.com/sangypar/SSAFRONT/assets/158231909/50f96eee-7a83-4ad1-a9f8-4c4cc4ebcd17)![image](https://github.com/sangypar/SSAFRONT/assets/158231909/cfd6a50f-1a4a-48bf-bcee-90e64e2ae934)# 프로토타입

자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어이다.
자바스크립트를 이루고 있는 거의 *모든 것*이 객체이다.

## 객체 지향 프로그래밍
여러 개의 독립적인 단위, 즉 객체 object의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.
시레는 특징이나 성질을 나타내는 **속성** attrivute/property를 가지고 있고 이를 통해 인식, 구별할 수 있다.

> 추상화
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

## 상속과 프로토타입
> 상속이란?
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
생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해두면 따로 구현할 필요 없이 상위 부모 객체인 ㅍ로토타입의 자산을 공유하여 사용할 수 있다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/6d794f4c-1b76-4f13-8ee6-e6fe2c431b22)


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

> __proto__는 접근자 프로퍼티다.
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

> __proto__ 접근자 프로퍼티는 상속을 통해 사용된다.
__proto__는 객체가 직접 소유하는 프로퍼티가 아니라 Obeject.prototype의 프로퍼티다. 모든 객체는 상속을 통해 접근자 프로퍼티를 사용할 수 있다.

**Object.prototype**
```
모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있다.
객체 프로퍼티에 접근하려고 할 때, 그 객체에 해당 프로퍼티가 없다면 참조를 따라 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.
그 종점에는 Object.prototype이 있다.
```

> __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
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

> __proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.
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
