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

