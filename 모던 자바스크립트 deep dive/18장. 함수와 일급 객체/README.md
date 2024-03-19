# 함수와 일급 객체

## 일급 객체
```
1. 무명의 리터러로 생성 가능. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료 구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.
→ 자바스크립트의 함수는 위의 조건을 모두 만족하므로 일급 객체다.
```
함수를 객체와 동일하게 사용할 수 있다.
함수는 값과 동일하게 취급할 수 있다. 값을 사용할 수 있는 곳이라면 어디든 리터럴로 정의할 수 있으며 런타임에 함수 객체로 평가된다.
* **일반 객체처럼 함수의 매개변수에 전달 가능**
* **함수의 반환값으로도 사용 가능**

## 함수 객체의 프로퍼티
arguments, caller, length, name, prototype 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다. 일반 객체에는 없는 프로퍼티이다.
__proto__는 접근자 프로퍼티로, Object.prototype 객체의 프로퍼티를 상속받은 것으로, 모든 객체가 사용할 수 있다.

#### arguments 프로퍼티
arguments 프로퍼티 값은 arguments 객체이다. arguments 객체는 **함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이다.**
선언된 매개변수의 개수보다 인수를 적게 전달했을 경우, 인수가 전달되지 않은 매개변수는 undefined로 초기화된 상태를 유지한다. 인수를 더 많이 전달한 경우, 초과된 인수는 무시된다. → 버려진다기 보다는 arguments객체에 프로퍼티로 보관된다.

```javaScript
function multiply(x, y){
  console.log(arguments);
  return x*y;
}

console.log(multiply()); //NaN
console.log(multiply(1)); //NaN
console.log(multiply(1,2)); //2
console.log(multiply(1,2,3)); //2
```
```
//마지막 콘솔로그는
Arguments(3) [1,2,3, callee: f, Symbol(Symbol.iterator): f]
0 : 1
1 : 2
2 : 3
...
```
arguments 객체는 인수를 프로퍼티 값으로 소유, 키는 인수의 순서를 나타낸다. (배열의 인덱스값) 
arguments 객체는 매개변수 개수를 확정할 수 없는 **가변 인자 함수를 구현할 때** 유용하다.
