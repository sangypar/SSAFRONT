# 8장 제어문

**제어문이란?**

제어문(Control Flow Statement)은 조건에 따라 코드 블록을 실행(조건문), 혹은 반복 실행(반복문)할 때 사용한다.<br>
제어문을 사용하면 순차적으로 진행하는 코드의 실행 흐름을 인위적으로 제어할 수 있다.


## 8.1 블록문 (= 블록, 코드 블록)

**블록문(Block Statement)** 은 한 쌍의 중괄호로 묶인, 0개 이상의 문이다.<br>
일반적으로 제어문이나 함수를 정의할 때 사용한다.<br>
**블록문의 끝에는 세미콜론(;)을 붙이지 않는다.**

``` javascript
// 단순히 중괄호로 묶인, 의미없는 블록문
{
	let ssafy = 5;
}

// 제어문
let x = 10;
if (x < 20) {
	x++;
}

// 함수 선언문
function sum(a, b) {
	return a + b;
}
```
<br>


## 8.2 조건문

**조건문(Conditional Statement)** 은 주어진 조건식의 평가 결과(boolean 타입)에 따라 코드 블록(블록문)의 실행을 결정한다.<br>
자바스크립트는 **if ... else와 switch** 두 가지의 조건문을 제공한다. <br>

### 8.2.1 if ... else 문

조건식의 평가 결과가 true일 경우 if 문, false일 경우 else 문의 코드 블록(블록문)이 실행된다. <br>

``` javascript
if (조건식) {
	// 조건식이 참이면 이 코드 블록이 실행	
} else {
	// 조건식이 거짓이면 이 코드 블록이 실행
}
```
<br>

**조건문의 조건식은 boolean 값으로 평가되어야 한다.** <br>
만약 조건식이 불리언 값이 아닌 다른 값이라면, 자바스크립트 엔진에 의해 **암묵적으로 boolean 값으로 강제 변환되어 조건식이 평가된다.** <br>


### else if 문

조건식을 추가하여 코드 블록을 늘리고 싶으면 **else if 문** 을 사용한다.

``` javascript
if (조건식1) {
	// 조건식1이 참이면 이 코드 블록이 실행
} else if (조건식2) {
	// 조건식2가 참이면 이 코드 블록이 실행
} else {
	// 조건식1과 조건식2 모두 거짓이면 이 코드 블록이 실행
}
```

else if와 else 문은 옵션이다.<br>
또한 if 문과 else 문이 딱 한 번만 사용 가능하다면, else if 문은 여러 번 사용할 수 있다.<br>

if ... else 문은 **삼항 조건 연산자**로 바꿔쓸 수 있다.

``` javascript
let x = 2; 

// 0은 false로 암묵적 강제 변환된다
// 따라서 x % 2가 0이 되는 x는 조건식이 false가 되니까
// result 변수에 '짝수'를 할당한다
var result = x % 2 ? '홀수' : '짝수';

console.log(result); // 짝수
```

하나의 조건식만 삼항 조건 연산자로 표현할 수 있는 것은 아니다.

``` javascript
let x = 2;

// 0은 false로 암묵적 강제 변환된다
// x는 0이 아니기 때문에 소괄호 안의 삼항 조건 연산자를 다시 진행한다
// x > 0이 true이기 때문에 result 변수에 '양수'를 할당한다
var result = x ? (x > 0 ? '양수' : '음수') : '영';

console.log(result); // 양수
```

### 8.2.2 switch 문

**switch 문**은 주어진 표현식을 평가하여, 그 값과 일치하는 표현식을 갖는 case 문을 실행한다.<br>
case 문은 콜론으로 마치며, 그 뒤에 실행할 문들이 위치한다.<br>
switch 문의 표현식과 일치하는 case 문이 없다면 default 문으로 이동하며, default 문은 옵션으로, 사용하지 않아도 된다.<br>

``` javascript
switch (표현식) {
	case 표현식1:
		// switch 문의 표현식과 표현식1이 일치하면 실행될 문
		break;
	case 표현식2:
		// switch 문의 표현식과 표현식2가 일치하면 실행될 문
		break;
	default:
		// switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문
}
```

if ... else 문의 조건식은 boolean 타입으로 평가되어야 하지만, switch 문의 표현식은 문자열이나 숫자 값인 경우가 많다.
**다시 말해 switch 문은 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용한다.**

### 폴스루 (fall-through)

