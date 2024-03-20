# 생성자 함수에 의한 객체 생성

## Object 생성자 함수
new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체를 생성한 후 프로퍼티 또는 메서드를 추가해 완성할 수 있다.
* 생성자 함수? new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수
```javaScript
const person = new Object();

//프로퍼티 추가
person.name = "Kim";
person.sayHello = function () {
  console.log('Hi! My name is '+ this.name);
}
```

Object 생성자 함수 외에도 String, number, Boolean, Function, Array, Date, RegExp, Promise 등 빌트인 생성자 함수를 제공한다.
**반드시 생성자함수를 통해 빈 객체를 생성해야 하는 것은 아니다.**

## 생성자 함수
### 객체 리터럴에 의한 객체 생성 방식의 문제점
객체 리터럴에 의한 객체 생성 방식은 *단 하나의 객체*만 생성한다. 그러나 같은 프로퍼티를 갖는 객체를 여러 개 생성할 때는 매번 코드를 기술해야 한다.
```javaScript
const cicrle1 = {
  radius: 5,
  getDiameter(){
  return 2 * this.radius;
  }
};

const cicrle2 = {
  radius: 10,
  getDiameter(){
  return 2 * this.radius;
  }
};
//두 객체는 따로 만들어야 한다.
```

### 생성자 함수에 의한 객체 생성 방식의 장점
생성자 함수에 의한 객체 생성은 같은 프로퍼티를 갖는 객체를 여러 개 생성할 수 있다.
**new 연산자와 함께 호출해야 생성자 함수로 동작**하고, new 연산자가 없으면 일반 함수로 동작한다.
```javaScript
function Circle(radius){
  this.radius = radius;
  this.getDiameter = function() {
    return 2*this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

//new를 쓰지 않으면 일반 함수로 작동
const circle3 = Circle(15);
console.log(cicrle3); //undefined
console.log(radius); //15
```

<b>this?</b>
객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수 → this 바인딩은 함수 호출 방식에 따라 동적으로 결정
* 일반 함수로서 호출 → 전역 객체
* 메서드로서 호출 → 메서드를 호출한 객체
* 생성자 함수로서 호출 → 생성자 함수가 생성할 인스턴스

### 생성자 함수의 인스턴스 생성 과정
생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿으로 동작, **인스턴스를 생성**하고 **생성된 인스턴스를 초기화**하는 것이다.

> ##### 인스턴스 생성과 this 바인딩
암묵적으로 빈 객체(=인스턴스)가 생성되고, 이것은 this에 바인딩된다. this가 생성할 인스턴스를 가리키는 것도 이 이유 때문이다.
* 바인딩? 식별자와 값을 연결하는 과정

> ##### 인스턴스 초기화
생성자 함수에 있는 코드가 한 줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. this에 만들어진 빈 객체(인스턴스)에 프로퍼티나 메서드를 추가하고 인수로 받은 값을 할당하여 초기화하거나 고정값을 할당한다.

> ##### 인스턴스 반환
모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환한다. return을 명시하면 명시한 객체가 반환된다. *원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.*

```javaScript
function Circle(radius){
  console.log(this); //Circle{} 빈 객체 생성
  //암묵적으로 인스턴스 생성되고 this에 바인딩되는 것임

  //아래 과정이 this에 바인딩되어 있는 인스턴스를 초기화하는 과정
  this.radius = radius;
  this.getDiameter = function() {
    return 2*this. radius;
  };
}
//인스턴스 생성 후
Circle circle = new Circle(5); //반지름이 5인 객체 생성
console.log(circle); // Circle{radius : 5, getDiameter = f};

//만악에 안에 return {}; 처리를 한다면?
console.log(circle); // {}

//만약에 return 값이 원시값이라면? (ex return 100)
console.log(circle); // Circle{radius : 5, getDiameter = f};
```

this가 아닌 다른 값 반환은 생성자 함수 기본 동작을 훼손하기 때문에 **생성자 함수 내부에서 return문은 반드시 생략**

