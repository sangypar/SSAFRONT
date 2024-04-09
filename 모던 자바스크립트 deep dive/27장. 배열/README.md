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
인수로 전달받은 모든 값을 배열의 선두에 요소로 추가하고, 변경된 length 프로퍼티 값을 반환한다. **원본배열을 직접 변경**
이것 역시 ES6의 스프레드 문법을 사용하는 편이 좋다.

```javaScript
const arr = [1,2];
arr.unshift(3,4);
console.log(arr); //[3,4,1,2]

//스프레드 문법
const newArr = [3, ...arr];
console.log(newArr); //[3,1,2]
```

### Array.prototype.shift

원본배열에서 첫번째 요소를 제거하고 제거한 요소를 반환한다. 빈 배열이면 undefined를 반환한다. **원본배열을 직접 변경**
shift와 push 메서드를 사용하면 큐queue를 쉽게 구현할 수 있다.

```javaScript
const Queue = (function() {
  function Queue(array = []) {
    if(!Array.isArray(array)) {
      throw new TyepError(`${array} is not an array.`);
    }
    this.array = array;
  }

  Queue.prototype = {
    constructor: Queue,

    enqueue(value){
      return this.array.push(value);
    },

    dequeue() {
      return this.array.shift();
    },

    entries() {
      return [...this.array];
    }
  };

  return Queue;
}

-------------------------------------------------------------

//클래스로 구현하기
class Queue {
  #array;

   constructor(array = []) {
    if(!Array.isArray(array)) {
      throw new TyepError(`${array} is not an array.`);
    }
    this.array = array;
  }

  enqueue(value){
     return this.#array.push(value);
 },

  dequeue() {
     return this.#array.shift();
  },

  entries() {
      return [...this.#array];
  }
}

--------------------------------------------------------------

const queue = new Queue([1,2]);
console.log(queue.entries()); //[1,2]

queue.enqueue(3);
console.log(queue.entries()); //[1,2,3]

queue.dequeue();
console.log(queue.entries()); //[2,3]
```

### Array.prototype.concat

인수로 전달된 값들(배열 또는 원시값)을 원본 배열의 마지막 요소로 추가한 *새로운 배열*을 반환한다. 배열이 인수로 전달되었다면 해체하여 새로운 배열의 요소로 추가한다. **원본배열은 변경되지 않는다.**
push와 unshift는 원본 배열을 변경하기 때문에 원본 배열을 반드시 변수에 저장해두어야 하며, concat은 반환값을 반드시 변수에 할당받아야 한다.

```javaScript
const arr1 = [1,2];
const arr2 = [3,4];

let result = arr1.concat(arr2);
console.log(result); // [1,2,3,4]

result = arr1.concat(arr2, 5); //arr2와 숫자를 원본배열 arr1에 넣겠다!
console.log(result); //[1,2,3,4,5]
console.log(arr1); //[1,2] //원본 배열은 바뀌지 않는다
```

인수로 받은 값이 배열인 경우, push와 unshift는 배열을 그대로 원본 배열의 마지막/첫번째 요소로 추가하지만, concat은 해체하여 새로운 배열의 마지막 요소로 추가한다.

```javaScript
const arr = [3,4];

arr.unshift([1,2]);
arr.push([5,6]);
console.log(arr); //[[1,2], 3, 4, [5,6]]

let result = [1, 2].concat([3,4]);
console.log(result); //[1,2,3,4]

//concat도 스프레드 문법으로 대체가능
result = [...[1,2], ...[3,4]];
console.log(result); //[1,2,3,4]
```

*결론적으로 ES6의 스프레드 문법을 일광성 있게 사용하는 것을 권장한다.*

**push, pop, unshift, shift 메서드 정리**
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/46ad43b6-c68f-45b9-91f8-9057bc19dba0)


### Array.prototype.splice

원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 splice 메서드를 사용한다. 3개의 매개변수가 있으며 **원본배열을 직접 변경**한다.

