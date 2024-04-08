# 26. ES6 함수의 추가 기능
## 26-1. 함수의 구분
ES6 이전의 함수는 사용 목적에 따라 명확히 구분되지 않았다. 그래서 동일한 함수라도 다양한 형태로 호출할 수 있다. 즉, **ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다.** ES6 이전의 모든 함수는 callable(호출할 수 있는 함수 객체)이면서 constructor(인스턴스를 생성할 수 있는 함수 객체)이다.

주의할 것은 메서드라고 부르는 객체에 바인딩된 함수도 일반 함수로 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수도 있다는 것이다. 이럴 경우 성능 면에서 문제가 있으며, 불필요한 프로토타입 객체를 생성하여 실수를 유발할 가능성이 있다.

이러한 문제를 해결하기 위해 ES6에서는 함수를 사용 목적에 따라 3가지 종류로 명확히 구분했다.

|ES6 함수의 구분|constructor|prototype|super|arguments|
|:---:|:---:|:---:|:---:|:---:|
|일반함수 (Normal)|O|O|X|O|
|메서드 (Method)|X|X|O|O|
|화살표 함수 (Arrow)|X|X|X|X|

일반 함수는 함수 선언문이나 함수 표현식으로 정의한 함수를 말하며, ES6 이전의 함수와 차이가 없다. 하지만 메서드와 화살표 함수는 명확한 차이가 있다. 일반 함수는 construcotr이지만 메서드와 화살표 함수는 non-construcotr(인스턴스를 생성할 수 없는 함수 객체)이다.

## 26-2. 메서드
```javascript
const obj = {
    x : 1,
    // foo는 메서드다.
    foo() { return this.x; },
    // bar에 바인딩된 함수는 메서드가 아닌 일반 함수다.
    bar: function() { return this.x; }
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```
**ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.**

```javascript
// 1번
new obj.foo(); // TypeError
new obj.bar(); // bar {}

// 2번
obj.foo.hasOwnProperty('prototype'); // false
obj.bar.hasOwnProperty('prototype'); // true

// 3번
const base = {
    name: 'Lee',
    sayHi() {
        return `Hi! ${this.name}`;
    }
};

const derived = {
    __proto__: base,

    // sayHi는 ES6 메서드다. ES6 메서드는 [[HomeObject]]를 갖는다.
    // sayHi의 [[HomeObject]]는 derived.prototype을 가리키고
    // super는 sayHi의 [[HomeObject]]의 프로토타입인 base.prototype을 가리킨다.
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?

// 4번
const derived = {
    __proto__: base,

    // sayHi는 ES6 메서드가 아니다.
    // 따라서 sayHi는 [[HomeObject]]를 갖지 않으므로 super 키워드를 사용할 수 없다.
    sayHi: function() {
        return `${super.sayHi()}. how are you doing?`; // SyntaxEroor
    }
}
```
1.  ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수 없는 non-construcor이기 때문에 생성자 함수로서 호출할 수 없다.
2.  ES6 메서드는 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.
3.  **자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다.**
4.  ES6 메서드가 아닌 함수는 soqn tmffht [[HomeObject]]를 갖지 않기 때문에 super 키워드를 사용할 수 없다.

<br>

## 26-3. 화살표 함수
화살표 함수(arrow function)는 function 키워드 대신 화살표(=>)를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다. 화살표 함수는 표현뿐 아니라 내부 동작도 기존의 함수보다 간략하다. 특히 화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

### 1️⃣ 화살표 함수 정의
#### 함수 정의
```javascript
const multiply = (x, y) => x * y;
multiply(2, 3); // 8
```
화살표 함수는 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야 한다.

#### 매개변수 선언
```javascript
const arrow = (x, y) => { ... };
```
매개변수가 여러 개인 경우 소괄호 () 안에 매개변수를 선언한다.

```javascript
const arrow = x => { ... };
```
매개변수가 한 개인 경우 소괄호 ()를 생략할 수 있다.

```javascript
const arrow = () => { ... };
```
매개변수가 없는 경우 소괄호 ()를 생략할 수 있다.

#### 함수 몸체 정의
```javascript
const power = x => x ** 2;
power(2); // 4
const power = x => { return x ** 2; }; // 4

const arrow = () => const x = 1; // SyntaxError
const arrow = () => { return const x = 1; };
```
함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싼느 중괄호 {}를 생략할 수 있다. 이때 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다. 반면 함수 몸체 내부의 문이 표현식이 아니라면 반환할 수 없기 때문에 에러가 발생한다. 이 경우에는 중괄호를 생략할 수 없다.

