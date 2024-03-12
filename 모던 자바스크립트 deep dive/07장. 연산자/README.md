# 7장 연산자
연산자 : 하나 이상의 표현식을 대상으로 _산술, 할당, 비교, 논리,타입, 지수 연산_ 등을 수행하는 기호

피연산자 : 연산의 대상

<br>

## 7.1 산술 연산자
산술 연산자 : 피연산자를 대상으로 수학적 계산 수행, 연산이 불가능한 경우 NaN을 반환한다.

#### 7.1.1 이항 산술 연산자
이항 산술 연산자 : 2개의 피연산자를 산술 연산
```javascript
5 + 2; // 7
5 - 2; // 3
5 * 2; // 10
5 / 2; // 2.5
5 % 2; // 1
// 모든 이항 산술 연산자는 부수 효과가 없다.
// *부수효과란? 산술 연산 후에도 피연산자의 값이 바뀌는 효과
```

#### 7.1.2 단항 산술 연산자
단항 산술 연산자 : 1개의 피연산자를 산술 연산

```javascript
+10; // 10 (아무런 효과가 없다.)
+(-10) // -10

// 증감 연산자에는 전위 증감연산자와 후위 증감연산자가 있다.
var x = 5, result;

// 선할당 후증가
result = x++;
console.log(result, x); // 5 6

// 선증가 후할당
result = ++x;
console.log(result, x); // 7 7

// 선할당 후감소
result = x--;
console.log(result, x); // 7 6

// 선감소 후할당
result = --x;
console.log(result, x); // 5 5
```
피연산자가 숫자 타입이 아니라면 숫자 타입으로 변환하여 반환한다. 하지만 부수효과가 없어 피연산자의 값이 바뀌지는 않는다.
```javascript
var x = '1';

// 문자열 -> 숫자 타입 변환
console.log(+x); // 1
console.log(x); // "1"

// 불리언 값 -> 숫자 타입 변환
x = true;
console.log(+x); // 1
console.log(x); // true

// 불리언 값  -> 숫자 타입 변환
x = false;
console.log(+x); // 0
console.log(x); // false

// 문자열 -> 숫자 타입 변환
x = 'Hello';
console.log(+x); // NaN
console.log(x); // "Hello"
```
#### 7.1.3 문자열 연결 연산자
+ 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열을 연결 합니다.
```javascript
// 문자열 연결 연산자
1 + '2'; // '12'

// true는 1로 변환
1 + true; // 2

// null은 0으로 변환
1 + null; // 1

// undefined는 숫자로 변환X
1 + undefined; // NaN
```

<br>

## 7.2 할당 연산자
할당 연산자 : 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당
```javascript
var x;

x = 10;
console.log(x); // 10

x += 5;
console.log(x); // 15

x -= 5;
console.log(x); // 10

x *= 10;
console.log(x); // 50

x /= 10;
console.log(x); // 10

x %= 10;
console.log(x); // 0

//할당문은 값으로 평가되는 표현식인 문으로서 할당된 값이기 때문에 연쇄할당도 가능하다
var a, b, c;
a = b = c = 0;

console.log(a, b, c); // 0 0 0
```

<br>

## 7.3 비교 연산자
비교 연산자 : 좌항과 우항의 피연산자를 비교한 후 불리언 값으로 반환

#### 7.3.1  동등/일치 비교 연산자
```javascript
// 동등 비교 : 값 비교 O , 타입 비교 X
5 == '5'; // true;

// 일치 비교 : 값, 타입 비교 O
5 === '5'; // false;

// 결과 예측 어려운 연산
'0' == ''; // false;
0 == ''; // true;
0 == '0'; // true;
false == 'false'; // false
false == '0'; // true
false == null; // false
false == undefined; // false
NaN === NaN; // false
0 === -0; // true

// Object.js 메서드는 아래 상황 제외하고 ===와 동일하다
Object.js(-0, +0); // false
Object.js(NaN, NaN); // true

// Number.isNaN 함수는 지정한 값이 NaN인지 확인 후 불리언 값으로 반환
Number.isNaN(NaN); // true
Number.isNaN(10); // false
Number.isNaN(1 + undefined); // true
```