```
✅ start : 원본 배열의 요소를 제거하기 시작할 인덱스, 여기서부터 모든 요소를 제거한다. 음수인 경우 배열에서의 끝으로부터의 인덱스값 (-1 : length -1) - 첫번째 인자
✅ deleteCount : start부터 제거할 요소의 개수로, 0인 경우 아무런 요소도 제거되지 않는다 (옵션) - 2번째 인자
✅ items : 제거한 위치에 삽입할 요소들의 목록으로, 생략 시에는 원본 배열에서 제거하기만 한다(옵션) - 3번째 인자 이후
```

```javaScript
const arr = [1,2,3,4];
const result = arr.splice(1,2,20,30); //1부터 2개 요소 제거, 그 자리에 20 30 요소 삽입
console.log(result); //[2,3]
console.log(arr); //[1,20,30,4]
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/d24171fc-f188-4818-94dd-e68623536438)

제거할 요소의 개수(두 번째 인수)를 0으로 지정하면 아무런 요소도 제거하지 않고, 빈 배열이 반환된다.
이 요소가 생략되면 start부터 (첫 번째 인수) 모든 요소를 제거한다.

추가할 요소들의 목록(세 번째 인수)를 전달하지 않으면 제거되기만 하고, 추가되지 않는다.

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/e3c0a300-0785-4545-acfb-86e67eaa3597)

배열에서 특정 요소를 제거하려면 indexOf 메서드를 통해 특정 요소 인덱스를 취득한 후 splice 메서드를 사용한다.
또는 filter ㅁ서드를 사용하여 제거할 수도 있으나, 특정요소가 중복된 경우는 모두 삭제된다.

```javaScript
const arr = [1,2,3,1,2];

function remove(array, item) {
  const index = array.indexOf(item); //제거할 요소의 인덱스값 획득
  if(index !== -1) array.splice(index, 1); //제거할 요소가 있다면 제거한다
  return array;
}

console.log(remove(arr,2)); //[1,3,1,2]

function removeAll(array, item) {
  return array.filter(v => v !== item); //item 요소 제거
}

console.log(removeAll(arr,2)); //[1,3,1]
```

### Array.prototype.slice

인수로 전달된 범위의 요소들을 복사하여 배열로 반환한다. **원본 배열은 변경되지 않는다.**
두 개의 매개변수를 갖는다.

```
✅ start : 복사를 시작할 인덱스의 값, 음수인 경우 배열에서의 끝으로부터의 인덱스값 (-1 : length -1) - 첫번째 인자
✅ end : 복사를 종료할 인덱스의 값으로 복사된 결과에 포함되지는 않는다. 생략 가능하며 기본값은 length 프로퍼티 값이다. - 2번째 인자
```

```javaScript
const arr = [1,2,3];

arr.slice(0,1); //[1]
arr.slice(0,2); //[1,2]
```

첫 번째 인수로 전달받은 인덱스로부터 두 번째 인수로 전달받은 인덱스 이전까지 요소들을 복사하여 배열로 반환한다.
end를 생략하면 (두번째 인수 생략) start부터 모든 요소를 복사하여 반환한다.
첫 번째, 두 번째 인수를 생략하면 원본 배열의 복사본을 생성하여 반환한다. 이때 생성된 복사본은 **얕은 복사**를 통해 생성된다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/c5be79a1-7c4b-4a39-a4d3-58b2eee80469)

```javaScript
const todos = [
  {id : 1, content: 'HTML', completed: false},
  {id : 2, content: 'CSS', completed: true},
  {id : 3, content: 'JS', completed: false}
];

const _todos = todos.slice(); //얕은 복사로 원본배열 전체 복사

