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