```javascript
const create = (id, content) => ({ id, content });
create(1, 'JavaScript'); // {id: 1, content: "JavaScript"}
const create = (id, content) => { return { id, content }; }; // {id: 1, content: "JavaScript"}

// { id, content }를 함수 몸체 내의 쉼표 연산자문으로 해석한다.
const create = (id, content) => { id, content };
create(1, 'JavaScript'); // undefined

const sum = (a, b) => {
    const result = a + b;
    return result;
};
```
객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호로 감싸 주어야 한다. 객체 리터럴을 소괄호 ()로 감싸지 않으면 객체 리터럴의 중괄호 {}를 함수 몸체를 감사는 중괄호 {}로 잘못 해석한다. 함수 몸체가 여러 개의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 없다. 이때 반환값이 있다면 명시적으로 반환해야 한다.

```javascript
const person = (name => ({
    sayHi() { return `Hi? My name is ${name}.`; }
}))('Lee');

console.log(person.sayHi()); // Hi> My name is Lee.
```
화살표 함수도 즉시 실행 함수로 사용할 수 있다.

```javascript
// ES5
[1, 2, 3].map(function (v) {
    return v * 2;
})

// ES6
[1, 2, 3].map(v => v * 2); // [2, 4, 6]
```
화살표 함수도 일급 객체이므로 고차 함수에 인수로 전달할 수 있다. 이 경우 일반적인 함수 표현식보다 표현이 간결하고 가독성이 좋다. 이처럼 화살표 함수는 콜백 함수로 정의할 때 유용하다.

### 2️⃣ 화살표 함수와 일반 함수의 차이
#### 1. 화살표 함수는 인스턴스를 생성할 수 없는 non-construcotr다.
```javascript
const Foo = () => {};
new Foo(); // TypeError
Foo.hasOwnProperty('prototype'); // false
```
화살표 함수는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

#### 2. 중목된 매개변수 이름을 선언할 수 없다.
```javascript
function normal(a, a) { return a + a; }
console.log(normal(1, 2)); // 4

'use strict';
function normal(a, a) { return a + a; } // SyntaxError

const arrow = (a, a) => a + a; // SyntaxError
```
일반 함수는 중복된 매개변수 이름을 선언해도 에러가 발생하지 않는다. 단 strict mode 혹은 화살표 함수에서 중복된 매개변수 이름을 선언하면 에러가 발생한다.

#### 3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.
화살표 함수 내부에서 this, arguments, super, new.target을 참조하면 스코프 체인을 통해 상위 스코프의 this, arguments, super, new.target을 참조한다. 만약 화살표 함수들이 중첩되어 있다면 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수를 참조한다.

### 3️⃣ this
화살표 함수의 this는 일반 함수의 this와 다르게 동작한다. 이는 콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다. this 바인딩은 함수의 호출방식에 따라 동적으로 결정된다. 이때 주의할 것은 일반함수로서 호출되는 콜백 함수의 경우다. 고차 함수의 인수로 전달되어 함수 내부에서 호출되는 콜백 함수도 중첩 함수라고 할 수 있다.

```javascript
class Prefixer {
    constructor (prefix) {
        this.prefix = prefix;
    }

    add (arr) {
        // 1. prefixer
        return arr.map (function (item) {
            // 2. undefined
            return this.prefix + item; // TypeError
        });
    }
}
```
위 예제를 실행했을 때 기대하는 결과가 있지만, TypeError가 발생한다. 프로토타입 메서드 내부인 1에서 this는 메서드를 호출한 객체를 가리킨다. 그런데 Array.prototype.map의 인수로 전달한 콜백 함수의 내부인 2에서 this는 undefined를 가리킨다. 이는 Array.prototype.map 메서드가 콜백 함수를 일반 함수로서 호출하기 때문이다.

일반 함수로서 호출되는 모든 함수 내부의 this는 전역 객체를 가리킨다. 그런데 클래스 내부의 모든 코드에는 strict mode가 암묵적으로 적용된다. 따라서 Array.prototype.map 메서드의 콜백 함수에도 strict mode가 적용되고, strict mode에서 일반 함수로 호출된 모든 함수 내부의 this에는 전역 객체가 아니라 undefined가 바인딩된다.

