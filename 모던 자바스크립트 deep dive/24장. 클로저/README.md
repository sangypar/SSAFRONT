
클로저는 자바스크립트 고유의 개념이 아니며 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에서 사용하는 중요한 특성이다.

```javascript

const x = 1;

function outerFunc() {
  const x = 10;
  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

outerFunc();

```

innerFunc 함수가 outerFunc 함수의 내부에서 정의된 중첩 함수가 아니라면 innerFunc 함수를 outerFunc 함수의 내부에서 호출한다 하더라도 outerFunc 함수의 변수에 접근할 수 없다.

```javascript

const x = 1;

function outerFunc() {
  const x = 10;
  innerFunc();
}

function innerFunc() {
  console.log(x); // 1
}

```

이 같은 현상이 발생하는 이유는 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문이다.

## 24.1 렉시컬 스코프

자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정하며 이를 렉시컬 스코프(정적 스코프)라 한다.

## 24.2 함수 객체의 내부 슬롯 [[Environment]]

함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.

따라서 함수 객체의 내부 슬롯에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프이고 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장될 참조값이다.
함수 객체는 내부 슬롯에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.

```javascript

const x = 1;

function foo() {
  const x = 10;

  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?

```

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/8a9dc69d-5cde-4e7b-8584-92ece7be7666)

위 그림에서 ②와 ③에서 외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯에 저장된 렉시컬 환경의 참조가 할당된다.

## 24.3 클로저와 렉시컬 환경

```javascript

const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () { console.log(x); }; // ②
  return inner;
}

const innerFunc = outer(); // ③

innerFunc(); // ④ 

```

1. outer 함수를 호출(③)하면 outer 함수는 중첩 함수 inner를 반환하고 생명 주기를 마감한다. 즉. 실행 컨텍스트에서 제거된다.
2. 따라서 outer 함수의 지역 변수 x는 더는 유효하지 않게 되어 x 변수에 접근할 수 있는 방법은 달리 없어 보인다.
3. 하지만 코드의 실행 결과(④)는 outer 함수의 지역 변수 x의 값인 10이다.
4. <b>외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조</b>할 수 있다.
5. 이러한 중첩 함수를 <b>클로저</b>라 부른다.

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/d595112a-fab3-4cf9-aaa5-38fa5eece59a)

- outer 함수의 실행 컨텍스트는 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다.
- ouetr 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있다.
- inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않는다.

```javascript

function foo() {
  const x = 1;
  const y = 2;

  function bar() {
    const z = 3;
    console.log(z);
  }

  return bar;
}

const bar = foo();
bar();

```

이는 상위 스코프의 식별자를 참조하지 않기 때문에 클로저라 하지 않는다.

```javascript

function foo() {
  const x = 1;

  function bar() {
    console.log(x);
  }

  bar();
}

foo();

```

bar 함수는 클로저였지만 곧바로 소멸한다.

```javascript

function foo() {
  const x = 1;
  const y = 2;

  function bar() {
    console.log(x);
  }

  return bar;
}

const bar = foo();
bar();

```

함수 bar는 상위 스코프를 참조하고 있으므로 클로저다. <br>
그리고 외부 함수의 외부로 반환되어 외부 함수보다 더 오래 살아남는다. <br>

<b>클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다.</b>

> 클로저에 의해 참조되는 상위 스코프의 변수를 자유 변수(free variable)라고 부르며 클로저란 "자유 변수에 대해 닫혀있다."는 의미이다.

## 24.4 클로저의 활용

클로저는 상태(state)를 안전하게 변경하고 유지하기 위해 사용한다. <br>
상태가 의도치 않게 변경되지 않도록 <b>상태를 안전하게 은닉(information hiding)하고 특정 함수에게만 상태 변경을 허용</b>하기 위해 사용한다.

```javascript

let num = 0;

const increase = function() {
  return ++num;
}

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3

```

카운트 상태는 전역 변수를 통해 관리되고 있기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있다.(암묵적 결합)

```javascript

const increase = function() {
  let num = 0;
  return ++num;
}

console.log(increase()); // 1
console.log(increase()); // 1
console.log(increase()); // 1

```