console.log(_todos === todos); //false 참조값이 다른 별개의 객체
console.log(_todos[0] === todos[0]); //true 배열 요소의 참조값이 같다.
```

##### 얕은 복사와 깊은 복사
> 객체를 프로퍼티 값으로 갖는 객체의 경우 얕은 복사는 한 단계까지만 복사하는 것을 말하고, 깊은 복사는 객체 중첩되어 있는 객체까지 모두 복사하는 것을 말한다.
> slice, 스프레드문법, Object.assign 메서드는 모두 얕은 복사를 수행한다.

arguments, HTMLCollection, NodeList 같은 유사배열 객체를 배열로 변환할 수 있다.
Array.from 메서드를 사용하면 더욱 간단하게 유사배열 객체를 배열로 변환할 수 있다. 이 메서드는 유사배열 객체 또는 이터러블 객체를 배열로 반환한다.

```javaScript
function sum(){
  var arr = Array.prototype.slice.call(arguments);
  console.log(arr); //[1,2,3]

  return arr.reduce(function (pre, cur) {
    return pre+cur;
  }, 0);
}

console.log(sum(1,2,3)); //6

------------------------------------------------------

function sum() {
    var arr = Array.prototype.slice.call(arguments);
    console.log(arr); //[1,2,3]

    return arr.reduce((pre, cur) => pre+cur, 0);
}

console.log(sum(1,2,3)); //6

--------------------------------------------------------
//스프레드 문법으로 표현하기
function sum() {
    const arr = [...arguments];
    console.log(arr); //[1,2,3]

    return arr.reduce((pre, cur) => pre+cur, 0);
}

console.log(sum(1,2,3)); //6
```

### Array.prototype.join

원본 배열의 모든 요소를 문자열로 반환한 후 인수로 전달받은 문자열, 즉 구분자로 연결한 문자열을 반환한다. 구분자는 생략가능하며 기본 구분자는 콤마(,)다.

```javaScript
const arr = [1,2,3,4];

arr.join(); // '1,2,3,4'
arr.join(''); // '1234'
arr.join(':'); //'1:2:3:4'
```

### Array.prototype.reverse

원본 배열의 순서를 반대로 뒤집는다. **원본 배열이 변경된다.** 반환값은 변경된 배열이다.

```javaScript
const arr = [1,2,3];
const result = arr.reverse();

console.log(arr);
console.log(result);
//둘다 [3,2,1]
```

### Array.prototype.fill

인수로 전달받은 값을 처음부터 끝까지 해당 요소로 채운다. **원본 배열이 변경된다.**
두 번째 인수로는 채우기를 시작할 인덱스, 세 번째 인수로는 채우기를 멈출 인덱스를 전달할 수 있다.
배열을 생성하면서 특정 값으로 요소를 채울 수 있다.

```javaScript
const arr = [1,2,3,4];

arr.fill(0); //[0,0,0,0]
arr.fill(0, 1); //[1,0,0,0]
arr.fill(0, 1, 2); //[1, 0, 0, 4]

