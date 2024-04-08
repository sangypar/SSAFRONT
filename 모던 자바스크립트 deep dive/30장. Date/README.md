# 30장 Date

Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수이다.

## 30.1 Date 생성자 함수

Date는 생성자 함수다. Date 생성자 함수로 생성한 Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖는다.
Date 생성자 함수로 생성한 Date 객체는 현재 날짜와 시간을 나타내는 정수값을 가진다.

#### 30.1.1 new Date()

인수 없이 new 연산자와 함께 호출하면 현재 날짜와 시간을 가지는 Date 객체를 반환한다.

Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만 Date 객체를 콘솔에 출력하면 기본적으로 날짜와 시간 정보를 출력한다.

new 연산자 없이 호출하면 Date 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환한다.

```javascript
new Date(); // Mon Apr 08 2024 23:51:29 GMT+0900 (한국 표준시)
Date(); // 'Mon Apr 08 2024 23:51:29 GMT+0900 (한국 표준시)'
```

#### 30.1.2 new Date(milliseconds)

Date 생성자 함수에 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.

```javascript
new Date(0); // Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)

// 86400000ms == 하루
new Date(86400000); // Fri Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)
```

#### 30.1.3 new Date(dateString)

Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다. 이때 인수로 전달한 문자열은 Date.parse 메서드에 의해 해석 가능한 형식이어야 한다.

```javascript
new Date('Apr 28, 2024 10:00:00');
// Sun Apr 28 2024 10:00:00 GMT+0900 (한국 표준시)
new Date('2024/04/28/10:00:00');
// Sun Apr 28 2024 10:00:00 GMT+0900 (한국 표준시)
```

#### 30.1.4 new Date(year, month[, day, hour, minute, second, millisecond])

Date 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

```javascript
new Date(2024, 3); // Mon Apr 01 2024 00:00:00 GMT+0900 (한국 표준시)
new Date(2024, 3, 8, 10, 00, 00, 0); // Mon Apr 08 2024 10:00:00 GMT+0900 (한국 표준시)
```

<br>

## 30.2 Date 메서드

#### 30.2.1 Date.now

```javascript

```

#### 30.2.2 Date.parse

```javascript

```

#### 30.2.3 Date.UTC

```javascript

```

#### 30.2.4 Date.prototype.getFullYear

```javascript

```

#### 30.2.5 Date.prototype.setFullYear

```javascript

```

#### 30.2.6 Date.prototype.getMonth

```javascript

```

#### 30.2.7 Date.prototype.setMonth

```javascript

```

#### 30.2.8 Date.prototype.getDate

```javascript

```

#### 30.2.9 Date.prototype.setDate

```javascript

```

#### 30.2.10 Date.prototype.getDay

```javascript

```

#### 30.2.11 Date.prototype.getHours

```javascript

```

#### 30.2.12 Date.prototype.setHours

```javascript

```

#### 30.2.13 Date.prototype.getiviinutes

```javascript

```

#### 30.2.14 Date.prototype.setiviin나tes

```javascript

```

#### 30.2.15 Date.prototype.getSeconds

```javascript

```

#### 30.2.16 Date.prototype.setSeconds

```javascript

```

#### 30.2.17 Date.prototype.getMilliseconds

```javascript

```

#### 30.2.18 Date.prototype.setMilliseconds

```javascript

```

#### 30.2.19 Date.prototype.getTime

```javascript

```

#### 30.2.20 Date.prototype.setTime

```javascript

```

#### 30.2.21 Date.prototype.getTimezoneOffset

```javascript

```

#### 30.2.22 Date.prototype.toDateString

```javascript

```

#### 30.2.23 Date.prototype.toTimeString

```javascript

```

#### 30.2.24 Date.prototype.toISOString

```javascript

```

#### 30.2.25 Date.prototype.toLocaleString

```javascript

```

#### 30.2.26 Date.prototype.toLocaleTimeString

```javascript

```

<br>

## 30.3 Date를 활용한 시계 예제 

```javascript

```
