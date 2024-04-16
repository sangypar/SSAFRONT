# String

## String 생성자 함수

String 객체는 생성자 함수 객체라, new 연산자와 함께 호출하여 인스턴스를 생성할 수 있다. 그렇게 하면 [[StringData]] 내부 슬롯에 빈 문자열을 할당한 String 래퍼 객체를 생성한다.

```javaScript
const strObj = new String();
const strObj2 = new String('Kim');

console.log(strObj); // {length: 0 [[Prototype]]:String [[PrimitiveValue]]: ""}
console.log(strObj2); //{ 0: "K" 1: "i" 2: "m" length: 3 [[Prototype]]: String [[PrimitiveValue]]: "Kim"}
```

String 래퍼 객체는 배열과 마찬가지로 length 프로퍼티와 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티키로, 각 문자를 프로퍼티 값으로 갖는 유사배열 객체이자 이터러블이다.
**단, 이때 문자열은 원시값이므로 변경할 수 없다. 이 때 에러가 발생하지 않는다.**
생성자 함수의 인수로 문자열이 아닌 값을 전달하면 인수를 문자열로 강제 변환한 후 [[StringData]] 내부슬롯에 변환된 문자열을 할당한 String 래퍼객체를 생성한다.

```javaScript
const strObj = new String('Lee');

console.log(strObj[0]); // L // 배열처럼 접근가능

strObj[0] = 'S';
console.log(strObj); // "Lee" // 원시값인 문자열은 변경할 수 없다.

let strObj = new String(123); //문자열로 강제변환
console.log(strObj); // String {0: "1" 1: "2" 2: "3" length: 3 [[Prototype]]: String [[PrimitiveValue]]: "123"}
```

new를 사용하지 않고 String 생성자 함수를 호출하면 인스턴스가 아닌 문자열로 반환한다. 이를 이용해 명시적으로 타입을 변환하기도 한다.

```javaScript
String(1); //"1"
String(NaN); //"NaN"
String(true); //"true"
String(null); //"null"
String(Infinity); //"Infinity"
```

## length 프로퍼티

문자열의 문자 개수를 반환한다.

## String 메서드

원본 배열을 바꾸는 메서드, 새로운 배열을 생성하는 메서드가 있는 배열과는 달리 **String 객체에는 원본 String 래퍼 객체를 직접 변경하는 메서드는 존재하지 않는다.**
문자열은 변경 불가능한 원시값이기 때문에 **String 래퍼 객체도 읽기 전용 객체로 제공된다.**

```javaScript
const strObj = new String('Lee');
console.log(Object.getOwnPropertyDescriptors(strObj));

/*
0: {value: 'L', writable: false, enumerable: true, configurable: false}
1: {value: 'e', writable: false, enumerable: true, configurable: false}
2: {value: 'e', writable: false, enumerable: true, configurable: false}
length: {value: 3, writable: false, enumerable: false, configurable: false}
[[Prototype]]: Object
*/
```

### String.prototype.indexOf

대상 문자열에서 인수로 전달받은 문자열을 검색하여 첫번째 인덱스를 반환한다. 실패하면 -1를 반환한다.
두 번째 인수로 검색 시작할 인덱스를 지정할 수 있다.
이는 대상 문자열에 특정 문자열이 존재하는지 확인할 때 유용하다.

```javaScript
const str = 'Hello world';

str.indexOf('l'); //2
str.indexOf('l', 3); //3 //3부터 검색시작

str.indexOf('or'); //7
str.indexOf('x'); //-1

if(str.indexOf('Hello') !== -1) {
//이렇게 검사할 때 유용
}

if(str.includes('Hello')){
//가독성이 더 좋은 것은 이 메서드
}
```

### String.prototype.search

문자열에서 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열 인덱스를 반환하고, 실패하면 -1을 반환한다.

```javaScript
const str = 'Hello world';
str.indexOf(/o/); //4
str.indexOf(/x/); //-1
```

### String.prototype.includes

대상 문자열 안에 검색할 문자열이 포함되어 있는지 확인하여 true, false로 반환한다.
두 번째 인수로는 검색 시작할 인덱스를 넣을 수 있다.

```javaScript
const str = 'Hello world';

str.includes('Hello'); //true
str.includes(''); //true
str.includes(); //false
str.includes('H', 3); //false
```

### String.prototype.startsWith

대상 문자열이 인수로 전달받은 문자열로 시작하는지 확인하여 true, false로 반환한다.
두번째 인수로 검색 시작할 인덱스를 넣을 수 있다.

```javaScript
const str = 'Hello world';

str.startsWith('He'); //true
str.startsWith(' ', 5); //true //공백이 5번째인덱스부터 시작하니? 맞아!
```

### String.prototype.endsWith

대상 문자열이 인수로 전달받은 문자열로 끝나는지 확인하여 true, false를 반환한다.
두번째 인수로 검색할 문자열의 길이를 전달할 수 있따.

```javaScript
const str = 'Hello world';

str.endsWith('ld'); //true
str.endsWith('lo', 5); //true //5번째 인덱스에 lo로 끝나고 있나요? 맞아요!
```

### String.prototype.charAt

선택한 인덱스의 문자를 반환한다.
인덱스는 0 ~ length-1 사이 정수여야 한다. 범위를 벗어나면 빈 문자열을 반환한다.

```javaScript
const str = 'Hello';

for(let i = 0; i < str.lengthl i++){
  console.log(str.charAt(i)); // H e l l o
}

str.charAt(5); // '' //인덱스범위를 벗어남
```

### String.prototype.substring

