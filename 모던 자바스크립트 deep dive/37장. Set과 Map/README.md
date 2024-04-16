## 37.1 Set

- Set 객체는 중복되지 않는 유일한 값들의 집합
- Set 객체의 특성은 수학적 집합의 특성과 일치 - 교집합, 합집합, 차집합, 여집합 등 구현

구분|배열|Set 객체
:-:|:-:|:-:
중복 포함 | O | X
요소 순서 | O | X
인덱스 접근 | O | X

### 37.1.1 Set 객체의 생성

- Set 객체는 Set 생성자 함수로 생성
- 생성자 함수에 인수를 전달하지 않으면 빈 Set 객체 생성
- 이터러블을 인수로 전달받아 Set 객체 생성하고 중복된 값은 요소로 저장되지 않음

```javascript

const set = new Set();
console.log(set); // Set(0) {size: 0}

const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // Set(4) {"h", "e", "l", "o"}

```

### 37.1.2 요소 개수 확인

- Set.prototype.size 프로퍼티 사용
- setter 함수 없이 getter 함수만 존재하는 접근자 프로퍼티이기에 요소 개수 변경 불가

```javascript

const { size } = new Set{[1, 2, 3, 3]};
console.log(size); // 3

const set = new Set([1, 2, 3]);

console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
// {set: undefined, enumerable: false, configurable: true, get: ƒ}

set.size = 10;
console.log(set.size); // 3

```

### 37.1.3 요소 추가

- Set.prototype.add 메서드 사용
- 새로운 요소가 추가된 Set 객체 반환 - 연속 호출 가능
- 중복 추가는 에러를 발생시키지 않고 무시
- NaN과 NaN을 중복으로 판단, +0, -0 역시 중복으로 판단
- 자바스크립트의 모든 값을 요소로 저장 가능

```javascript

const set = new Set();
console.log(set); // Set(0) {}

set.add(1);
console.log(set); // Set(1) {1}

set.add(2).add(3);
console.log(set); // Set(3) {1, 2, 3}

set.add(3);
console.log(set); // Set(3) {1, 2, 3}

const set2= new Set();
set2.add(NaN).add(NaN).add(+0).add(-0);
console.log(set2); // Set(2) {NaN, 0}

```

### 37.1.4 요소 존재 여부 확인

- Set.prototype.has 메서드 사용
- 특정 요소의 존재 여부를 나타내는 불리언 값 반환

```javascript

const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false

```

### 37.1.5 요소 삭제

- Set.prototype.delete 메서드 사용
- 삭제 성공 여부를 나타내는 불리언 값 반환 - 연속 호출 불가
- 인덱스가 아닌 삭제하려는 요소값을 인수로 전달
- 존재하지 않는 요소를 삭제하면 에러 없이 무시

```javascript

const set = new Set([1, 2, 3]);

set.delete(2);
console.log(set); // Set(2) {1, 3}

set.delete(2);
console.log(set); // Set(2) {1, 3}

set.delete(1).delete(3); // TypeError: set.delete(...).delete is not a function

```

### 37.1.6 요소 일괄 삭제

- Set.prototype.clear 메서드 사용하며 이는 언제나 undefined 반환

```javascript

const set = new Set([1, 2, 3]);

set.clear();

console.log(set); // Set(0) {}

```

### 37.1.7 요소 순회

- Set.prototype.forEach 메서드 사용
- 콜백 함수와 forEach 메서드의 콜백 함수 내부에서 this로 사용될 객체(옵션)를 인수로 전달
- 콜백 함수는 첫 번째 인수와 두 번째 인수는 같은 값 - Array.prototype.forEach 메서드와 인터페이스 통일을 위함
- set 객체는 이터러블이기에 for...of 문으로 순회할 수 있고, 스프레드 문법과 배열 디스트럭처링도 가능
- set 객체는 요소의 순서에 의미를 갖지 않지만 Set 객체를 순회하는 순서는 요소가 추가된 순서를 따름

```javascript

const set = new Set([1, 2, 3]);

set.forEach((v, v2, set) => console.log(v, v2, set));

/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/

console.log(Symbol.iterator in set); // true

for(const value of set) {
  console.log(value); // 1 2 3
}

console.log([...set]); // {1, 2, 3}

const [a, ...rest] = set;
console.log(a, rest); // 1 {2, 3}

```

## 37.1.8 집합 연산

<b>교집합</b>

```javascript

Set.prototype.intersection = functino (set) {
  const result = new Set();

  for(const value of set) {
    if(this.has(value)) result.add(value);
  }

  return result;
}

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.intersection(setB)); // Set(2) {2, 4}
console.log(setB.intersection(setA)); // Set(2) {2, 4}

```

```javascript

Set.prototype.intersection = function (set) {
  return new Set([...this].filter(v => set.has(v)));
};

```

<b>합집합</b>

```javascript

Set.prototype.union = functino (set) {
  const result = new Set(this);

  for(const value of set) {
    result.add(value);
  }

  return result;
}

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}

```

```javascript

Set.prototype.union = function (set) {
  return new Set([...this, ...set]);
};

```

<b>차집합</b>

```javascript

Set.prototype.difference = functino (set) {
  const result = new Set(this);

  for(const value of set) {
    result.delete(value);
  }

  return result;
}

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.difference(setB)); // Set(2) {1, 3}
console.log(setB.difference(setA)); // Set(0) {}

```

```javascript

Set.prototype.difference = function (set) {
  return new Set([...this].filter(v => !set.has(v)));
};

```

<b>부분 집합과 상위 집합</b>

```javascript

Set.prototype.isSuperset = functino (subset) {

  for(const value of subset) {
    if(!this.has(value)) return false;
  }

  return true;
}

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.isSuperset(setB)); // true
console.log(setB.isSuperset(setA)); // false

```

```javascript

Set.prototype.isSuperset = function (subset) {
  const supersetArr = [...this];
  return [...subset].every(v => supersetArr.includes(v));
};

```

## 37.2 Map
