# 25장. 클래스
자바스크립트는 클래스가 필요없는 프로토타입 기반 객체지향 언어이다.

## 25.1 클래스는 프로토타입의 문법적 설탕인가?
ES6에서 클래스가 도입되기 전에는, 생성자 함수와 프로토타입을 통해 상속을 구현할 수 있었다.
``` javascript
// ES5 생성자 함수
var Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log('Hi! My name is ' + this.name);
  };

  // 생성자 함수 변환
  return Person;
}());

// 인스턴스 생성
var me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
```
ES6의 클래스는 생성자 함수와 매우 유사하게 동작하지만 다음과 같이 몇 가지 차이가 있다.
1. 클래스를 new 연산자 없이 호출하면 에러가 발생한다. (생성자 함수는 new 없이 호출하면, 일반 함수로 호출된다)
2. 클래스는 extends와 super 키워드를 제공한다. (생성자 함수는 없다)
3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다. (함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이, 함수 표현식으로 정의한 생성자 함수는 변수 호이스팅이 발생한다)
4. 클래스 내의 모든 코드에는 암묵적으로 strict mode가 적용되며 해제할 수 없다. (생성자 함수는 그렇지 않다)
5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 [[Enumerable]]의 값이 false다.

**따라서 클래스는 새로운 객체 생성 메커니즘이다.**

## 25.2 클래스 정의
클래스는 일반적으로 파스칼 케이스를 사용한다.
``` javascript
// 클래스 선언문
class Person {}

// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```
클래스를 표현식으로 정의할 수 있다는 것은, 클래스가 값으로 사용할 수 있는 일급 객체라는 것을 의미한다.<br>
즉, 클래스는 다음과 같은 특징을 갖는다.
1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료구조에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

클래스의 몸체에는 0개 이상의 메서드(생성자, 프로토타입 메서드, 정적 메서드) 세 가지만 정의할 수 있다.
<p align="center"><img src="./image/1.PNG"></p>

## 25.3 클래스 호이스팅
클래스는 함수로 평가된다. <br>
따라서 클래스 선언문으로 정의한 클래스는 함수 선언문 같이 소스코드 평과 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성한다. (**호이스팅한다**)<br>
단 let, const 키워드와 같이 일시적 사각지대(TDZ)에 빠지기 때문에, 호이스팅이 발생하지 않는 것처럼 동작한다.

## 25.4 인스턴스 생성
클래스는 생성자 함수이며 **반드시 new 연산자**와 함께 호출되어 인스턴스를 생성한다.

## 25.5 메서드
클래스 몸체에서 정의할 수 있는 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드의 세 가지가 있다.

### 25.5.1 constructor
constructor는 인스턴스를 생성하고 초기화하기 위한 메서드다.<br>
**클래스 몸체에 정의한 constructor는 단순한 메서드가 아니라, 인스턴스의 프로퍼티를 생성한다.**
1. constructor는 클래스 내에 한 개만 존재할 수 있다.
2. constructor는 생략할 수 있다.
3. constructor를 생략하면, 빈 constructor가 암묵적으로 정의된다.
4. return문은 반드시 생략한다.

``` javascript
class person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
}

const me = new Person('Lee', 'Seoul');
console.log(me); // Person {name: "Lee", address: "Seoul"}
```

### 25.5.2 프로토타입 메서드
클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.
``` javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
```

``` javascript
Object.getPrototypeOf(me) === Person.prototype; // true
me instanceof Person; // true

Object.getPrototypeOf(Person.prototype) === Person.prototype; // true
me instanceof Object; // true

me.constructor === Person // true
```

### 25.5.3 정적 메서드
클래스에서는 메서드에 **static**을 붙이면 정적 메서드(클래스 메서드)가 된다.

``` javacript
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHi() {
    console.log('Hi!');
  }
}
```

### 25.5.4 정적 메서드와 프로토타입 메서드의 차이
정적 메서드와 프로토타입 메서드의 차이는 다음과 같다.
1. 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
2. 정적 메서드는 클래스로 호출하고, 프로토타입 메서드는 인스턴스로 호출한다.
3. 정적 메서드는 인스턴스로 프로퍼티를 참조할 수 없지만, 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

``` javascript
class Square {
  // 정적 메서드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100
```
정적 메서드 area는 2개의 인수를 전달받아 면적을 계산 후 리턴한다.

``` javascript
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // 프로토타입 메서드
  area() {
    return this.width * this.height;
  }
}

const square = new Square(10, 10);
console.log(square.area()); // 100
```
this는 메서드를 호출한 객체, 즉 마침표 앞의 객체에 바인딩된다.<br>
따라서 위 예제의 경우 square 객체로 프로토타입 메서드 area를 호출했기 때문에, area 내부의 this는 square 객체를 가리킨다.<br>
**정적 메서드는 클래스로 호출해야 하므로 정적 메서드 내부의 this는 인스턴스가 아닌 클래스를 가리킨다.** <br>
**즉, 프로토타입 메서드와 정적 메서드 내부의 this 바인딩이 다르다.** <br>
**따라서 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면 프로토타입 메서드로 정의해야 한다.**