카운트 상태를 안전하게 변경하고 유지하기 위해 지역 변수로 변경하였지만 함수가 호출될 때마다 지역 변수 num은 다시 선언되고 0으로 초기화된다.

```javascript

const increase = (function() {
  let num = 0;
  return function() {
    return ++num;
  };
}());

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3

```

즉시 실행 함수는 호출된 이후 소멸되지만 즉시 실행 함수가 반환한 클로저는 increase 변수에 할당되어 호출된다. <br>
이 때 즉시 실행 함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하고 있다. <br>
따라서 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있다.

```javascript

const counter = (function() {

  let num = 0;

  return {
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    }
  };
}());

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0

```

즉시 실행 함수가 반환하는 객체 리터럴은 즉시 실행 함수의 실행 단계에서 평가되어 객체가 되고 이때 객체의 메소드도 함수 객체로 생성된다.
다음과 같이 프로토타입을 활용하여 구현도 가능하다.

```javascript

const Counter = (function () {
  
  let num = 0;

  function Counter() {
  }

  Counter.prototype.increase = function() {
    return ++num;
  }

  Counter.prototype.decrease = function() {
    return num > 0 ? --num : 0;
  }

  return Counter;
} ())

const Counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0

```

```javascript

function makeCounter(aux) {
  let counter = 0;
  return function() {
    counter = aux(counter);
    return counter;
  }
}

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2

```

makeCounter 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수다.
이 때 주의해야 할 것은 makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 것이다.
따라서 위의 예시에서 increaser와 decreaser 함수는 별개의 렉시컬 환경을 갖기 때문에 카운터 상태가 연동되지 않는다.

```javascript

const counter = (function(){

  let counter = 0;

  return function (aux) {
    counter = aux(counter);
    return counter;
  };

}());

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0

```

독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다.
이를 위해서는 <b>makeCounter 함수를 두 번 호출하지 말아야 한다.</b>

## 24.5 캡슐화와 정보 은닉

캡슐화(encapsulation)는 객체의 상태(state)를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작(behavior)인 메서드를 하나로 묶는 것을 말한다.
캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉(information hiding)이라 한다. <br>

정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 
객체 간의 상호 의존성, 즉 결합도(coupling)를 낮추는 효과가 있다.

```javascript
const Person = (function(){
  let _age = 0;

  function Person(name, age) {
    this.name = name;
    _age = age;
  }

  Person.prototype.sayHi = function() {
    console.log(`Hi My name is ${this.name}. I am ${_age}.`);
  };

  return Person;
}());

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My Name is Lee, I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My Name is Kim, I am 30.
console.log(me.name); // Kim
console.log(me._age); // undefined

me.sayHi(); // Hi! My Name is Lee, I am 30. // _age 변수 값이 변경된다!
```

Person.prototype.sayHi 메서드는 즉시 실행 함수가 호출될 때 생성되며
Person 생성자 함수의 모든 인스턴스가 상속을 통해 호출할 수 있는 Person.prototype.sayHi 메서드의 상위 스코프는 어떤 인스턴스를 호출하더라도 하나의 동일한 상위 스코프를 사용하게 된다.
이러한 이유로 Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 위와 같이 _age 변수의 상태가 유지되지 않는다.
이처럼 자바스크립트는 정보 은닉을 완전하게 지원하지 않는다.

## 24.6 자주 발생하는 실수

```javascript
var funcs = [];

for( var i = 0; i < 3; i++) {
    funcs[i] = function () { return i; };
}

for( var j = 0; j < funcs.length; j++) {
    console.log(funcs[j]());
}
```

```javascript
var funcs = [];

for( var i = 0; i < 3; i++) {
    funcs[i] = (function (id) {
        return function() {
            return id;
        }
    }(i))
}

for( var j = 0; j < funcs.length; j++) {
    console.log(funcs[j]());
}
```

```javascript
const funcs = [];

for(let i = 0; i < 3; i++) {
    funcs[i] = function () { return i; };
}

for(let j = 0; j < funcs.length; j++) {
    console.log(funcs[j]());
}
```
