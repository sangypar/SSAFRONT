
## 31.1 정규 표현식이란?

- 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어
- 문자열을 대상으로 패턴 매칭 기능 제공

![regExp_1](https://github.com/sangypar/SSAFRONT/assets/106229016/e5fa67f9-fd8b-4a56-80a5-b1790fb002ae)

- 반복문과 조건문 없이 패턴을 정의하고 테스트하는 것으로 간단히 체크
- 가독성이 좋지는 않음

  ## 31.2 정규 표현식의 생성

- 정규 표현식 리터럴과 RegExp 생성자 함수를 사용하여 정규 표현식 객체 생성

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/71b60493-6265-430b-a201-34f09c6ab3ff)

![regExp_2](https://github.com/sangypar/SSAFRONT/assets/106229016/f4c38bfb-2075-48f2-a4e2-da75e3790dd9)

- RegExp 생성자 함수를 사용하여 RegExp 객체 생성 가능

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/674ed619-3699-4c6e-8ad3-d36ebd451987)


![regExp_3](https://github.com/sangypar/SSAFRONT/assets/106229016/b94a38f5-84ea-438b-9203-e6f40894e1ad)

## 31.3 RegExp 메서드

정규표현식을 사용하는 메서드

- <b>RegExp.prototype.exec</b>
- <b>RegExp.prototype.test</b>
- <b>String.prototype.match</b>
- String.prototype.replace
- String.prototype.search
- String.prototype.split

### 31.3.1 ResExp.prototype.exec

- 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환
- 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환

![regExp_4](https://github.com/sangypar/SSAFRONT/assets/106229016/44e5e3bb-834d-4105-8549-313fa5faac36)

### 31.3.2 ResExp.prototype.test

- 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환

![regExp_5](https://github.com/sangypar/SSAFRONT/assets/106229016/613d672f-ed42-4a8c-855b-55e26d417074)

### 31.3.3 String.prototype.match

- 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환

![regExp_6](https://github.com/sangypar/SSAFRONT/assets/106229016/917eecba-0f9b-4a3e-8c1f-3320ba532a1a)

- exec 메서드는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환
- match 메서드는 g 플래그가 지정되면 모든 매칭 결과를 배열로 반환

![regExp_7](https://github.com/sangypar/SSAFRONT/assets/106229016/2c92733f-c21d-4fee-9fd3-ef0ab757a2bc)

## 31.4 플래그

- 패턴과 함께 정규 표현식을 구성하는 플래그는 <b>정규 표현식의 검색방식을 설정하기 위해 사용</b>

플래그 | 의미 | 설명
:-:|:-:|:-:
i | Ignore case | 대소문자를 구별하지 않고 패턴 검색
g | Global | 대상 문자열 내에서 패턴과 일치하는 모든 문자열 전역 검색
m | Multi Line | 문자열의 행이 바뀌더라도 패턴 검색 지속

- 플래그는 옵션이므로 선택적으로 사용할 수 있으며, 순서와 상관없이 하나 이상의 플래그를 동시에 설정 가능
- 아무것도 지정하지 않으면 대소문자를 구별해서 패턴 검색
- 문자열에 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭한 대상만 검색하고 종료

![regExp_8](https://github.com/sangypar/SSAFRONT/assets/106229016/65e66068-cf8f-4e75-8792-7e5df4fc377e)

## 31.5 패턴

- 패턴은 <b>문자열의 일정한 규칙을 표현하기 위해 사용</b>, 플래그는 검색 방식을 설정하기 위해 사용
- /로 열고 닫으며 문자열의 따옴표는 생략
- 따옴표를 포함하면 따옴표까지도 패턴에 포함되어 검색
- 특별한 의미를 가지는 메타문자 또는 기호로 표현 가능
- 어떤 문자열 내에 패턴과 일치하는 문자열이 존재할 때 '정규 표현식과 매치한다'고 표현

### 31.5.1 문자열 검색

- 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열 검색

![regExp_9](https://github.com/sangypar/SSAFRONT/assets/106229016/8cc1cc8e-acb3-45e0-9541-51023722865d)

### 31.5.2 임의의 문자열 검색

- .은 임의의 문자 한 개를 의미하며 문자의 내용은 무엇이든 상관 ×

![regExp_10](https://github.com/sangypar/SSAFRONT/assets/106229016/3c9a85ab-f2dd-41a4-94ce-64c2933cfac5)

### 31.5.3 반복 검색

- {m, n}은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열
- 콤마 뒤에 공백이 있으면 정상 동작 ×

![regExp_11](https://github.com/sangypar/SSAFRONT/assets/106229016/7552e02f-2f6b-4274-a191-00c199d7b0cf)

- {n}은 앞선 패턴이 반복되는 문자열 즉, {n,n}

![regExp_12](https://github.com/sangypar/SSAFRONT/assets/106229016/f2ed3934-dc79-4ae5-b95d-6f8228aeaebe)

- {n,}은 앞선 패턴이 최소 n번 이상 반복되는 문자열

![regExp_13](https://github.com/sangypar/SSAFRONT/assets/106229016/f6b308c4-0dbd-48e7-b599-f75828db1459)

- +는 앞선 패턴이 최소 한번 이상 반복되는 문자열 즉, {1,}

![regExp_14](https://github.com/sangypar/SSAFRONT/assets/106229016/dedddba7-779c-4008-a8d0-5eb05ceffc54)

- ?는 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는 문자열 즉, {0,1}

![regExp_15](https://github.com/sangypar/SSAFRONT/assets/106229016/7256da51-31d4-4eae-ab77-bb4623587782)

### 31.5.4 OR 검색




