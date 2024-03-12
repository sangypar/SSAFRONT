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
5 === '5; // false;

```
