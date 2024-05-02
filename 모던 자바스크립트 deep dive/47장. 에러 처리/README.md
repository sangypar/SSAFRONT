# 47장. 에러 처리

## 47.1 에러 처리의 필요성
> 코드를 작성하면서, 처음부터 에러가 발생하지 않는 코드를 작성하는 것이 가장 이상적이지만 이것은 사실상 불가능하다. 발생한 에러에 대해 대처하지 않고 방치할 경우 프로그램은 강제 종료된다. 이러한 이유로 코드 작성 시 에러 처리는 필수적으로 수행해야하는 작업 중 하나이다. 우리가 작성한 코드에서는 언제나 에러나 예외적인 상황이 발생할 수 있다는 것을 전제하고 이에 대응하는 코드를 작성하는 것이 중요하다.

## 47.2 try... catch... finally 문
```JS

// DOW에 button 요소가 존재하지 않으면 queryselector 메서드는 에러를 발생시키지 않고 null을 반환한다.
const $button = document.querySelector('button'); // null

$button.classList.add('disabled');
// TypeError: Cannot read property 'classList' of null

console.log('end'); // 에러로 인한 프로그램 종료 >> 미출력

```

아래는 JS에서 기본적으로 에러를 처리할 수 있는 두 가지 방법이다.

>1) querySelector나 Array#find 메서드처럼 예외적인 상황이 발생하면 반환하는 값(null 또는 -1)을 if 문이나 단축 평가 또는 옵셔널 체이닝 연산자를 통해 확인해서 처리하는 방법

```JS
// 1. if문
if ($button != null) {
    $button.classList.add('disabled');
}

// 2-1. 단축 평가
$button && $button.classList.add('disabled');

// 2-2. 단축 평가
if ($button) {
    $button.classList.add('disabled');
}
```

> 2) 에러 처리 코드를 미리 등록해 두고 에러 발생 시 해당 코드로 점프하는 방법 (try-catch(-finally)문)

```JS
  console.log('[Start]');

  try {
    foo();
  } catch (err) {
    console.error(err);
  } finally {
    console.log('[End]');
  }
```

## 47.3 Error 객체
- Error 생성자 함수를 통해 에러 객체를 생성할 수 있다.
- Error 생성자 함수에는 에러를 상세히 설명하는 에러 메시지를 인수로 전달할 수 있다.
```
  const error = new Error('정해인의 보고싶다');

  console.log(error);         // Error: 정해인의 보고싶다
                              // at index.html:50:17

  // message : 인수로 전달한 에러 메세지                     
  console.log(error.message); // 정해인의 보고싶다

  // stack : 에러를 발생시킨 콜스택의 호출 정보
  console.log(error.stack);   // Error: 정해인의 보고싶다
                              // at index.html:50:17
```
- 자바스크립트는 Error 생성자 함수를 포함해 7가지의 에러 객체를 생성할 수 있는 Error 생성자 함수를 제공한다.
![](https://velog.velcdn.com/images/chtoqur/post/88fdd06d-67d8-4d40-b2cc-58c464487864/image.png)

## 47.4 throw문
> 에러를 생성한 이후, 에러를 발생시키려면 try 코드 블록에서 throw문으로 에러 객체를 던져야 한다.
에러를 던지는 경우 catch 코드 블록이 실행되기 시작한다.

## 47.5 에러의 전파
> 에러를 적절히 캐치하지 않을 경우 에러는 호출자 방향으로 전파된다. 에러를 어디에서도 캐치하지 않으면 프로그램은 강제 종료된다.
  