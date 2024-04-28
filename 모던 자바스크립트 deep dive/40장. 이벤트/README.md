# 이벤트

## 이벤트 드리븐 프로그래밍

브라우저에서 처리해야할 특정 사건을 **이벤트**라고 하고(클릭, 키보드 입력 등), 이 이벤트에 반응하여 어떤 일을 하고 싶다면 이벤트 발생 시 호출될 함수를 브라우저에게 알려 호출을 위임한다.
**이벤트 발생 시 호출될 함수를 이벤트 핸들러**라고 하고 햄들러 호출을 위임하는 것을 **이벤트 핸들러 등록**이라고 한다.
함수를 언제 호출할지 알 수 없으므로 개발자가 명시적으로 함수를 호출하는 것이 아니라 브라우저에게 함수 호출을 위힘하는 것이다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Click me!</title>
</head>
<body>
    <button>Click me!</button>
    <script>
        const $button = document.querySelector('button');
        //사용자가 버튼 클릭하면 함수 호출하도록 설정
        $button.onclick = () => {alert('button click')};
    </script>
</body>
</html>
```

이처럼 프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 **이벤트 드리븐 프로그래밍**이라 한다.

## 이벤트 타입

이벤트 타입은 이벤트 종류를 나타내는 문자열이다.
이벤트 타입의 상세목록은 [MDN의 Event reference](https://developer.mozilla.org/ko/docs/Web/API/Event) 에서 확인할 수 있습니다.

### 마우스 이벤트
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/25fa56d6-2e0e-4c44-954c-121bd9371411)
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/718e69f3-6b04-4d2e-ab96-6a7a65092bd2)

### 키보드 이벤트
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/09c0b882-76d0-4a9f-b554-a3e464db1eed)

### 포커스 이벤트
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/c42692fe-7198-4aca-91e8-b681ebc2aff6) <br>
focusin, focusout 이벤트는 프로퍼티 방식으로 등록하면 크롬, 사파리에서 정상 동작하지 않기 때문에 꼭 addEventListener 메서드 방식을 사용해 등록해야 한다.

### 폼 이벤트
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/babfda69-9b5a-4803-989c-12466446ce26) <br>
**submit 이벤트 발생 시점**
1. form 요소 내의 input(text, checkbox, radio), select 입력 필드(textarea 제외)에서 엔터 키 눌렀을 때
2. form 요소 내의 submit 버튼(<button>, <input type="submit">)을 클릭했을 때

### 값 변경 이벤트
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/a277b2dd-e278-48ab-b5e3-34c783caa07f)

### DOM 뮤테이션 이벤트
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/4371dcd5-ae52-4974-b887-07660ccce21b)

### 뷰 이벤트
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/7032f58a-952c-41fb-9443-c46b28f4a260)

### 리소스 이벤트
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/3af4d809-1c9f-43db-8890-06b129e62616)

## 이벤트 핸들러 등록

### 이벤트 핸들러 어트리뷰트 방식
onclick처럼 on접두사와 이벤트 종류를 나타내는 이벤트타입으로 이루어져 있다. 이벤트 헨들러 어트리뷰트 값으로 함수 호출문 등의 문을 할당ㅇ하면 핸들러가 등록된다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Click me!</title>
</head>
<body>
    <button onclick="sayHi('Lee')">Click me!</button>
    <script>
        function sayHi(name) {
            console.log(`Hi! ${name}.`);
        }
    </script>
</body>
</html>
```

**주의할 점은 함수 참조가 아닌 함수 호출문 등의 문을 할당한다는 것이다.**
이벤트 핸들러를 등록할 때 콜백 함수와 마찬가지로 함수 참조를 등록해야 브라우저가 이벤트 핸들러를 호출할 수 있다. 함수 호출문을 등록했을 때는 호출문의 평가 결과가 이벤트 핸들러로 등록된다.
함수를 반환한다면 문제가 없겠지만, 함수 아닌 값을 반환하면 브라우저가 이벤트 핸들러를 호출할 수 없다.<br>
<br>
위 예제에서는 이벤트 핸들러 어트리뷰트 값으로 함수 호출문을 할당했고, 이때 **어트리뷰트 값은 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미한다.**
즉, onclick="sayHi('Lee')" 어트리뷰트는 파싱되어 아래와 같은 함수를 암묵적으로 생성하고, 어트리뷰트 이름과 동일한 키 onclick 이벤트 핸들러 프로퍼티에 할당된다.

```javaScript
function onclick(event) {
  sayHi('Lee');
}
```

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/a7f56a81-51bd-44a1-9f73-e67eac4ee80a)

<br>
이렇게 동작하는 이유는 이벤트 핸들러에 인수를 전달하기 위해서이다.

```javaScript
<button onclick="sayHi">Click me!</button>
<!--이벤트 핸들러에 인수 전달이 곤란함-->
```

이벤트 핸들러 어트리뷰트 값으로 할당한 문자열은 암묵적으로 생성되는 이벤트 핸들러의 함수 몸체이기 때문에 여러 개의 문을 할당할 수 있다.<br>
그러나 이 방식은 더는 사용하지 않는 것이 좋다. HTML과 자바스크립트는 분리하는 것이 좋다. <br>
하지만 CBD 방식의 Angular/React/Svelte/Vue.js 같은 프레임워크/라이브러리에서는 이벤트 핸들러 어트리뷰트 방식으로 이벤트를 처리한다.