const arr2 = new Array(3);
const result = arr2.fill(1);
console.log(result); //[1,1,1]
```

Array.from 메서드를 사용하면 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출, 콜백함수의 반환값으로 구성된 배열을 반환한다.

```javaScript
const sequences = (length = 0) => Array.from({length}, (_, i) => i);
console.log(sequences(3));
```

### Array.prototype.includes

배열 내에 특정 요소가 포함되어 잇는지 확인하여 true 또는 false를 반환한다.
첫 번째 인수로 검색할 대상을 지정한다. 두 번째 인수로 검색을 시작할 인덱스를 지정, 생략하면 기본값이 0으로 설정된다. 두 번째 인수에 음수를 전달하면 length 프로퍼티 값과 음수 인덱스를 합산하여 검색 시작 인덱스를 설정한다.

```javaScript
const arr = [1,2,3];
arr.includes(2); //true
arr.includes(1,1); //false (1이 인덱스 1번부터 있는지 확인)
arr.includes(3, -1); //true
```

indexOf 메서드를 사용하여도 특정 요소가 포함되어있는지 확인할 수 있으나 반환값이 -1인지 확인해야하고, NaN이 포함되어있는지 확인할 수 없다는 문제가 있다.

### Array.prototype.flat

인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화 한다.
중첩 배열을 평탄화할 깊이를 인수로 전달할 수 있다. 인수를 생략하면 기본값은 1, Infinity를 전달하면 중첩 배열 모두 평탄화한다.

```javaScript
[1,[2,[3],[4]]]].flat(); //[1,2, [3,[4]]]
[1,[2,[3],[4]]]].flat().flat();
[1,[2,[3],[4]]]].flat(2); //위와 결과가 같다 [1,2,3,[4]]
[1,[2,[3],[4]]]].flat(Infinity); //[1,2,3,4] 
```

## 배열의 고차 함수

**고차함수는 함수를 인수로 전달받거나 반환하는 함수로, 불변성을 지향하는 함수형 프로그래밍에 기반을 두고 있다.**
함수형 프로그래밍은 *조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여* 상태의 변경을 피하려는 프로그래밍 패러다임이다.
결국 **순수 함수를 통해 부수 효과를 최대한 억제**하여 오류를 피하고 안정성을 높이려는 노력의 일환이다.

### Array.prototype.sort

배열의 요소를 정렬한다. 원본의 배열을 변경하여 정렬된 배열을 반환한다. 기본적으로 오름차순 요소를 정렬한다. 문자열도 오름차순으로 정렬된다.(한글 가능)
내림차순으로 정렬하려면 sort 메서드를 사용하여 정렬 후 reverse 메서드를 사용해 순서를 뒤집는다.

문자열은 괜찮지만, 숫자로 이루어진 배열은 정렬할 때 주의가 필요하다.
sort 메서드는 기본적으로 유니코드 코드 포인트의 순서를 따르기 때문에 문자열로 변환한 후 유니코드 코드 포인트의 순서를 기준으로 정렬한다.

```javaScript
const points = [40, 100, 1, 5, 2, 25, 10];
points.sort();
console.log(points); //[1, 10, 100, 2, 25, 40, 5]
```

1의 유니코드 코드 포인트는 U+0031, 2의 유니코드 코드 포인트는 U+0032, 10의 유니코드 코드 포인트는 U+0031U_0030이다.
문자열 10이 문자열 2보다 앞서므로 정렬했을 때 ['10', '2']로 정렬되고 숫자타입으로 변경되어 [10, 2]로 출력된다.
**따라서 숫자 요소를 정렬할 때는 정렬 순서를 정의하는 비교함수를 인수로 전달해야 한다.**
0보다 작으면 비교함수의 첫 번째 인수를 우선 정렬, 0은 정렬 안함, 음수는 두 번째 인수를 우선하여 정렬한다.

```javaScript
const points = [40, 100, 1, 5, 2, 25, 10];
points.sort((a,b) => a-b);
console.log(points); //[1,2,5,10,25,40,100]

//내림차순
points.sory((a,b) => b-a);
console.log(points); //[100,40,25,10,5,2,1]

--------------------------------------------------
//객체 비교

```javaScript
const todos = [
  {id : 4, content: 'HTML'},
  {id : 2, content: 'CSS'},
  {id : 3, content: 'JS'}
]

function compare(key) {
  return (a,b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0)); //문자열인 경우 -는 NaN가 나오므녀 비교연산을 통해 양수, 음수, 0으로 반환할 수 있도록 한다.
}

todos.sort(compare('id');
console.log(todos);
/*
[
  {id : 2, content: 'JS'},
  {id : 3, content: 'CSS'},
  {id : 4, content: 'HTML'}
]
*/

//content 기준으로도 정렬 가능
```

### Array.prototype.forEach

**조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제**하여 상태 변경을 피하려는 프로그래밍 패러다임이다.
forEach는 for문을 대체할 수 있다. 자신의 내부에서 반복문을 실행하는데, 자신을 호출한 배열을 순회하면서 수행할 처리를 콜백 함수로 전달받아 반복 호출한다.

```javaScript
const numbers = [1,2,3];
const pows = [];

numbers.forEach(item => pows.push(item ** 2));
console.log(pows); //[1,4,9]
```

여기서 콜백 함수도 3번 호출된다. (요소가 3개이므로) this(호출한 배열 자체)를 순차적으로 전달받을 수 있다.