#### 7.3.1 대소 관계 비교 연산자
```javascript
5 > 5; // false
5 >= 5; // true
```

<br>

## 7.4 삼항 조건 연산자
삼항 조건 연산자 : 조건식의 평가 결과에 따라 반환할 값을 결정
조건식 ? (true일때 반환할 값) : (false일때 반환할 값)
```javascript
var x = 2;

var result = x % 2 ? '홀수' : '짝수'; // 짝수
```
삼항 조건 연산자는 if...else 문과 비슷하다. 하지만 if...else문은 표현식이 아닌 문이므로 값처럼 사용 불가능하다.
삼항 조건 연산자 표현식은 값으로 평가할 수 있는 표현식인 문이다.

<br>

## 7.5 논리 연산자
논리 연산자는 우항과 좌항의 피연산자를 논리 연산한다.(AND, OR, NOT)
```javascript
// 논리합 연산자
true || true; // true
true || false; // true
false || false; // false

// 논리곱 연산자
true && true; // true
true && false; // false
false && false; // false

// 논리 부정 연산자
!true; // false

// 논리 부정 연산자는 언제나 불리언 값을 반환하지만
// 논리합 논리곱 연산자의 평과 결과는 불리언 값이 아닐 수도 있다.
!0; // true
!'Hello'; // false
'Cat' && 'Dog' // 'Dog'

// 드 모르간의 법칙 : 논리곱(합)의 부정은 각각 부정의 논리합(곱)과 같다는 법칙
!(x || y) === (!x && !y)
!(x && y) === (!x || !y)
```

<br>

## 7.6 쉼표 연산자
쉼표 연산자 : 쉼표 연산자는 왼쪽 피연산자 부터 평가하고 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평과 결과를 반환한다.
```javascript
var x;

x = (2, 3);
console.log(x); // 3
```

<br>

## 7.7 그룹 연산자
그룹 연산자 : 소괄호()로 피연산자를 감싸는 그룹 연산자는 자신의 피연산자인 표현식을 가장 먼저 평가한다.
<p align="center"><img src="./img/두뇌풀가동.gif" width="300px"></p> 
<br>

```javascript
2 + 2 * 2; // 6
(2 + 2) * 2; // 8
```

<br>

## 7.8 typeof 연산자
typeof 연산자 : 피연산자의 데이터 타입을 문자열로 변환한다.
```javascript
typeof ''  // string
typeof 1 // number
typeof NaN // number
typeof true // boolean
typeof undefined // undefined
typeof Symbol() // symbol
typeof null // object *null이 아닌것은 버그이다
typeof [] // object 
typeof {} // object 
typeof new Data() // object 
typeof /test/gi // object 
typeof function () {} // function

//선언하지 않은 식별자를 typeof연산자로 연산하면 undefined을 반환한다.
```

<br>

## 7.9 지수 연산자
지수 연산자 : 좌항의 피연산자를 밑으로, 우항의 피연산자를 지수로 거듭제곱하여 반환한다.
```javascript
2 ** 2; // 4
2 ** 2.5; // 5.656854
2 ** 0; // 1
2 ** -2; // 0.25
(-2) ** 2 // 4 (음수를 거듭제곱의 밑으로 사용하려면 괄호로 묶어야 한다)

// 지수 연산자 대신 math.pow 사용도 가능하다

// 지수 연산자는 이항 연산자 중에서 우선순위가 가장 높다.
2 * 5 ** 2; // 50
```

<br>

## 7.10 연산자의 부수 효과
부수 효과가 있는 연산자는 할당 연산자(=), 증감 연산자(++/--),delete 연산자이다.
```javascript
var o = {a : 1};

delete o.a; // delete 연산자는 객체의 프로퍼티를 삭제함
console.log(o); // {}
```

<br>

## 7.11 연산자의 우선순위
연산자 우선순위 : 여러 개의 연산자로 이뤄진 문일 경우 연산자가 실행 되는 순서

<br>
<img src="./img/연산자우선순위1.png">
<img src="./img/연산자우선순위2.png">

<br>

## 7.12 연산자의 결합 순서
연산자 결합 순서 : 연산자의 좌항 or 우항 중 어디서부터 평가를 수행할 것인지를 나타내는 순서

<br>
<img src="./img/연산자결합순서.png">