switch 문에서 fall-through란, 하나의 case 절에서 break 문을 사용하지 않고 다음 case 절로 코드 실행 흐름이 이어지는 것을 의미한다.

``` javascript
let num = '3';

switch (num) {
	case '1': 
		console.log('숫자 1입니다'); 
		break;
	case '2': 
		console.log('숫자 2입니다'); 
		break;
	case '3': case '4': 
		console.log('숫자 3 또는 4입니다'); 
		break;
	default: 
		console.log('숫자가 아닙니다'); }
```


일반적으로 case 절에서 실행될 코드 블록이 끝나면 break 문을 사용하여 switch 문을 빠져나와야 하지만, break 문을 생략하면 다음 case 절로 코드 실행 흐름이 이어진다. <br>

위와 같이 **폴스루를 활용해 여러 개의 case 문을 하나의 조건으로 사용할 수도 있다.** <br>

가급적이면 if ... else 문으로 조건문을 해결하는 것이 좋다. <br>
하지만 조건이 너무 많아서 if ... else 문보다 switch 문을 사용했을 때 가독성이 좋다면, switch 문을 사용하는 편이 좋다.


## 8.3 반복문

**반복문(Loop Statement)** 은 조건식의 평가 결과가 참(true)인 경우 코드 블록을 실행한다. <br>
그 후 조건식을 다시 평가하여, 조건식이 거짓일 때까지 코드 블록을 반복 실행한다. <br>
**자바스크립트는 for, while, do ... while의 세 가지 반복문을 제공한다.** <br>

### 8.3.1 for 문

``` javascript
for (변수 선언문 또는 할당문; 조건식; 증감식) {
	 // 조건식이 참인 경우 반복 실행될 블록문
}
```

for 문의 변수 선언문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다. <br>
단, 어떤 식도 선언하지 않으면 무한루프가 된다. <br>

``` javascript
// 무한루프

for (; ; ) {	
}
```

### 8.3.2 while 문

for 문에 비해 while 문은 **반복 횟수가 불명확할 때** 주로 사용한다. <br>

``` javascript
let count = 0;

// count가 3보다 작을 때까지 코드 블록을 반복 실행한다
while (count < 3) {
	console.log(count); // 0 1 2
	count++;
}
```

조건식의 평가가 항상 참이면 무한루프가 된다. <br>
무한루프에서 탈출하기 위해서는 코드 블록 내에 탈출 조건을 만들고, break 문으로 코드 블록을 탈출한다. <br>

``` javascript
// 무한루프

while (true) {
}
```

``` javascript
// 탈출하기

let count = 0;

while (true) {
	console.log(count++); // 0 1 2
	if(count === 3) break;
}
```

### 8.3.3 do ... while 문

do ... while 문은 코드 블록을 먼저 실행하고 조건식을 평가한다. <br>
**따라서 무조건 한 번 이상 코드 블록을 실행한다.** <br>

``` javascript
let count = 0;

do {
	console.log(count++); // 0
} while (count < 0);
```


## 8.4 break 문

**break 문은 레이블 문, 반복문, switch 문의 코드 블록을 탈출한다.** <br>
이외의 코드 블록에 break 문을 사용하면 SyntexError(문법에러)가 발생한다. <br>

### 레이블 문(Label Statement)

식별자가 붙은 문, 실행 순서를 제어하는 데 사용한다. <br>

``` javascript
// outer라는 식별자가 붙은 레이블 for 문
outer: for(var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {

  // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    if (i + j === 3) break outer;
    console.log(`inner [${i}, ${j}]`);
  }
}
console.log('Done!');
```

## 8.5 continue 문

**countinue 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고, 반복문의 증감식으로 실행 흐름을 이동시킨다.** <br>
break 문처럼 반복문을 탈출하지는 않는다. <br>

``` javascript
var string = 'hello world';
var search = 'l';
var count = 0;

//countinue 문을 사용하지 않으면 if 문 내에 코드를 작성해야 한다
for (var i = 0; i < string.length; i++) {
  // 'l'이면 카운트를 증가시킨다

  if (string[i] === search) {
    count++;
  }
}
```

``` javascript
var string = 'hello world';
var search = 'l';
var count = 0;

//countinue 문을 사용하면 if 문 밖에 코드를 작성할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이면 카운트를 증가시킨다

  if (string[i] !== search) {
    continue;
  }
  count++;
}
