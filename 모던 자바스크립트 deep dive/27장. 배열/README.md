# 배열

## 배열이란?
배열은 여러 개의 값을 순차적으로 나열한 자료구조이다.
배열이 가지고 있는 값을 **요소**라고 부르고, 요소는 자신의 위치를 나타내는, 0 이상의 정수인 **인덱스**를 갖는다. (0부터 시작)
요소에 접근할 때는 대괄호 표기법을 사용한다.
배열의 길이를 나타내는 length 프로퍼티를 갖는다. → 그래서 for문을 통해 순차적으로 요소에 접근할 수 있다.
**배열은 객체 타입이다. 배열 타입은 없다.**

```javaScript
const arr = ['박상용', '정상영', '김도은'];
arr[0]; //'박상용'
arr.length // 3

for(let i = 0; i < arr.length; i++){
  console.log(arr[i]); //'박상용', '정상영', '김도은'
} //배열의 순회

typeof arr //object
```

배열은 배열 리터럴, Array 생성자 함수, Array.of, Array.from 메서드로 생성할 수 있다. 프로토타입 객체는 Array.prototype이다.

```javaScript
const arr = [1,2,3];

arr.constructor === Array; // true
Object.getPrototypeOf(arr) === Array.prototype //true
```

배열은 객체이지만 일반 객체와는 구별되는 독특한 특징이 있다. <br>
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/1e6a145d-9ad0-4339-91e9-2f9e4269cbf3)

가장 명확한 차이는 **값의 순서**와 **length 프로퍼티**이다.

**배열의 장점**
1. 처음부터 순차적으로 요소에 접근 가능(마지막부터 역순도 가능)
2. 특정 위치부터 순차적으로 요소 접근 가능

## 자바스크립트 배열은 배열이 아니다

**밀집 배열** : 배열의 요소가 하나의 데이터 타입으로 통일되어 있고, 서로 연속적으로 인접해 있다. = 인덱스를 통해 단 한 번의 연산으로 임의의 요소에 접근할 수 있다(시간 복잡도 O(1))
```
검색 대상 요소의 메모리 주소 = 배열의 시작 메모리 주소 + 인덱스 * 요소의 바이트 수
```
정렬되지 않은 배열은 선형검색을 통해 특정 요소를 발견할 때까지 검색하므로 시간복잡도가 O(n)만큼 걸린다.
또, 배열에 요소를 삽입하거나 삭제하는 경우 배열의 요소를 연속적으로 유지하기 위해 요소를 이동시켜야 한다는 단점이 있다.

그러나 자바스크립트에서의 배열은 **희소 배열**이다.
이는 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며 연속적으로 이어져 있지 않을 수도 있다.(연속적으로 요소가 이어져 있지 않는 배열)

**자바스크립트의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체이다.**
배열의 프로퍼티 키로 인덱스를 나타내는 문자열, length 프로퍼티를 가지며, 배열의 요소는 사실 프로퍼티의 값이다. = 어떤 타입의 값이라도 배열의 요소가 될 수 있다.

```javaScript
const arr = [
  'string',  //문자
  10,  //숫자
  true,  //논리
  null,  //값이 없는 값
  undefined,  //정의되지 않은 값
  NaN,  //Not a Number
  Infinity,  //무한
  [ ],  //배열
  { },  //객체
  function() {} //함수 객체
];
```

즉, 자바스크립트 배열은 해시 테이블로 구현된 객체로, 요소에 인덱스로 접근할 경우 일반적인 배열보다 성능적으로는 느리지만, 삭제 및 삽입하는 경우, 일반 배열보다 더 좋은 성능을 기대한다.
접근 시 느리다는 점을 보완하기 위해 일반 객체와 구별하여 더 배열처럼 동작하도록 최적화하여 구현했다.

