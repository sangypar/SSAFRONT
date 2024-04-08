# 29장 Math

## 29.1 Math 프로퍼티

> Math.PI → 3.141592(원주율 값)를 반환한다.

<br>

## 29.2 Math 메서드

#### 29.2.1 Math.abs

> Math.abs 메서드는 인수로 전달된 숫자의 절대값을 반환한다.

```javascript
Math.abs(-1);           // 1
Math.abs('-1');         // 1
Math.abs('');           // ?
Math.abs([]);           // ?
Math.abs(null);         // ?
Math.abs(undefined);    // ?
Math.abs({});           // ?
Math.abs('string');     // ?
Math.abs();             // ? 
```

[답](https://github.com/sangypar/SSAFRONT/blob/main/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20deep%20dive/29%EC%9E%A5.%20Math/%EB%8B%B5/Math.abs%20%EB%8B%B5.md)

#### 29.9.2 Math.round

> Math.round 메서드는 숫자의 소수점 이하를 반올림한 정수값을 반환한다.

```javascript
Math.round(1.4);       // 1
Math.round(1.5);       // 2
Math.round('-1.5');    // ?
Math.round('null');    // ?
```

[답](https://github.com/sangypar/SSAFRONT/blob/main/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20deep%20dive/29%EC%9E%A5.%20Math/%EB%8B%B5/Math.round%20%EB%8B%B5.md)

#### 29.9.3 Math.ceil

> Math.ceil 메서드는 숫자의 소수점 이하를 올림한 정수값을 반환한다.

```javascript
Math.ceil(1.4);     // 2
Math.ceil(-1.4);    // -1
Math.ceil(1);       // 1
Math.ceil();        // NaN
```

#### 29.9.4 Math.floor

> Math.floor 메서드는 숫자의 소수점 이하를 내림한 정수값을 반환한다.

```javascript
Math.floor(1.9);     // 1
Math.floor(-1.9);    // -2
Math.floor(1);       // 1
Math.floor();        // NaN
```

#### 29.9.5 Math.sqrt

> Math.sqrt 메서드는 인수로 전달된 숫자의 제곱근을 반환한다.

```javascript
Math.sqrt(9);     // 3
Math.sqrt(-9);    // NaN
Math.sqrt(2);     // 1.414213562373095
Math.sqrt(0);     // 0
Math.sqrt();      // NaN
```

#### 29.9.6 Math.random

> Math.random 메서드는 임의의 난수(랜덤 숫자)를 반환한다. ( 0 이상 1 미만 )

```javascript
// random 메서드를 사용해 1 ~ 10 사이 랜덤 정수를 획득 하는 방법
const random = Math.floor((Math.random() * 10) + 1);
console.log(random); // 1 ~ 10 사이의 정수

// 난수 생성 함수 만들기 (밤위 지정)
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(rand(6, 10));
```

[답]()

#### 29.9.7 Math.pow

> Math.pow 메서드는 첫 번째 인수를 밑으로, 두 번째 인수를 지수로 거듭제곱한 결과를 반환한다.

```javascript
Math.pow(2, 8);    // 256
Math.pow(2, -1);   // 0.5
Math.pow(2);       // NaN
```

ES7에서 도입된 지수 연산자를 사용하면 가독성이 더 나아진다.

```javascript
2 ** 2 ** 2;                   // 16
Math.pow(Math.pow(2, 2), 2);   // 16
```

#### 29.9.8 Math.max

> Math.max 메서드는 전달받은 인수 중에서 가장 큰 수를 반환한다. 인수가 전달되지 않으면 -Infinity를 반환한다.

```javascript
Math.max(1);         // 1
Math.max(1, 2);      // 2
Math.max(l, 2, 3);   // 3
Math.max();          // -Infinity
```

배열을 인수로 전달받아 배열의 요소 중에서 최대값을 구하려면 Function.prototype.apply 메서드 또는 스프레드 문법을 사용해야 한다.

```javascript
Math.max([1,2,3,4,5,6,7]);                // ?
Math.max.apply([1,2,3,4,5,6,7]);          // ?
Math.max.apply(null, [1,2,3,4,5,6,7]);    // ?
```

[답](https://github.com/sangypar/SSAFRONT/blob/main/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20deep%20dive/29%EC%9E%A5.%20Math/%EB%8B%B5/Math.max%20%EB%8B%B5.md)

#### 29.9.9 Math.min

> Math.min 메서드는 전달받은 인수 중에서 가장 작은 수를 반환한다. 인수가 전달되지 않으면 Infinity를 반환한다.

```javascript
Math.min(1);         // 1
Math.min(1, 2);      // 1
Math.min(l, 2, 3);   // 1
Math.min();          // Infinity
```

[답]()

