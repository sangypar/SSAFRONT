# Symbol, 7번째 데이터 타입

## 심벌이란?

ES6에서 도입된 7번재 데이터 타입으로 **변경 불가능한 원시 타입의 값**이다.
심벌 값은 다른 값과 중복되지 않는 유일무이한 값이라 **이름 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해** 사용한다.

## 심벌 값의 생성

### Symbol 함수

심벌 값은 리터럴 표기법이 아닌 Symbol 함수를 호출하여 생성해야 한다.
이 때 생성된 심벌 값은 외부로 노출되지 않아서 확인할 수 없으며, **다른 값과 절대 중복되지 않는 유일무이한 값이다.**
생성자 함수로 객체를 생성하는 것처럼 보이지만 *new 연산자와 함께 호출하지 않는다.* 변경 불가능한 원시값이기 때문이다.

```javaScript
const mySymbol = Symbol();
console.log(typeof mySymbol); //Symbol
console.log(mySymbol); //Symbol() //값을 확일할 수 없다.

new Symbol(); //TypeError
```

Symbol 함수에는 선택적으로 문자열을 인수로 전달할 수 있다. 이 문자열은 디버깅 용도로만 사용되며, 값 생성에는 어떠한 영향도 주지 않는다.
심벌 값에 대한 설명이 같아도, 진짜 값은 다르게 나온다.(=유일무이한 값이다.)

```javaScript
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2); //false
```

객체처럼 접근하면 symbol 타입도 암묵적으로 래퍼 객체를 생성한다.

```javaScript
const mySymbol = Symbol('mySymbol');

console.log(mySymbol.description); //mySymbol
console.log(mySymbol.toString()); //Symbol(mySymbol)
```

암묵적으로 문자열이나 숫자 타입으로는 변환되지 않으나 boolean 타입으로는 변환된다.
이를 통해 if문에서 존재 확인이 가능하다.

```javaScript
const mySymbol = Symbol();

console.log(mySymbol + ''); //TypeError
console.log(+mySymbol); //TypeError

console.log(!!mySymbol); //true
if(mySymbol) console.log('mySymbol is not empty'); //mySymbol is not empty
```

### Symbol.for / Symbol.keyFor

인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역심벌 레지스트리 global symbol registry에서 해당 키와 일치하는 심벌 값을 검색한다.

> 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환한다.
> 검색 실패하면 새로운 심벌 값을 생성하여 Symbol.for 메서드 인수로 전달된 키로 전역 심벌 레지스트리에 저장한 후 생성된 심벌값을 반환한다.

```javaScript
const s1 = Symbol.for('mySymbol');
const s2 = Symbol.for('mySymbol');

console.log(s1===s2); //true
```

호출될 때마다 Symbol 함수는 유일무이한 심벌값을 생성한다. 이때는 전역 심벌 레지스트리에서 심벌 값을 검색할 수 있는 키를 지정할 수 없으므로 그 공간에 등록되어 관리되지 않는다.
그러나 Symbol.for 메서드를 사용하면 애플리케이션 전역에서 중복되지 않는 유일무이한 심벌 값 단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유할 수 있다.
**Symbol.keyFor 메서드를 사용하면 이 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.**

```javaScript
const s1 = Symbol('mySymbol');
Symbol.keyFor(s1); //mySymbol

const s2 = Symbol('mySymbol');
Symbol.keyFor(s2); //undefined
// 공간에 저장되어 관리되지 않기 때문에, 키를 추출할 때 undefined로 나온다.
```

## 심벌과 상수

값에는 특별한 의미가 없고, 상수 이름 자체에 (키값에) 의미가 있는 경우가 있다.
이때 값(value)는 변경될 수 있으며 다른 변수 값과도 중복될 수 있다.
이러한 경우 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있다.

```javaScript
const Direction = {
//상수값으로 1 2 3 4 로 표현했을 경우, 바뀌거나 중복될 수 있음
  UP : Symbol('up'),
  DOWN : Symbol('down'),
  RIGHT : Symbol('right'),
  LEFT : Symbol('left')
};

const myDirection = Direction.UP;

if(myDirection === Direction.UP) {
  console.log('You are going up');
}
```