이 메서드는 원 본배열을 변경하지 않는다. 그러나 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
forEach 메서드의 반환값은 언제나 undefined다.

```javaScript
const numbers = [1,2,3];
//콜백함수의 세번째 매개변수 arr은 원본 배열을 가리킨다. arr를 변경하면 원본 배열을 직접 변경할 수 있다.
numbers.forEach((item, index, arr) => { arr[index] = item ** 2l });
console.log(numbers); //[1,4,9]

const result = [1,2,3].forEach(console.log);
console.log(result); //undefined
```

forEach 메서드의 두 번째 인수로 forEach 메서드 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다.
forEach 메서드의 콜백함수는 일반함수로 호출이 되어 내부의 this는 undefined를 가리킨다. 전역객체가 아니라 undefined인 이유는 클래스 내부 모든 코드에는 암묵적으로 strict mode가 적용되기 때문이다.
콜백 함수 내부의 this와 multiply 메서드 내부의 this를 일치시키려면 (아래참고) forEach 메서드의 두 번째 인수로 forEach 메서드의 콜백함수 내부에서 this로 사용할 객체를 전달한다.

```javaScript
clss Numbers {
  numberArray = [];

  multiply(arr) {
    arr.forEach(function (item) {
      tihs.numberArray.push(item*item);
    }, this);
  }
}

const numbers = new Numbers();
numbers.multiply([1,2,3]);
console.log(numbers.numberArray); //[1,4,9]

//화살표 함수는 함수 자체 this 바인딩을 갖지 않아서 더 나은 방법이다. 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 가져온다.
  multiply(arr) {
     arr.forEach(item => this.numberArray.push(item*item);
  }
```

forEach 메서드도 내부에서는 for문을 통해 배열을 순회할 수 밖에 없지만, for문을 메서드 내부로 은닉하여 로직의 흐름을 이해하기 쉽게하고 복잡성을 해결한다.
여기에서는 break, continue를 사용할 수 없다. 모두 빠짐없이 순회하고 중단할 수 없다는 뜻이다.
희소 배열의 경우에는 존재하지 않는 요소는 순회 대상에서 제외된다. map, filter, reduce 메서드에서도 마찬가지이다.

forEach는 for문에 비해 성능은 좋지 않지만 가독성이 더 좋으므로 요소가 많은 배열이거나 복잡한 코드, 높은 성능이 필요한 겨우가 아니라면 이 메서드를 권장한다.

### Array.prototype.map

map메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출하고, **콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다. 즉, 원본 배열은 변경되지 않는다.**

```javaScript
const numbers = [1, 4, 9];
const roots = numbers.map(item => Math.sqrt(item)); //제곱근구하기 (새로운 배열을 만드는 것

console.log(roots); //[1,2,3]
console.log(numbers); //[1,4,9]
```

forEach 메서드와 map 메서드의 공통점으로는 모든 요소를 순회하면서 콜백함수를 반복호출한다는 것이다. 그러나 undefined를 반환하는 forEach와는 달리 map은 반환값들로 구성된 새로운 배열을 반환한다는 차이가 있다.
**map 메서드가 생성하여 반환하는 새로운 배열의 length 프로퍼티 값은 map 메서드를 호출한 배열의 length 프로퍼티 값과 반드시 일치한다. 즉, map을 호출한 배열과 map으로 생성하여 반환한 배열은 1:1 매핑된다.** <br>
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/8afdb381-5bd2-4adf-84a5-38d3e167f1e6)

```javaScript
//map 메서드는 콜백 함수를 호출하면서 3개 (요소 값, 인덱스, this)의 인수를 전달한다.

[1,2,3].map((item, index, arr) => {
  console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
  return item;
});

/*
요소값: 1, 인덱스: 0, this: [1,2,3]
요소값: 2, 인덱스: 1, this: [1,2,3]
요소값: 3, 인덱스: 2, this: [1,2,3]
*/
```

forEach 메서드와 마찬가지로 map 메서드의 두번째 인수로 this로 사용할 객체를 전달할 수 있다. 여기서도 화살표 함수를 사용하는 것이 더 나은 방법이다.