```javaScript
const arr = [];

console.time('Array Performance Test');

for(let i = 0; i < 10000000; i++){
  arr[i] = i;
}
console.timeEnd('Array Performance Test');

const obj = { };
console.time('Object Performance Test');

for(let i = 0; i < 10000000; i++){
  obj[i] = i;
}
console.timeEnd('Object Performance Test');
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/21d70150-a9c4-4d16-ad5a-846de9b3b199)

## length 프로퍼티와 희소 배열
length 프로퍼티의 값은 0과 2^32-1 미만의 양의 정수이다. 배열에 요소를 추가하거나 삭제하면 자동 갱신된다.

```javaScript
const arr = [1,2,3];
console.log(arr.length); //3

arr.push(4); //추가
console.log(arr.length); //4 //자동갱신

arr.pop();
console.log(arr.length); //3 //자동갱신

//자바스크립트에서의 배열은 자바에서의 LinkedList의 느낌 + 인덱스로 찾기

--------------------------------------------------------------------

//length 프로퍼티 값보다 작은 숫자를 할당하면 배열의 길이가 줄어든다.

const arr2 = [1,2,3,4,5];
arr2.length = 3;
console.log(arr2); //[1,2,3]

//그러나 원래 프로퍼티 length보다 큰 값을 할당해도 변하지 않는다. length 프로퍼티 값만 바뀐다.
const arr3 = [1];
arr3.length = 3;
console.log(arr3.length); //3
console.log(arr3); //[1, empty x 2] //실제로도 이렇게 나온다 : 메모리공간을 확보하지 않고, 빈 요소를 생성하지도 않는다

--------------------------------------------------------------------

//위의 arr3은 뒷부분이 비어 있어서 연속적으로 위치하는 것처럼 보일 수 있으니 중간이나 앞 부분이 비어 있을 수도 있다.

const sparse = [,2,,4]; //앞과 중간이 빔
console.log(sparse.length); //4
console.log(sparse); //[empty, 2, empty, 4]

//그러나 인덱스가 0, 2 요소는 없다
console.log(Object.getOwnPropertyDescriptors(sparse));
//1과 3만 나온다
```

**희소배열은 length와 배열 요소의 개수가 일치하지 않는다. 희소배열의 length는 희소 배열의 실제 요소 개수보다 언제나 크다.**
그러나 희소배열은 사용하지 않는 것이 좋다. **배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다.**

## 배열 생성

### 배열 리터럴
0개 이상의 요소를 쉼표로 구분하여 대괄호로 묶는 방법이다. 프로퍼티 키가 없고, 값만 존재한다.
요소를 하나도 추가하지 않으면 배열의 길이는 0이다. 요소를 생각하면 희소 배열로 만들어진다.

```javaScript
const arr = [1,2,3];
const arr2 = [];
const arr3 = [1, , 3];

console.log(arr.length); //?
console.log(arr2.length); //?
console.log(arr3.length); //?
```

### Array 생성자 함수
**전달된 인수의 개수에 따라 다르게 동작하므로 주의가 필요하다.**

* 전달되는 인수가 1개일 경우 length프로퍼티 값이 인수인 배열을 생성한다.
* 전달되는 인수가 없는 경우 빈 배열을 생성한다. = [ ]
* 전달된 인수가 2개 이상이거나 숫자가 아닌 경우, 인수를 요소로 갖는 배열을 생성한다.
  
```javaScript
const arr = new Array(10);
console.log(arr); //[empty * 10] //이때 만들어진 배열은 희소 배열!

//배열은 요소를 최대 2의 32승 -1개 가질 수 있다. 범위를 벗어나면 RangeError 발생
new Array(-1); //RangeError

new Array(); // []
new Array(1,2,3); //[1,2,3]
new Array({}); //[{}]

Array(1,2,3); //[1,2,3]
//new와 함께 호출하지 않아도 생성자함수로 동작한다. 내부에서 new.targer을 확인하기 때문
```

### Array.of
전달된 인수가 1개이고 숫자이더라도, 인수를 요소로 갖는 배열을 생성한다.

```javaScript
Array.of(1); //[1]
Array.of(1,2,3); //[1,2,3]
Array.of('string'); //['string']
```

### Array.from
유사배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다.
```
- 유사배열 객체?
마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다. for문으로 순회할 수 있다.