```javaScript
<!-- Angular -->
<button (click)="handleClick($event)">Save</button>

{ /* React */ }
<button onClick={handleClick}>Save</button>

<!--Svelte —->
<button on:click= {handleClick} >Save</button>

<!-- Vue.js —>
<button v-on:click="handledick($event)">Save</button>
```

### 이벤트 핸들러 프로퍼티 방식

window 객체와 Document, HTMLElement 타입의 DOM 노드 객체는 이벤트 대응하는 이벤트 핸들러 프로퍼티를 갖기ㅗ 있다. on 접두사와 이벤트 종류를 나타내는 이벤트ㅏㅌ입으로 이루어져 있다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Click me!</title>
</head>
<body>
    <button>Click me!</button>
    <script>
        
        const $button = document.querySelector('button');

        $button.onclick = function() {
            console.log('button click');
        };
        
    </script>
</body>
</html>
```

이벤트 핸들러를 등록하기 위해 이벤트를 발생시킬 객체, **이벤트 타깃**과 이벤트의 종류를 나타내는 문자열인 **이벤트 타입** 그리고 **이벤트 핸들러**를 지정할 필요가 있다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/cfe7aac3-d33c-4b2f-9f42-2c285c8e2940)

이벤트 핸들러는 대부분 이벤트 발생시킬 이벤트 타깃에 바인딩하지만, 전파된 이벤트를 개치할 DOM 노드객체에 바인딩하기도 한다.
이벤트 핸들러 어트리뷰트와 이벤트 핸들러 프로퍼티는 방식이 동일하다고 할 수 있으나 어트리뷰트 방식의 HTML과 자바스크립트가 뒤섞이는 문제를 해결할 수 있었다.
하지만 이벤트 핸들러 프로퍼티에 하나의 핸들러만 바인딩할 수 있다는 단점이 있다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Click me!</title>
</head>
<body>
    <button>Click me!</button>
    <script>
        
        const $button = document.querySelector('button');

        $button.onclick = function() {
            console.log('button clicked 1');
        };

        //두번째로 할당된 이벤트로 재할당 되어
        //첫번째 핸들러는 실행되지 않는다.
        $button.onclick = function() {
            console.log('button clicked 2');
        };
        
    </script>
</body>
</html>
```

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/02e336b8-aff4-4516-a5a3-1f9ba064e0ae)

### addEvnetListener 이벤트 방식

DOM Level 2에서 도입된 EventTarget.prototype.addEventListener 메서드를 이용해 등록할 수 있다.(앞의 두 방식은 Level 0부터 있던 방식)
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/a6e98bdf-0697-44c6-93f9-750afb0dc94c)

첫 매개변수에는 이벤트 종류를 나타내는 문자열인 이벤트 타입(on을 붙이지 않는다), 두 번째 매개변수에는 이벤트 핸들러를 전달하고, 마지막 매개변수에는 이벤트를 캐치할 이벤트 전파 단계를 지정한다.
마지막 매개변수는 생략하거나 false를 지정하면 버블링 단계에서 이벤트를 캐치하고, true를 지정하면 캡처링 단계에서 이벤트를 캐치한다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Click me!</title>
</head>
<body>
    <button>Click me!</button>
    <script>
        
        const $button = document.querySelector('button');

        //핸들러 프로퍼티 방식
        // $button.onclick = function() {
        //     console.log('button click');
        // };

        $button.addEventListener('click', function(){
            console.log('button click');
        });
        
    </script>
</body>
</html>
```

이벤트 핸들러 프로퍼티 방식과 addEventListener 방식을 동시에 사용하면 어떻게 동작할까?

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Click me!</title>
</head>
<body>
    <button>Click me!</button>
    <script>
        
        const $button = document.querySelector('button');

        //핸들러 프로퍼티 방식
        $button.onclick = function() {
            console.log('button click [프로퍼티]');
        };

        //메서드 방식
        $button.addEventListener('click', function(){
            console.log('button click [메서드]');
        });
        
    </script>
</body>
</html>
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/9312777b-3474-4381-b880-95b827c28bdc)

서로 아무런 영향을 주지 않아 2개의 이벤트 핸들러가 모두 호출된다.
addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있다. 이때 등록된 순서대로 호출된다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Click me!</title>
</head>
<body>
    <button>Click me!</button>
    <script>
        
        const $button = document.querySelector('button');

        //메서드 방식
        $button.addEventListener('click', function(){
            console.log('button click [1]');
        });

        $button.addEventListener('click', function(){
            console.log('button click [2]');
        });
        
    </script>
</body>
</html>
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/04afd911-5c4f-4174-b585-c7aec8acad01)

*참조가 동일한 이벤트 핸들러를 중복 등록하면, 하나의 이벤트 핸들러만 등록된다.*

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Click me!</title>
</head>
<body>
    <button>Click me!</button>
    <script>
        
        const $button = document.querySelector('button');

        const handelclick = () => console.log('button click');

        $button.addEventListener('click', handelclick);
        $button.addEventListener('click', handelclick);
        
    </script>
</body>
</html>
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/72074287-7dc0-4cd7-bc21-1606bb11153e)

## 이벤트 핸들러 제거