```javaScript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(function(item) {
      //this를 전달하지 않으면 undefined
        return this.prefix + item;
    }, this); //콜백함수 내부에서 사용할 객체 전달
  }

  //화살표 함수 버전
  add(arr){
    return arr.map(item => this.prefix + item);
  }
}

const prefixer = new Prefixer('-webkit-);
console.log(prefixer.add(['transition', 'user-select']));
//근데 이거 나 똑같이 친거같은데 안 되네요?
```

### Array.prototype.filter

filter 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 콜백함수를 반복호출하고, **콜백함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다. 즉, 원본 배열은 변경되지 않는다.** forEach, map과 비교했을 때 true인 요소만 추출한 새로운 배열이 나온다는 점이 다르다. **filter 메서드가 생성하여 반환한 새로운 배열의 length 프로퍼티 값은 filter 메서드를 호출한 배열의 length보다 작거나 같다.**

```javaScript
const numbers = [1,2,3,4,5];
const odds = numbers.filter(item => item%2);
console.log(odds); //[1,3,5]
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/2420a0c1-6b6c-4866-9308-f11f60a25937)

filter 메서드 역시 배열의 요소값, 인덱스, 호출한 배열 자체(this)를 순차적으로 전달받을 수 있다. 이 역시 두번째 인수에서 this로 사용할 객체를 전달할 수 있다. 이것도 화살표 함수를 사용하는 것이 낫다.

```javaScript
class Users {
  constructor() {
    this.users = [
      {id : 1, name: 'Lee'},
      {id : 2, name: 'Kim'}
    ];
}

  //추출
  findById(id) {
    return this.users.filter(user => user.id === id);
  }

   //제거
  remove(id) {
    this.users = this.users.filter(user => user.id !== id);
  }
}

const users = new users();

let user = users.findById(1);
console.log(user); //[{id: 1, name: 'Lee'}]

users.remove(1);

user = users.findById(1);
console.log(user); //[]
```

### Array.prototype.reduce

reduce 메서드는 콜백 함수의 반환값을 다음 순회 시에 콜백함수의 첫 인수로 전달하면서 **하나의 결과값을 만들어 반환한다.** 원본 배열은 변경되지 않는다.
첫 번째 인수로 콜백함수, 두 번째 인수로 초기값을 전달받는다. 콜백함수는 4개의 인수로 "초기값 또는 콜백함수 이전 반환값", "배열의 요소값"과 "인덱스", "this"(reduce 메서드를 호출한 배열 자체)가 전달된다.

```javaScript
const sum = [1,2,3,4].reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);
console.log(sum); //10
```

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/ad729c3a-7b3b-4e18-b25c-719ed073a742)

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/c6cfcef0-9071-430b-a9d0-dfa4dee9b0bc)

reduce 메서드는 초기값과 배열의 첫 번째 요소값을 콜백 함수에게 인수로 전달하면서 호출하고 다음 순회에는 콜백 함수의 반환값과 두번째 요소값을 콜백 함수의 인수로 전달하면서 호출한다. 이 과정을 반복하여 **reduce 메서드는 하나의 결과값을 반환한다.**

```
reduce 메서드의 활용법

1. 평균구하기
2. 최대값 구하기
    → 이때는 Math.max 메서드를 사용하는 방법이 더 직관적이다.
3. 요소의 중복 횟수 구하기
4. 중첩 배열 평탄화
    → flat 메서드를 사용하는 것이 더 직관적이다.
5. 중복 요소 제거
    → filter 메서드를 사용하는 방법이 더 직관적이다.
      또는 Set(중복 허용하지 않는 집합)을 사용할 수도 있다. 이 방법을 추천한다.
```

reduce의 두번째 인수로 전달하는 초기값은 생략가능하다. (옵션)
```javaScript
const sum = [1,2,3,4].reduce((acc,cur) => acc+cur);
console.log(sum); //10
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/56ff9ecc-1996-4421-a3ad-012384f92daf)