const arrayLike = {
  '0' : 'a';
  '1' : 'b';
  '2' : 'c';
  length: 3;
};

- 이터러블 객체?
Symbol.iterator 메서드를 구현하여 for...of 문으로 순회할 수 있다. (ES6에서 제공하는 빌트인 이터러블은 Array, String, Map, Set, DOM 컬렉션)이 있다.
```

두번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있다. 콜백함수의 반환값으로 구성된 배열을 반환한다.

```javaScript
Array.from({length: 2, 0: 'a', 1: 'b'}; //['a', 'b']
Array.from('Hello'); //['H', 'e', 'l', 'l', 'o'] 문자열은 이터러블이다

Array.from({length: 3}); // [undefined, undefined, undefined]
Array.from({length: 3}, (_, i) => i); //[0,1,2]
```

## 배열 요소의 참조

참조할 때는 대괄호 표기법을 사용한다. 존재하지 않는 요소(없는 인덱스)에 접근하면 undefined가 반환된다.
배열은 사실 인덱스를 나타내는 문자열을 프로퍼티 키로 갖는 객체이다. ('0' : 프로퍼티 값)
같은 이유로 희소 배열의 존재하지 않는 요소를 참조해도 undefined가 뜬다.

```javaScript
const arr1 = [1,2];
console.log(arr1[0]);//1
console.log(arr1[2]); //undefined

const arr2 = [1, ,3];
console.log(arr2[1]); //undefined
```

## 배열의 요소의 추가와 갱신

배열에도 요소를 동적으로 추가할 수 있다. 존재하지 않는 인덱스를 사용해 값을 할당하면 새로운 요소가 추가된다. 이때 length는 자동 갱신된다.

```javaScript
const arr = [0];
arr[1] =1;
console.log(arr); //[0, 1]
console.log(arr.length); //2

arr[100] = 100;
console.log(arr); //희소배열이 된다 [0, 1, empty x 98, 100]
console.log(arr.length); //100
//이 역시 값을 명시적으로 할당하지 않은 요소는 생성되지 않는다는 것에 주의하자.

arr[1] = 10; //재할당이 가능하다
console.log(arr); //[0, 10]
```

인덱스는 요소의 위치를 나타내므로 반드시 0 이상의 정수(또는 정수 형태 문자열)을 사용해야 한다. 만약 그 외 값을 인덱스처럼 사용하면 *요소가 생성되는 것이 아니라 프로퍼티가 생성된다.* 추가된 프로퍼티는 length 프로퍼티 값에 영향을 주지 않는다.

```javaScript
const arr = [];

//배열요소 추가
arr[0] = 1;
arr['1'] = 2;

//프로퍼티 추가
arr['foo] = 3;
arr.bar = 4;
arr[1.1] = 5;
arr[-1] = 6;

console.log(arr); // [1,2, foo:3, bar:4, '1.1':5, '-1':6]
console.log(arr.length); //2 프로퍼티는 영향을 주지 않는다
```

## 배열 요소의 삭제

delete 연산자를 사용할 수 있다. delete 연산자는 객체의 프로퍼티를 삭제하는 것이다. 그렇게 되면 희소배열이 된다.
특정 요소를 완전히 삭제하려면 splice 메서드를 사용해야 한다.

```javaScript
const arr = [1,2,3];

delete arr[1]; //요소의 삭제
console.log(arr); //[1, empty, 3]
console.log(arr.length); //3
//length에 영향을 주지 않고, 요소만 삭제된다는 것은 희소배열이 된다는 것이다.

//요소를 완전히 삭제하려면
arr.splice(1, 1); //1에서부터 1개의 요소를 제거
console.log(arr); //[1,3]
console.log(arr.length); //2
```

## 배열 메서드

배열 메서드는 결과물을 반환하는 패턴이 두 가지이다. **배열에는 원본배열(배열 메서드를 호출한 배열, 즉 배열 메서드 구현체 내부에서 this가 가리키는 객체)을 직접 변경하는 메서드**와 **원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드**가 있다.

```javaScript
const arr = [1];

//push는 원본 배열을 직접 변경한다.
arr.push(2);
console.log(arr); //[1,2]

//concat은 새로운 배열로 만들어서 반환한다
const result = arr.concat(3);
console.log(arr); //[1,2]
console.log(result); //[1,2,3]
```

### Array.isArray

Array 생성자 함수의 정적 메서드이다. Array.of와 Array.from도 Array 생성자 함수의 정적 메서드이다.
**Array.isArray는 전달된 인수가 배열이면 true, 배열이 아니면 false를 반환한다.**

```javaScript
//true
Array.isArray([]);
Array.isArray([1,2]);

//false
Array.isArray();
Array.isArray(null);
Array.isArray({});
Array.isArray(true);
Array.isArray({0: 1, length: 1});
```

### Array.prototype.indexof

원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.
중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스를 반환한다.
원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1를 반환한다.
**배열에 특정 요소가 존재하는지 확인할 때 유용하다.** ES7에서 도입된 Array.prototype.includes 멧드를 사용하면 가독성이 더 좋다.

```javaScript
const arr = [1,2,3,4];

arr.indexOf(2); // 1
arr.indexOf(4); //-1
arr.indexOf(2,2); //두번째 인수는 검색시작할 인덱스 (없으면 처음부터)

const foods = ['apple', 'banana'];

if(foods.indexOf('orange') === -1){
  foods.push('orange'); //존재하지 않으면 추가해줘
}

console.log(foods); //['apple', 'banana', 'orange']

//include 메서드
if(!food.includes('orange'){
  foods.push('orange');
} //위와 같은 메서드
```

### Array.prototype.push

push는 전달받은 모든 값을 원본 배열의 마지막 요소로 추가, 변경된 length의 프로퍼티 값을 반환한다. **원본 배열을 직접 변경한다는 점**
성능은 좋지 않다. 추가할 요소가 하나 뿐이라면 push 대신 length 프로퍼티를 이용해서 추가하는 것이 빠르다.
push는 원본 배열을 바꾸기 때문에 ES6의 스프레드 문법을 사용하는 편이 좋다. 함수 호출 없이 표현식으로 마지막에 요소를 추가할 수 있고, 부수 효과도 없다.

```javaScript
const arr = [1,2];
arr.push(3, 4);
console.log(arr); //[1,2,3,4];

const arr2 = [1,2];
arr2[arr2.length] = 3;
console.log(arr2); //[1,2,3] 인수가 하나일 때는 이게 더 빠르다

//ES6 스프레드 문법
const newArr = [...arr2, 4];
console.log(newArr); //[1,2,3,4]
```

### Array.prototype.pop

원본배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다. 원본 배열이 빈 배열이라면 undefined를 반환한다. **원본배열을 직접 변경한다는 점**
이를 이용해서 스택 Stack을 쉽게 구현할 수 있다.

```javaScript
const Stack = (function() {
    function Stack(array = []) {
      if(!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array.`); //47장 예외처리
      }
    this.array = array;
  }

  Stack.prototype = {
    constructor: Stack, //생성자함수에 의한 프로토타입의 교체

    push(value) {
      return this.array.push(value);
    }
  
    pop(){
      return this.array.pop();
    }

    entries() {
      return [ ... this.array];
    } //복사본 배열을 반환한다.
  };

return Stack;
}());

-----------------------------------------------------------------

//스택을 클래스로 구현해보기
class Stack {
  #array; //private class member

  constructor(array = []) {
      if(!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array.`); //47장 예외처리
      }
    this.array = array;
  }

  push(value) {
      return this.#array.push(value);
    }
  
    pop(){
      return this.#array.pop();
    }

    entries() {
      return [ ... this.#array];
    } //복사본 배열을 반환한다.
}

------------------------------------------------------------------
const stack = new Stack([1,2]);
console.log(stack.entries()); //[1,2]

stack.push(3);
console.log(stack.entries()); //[1,2,3]

stack.pop();
console.log(stack.entries());//[1,2]
```

### Array.prototype.unshift