**enum**
> 명명된 숫자 상수의 집합으로 열거형이라고 부른다. 자바스크립트는 enum을 지원하지 않지만 C, 자바, 파이선, 타입스크립트에서는 지원한다.
> 객체의 변경을 방지하기 위해 enum을 흉내내어 사용하려면 객체동결 메서드인 Object.freeze 메서드와 심벌값을 사용한다.
```javaScript
const Direction = Object.freeze({
  UP : Symbol('up'),
  DOWN : Symbol('down'),
  RIGHT : Symbol('right'),
  LEFT : Symbol('left')
});

const myDirection = Direction.UP;

if(myDirection === Direction.UP) {
  console.log('You are going up'); //You are going up
}
```

## 심벌과 프로퍼티 키

프로퍼티 키는 빈 문자열 포함, 모든 문자열 / 심벌 값으로 만들 수 있고 동적 생성이 가능하다.
**심벌 값은 유일무이한 값으로 절대 다른 키와 충돌하지 않는다.**

```javaScript
const obj = {
  [Symbol.for('mySymbol')] : 1
});

obj[Symbol.for('mySymbol')]; //1
```

## 심벌과 프로퍼티 은닉

심벌 값을 프로퍼티 키로 사용하면 for...in 문이나 Object.keys, Object.getOwnPropertyNames 메서드로는 찾을 수 없다.
노출할 필요가 없는 프로퍼티는 심벌로 만들어 은닉할 수 있다.
하지만 완전히 숨길 수 있는 것은 아니다. Object.getOwnPropertySymbols 메서드 사용하면 찾을 수 있다.

```javaScript
const obj = {
  [Symbol.for('mySymbol')] : 1
});

console.log(Object.getOwnPropertySymbols(obj)); //[Symbol('mySymbol')]

const symbolKey = Object.getOwnPropertySymbols(obj)[0]; //값도 찾을 수 있다.
console.log(symbolKey); //1
```

## 심벌과 표준 빌트인 객체 확장

표준 빌트인 객체에 사용자 정의 메서드를 직접 추가, 확장하는 것은 권장하지 않는다. 표준 빌트인 객체는 *읽기 전용으로 사용하는 것이 좋다.*
개발자가 직접 추가한 메서드와 미래에 표준사양으로 추가될 메서드 이름이 중복될 수 있기 때문이다.<br>
예를 들어 Array.prototype.find 메서드 도입되기 전에 Array에 사용자 정의 find를 추가했다면 추후 find 메서드 도입시에 이름이 중복되어 사용자 정의 find로 덮어써지게 된다. <br>
<br>
중복될 가능성 없는 심벌값으로 프로퍼티 키를 생성하여 확장하면, 표준 빌트인 객체 키와 충돌하지도 않고, 사양이 올라갈 때 추가될지 모르는 어떤 키와도 충돌할 위험이 없어서 안전하게 확장할 수 있다.

```javaScript
Array.prototype[Symbol.for('sum')] = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

[1,2][Symbol.for('sum')](); //3
```

## Well-known Symbol

자바스크립트에서 제공하는 빌트인 심벌 값은 Symbol 함수의 프로퍼티에 할당되어 있다.
ECMAScript 사양에서는 **Well-known Symbol**이라 부른다.

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/8466945e-b213-44d3-a186-cc9e3db7a28b)

순회 가능한 빌트인 이터러블은 Well-known Symbol인 Symbol.iterator를 키로 갖는 메서드를 가지며 Symbol.iterator 메서드를 호출하면 이터레이터를 반환하도록 규정되어 있다. 즉, 이터레이션 프로토콜을 준수한다.

```javaScript
const iterable = {
  //Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;
    //next 메서드를 소유한 이터레이터를 반환
    return {
      next() {
        return { value : cur++, done : cur > max + 1};
      }
    };
  }
};

for(const num of iterable) {
  console.log(num); // 1 2 3 4 5
}
```

이터레이션 프로토콜을 준수하기 위해 일반 객체에 추가해야하는 메서드 키 Symbol.iterator는 기존 프로퍼티 키, 미래 추가될 프로퍼티 키와 중복되지 않을 것이다.

***심벌은 중복되지 않는 상수값 생성은 물론, 기존 작성된 코드에 영향주지 않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해 도입되었다.***