이때 발생하는 문제를 '콜백 함수 내부의 this 문제'다. 즉, 콜백 함수의 this(2)와 외부 함수의 this(1)가 서로 다른 값을 가리키고 있기 때문에 TypeError가 발생한 것이다.

이를 해결하기 위해 ES6 이전에는 다음과 같은 방법을 사용했다.

1. add 메서드를 호출한 prefixer 객체를 가리키는 this를 일단 회피시킨 후에 콜백 함수 내부에서 사용한다.
2. Array.prototype.map의 두 번째 인수로 add 메서들르 호출한 prefixer 객체를 가리키는 this를 전달한다.
3. Function.prototype.bind 메서드를 사용하여 add 메서드를 호출한 prefix 객체를 가리키는 this를 바인딩한다.

ES6에서는 화살표 함수를 사용하여 '콜백 함수 내부의 this 문제'를 해결할 수 있다.

```javascript
class Prefixer {
    constructor (prefixer) {
        this.prefix = prefix;
    }

    add (arr) {
        return arr.map(item => this.prefix + item);
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ['-webkit-transition', '-webkit-user-select']
```
**화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 lexical this라 한다.** 이는 화살표 함수의 this가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.

화살표 함수는 함수 자체의 this 바인딩이 존재하지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 일반적인 식별자처럼 스코프 체인을 통해 상위 스코프에서 this를 탐색한다.

```javascript
// 화살표 함수는 상위 스코프의 this를 참조한다.
() => this.x;

// 익명 함수에 상위 스코프의 this를 주입한다. 위 화살표 함수와 동일하게 동작한다.
(function () { return this.x; }).bind(this);
```
만약 화살표 함수와 화살표 함수가 중첩되어 있따면 상위 화살표 함수에도 this 바인딩이 없으므로 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.

```javascript
// 중첩 함수 foo의 상위 스코프는 즉시 실행 함수다.
// 따라서 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킨다.
(function () {
    const foo = () => console.log(this);
    foo();
}).call({ a: 1 }); // { a: 1 }

// bar 함수는 화살표 함수를 반환한다.
// bar 함수가 반환한 화살표 함수의 상위 스코프는 화살표 함수 bar다.
// 하지만 화살표 함수는 함수 자체의 this 바인딩을 갖지 않으므로 즉시 실행 함수의 this를 가리킨다.
(function () {
    const bar = () => () => console.log(this);
    bar()();
}).call({ a: 1 }); // { a: 1 }
```
만약 화살표 함수가 전역 함수라면 화살표 함수의 this는 전역 객체를 가리킨다. 전역 함수의 상위 스코프는 전역이고 전역에서 this는 전역 객체를 가리키기 때문이다.

```javascript
// 전역 함수 foo의 상위 스코프는 전역이므로 화살표 함수 foo의 this는 전역 객체를 가리킨다.
const foo = () => console.log(this);
foo; // window
```
프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.

```javascript
// increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역이다.
// 따라서 increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다.
const counter = {
    num: 1,
    increase: () => ++this.num
};

console.log(counter.increase()); // NaN
```
화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 Function.prototype.call, Function.prototype.apply, Function.prototype.bind 메서드를 사용해도 화살표 함수 내부의 this를 교체할 수 없다.
화살표 함수가 Function.prototype.call, Function.prototype.apply, Function.prototype.bind 메서드를 호출할 수 없다는 의미는 아니다. 화살표 함수 자체의 this 바인딩을 갖지 않기 때문에 this를 교체할 수 없고 언제나 상위 스코프의 this 바인딩을 참조한다.

```javascript
window.x = 1;
const normal = function () { return this.x; };
const arrow = () => this.x;
console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 })); // 1

const add = (a, b) => a + b;
console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
console.log(add.bind(null, 1, 2)()); // 3
```
일반적인 의미의 메서드르 화살표 함수로 정의하는 것, 프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 것은 피해야 한다. 왜냐하면 화살표 함수 내부의 this는 객체가 아닌 상위 스코프의 전역의 this가 가리키는 전역 객체를 가리키기 때문이다.
따라서 메서드를 정의할 때는 ES6 메서드를 사용하는 것이 좋다. 프로퍼티를 동적 추가할 때는 ES6 메서드 정의를 사용할 수 없으므로 일반함수를 할당한다

