## 9.1 타입 변환이란?

자바스크립트의 모든 값은 타입이 있으며 이를 의도적으로 변환하는 것을 <b>명시적 타입 변환(explicit coercion)</b> 또는 <b>타입 캐스팅(type casting)</b>이라 하고
의도와 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동으로 변환되는 것을 <b>암묵적 타입 변환(implicit coercion)</b>또는 <b>타입 강제 변환(type coercion)</b>이라 한다.

```javascript
var x = 10; // ??
var str1 = x.toString(); // 명시적 타입 변환
var str2 = x + ''; //  암묵적 타입 변환
cosole.log(typeof x); // ??
```

<br>

두 타입 변환 모두 기존 원시 값(위 예시에서의 x)을 직접 변경하는 것은 아니고 그 값을 사용해 <b>다른 타입의 새로운 원시 값을 생성</b>하는 것이다.

암묵적 타입 변환은 개발자가 의도한 것이 아니기에 예측하지 못한 오류를 낼 수 있다. 그러면 항상 명시적 타입 변환으로만 구성해야 하냐는 질문에는
어느 정도 자바스크립트 문법을 잘 이해하고 있는 레벨이라면 코드를 간결하게 표현할 수 있는 이점이 있기에 가독성 측면에서 이점이 있을 수 있다.

## 9.2 암묵적 타입 변환

자바스크립트는 코드의 문맥을 고려해 데이터 타입을 평가한다.

```javascript

'10' + 10 // 문자열과 + 연산자가 있으면 이는 문자열 연결 연산자로 판단 - 1010
5 * '10' // *와 더불어 -, / 는 무조건 산술 연산자이므로  피연산가 모두 숫자로 판단 - 50
!0 // 논리 연산자와 함께 하면 피연산자 또는 표현식은 불리언으로 판단 - ??
if(1) {console.log(true)} // ??
```

### 9.2.1 문자열 타입으로 변환

피연산자 중 하나 이상이 문자열이면 +는 문자열 연결 연산자로 동작하며
자바스크립트 엔진은 문자열 연결 연산자 표현식을 평가하기 위해 피연산자 중에서 문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환한다.

```javascript
1 + '' // "1"
NaN + '' // "NaN"
Infinitiy + '' // ??
true + '' // ??
({}) + '' // 빈 객체가 문자열로 변환됨 - "[object object]"
[] + '' // ""
[10, 20] + '' // "10, 20"
(function(){}) + '' // "function(){}"

Math + '' // 내장 객체 - "[object Math]"
Array + '' // 내장 함수 - "funtion Array() {[native code]}" - Date, Object, String, parseInt, ...

```

### 9.2.2 숫자 타입으로 변환

-, *, /는 산술 연산자이며 그 역할은 숫자 값을 만드는 것이기에 피연산자는 코드 문맥상 숫자 타입이여야 하며 >와 같은 비교 연산자 역시 피연산자는 숫자 타입이어야 한다.
또, 단항 연산자(+)를 활용하여 숫자 타입으로 암묵적으로 변환할 수 있다.

```javascript
1 - '1' // 0
1 * '10' // 10
1 / 'one' // NaN
'1 > 0 // true
+'' // 0
+'0' // 0
+'string' // ??
+true // ??
+false // ??
+null // ??
```
### 9.2.3 불리언 타입으로 변환

if문이나 for문과 같은 제어문 또는 상항 조건 연산자의 조건식은 논리적 참/거짓으로 평가되어야 하느 표현식이다.

```javascript
if('') console.log('1');
if(0) console.log('2');
if('str') console.log('3');
if(null) console.log('4');
if(NaN) console.log('5');
if(undefined) console.log('6');
```

자바스크립트 엔진은 불리언 타입이 아닌 값을 <b>Truthy 값(참으로 평가되는 값)</b> 또는 <b>Falsy 값(거짓으로 평가되는 값)</b>으로 구분하며
다음 7가지가 모두 Falsy 값이다
> false, undefined, null, 0, -0, NaN, ''

<br>

## 9.3 명시적 타입 변환

### 9.3.1 문자열 타입으로 변환

```javascript
// 1. String 생성자 함수를 new 연산자 없이 호출
String(1) // "1"
String(NaN) // "NaN"
String(true) // "true"
// 2. Object.prototype.toString 메서드 사용
(1).toString() // "1"
(NaN).toString() // "NaN"
(true).toString() // "true"
// 3. 문자열 연결 연산자 이용
1 + '' // "1"
NaN + '' // "NaN"
true + '' // "true"
```

### 9.3.2 숫자 타입으로 변환

```javascript
// 1. Number 생성자 함수를 new 연산자 없이 호출
Number('0') // 0
Number('10.53') // 10.53
Number(true) // 1
// 2. parseInt, parseFloat 함수 사용(문자열만 가능)
parseInt('0') // 0
parseFloat('10.53') // 10.53
// 3. + 단항 산술 연산자 이용
+'0' // 0
+true // 1
// 4. * 산술 연산자 이용
'0' * 1 // 0
true * 1 // 1
```

### 9.3.3 불리언 타입으로 변환

```javascript
// 1. Boolean 생성자 함수를 new 연산자 없이 호출
Boolean('x') // true
Boolean('false') // ?
Boolean(0) // false
Boolean(1) // true
// 2. ! 부정 논리 연산자를 두 번 사용하는 방법
!!'x' // true
!!0 // false
!!null //false
```

<br>

## 9.4 단축 평가

### 9.4.1 논리 연산자를 사용한 단축 평가

```javascipt
'Cat' && 'Dog'
'Cat' || 'Dog'
```

논리곱(&&) 연산자와 논리합(||) 연산자는 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환하는데 이를 <b>단축 평가(short-circuit evaluation)</b>라 한다.
단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

```javascipt
true || anything // true
false || anything // anything
true && anything // anything
false && anything // false
```

보통 논리곱 연산자는 다음과 같은 예시를 통해 조건 렌더링에 많이 활용되며 삼항 연산자를 활용할 수 도 있다.
```javascript
import { useState } from "react";

import { CardStructure } from "../card.model";

interface CardProps {
  card: CardStructure;
  color: string
};

const Card: React.FC<CardProps> = (props) => {

  const [onImage, setOnImage] = useState(false);

  return (
    <>
      <div
        className="flex justify-center w-60 m-2 border rounded-2xl z-10"
        key={props.card.id}
        onClick={() => setOnImage(!onImage)}
      >
        {props.card.name}
      </div>
      {onImage && (
        <div
          className="fixed z-50 w-full h-full top-0 left-0"
          onClick={() => setOnImage(!onImage)}
        >
          <img
            className="fixed inset-0 m-auto"
            src={props.card.image}
            alt={props.card.id.toString()}
          />
        </div>
      )}
    </>
  );
};

export default Card;
```

객체의 프로퍼티 참조 타입 에러를 방지하기 위해 사용할 수 도 있다.

```javascript
var elem = null;
var value1 = elem.value; // TypeError: Cannot read properties of null
var value2 = elem && elem.value; // elem이 Falsy 값이면 elem으로 평가되고 Truthy 값이면 elem.value로 평가
```

논리곱 연산자는 보통 기본값 설정을 위해 활용된다.

```javascript
function getStringLength1(str) {
  str = str || '';
  return str.length;
}

function getStringLength2(str) {
  return str.length;
}

function getStringLength3(str= '') {
  return str.length;
}

getStringLength1(); // 0
getStringLength2(); // TypeError: Cannot read properties of undefined
getStringLength3(); // 0
```

### 9.4.2 옵셔널 체이닝 연산자

### 9.4.3 null 병합 연산자

