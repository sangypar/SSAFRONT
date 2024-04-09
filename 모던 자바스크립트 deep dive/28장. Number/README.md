# 28장 Number
![](https://velog.velcdn.com/images/chtoqur/post/7f73f899-5acd-4e04-852a-f3d32e63bd25/image.png)
> 표준 빌트인 객체인 Number는 원시 타입인 Number를 다룰 때 유용한 프로퍼티와 메서드를 제공한다.

## 28.1 Number 생성자 함수
- Number 객체는 생성자 함수 객체다.
- 따라서 new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있다.
- 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성한다.
- new 연산자를 사용하지 않고 Number 생성자 함수 호출 시 인스턴스가 아닌 숫자 반환
이를 통해 명시적 형변환이 가능 <br/><br/>
![](https://velog.velcdn.com/images/chtoqur/post/654b7ee6-931d-4251-abc5-fecb0a905472/image.png)

## 28.2 Number 프로퍼티
### 28.2.1 Number.EPSILON
> 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이

컴퓨터는 부동소수점 연산에서 정확한 값을 다룰 수 없기 때문에 연산 결과를 근사값으로 처리함. 따라서 이러한 부동소수점으로 인해 발생하는 오차를 해결하기 위해 Number.EPSILON을 사용한다.

![](https://velog.velcdn.com/images/chtoqur/post/31947016-b612-4320-88ed-dacf9764c3a6/image.png)

### 28.2.2 Number.MAX_VALUE
- 자바스크립트에서 표현할 수 있는 가장 큰 양수
- MAX_VALUE보다 큰 숫자 = Infinity

### 28.2.3 Number.MIN_VALUE
- 자바스크립트에서 표현할 수 있는 가장 작은 양수 값(5 x 10-324)
- Number.MIN_VALUE보다 작은 숫자 = 0
- Number.MIN_VALUE는 음수 값이 아닌 최소 양수 값을 나타냄에 주의
- 음수 부동소수점 값의 최소값은 '-Number.MIN_VALUE'

![](https://velog.velcdn.com/images/chtoqur/post/a0e0d93c-3ddf-4cc3-bf25-0c48be9cf721/image.png)

![](https://velog.velcdn.com/images/chtoqur/post/1251437d-a871-49bf-abd8-e002f29ea21d/image.png)

### 28.2.4 Number.MAX_SAFE_INTEGER
### 28.2.5 Number.MIN_SAFE_INTEGER
- 자바스크립트에서 안전하게 표현할 수 있는 가장 큰/작은 정수값

![](https://velog.velcdn.com/images/chtoqur/post/981a86a1-6cb6-4722-8aa0-dbf1bff258f3/image.png)

![](https://velog.velcdn.com/images/chtoqur/post/3ae152e9-e596-4dc6-a86a-fb2ec9cb357a/image.png)

### 28.2.6 Number.POSITIVE_INFINITY
### 28.2.7 Number.NEGATIVE_INFINITY
- 각각 양의 무한대 / 음의 무한대를 나타내는 숫자값

![](https://velog.velcdn.com/images/chtoqur/post/c3cd7ebc-6763-4d13-b9bd-cb7f1f49cc3d/image.png)

![](https://velog.velcdn.com/images/chtoqur/post/62f38fa3-eb0f-4246-94fb-9b0842c7037f/image.png)

- 기능적으로 Infinity/-Infinity와 동일하나, Infinity/-Infinity는 전역 속성이기 때문에 더 다양한 곳에서 사용될 수 있음
- ES5 이전에는 Infinity의 속성을 변경 가능했지만 Number.POSITIVE_INFINITY의 값은 변경이 불가능한 읽기 전용 값이었음

![](https://velog.velcdn.com/images/chtoqur/post/3aef1fd5-95c0-4717-ba5d-a23d91201979/image.png)

### 28.2.8 Number.NaN
- 숫자가 아님을 나타내는 숫자값
- window.NaN과 동일

![](https://velog.velcdn.com/images/chtoqur/post/95d355d5-0fae-4a50-bde0-cd651fbd191d/image.png)


## 28.3 Number 메서드
### 28.3.1 Number.isFinite
> 인수로 전달된 숫자값이 정상적인 유한수인지 검사하여 결과를 불리언 값으로 반환 (유한수 = true / 무한수 = false)

![](https://velog.velcdn.com/images/chtoqur/post/24ade546-5c43-48cd-84e0-67e8860a46d3/image.png)

![](https://velog.velcdn.com/images/chtoqur/post/ba43b5b5-535d-48ab-8ba7-ddc8f5e4ccf2/image.png)
> 빌트인 전역 함수 isFinite는 인수가 숫자가 아니어도 암묵적으로 형변환하여 검사를 수행하지만, Number.isFinite는 전달받은 인수를 따로 형변환하지 않는다.

![](https://velog.velcdn.com/images/chtoqur/post/f0fd1bb9-8b57-4a29-9f0f-3d15afa0fe2e/image.png)

### 28.3.2 Number.isInteger
> 인수로 전달된 숫자값이 정수인지 검사하여 결과를 불리언 값으로 반환. 이 때 인수를 숫자로 암묵적 형변환하지 않는다.

![](https://velog.velcdn.com/images/chtoqur/post/120fcec9-ce9a-402b-8246-f4d51a3bc42f/image.png)

### 28.3.3 Number.isNaN
>  인수 값이 NaN인지 검사하여 그 결과를 불리언 값으로 반환한다. 동일하게 인수를 숫자로 암묵적 형변환하지 않는다. 반대로 빌트인 전역 함수 isNaN은 전달받은 인수를 숫자로 암묵적 타입 변환하여 검사를 수행한다는 차이점이 존재한다.

![](https://velog.velcdn.com/images/chtoqur/post/9aa47364-7703-4c3e-8a3e-d7d8f0eca7ca/image.png)

1. isNaN
- 인수로 들어온 문자열을 숫자로 변환하려고 시도
- 문자열을 숫자로 변환할 수 없기 때문에 NaN으로 간주
- 이에 따라 true를 반환
<br/>
2. Number.isNaN
- 인수 값이 숫자인지 확인 >> 문자열이기 때문에 숫자가 아님
- 따라서 숫자가 아니기 때문에 false 반환

### 28.3.4 Number.isSafeInteger
> 인수로 전달된 숫자값이 안전한 정수(-2^53 - 1 ~ 2^53 - 1)인지 검사하여 결과를 불리언 값으로 반환

### 28.3.5 Number.prototype.toExponential
- 숫자를 지수 표기법으로 변환하여 문자열로 반환
- 매우 크거나 작은 숫자를 표기할 때 주로 사용
- e 앞에 있는 숫자에 10의 n승을 곱하는 형식으로 수를 나타냄
- 소수점 이하로 표현할 자릿수는 인수를 통해 전달할 수 있다.

![](https://velog.velcdn.com/images/chtoqur/post/0c50611c-7856-4935-9418-3c7844bd7f57/image.png)

![](https://velog.velcdn.com/images/chtoqur/post/217669c3-3309-495a-996f-820efcce892f/image.png)
> 77뒤의 .이 소수 구분 기호로 해석 >> 에러

![](https://velog.velcdn.com/images/chtoqur/post/de751611-9fdf-4952-adf2-16296f22b3b4/image.png)

> 다음과 같이 숫자 리터럴과 함께 메서드를 사용할 경우 혼란을 방지하기 위해 그룹 연산자를 사용할 것을 권장

### 28.3.6 Number.prototype.toFixed
- 숫자를 반올림하여 문자열로 반환
- 0~20사이의 정수값을 인수로 전달해서 반올림하는 소수점 이하 자릿수를 설정할 수 있음
- 인수를 생략할 경우 기본값 0 지정

![](https://velog.velcdn.com/images/chtoqur/post/d278feae-b34d-47a6-89d6-0fb5bb9402e0/image.png)

### 28.3.7 Number.prototype.toPrecision
- 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환
- 인수로 전달받은 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 결과 반환
- 전체 자릿수를 나타내는 0~21 사이의 정수값을 인수로 전달할 수 있음
- 인수 생략할 경우 기본값 0 지정

![](https://velog.velcdn.com/images/chtoqur/post/0b49ad2e-2b41-4ea4-86d0-45e5609f022b/image.png)

### 28.3.8 Number.prototype.toString
- 숫자를 문자열로 변환하여 반환하는 메서드
- 인수로 진법을 지정할 수 있음, 생략 시 10진법 지정

![](https://velog.velcdn.com/images/chtoqur/post/147878db-96fd-4e47-a094-e4d7f861da6b/image.png)

