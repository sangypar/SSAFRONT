
디스트럭처링 할당(구조 분해 할당)은 구조화된 배열과 같은 이터러블 또는 객체를 비구조화하여 1개 이상의 변수에 개별적으로 할당하는 것

## 36.1 배열 디스트럭처링 할당

ES5에서 구조화된 배열을 디스트럭처링하여 1개 이상의 변수에 할당하는 방법은 다음과 같음

```javascript
var arr = [1, 2, 3];

var one = arr[0];
var two = arr[1];
var three = arr[1];

console.log(one, two, three);
```

- ES6의 배열 디스트럭처링 할당은 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당
- 배열 디스트럭처링 할당의 대상(할당문의 우변)은 이터러블이어야 하며, 할당 기준은 배열의 인덱스

```javascript
const arr = [1, 2, 3];

const [one, two, three] = arr;

console.log(one, two, three);
```

```javascript
const [x, y]; // SyntaxError: Missing initializer in destructuring declaration

const [a, b] = {}; // TypeError: {} is not iterable

let x, y; // 선언과 할당을 분리할 수 있지만 const 키워드로 변수 선언 불가능
[x, y] = [1, 2];
```

배열 디스트럭처링 할당의 기준은 배열의 인덱스이며 순서대로 할당되고 변수의 개수와 이터러블의 요소 개수가 일치할 필요 없음

```javascript
const [c, d] = [1];
console.log(c, d); // 1 undefined

const [e, f] = [1, 2, 3];
console.log(e, f); // 1 2

const[g, , h] = [1, 2, 3];
console.log(g, h); // 1 3
```

변수에 기본값 설정도 가능

```javascript
const [a, b, c = 3] = [1, 2];
console.log(a, b, c); // 1 2 3

const[e, f = 10, g = 3] = [1, 2];
console.log(e, f, g); // 1 2 3
```

Rest 파라미터와 유사한 Rest 요소 사용 가능 (반드시 마지막에 위치)

```javascript
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [2, 3]
```

배열과 같은 이터러블에서 필요한 요소만 추출하여 변수에 할당하고 싶을 때 유용

```javascript

function parseURL(url = '') {

  // '://' 앞의 문자열(protocol)
  // '/' 이전의 '/'로 시작하지 않는 문자열(host)
  // '/' 이후의 문자열(path)
  const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);

  if (!parsedURL) return {};

  const [, protocol, host, path] = parsedURL;

  return {protocol, host, path};

}

const parsedURL = parseURL("https://www.youtube.com/watch?v=Vk5-c_v4gMU");

console.log(parsedURL);

/*
{
host: "www.youtube.com"
path: "watch?v=Vk5-c_v4gMU"
protocol: "https"
}
*/
```

## 36.2 객체 디스트럭처링 할당

ES5에서 객체의 각 프로퍼티를 객체로부터 디스트럭처링하여 변수에 할당하기 위해서는 프로퍼티 키 사용

```javascript
var user = { firstName: 'Iltae', lastName: 'Kim' };

var firstName = user.firstName;
var lastName = user.lastName;

console.log(firstName, lastName); // Iltae Kim
```

- ES6의 객체 디스트럭처링 할당은 객체의 각 프로퍼티를 객체로부처 추출하여 1개 이상의 변수에 할당
- 객체 디스트럭처링 할당의 대상(할당문의 우변)응 객체이어야 하며, 할당 기준은 프로퍼티 키

```javascript
const { lastName, firstName } = user;

console.log(firstName, lastName); // Iltae Kim
```

우변에 객체 또는 객체로 평가될 수 있는 표현식(문자열, 숫자, 배열 등)을 할당하지 않으면 에러 발생

```javascript
const { lastName, firstName }; // SyntaxError: Missing initializer in destructuring declaration

const { lastName, firstName } = null; // TypeError: Cannot destructure property 'lastName' of 'null' as it is null.
```

```javascript
const { lastName, firstName } = user;
// const { lastName: lastName, firstName: firstName } = user;
const { lastName: ln, firstName: fn } = user;

console.log(fn, ln); // Iltae Kim
```

변수에 기본값 설정 가능

```javascript
const { firstName = 'Iltae', lastName } = { lastName : 'Kim' };
console.log(firstName, lastName); // Iltae Kim

const { firstName: fn = 'Iltae', lastName: ln } = { lastName: 'Kim' };
console.log(fn, ln); // Iltae Kim
```

객체에서 프로퍼치 키로 필요한 프로퍼티 값만 추출하여 변수에 할당하고 싶을 때 유용

```javascript
const str = 'Hello';
const { length } = str;
console.log(length); // 5

const todo = { id: 1, content: 'HTML', completed: true };
const { id } = todo;
console.log(id); // 1
```

객체를 인수로 전달받는 함수의 매개변수에도 사용 가능

```javascript
function printTodo(todo) {
  console.log(`할일 ${todo.content}은 ${todo.completed? '완료' : '비완료'} 상태입니다.`
}

printTodo({ id: 1, content: 'HTML', completed: true}); 할일 HTML은 완료 상태입니다.
```

```javascript
function printTodo({ content, completed }) {
  console.log(`할일 ${todo.content}은 ${todo.completed? '완료' : '비완료'} 상태입니다.`
}

printTodo({ id: 1, content: 'HTML', completed: true}); 할일 HTML은 완료 상태입니다.
```

배열의 요소가 객체인 경우 배열 디스트럭처링 할당과 객체 디스트럭처링 할당 혼용 그리고 중첩 객체도 가능

```javascript
const todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: false },
  { id: 3, content: 'JS', completed: false }
];

const [, { id }] = todos;
console.log(id); // ?

const user = {
  name: 'Kim',
  address: {
    zipCode: '07620',
    city: 'Seoul'
}
};

const { address: { city } } = user;
console.log(city); // 'Seoul’
```

Rest 프로퍼티 사용 가능

```javascript
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 { y: 2, z: 3 }
```

### React 예시
```javascript

function ParentComponent() {
  const person = {
    name: 'KIM',
    age: 30
  };
  
  return (
    <ChildComponent person={person} />
  );
}


function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

```