### 25.5.5 클래스에서 정의한 메서드의 특징
1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요없다.
3. 암묵적으로 strict mode로 실행된다.
4. for ... in 문이나 Object.keys 메서드 등으로 열거할 수 없다. 즉, [[Enemerable]]의 값이 false이다.
5. 내부 메서드 [[Construct]]를 갖지 않는다. 따라서 new 연산자와 함께 호출할 수 없다.

## 25.6 클래스의 인스턴스 생성 과정
new 연산자와 함께 클래스를 호출하면 생성자 함수와 마찬가지로 클래스의 내부 메서드 [[Construct]]가 호출된다.

1. 인스턴스 생성과 this 바인딩
   : 1-1. constructor의 내부 코드가 실행되기에 앞서 암묵적으로 빈 객체(인스턴스)가 생성된다.
     2-1. 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다.
     3-1. 인스턴스는 this에 바인딩 된다.
     4-1. constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

2. 인스턴스 초기화
   : constructor의 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.
     즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화한다.

3. 인스턴스 반환
   : 클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

``` javascript
class person {
  constructor(name) {

    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }
}
```

## 25.7 프로퍼티
### 25.7.1 인스턴스 프로퍼티
인스턴스 프로퍼티는 constructor 내부에서 정의해야 한다. <br>
constructor 내부 코드가 실행되기 전에 constructor 내부의 this에는 이미 클래스가 암묵적으로 생성한 인스턴스인 빈 객체가 바인딩되어 있다. <br>
``` javascript
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티
    this.name = name;
  }
}

const me = new Person('Lee');

console.log(me); // Person {name: "Lee"}
console.log(me.name); // Lee;
```

### 25.7.2 접근자 프로퍼티
접근자 프로퍼티는 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티이다.

``` javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const me = new Person('Ungmo', 'Lee');

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${me.firstName} ${me.lastName}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = 'Heegun Lee';
console.log(me); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다
console.log(me.fullName); // Heegun Lee

// fullName은 접근자 프로퍼티다
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName')); // {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

getter는 호출하는 것이 아니라 프로퍼티처럼 참조하는 형식으로 사용하며, 참조 시에 내부적으로 getter가 호출된다. <br>
setter도 호출하는 것이 아니라 프로퍼티처럼 값을 할당하는 형식으로 사용하며, 할당 시에 내부적으로 setter가 호출된다. <br>
클래스의 메서드는 기본적으로 프로토타입 메서드가 된다. 따라서 클래스의 접근자 프로퍼티 또한 인스턴스 프로퍼티가 아닌 프로토타입 프로퍼티가 된다.

``` javascript
Object.getOwnPropertyNames(me); // ["firstName", "lastName"]
Object.getOwnPropertyNames(Object.getPrototypeOf(me)); // ["constructor", "fullName"]
```

### 25.7.3 클래스 필드 정의 제안
클래스 필드(또는 멤버)는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어다. <br>
<hr>
원래는 자바스크립트의 클래스에서 인스턴스 프로퍼티를 선언하고 초기화하려면 반드시 constructor 내부에서 this에 프로퍼티를 추가해야 한다. <br>
또한 자바스크립트의 클래스에서 인스턴스 프로퍼티를 참조하려면 반드시 this를 사용하여 참조해야한다. <br>
자바스크립트의 클래스 몸체에는 메서드만 선언할 수 있다.
<hr>
그러나 최근에 더해진 '클래스 필드'라는 문법을 사용하여, 클래스를 정의할 때 '<프로퍼티 이름> = <값>'을 써주면 간단히 클래스 필드를 만들 수 있다.
  
``` javascript
class Person {
  // 클래스 필드 정의
  name = 'Lee';

  // 클래스 필드에 함수를 할당
  getName = function() {
    return this.name;
  }

  // 화살표 함수로 정의할 수도 있다.
  // getName = () => this.name;
}

const me = new Person();
console.log(me); // Person {name: "Lee"}
```

이처럼 클래스 필드에 함수를 할당하는 경우, 이 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다.<br>
따라서 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.

### 25.7.4 private 필드 정의 제안
원래 자바스크립트는 접근제한자를 지원하지 않는다. 따라서 인스턴스 프로퍼티는 언제나 public이다. <br>
아래의 private 프로퍼티와 메서드는 제안(proposal) 목록에 등재된 문법으로, 명세서에 등재되기 직전 상태이다.

``` javascript
class Person {
  // private 필드 정의
  #name = '';

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const me = new Person('Lee');

console.log(me.#name); // SyntaxError: Private field '#name' must be declared in an enclosing class
```

클래스 외부에서 private 필드에 직접 접근할 수 있는 방법은 없다.<br>
다만 접근자 프로퍼티를 통해 간접적으로 접근하는 방법은 유효하다.

``` javascript
class Person {
  #name = '';

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.#name.trim();
  }
}

const me = new Person(' Lee ');
console.log(me.name); // Lee
```

### 25.7.5 static 필드 정의 제안
클래스에는 static 키워드를 사용하여 정적 메서드를 정의할 수 있지만, 정적 필드는 정의할 수 없었다. <br>
현재는 Static class features를 이용하여 static public 필드, static private 필드, static private 메서드를 정의할 수 있다.

``` javascript
class MyMath {
  static PI = 22 / 7;

  static #num = 10;

  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.1412857142857143
console.log(MyMath.increment()); // 11
```

## 25.8 상속에 의한 클래스 확장