**하지만 reduce 메서드를 호출할 때는 언제나 초기갑을 전달하는 것이 안전하다.**
빈 배열로 reduce 메서드를 호출하면 TypeError가 발생한다. 초기값 설정을 해두면 발생하지 않는다.
또 객체의 특정 프로퍼티 값을 합산하는 경우에는 반드시 초기값을 전달해야 한다.

```javaScript
const sum = [].reducr((acc, cur) => acc + cur, 0); //초기값 0추가 = 에러안남
----------------------------------------------------------------------------
//객체
const products = [
  {id: 1, price: 200},
  {id: 2, price: 300},
  {id: 3, price: 400}
];

const priceSum = products.reduce((acc, cur) => acc.price + cur.price); //콘솔찍을 시 NaN으로 출력
const priceSum = products.reduce((acc, cur) => acc + cur.price, 0); //초기값 0으로 해야 제대로 값을 계산한 600이 콘솔에 출력된다

```

### Array.prototype.some

some 메서드의 콜백함수 반환값이 단 한번이라도 참이면 true, 모두 거짓이면 false를 반환한다. 조건을 만족하는 요소가 1개 이상 존재하는지 확인하여 결과를 boolean 타입으로 반환한다. 빈 배열이라면, 언제나 false를 반환하므로 주의!

```javaScript
[5,10,15].some(item => item > 10); //true
[5,10,15].some(item => item < 0); //false
[].some(item => item>3); //false 항상
```

### Array.prototype.every

콜백함수의 반환값이 "모두 참이면" true, 하나라도 거짓이면 false를 반환한다. 모두 만족하는지 확인하여 결과를 boolean 타입으로 반환한다. 단, 빈 배열은 언제나 true로 반환하므로 주의!

```javaScript
[5, 10, 15].every(item => item > 3); //true
[5, 10, 15].every(item => item < 0); //false
[].every(item => item > 3); //true
```

### Array.prototype.find

find 메서드는 ES6에서 도입된 메서드로 반환값이 true인 첫 번째 요소를 반환한다. true인 요소가 없다면 undefined를 반환한다.
filter는 true인 값들을 모아서 배열의 형태로 반환하지만, find는 첫 번째 요소 하나만을 반환하므로 배열이 아닌 요소값이다.

```javaScript
[1,2,2,3].filter(item => item === 2); //[2,2]
[1,2,2,3].find(item => item === 2); //2

//객체에서도
const users = [
  {id: 1, name: 'kim'},
  {id: 2, name: 'Lee'} 
];

users.find(user => user.id === 2); //{id: 2, name: 'Lee'} 해당 요소인 객체를 반환
```

### Array.prototype.findIndex

반환값이 true인 첫 번째 요소의 '인덱스'를 반환한다. true인 요소가 없다면 -1를 반환한다.

```javaScript
const users = [
  {id: 1, name: 'kim'},
  {id: 2, name: 'Lee'},
  {id: 3, name: 'Choi'}
];

users.findIndex(user => user.id === 2); //1
users.findIndex(user => user.name === 'Choi'); //2

//콜백함수를 다음과 같이 추상화할 수 있다.
function predicate(key, value){
  return item => item[key] === value; //클로저 반환
}
```

### Array.prototype.flatMap

map 메서드를 통해 생성된 배열을 평탄화한다. 즉, map과 flat 메서드를 순차적으로 실행하는 효과가 있다.
flat처럼 평탄화할 깊이를 지정할 수 없고, 1단계 평탄화만 진행한다. 깊이를 지정하고 싶다면 map 과 flat을 각각 호출해야 한다.

```javaScript
const arr = ['hello', 'world'];
arr.map(x => x.split('')).flat(); //['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
arr.flatMap(x => x.split('')); //['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

-----------------------------------------------------------------------------------------

arr.flatMap((str, index) => [index, [str, str.length]]); //[0, 'hello', 5, 1, 'world', 5]
arr.map((str, index) => [index, [str, str.length]]).flat(2); //[0, 'hello', 5, 1, 'world', 5]

```
