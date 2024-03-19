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
배열 형태로 인자 정보를 담고 있지만, 실제 배열이 아닌 유사 배열 객체다.
* 유사배열 객체? length 프로퍼티를 가진 객체로 for문으로 순회할 수 있는 객체를 말한다.

배열이 아니라서 배열 메서드를 사용하면 에러가 난다. 배열 메서드를 사용하려면 Function.prototype.call, Function.prototype.apply를 사용해 간접호출해야 한다.

```javaScript
function sum() {
  const array = Array.prototype.slice.call(arguments); //arguments 객체를 배열로 바꿔야 함
  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1,2)); //3
console.log(sum(1,2,3,4,5); //15
```
Rest 파라미터를 이용해 이런 번거로움을 해결하고자 한다.
```javaScript
function sum(...args){
  return args.reduce((pre, cur) => pre+cur, 0);
}

console.log(sum(1,2)); //3
console.log(sum(1,2,3,4,5)); //15
```

#### caller 프로퍼티
함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 가리킨다.

#### length 프로퍼티
함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.
arguments 객체의 length 프로퍼티와 함수 객체의 length 프로퍼티의 값은 다를 수 있으므로 주의해야 한다. arguments 객체의 length 프로퍼티는 인자 개수를 가리키고, 함수 객체의 length 프로퍼티는 매개변수의 개수를 가리킨다.
```javaScript
function baz(x, y){
  return x*y;
}
console.log(baz.length); //2
```

#### name 프로퍼티
ES5와 ES6이 다르게 작동하니 주의!
ES6에서는 name 프로퍼티는 **함수 객체를 가리키는 식별자를 값으로** 갖는다.
함수 이름과 객체를 가리키는 식별자는 의미가 다르다는 것을 잊지 말자!

```javaScript
//기명함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); //foo

//익명함수 표현식
var anonymousFunc = function() {};
//ES5 : name 프로퍼티는 빈 문자열을 값으로 갖는다
//ES6 : name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다
console.log(anonymousFunc.name); //anonymousFunc

//함수 선언문
function bar() {}
console.log(bar.name); //bar
```

#### __proto__ 접근자 프로퍼티
[[Prototype]] 내부 슬롯은 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다. 해당 내부 슬롯([[Prototype]])에 직접 접근할 수 없고 __proto__ 접근자 프로퍼티를 통해 간접적으로 프로포타입 객체에 접근할 수 있다.(간접적 접근)

#### prototype 프로퍼티
생성자 함수로 호출할 수 있는 함수 객체, **constructor만이 소유하는 프로퍼티이다.**
non-constructor과 일반객체에는 prototype 프로퍼티가 없다.