대상 문자열에서 첫 번째 인수로 전달받은 인덱스부터 두 번째 인수로 전달받은 인덱스 전까지의 부분 문자열을 반환한다.
두 번째 인수를 생략하면 마지막 문자까지를 반환한다.

```javaScript
const str = 'Hello world';
str.substring(1, 4); //ell
str.substring(1); //ello world
```

첫번째 인수는 두번째 인수보다 작은 정수여야 정상이다. 그러나 다음 상황에서도 정상 동작한다.

```javaScript
const str = 'Hello world';

// 첫 번째 인수 > 두 번째 인수인 경우 교환된다.
str.substring(4, 1); // 'ell'

// 인수 < 0 또는 NaN인 경우 0으로 취급된다.
str.substring(-2); //'Hello world'

// 인수 > 문자열의 길이인 경우는 문자열의 길이로 취급된다.
str.substring(1, 100); // ello world
```

indexOf와 함께 쓰면 특정 문자열 기준으로 앞 뒤 위치한 부분 문자열을 얻을 수 있다.

```javaScript
const str = 'Hello world';

str.substring(0, str.indexOf(' ')); //Hello
```

### String.prototype.slice

substring과 동일하게 동작하지만, 음수인 인수를 전달할 수 있다. 음수는 가장 뒤에서부터 문자열을 잘라 반환한다.

```javaScript
const str = 'Hello world';

str.slice(2); //llo world
str.slice(-5); //world //뒤에서 5자리를 잘라 반환
```

### String.prototype.toUpperCase

문자열을 전부 대문자로 변경해 반환한다.

### String.prototype.toLowerCase

문자열을 전부 소문자로 변경해 반환한다.

```javaScript
const str = 'Hello world';

str.toUpperCase(); // HELLO WORLD
str.toLowerCase(); // hello world
```

### String.prototype.trim

문자열 앞 뒤에 있는 공백을 제거해서 반환한다.
replace 메서드에 정규표현식을 인수로 전달하여 공백 문자를 제거할 수도 있다.

```javaScript
const str = '       foo           ';

str.trim(); // 'foo'
str.trimStart(); // 'foo            '
str.trimEnd(); // '          foo'

str.replace(/\s/g, ''); // 'foo'
str.replace(/^\s +/g, ''); //'foo     '
str.replace(/\s+$/g, ''); // '    foo'
```

### String.prototype.repeat

대상 문자열을 인수로 받은 정수만큼 반복해 연결한 새로운 문자열을 반환한다. 0이면 빈 문자열, 음수면 RangeError를 발생시킨다.
생략하면 기본값이 0으로 설정된다.

```javaScript
const str = 'abc';

str.repeat(); // ''
str.repeat(1); // 'abc'
str.repeat(3); // 'abcabcabc'
str.repeat(2.5); // 'abcabc' //-> 2로 버림
```

### String.prototype.replace

대상 문자열에서 첫 인수로 받은 문자열이나 정규표현식을 검색하여 두번째 인수로 전달한 문자열로 치환된 문자열을 반환한다.
검색된 문자열이 여럿이면 첫 번째 검색된 문자열만 치환한다.
또, 특수한 교체 패턴을 사용할 수 있는데, (예를 들어, $&는 검색된 문자열) 자세한 내용은 MDN의 함수 설명을 참고하자.
[참고 MDN] (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/3f7026da-913b-4710-8e2a-1d53349b2f57)


```javaScript
const str = 'Hello world';
const str2 = 'Hello world world';

str.replace('world', 'Lee'); // Hello Lee
str2.replace('world', 'Lee'); // Hello Lee world

str.replace('world', '<strong>$&</strong>'); // 'Hello <strong>world</strong>'

const str3 = 'Hello hello'

str3.replace(/hello/gi, 'Lee'); // Lee Lee //대소문자 구분하지 않고 전역검색한다.
```

replace는 첫 인수로 전달한 문자열이나 정규 표현식에 매치한 결과를 두 번재 인수로 전달한, 치환함수에서 나온 결과와 치환환다.

```javaScript

//스네이크 케이스를 카멜케이스로 변환하는 함수
function snakeToCammel(snakeCase) {
  return snakeCase.replace(/_[a-z]/g, match => { //_와 소문자로 이루어진 문자열에 매치시켜줘
    console.log(match); //_w
    return match[1].toUpperCase(); //둘중 뒤에거를 대문자로 바꿔줘
  });
}

const snakeCase = 'hello_world';
snakeToCamel(snakeCase); // helloWorld
```

### String.prototype.split

대상 문자열에서 첫 인수로 전달한 문자열 또는 정규 표현식을 검색해 문자열을 구분한 후 분리된 각 문자열로 이루어진 배열을 반환한다.
빈 문자열은 각각을 전부 분리하고, 생략하면 문자열 전체를 단일 요소로 하는 배열을 반환한다.
두 번째 인수로는 배열길이를 지정할 수 있다.
배열을 반환하는 것이기 때문에 배열 메서드 reverse나 join을 사용할 수 있다.

```javaScript
const str = 'How are you doing?';

str.split(' '); //공백기준 ["How", "are", "you", "doing?"]
str.split(/\s/); //\s 는 공백 ["How", "are", "you", "doing?"]
str.split(''); //['H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', ' ', 'd', 'o', 'i', 'n', 'g', '?']
str.split(' ', 3); //["How", "are", "you"] //배열길이가 3

function reverseString(str) {
  return str.split('').reverse().join('');
}

reverseString('Hello world'); // '!dlrow olleH'
```