### 내부 메서드 [[CALL]]과 [[Construct]]
함수는 객체이지만 일반 객체와는 다르다. **일반객체는 호출할 수 없지만 함수는 호출할 수 있다.** 함수 객체를 위한 [[Environment]], [[FormalParameters]] 등의 내부 슬롯과 [[Call]], [[Construct]] 같은 내부 메서드를 추가로 가지고 있다.

```javaScript
function foo() {}; //함수는 객체다
foo.prop = 10; //프로퍼티 소유 가능
foo.method = function() {
  console.log(this.prop);
};

foo(); //일반적인 함수로서 호출 [[Call]]이 호출
//모든 함수 객체는 내부 메서드 [[Call]]을 갖고 있기 때문에 호출 가능

new foo(); //생성자 함수로서 호출 [[Construct]]가 호출
//그러나 모든 함수 객체가 [[Construct]]를 갖는 것은 아니다.
```

### constructor 와 non-constructor의 구분
* constructor : 생성자 함수로서 호출할 수 있는 함수 → 함수 선언문, 함수 표현식, 클래스
* non-constructor : 생성자 함수로서 호출할 수 없는 함수 → 메서드, 화살표 함수
**생성자 함수로서 호출될 것을 기대하고 정의하지 않은 일반 함수에 new 연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있다**

```javaScript
function foo() {};
const bar = function() {};
const bax = {
  s: function() {} //프로퍼티 x 값으로 할당된 것은 일반 함수 = 메서드로 인정하지 않는다
};

new foo();
new bar();
new x();
//일반함수로 정의된 함수만 constructor
//이때는 [[Construct]]가 호출

foo(); //이때는 [[Call]]이 호출

const arrow () => {};
const obj = {
  x() {}
};

new arrow(); //TypeError : Not a constructor
new obj.x(); //TypeError
```

### new 연산자
**new 연산자와 함께 호출하는 함수는 constructor이어야 한다.** new 없이 생성자함수를 호출하면 일반 함수 호출이 된다. [[Constructor]]이 아니라 [[Call]]이 호출되다는 뜻!
일반 함수로 호출이 되면(new 연산자를 쓰지 않으면) this는 전역 객체 window를 가리키고, 전역 객체의 프로퍼티, 메서드로 기술된다.

```javaScript
function Circle(radius){
  this.radius = radius;
  this.getDiameter = function() {
    return 2*this.radius;
  };
}

const circle = Circle(5); //일반함수

console.log(circle); //undefined
console.log(radius); //5
console.log(getDiameter()); //10
circle.getDiameter(); //TypeError : getDiameter is undefined
```

### new.target
new 연산자 없이 생성자 함수가 호출되는 것을 방지하기 위해 ES6에서는 new.target을 지원한다. this와 유사하게 함수 내부에서 암묵적 지역변수처럼 사용되며 메타 프로퍼티라고 부른다.
**new와 함께 생성자 함수로 호출되면 new.target은 함수 자신을 가르킨다.**
**new 없이 일반 함수로 호출된 함수 내부 new.target은 undefined**

```javaScript
function Circle(radius){
  if(!new.target) { //new와 호출되지 않았으면 undefined가 되기 때문에
    return new Circle(radius); //재귀 호출해서 인스턴스 반환
  }
  this.radius = radius;
  this.getDiameter = function() {
    return 2*this.radius;
  };
}

const circle = Circle(5); //new 없이 생성해도
console.log(circle.getDiameter()); //10 = 잘 호출된다.
```

만약에 new.target이 사용되지 않는 IE라면, *스코프 세이프 생성자 패턴*을 사용할 수 있다.

참고로 대부분의 빌트인 생성자 함수(Object, String, Number, Boolean, Function, Array, Date, RegExp, Promise 등)은 new 연산자와 호출되었는지를 확인 후 적절한 값을 반환한다.
String, Number, Boolean 생성자 함수는 new 연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환한다.

```javaScript
const str = String(123);
console.log(str, typeof str); //123 String

const num = Number('123');
console.log(num, typeof num); //123 number

const bool = Boolean('true');
console.log(bool, typeof bool); //true boolean
```