```javascript
// 메서드
const person = {
    name: 'Lee',
    sayHi() {
        console.log(`Hi ${this.name}`);
    }
};
person.sayHi(); // Hi Lee

// 프로퍼티
function Person(name) {
    this.name = name;
}
Person.prototype.sayHi = function() { console.log(`Hi ${this.name}`); };
const person = new Person('Lee');
person.sayHi(); // Hi Lee

// 프로퍼티에 메서드 동적 추가
function Person(name) {
    this.name = name;
}
Person.prototype = {
    constructor: Person,
    sayHi() { console.log(`Hi ${this.name}`); }
};
const person = new Person('Lee');
person.sayHi(); // Hi Lee
```
클래스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수를 할당할 수도 있다. 하지만 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아니라 인스턴스 메서드가 된다. 따라서 메서드를 정의할 때는 ES6 메서드를 사용하는 것이 좋다.

### 4️⃣ super
```javascript
class Base {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi! ${this.name}`;
    }
}

class Derived extends Base {
    sayHi = () = > `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```
화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지고 상위 스코프의 super를 참조한다.

### 5️⃣ arguments
```javascript
(function () {
    // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킨다.
    const foo = () => console.log(arguments);
    foo(3, 4);
}(1, 2));

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
// 하지만 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError
```
화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다. 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.

## 26-4. Rest 파라미터
### 1️⃣ 기본 문법
Rest 파라미터(나머지 매개변수)는 매개변수 이름 앞에 세개의 점 ...을 붙여서 정의한 매개변수를 의미한다. **Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.**

```javascript
// 1번
function foo(param1, param2, ...rest) {
    console.log(param1); // 1
    console.log(param2); // 2
    console.log(rest;) // [3, 4, 5]
}
foo(1, 2, 3, 4, 5);

// 2번
function foo(...rest, param1, param2) { }
foo(1, 2, 3, 4, 5); // SyntaxError

// 3번
function foo(...rest1, ...rest2) { }
foo(1, 2, 3, 4, 5); // SyntaxError

// 4번
function foo(...rest) {}
console.log(foo.length); // 0
function bar(x, ...rest) {}
console.log(bar.length); // 1
```
1. 일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다. 이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.
2. Rest 파라미터는 이름 그대로 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당된다. 따라서 Rest 파라미터는 반드시 마지막 파라미터이어야 한다.
3. Rest 파라미터는 단 하나만 선언할 수 있다.
4. Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.

### 2️⃣ Rest 파라미터와 arguments 객체
```javascript
function sum (...args) {
    // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
    return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

ES6에서는 Rest 파라미터를 사용하여 가변 인자 함수의 인수 목록을 배열로 직접 전달받을 수 있다. 이를 통해 유사 배열 객체인 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다. 함수와 ES6 메서드는 Rest 파라미터와 arguments 객체를 모두 사용할 수 있으나, 화살표 함수는 함수 자체의 arguments를 객체를 갖지 않으므로 가변 인자 함수를 구현해야 할 떄는 반드시 Rest 파라미터를 사용해야 한다.

## 26-5. 매개변수 기본값
자바스크립트 엔진은 매개변수이 개부와 인수의 개수를 체크파지 않기 때문에, 함수를 호출할 때 매개변수의 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않는다. 다만 이를 방치하면 의도치 않은 결과가 나올 수 있다. 따라서 매개변수가 인수에 전달되었는지 확인하여 인수가 전달되지 않은 경우 매개변수에 기본값을 할당할 필요가 있다.

```javascript
function sum (x, y) {
    x = x || 0;
    y = y || 0;

    return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```

ES6에서 입된 매개변수 기본값을 사용하면 인수 체크 및 초기화를 간소화할 수 있다. 이는 매개변수에 인수를 전달할지 않은 경우와 undefined를 전달한 경우에만 유효하다.

```javascript
function sum(x = 0, y = 0) {
    return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```
앞서 살펴본 Rest 파라미터에는 기본값을 지정할 수 없다.

```javascript
function foo(...rest = []) {
    console.log(rest); // SyntaxError
}
```

매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티와 arguments 객체에 아무런 영향을 주지 않는다.

```javascript
function sum(x, y = 0) {
    console.log(arguments);
}

console.log(sum.length); // 1
sum(1); // Arguments { '0': 1 }
sum(1, 2); // Arguments { '0': 1, '1': 2 }
```