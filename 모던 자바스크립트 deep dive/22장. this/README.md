# 22장. this

## 22.1 this 키워드
**this**는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.<br>
**this**를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

``` javascript
const circle = {
  radius: 5,

  getDiameter() {
    return 2 * circle.radius;
  }
};

console.log(circle.getDiameter()); // 10
```

위의 코드에서 getDiameter 메서드는 **자신이 속한 객체를 재귀적으로 참조한다**.<br>

``` javascript
function Circle(radius) = {
  ????.radius: radius,

  Circle.prototype.getDiameter() = function () {
    return 2 * ????.radius;
  }
};

const circle = new Circle(5);
```

위의 코드는 생성자 함수 방식으로 인스턴스를 생성하는 경우이다.<br>
생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로, 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다.<br>
**따라서 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자로 this를 사용한다**. <br><br>

this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다.<br>
함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다.<br>
함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것처럼, this도 지역 변수처럼 사용할 수 있다.<br>
**단, this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다**.<br><br>

this를 사용하여 위의 코드를 리팩토링 해보자.

``` javascript
const circle = {
  radius: 5,

  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter()); // 10
```

위의 코드에서 this는 메서드를 호출한 객체, 즉 circle을 가리킨다.

``` javascript
function Circle(radius) = {
  ????.radius: radius,

  Circle.prototype.getDiameter() = function () {
    return 2 * ????.radius;
  }
};

const circle = new Circle(5);
```

생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.<br>
이처럼 this는 상황에 따라 가리키는 대상이 다르다.

## 22.2 함수 호출 방식과 this 바인딩
**this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다**. <br><br>

함수를 호출하는 방식은 다음과 같다
1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

``` javascript
const foo = function () {
  console.dir(this);
};


// 1. 일반 함수 호출
foo(); // ?


// 2. 메서드 호출
const obj = { foo };
obj.foo; // ?


// 3. 생성자 함수 호출
new foo(); // ?


// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
const bar = { name: 'bar' };

foo.call(bar); // ?
foo.apply(bar); // ?
foo.bind(bar); // ?
```

### 22.2.1 일반 함수 호출
기본적으로 this에는 전역 객체가 바인딩된다.<br>
``` javascript
function foo() {
  console.log("foo's thos: ", this); // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

``` javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    console.log("foo's this.value: ", this.value); // 100

    // 중첩 함수
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }
    bar();
  }
};

obj.foo();
```
위의 코드처럼 **전역 함수는 물론이고 중첩 함수를 일반 함수로 호출하면, 함수 내부의 this에는 전역 객체가 바인딩된다**.<br>
따라서 일반 함수에서 this는 의미가 없다.<br>
그리고 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다.

``` javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    setTimeout(function() {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  }
};

obj.foo();
```
위의 코드처럼 [콜백 함수](https://github.com/sangypar/SSAFRONT/tree/main/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20deep%20dive/12%EC%9E%A5.%20%ED%95%A8%EC%88%98#4%EF%B8%8F%E2%83%A3-%EC%BD%9C%EB%B0%B1-%ED%95%A8%EC%88%98)가 일반 함수로 호출된다면, 콜백 함수 내부의 this에도 전역 객체가 바인딩된다.<br>
**어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다**.<br>
하지만 메서드 내에서 정의한 중첩 함수 또는 콜백 함수가 일반 함수로 호출될 때, this가 전역 객체를 바인딩하는 것은 문제가 있다.<br>
메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위해서는<br>
1. this를 새로운 변수에 할당해서, 콜백 함수 내부에서 그 변수를 참조하거나
2. Function.prototype.apply/call/bind 메서드에 의한 간접 호출 혹은
3. 화살표 함수를 사용할 수 있다.

### 22.2.2 메서드 호출
메서드 내부의 this는 메서드를 소유한 객체가 아닌, 메서드를 호출한 객체에 바인딩된다.

``` javascript
const person = {
  name: 'Lee',
  getName() {
    return this.name;
  }
};

console.log(person.getName()); // Lee
```
<p align="center"><img src="./img/1.png"></p>

위 코드의 getName 메서드는 person 객체의 메서드로 정의되었다.<br>
즉, getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라, 독립적으로 존재하는 별도의 객체다.<br>
따라서 getName 프로퍼티가 가리키는 함수 객체, 즉 getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

``` javascript
const anotherPerson = {
  name: 'Kim'
};

anotherPerson.getName = person.getName;

console.log(anotherPerson.getName()); // Kim

const getName = person.getName;

console.log(getName()); // ''
```
<p align="center"><img src="./img/2.png"></p>

따라서 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와 관계가 없고, 메서드를 호출한 객체에 바인딩된다.

``` javascript
const person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person('Lee');

// getName 메서드를 호출한 객체는 me다. 따라서 this는 me를 가리킨다.
console.log(me.getName()); // Lee

Person.prototype.name = 'Kim';

// getName 메서드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); // Kim
```
<p align="center"><img src="./img/3.png"></p>

### 22.2.3 생성자 함수 호출
생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다.

``` javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

new 연산자 없이는 생성자 함수로 동작하지 않는다. 즉, 일반적인 함수의 호출이다.

``` javascript
const circle3 = Circle(15);

console.log(circle3); // undifined

console.log(radius); // 15
```

### 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출
<p align="center"><img src="./img/4.png"></p>
apply, call, bind 메서드는 Function.prototype의 메서드다. 즉, 이들 메서드는 모든 함수가 상속받아 사용할 수 있다.<br><br>

Function.prototype.apply, Function.prototype.call 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

``` javascript
function getThisBinding() {
  return this;
}

const thisArg = { a: 1 };

console.log(getThisBinding()); // window

console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```
**apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다**.<br>

``` javascript
function getThisBinding() {
  console.log(arguments);
  return this;
}

const thisArg = { a: 1 };

console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
console.log(getThisBinding.call(thisArg, 1, 2, 3));
```
apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.<br>
call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.<br><br>

apply와 call 메서드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다.<br>
arguments 객체는 배열이 아니기 때문에 Array.prototype.slice 같은 배열의 메서드를 사용할 수 없으나 apply와 call 메서드를 이용하면 가능하다.

``` javascript
function convertArgsToArray() {
  console.log(arguments);

  const arr = Array.prototype.slice.call(arguments);

  console.log(arr);

  return arr;
}

convertArgsToArray(1, 2, 3); // [1, 2, 3]
```

Function.prototype.bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않는다.<br>
다만 첫 번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

``` javascript
function getThisBinding() {
  return this;
}

const thisArg = { a: 1 };

console.log(getThisBinding.bind(thisArg));
console.log(getThisBinding.bind(thisArg)());
```
bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

``` javascript
const person = {
  name: 'Lee',
  foo(callback) {
    setTimeout(callback, 100);
  }
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`);
});
```

``` javascript
const person = {
  name: 'Lee',
  foo(callback) {
    setTimeout(callback.bind(this), 100);
  }
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`);
});
```









