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

addEventListener 메서드로 등록한 이벤트 핸들러를 제거하려면 EventTarget.prototype.removeEventListener 메서드를 사용한다. removeEventListener 메서드는 addEventListener에 전달할 수 있는 인수와 동일하다. *단, addEventListener 메서드에 전달한 인수와 removeEventListener에 전달한 인수가 동일하지 않으면 이벤트 핸들러가 제거되지 않는다.* 그래서 무명 함수를 등록한 경우는 제거할 수 없다. 

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

        //등록
        $button.addEventListener('click', handelclick);
        //$button.addEventListener('click', () => console.log('button click')); //참조할 수 없으므로 제거할 수 없다.

        $button.removeEventListener('click', handelclick, true); //실패
        $button.removeEventListener('click', handelclick); //성공
        
    </script>
</body>
</html>
```

기명 이벤트 핸들러 내부에서 removeEventListener를 호출하여 이벤트 핸들러를 제거하는 것은 가능하다. 이때 이벤트 핸들러는 단 한번만 호출된다.
기명 함수를 이벤트 핸들러로 등록할 수 없다면, 호출된 함수, 즉 함수 자신을 가리키는 arguments.callee를 사용할 수도 있다.

```javaScript
        $button.addEventListener('click', function foo(){
            console.log('button click');

            //바로 핸들러를 제거하면 한번만!! 호출된다.
            $button.removeEventListener('click', foo);
        })
//////// callee 사용 가능 ////////////
        $button.addEventListener('click', function foo(){
            console.log('button click');

            //바로 핸들러를 제거하면 한번만!! 호출된다.
            $button.removeEventListener('click', arguments.callee);
        })
```

arguments.callee는 최적화를 방ㅎ하므로 strict mode에서 사용이 금지된다. 따라서 가급적 이벤트 핸들러의 참조를 변수나 자료구조에 저장하여 제거하는 편이 좋다.<br>
<br>
이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트핸들러는 removeEventListener로 제거할 수 없다. 제거하려면 핸들러 프로퍼티에 null를 할당한다.

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

        //등록
        $button.onclick = handelclick;

        //remove...로 제거할 수 없다.
        $button.removeEventListener('click', handelclick);

        //대신 null을 할당하여 제거할 수 있다.
        $button.onclick = null;

    </script>
</body>
</html>
```

## 이벤트 객체

**생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.**

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<!-- 어트리뷰트 방식일 경우는 event가 아닌 다른 이름으로는 이벤트 객체를 전달받지 못한다. -->
<body onclick="showCoords(event)">
    <p>클릭한 곳의 좌표가 표시됩니다.</p>
    <em class="message"></em>
    <script>
        
        const $msg = document.querySelector('.messaege');

        //클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 인수로 전달된다.
        function showCoords(e) {
            $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
        }

        // document.onclick = showCoords; //어트리뷰트 방식이 아닐때 사용
    </script>
</body>
</html>
```

이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 인수로 전달되어 매개변수 e에 암묵적으로 할당된다. 매개변수는 명시적으로 선언해야 하나, e라는 이름 외에 다른 변수를 사용해도 상관없다.
그러나 이벤트 핸들러 어트리뷰트 방식으로 이벤트 핸들러르 등록했다면 꼭 event를 통해 이벤트 객체를 전달받아야 한다. 어트리뷰트 값은 사실 암묵적으로 생성되는 onclick="showCoords(event)"라고 파싱되는 이벤트 핸들러의 함수 몸체를 의미하기 때문이다.

### 이벤트 객체의 상속 구조

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/1189e6a5-da81-479c-bd8d-0ed738c2ea83)

이벤트가 발생하면 다양한 이벤트 객체가 생성자 함수에 의해 생성되고, 그래서 이 개체는 프로토타입으로 구성된 체인의 일원이 된다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/27117bdb-2135-41e2-99ff-f2b7590d4deb)

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/4eb58323-86e3-47c3-9b7c-aa76ec7c8af3)

객체 중 일부는 사용자 행위에 의해 생성된 것이고, 일부는 자바스크립트 코드에 의해 인위적으로 생성된 것이다. MouseEvnet는 사용자 행위에 따라 생성되는 객체이며, CustomEvent는 자바스크립트 코드에 의해 인위적으로 생성한 이벤트 객체이다.
Event 인터페이스에는 모든 이벤트 객체의 공통 프로퍼티가 정의되어 있고, FocusEvent, MouseEvent 등 하위 인터페이스에는 이벤트 타입에 따른 고유 프로퍼티가 정의되어 있다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="text">
    <input type="checkbox">
    <button>Click me!</button>

    <script>

        const $input = document.querySelector('input[type=text]');
        const $checkbox = document.querySelector('input[type=checkbox]');
        const $button = document.querySelector('button');

        window.onload = console.log;
        //load 이벤트가 발생하면 Event 타입 객체가 생성된다.

        $checkbox.onchange = console.log;
        //change 이벤트가 발생하면 Event 타입 객체가 생성된다.

        $input.onfocus = console.log;
        //focus 이벤트가 발생하면 FocusEvnet객체가 생성된다.

        $input.oninput = console.log;
        //input 이벤트가 발생하면 InputEvent 객체가 생성된다.

        $input.keyup = console.log;
        //keyup이벤트가 발생하면 KeyBoardEvent 객체가 생성된다.

        $button.onclick = console.log;
        //click 이벤트가 발생하면 MouseEvnet 타입의 이벤트 객체가 생성된다.

    </script>
</body>
</html>
```

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/259ef315-563d-4713-a157-4430ffe1388c)

### 이벤트 객체의 공통 프로퍼티

Event 인터페이스에 있는 프로퍼티는 모든 파생 이벤트 객체에 상속된다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/daab8c28-f842-46d2-b853-623f9beacd8d)

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/017feaf0-4c3e-44fd-bb93-65650e25df7c)

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="checkbox">
    <em class="message">off</em>

    <script>
        const $checkbox = document.querySelector('input[type=checkbox]');
        const $msg = document.querySelector('.message');

        //change 이벤트가 발생하면 EVENT 타입의 객체가 생성된다.
        $checkbox.onchange= e => {
            console.log(Object.getPrototypeOf(e) === Event.prototype); //true

            //e.target은 change를 발생시킨 DOM 요소 $checkbox를 가리키고
            //e.target.checked는 체크박스 요소의 현재 체크 상태를 나타낸다.
            $msg.textContent = e.target.checked? 'on':'off';
        }

    </script>
</body>
</html>
```

위 예제에서 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티는 둘다 $checkbox를 가리킨다.
일반적으로는 이벤트 객체 target 프로퍼티와 currentTarget 프로퍼티는 동일한 DOM 요소를 가리키지만 이벤트를 위임하게 되면 서로 다른 요소를 가리킬 수도 있다.

### 마우스 정보 취득

click, dblclick, mousedown, mouseup, mousemove, mouseenter, mouseleave 이벤트가 발생하면 MouseEvent 이벤트 객체가 생성된다.
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/445ca6ab-e5bf-4ca3-90d9-8458d5459d2e)

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/1121370c-c814-461f-9001-61bab877cee8)

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마우스 정보 취득</title>
    <style>
        .box{
            width: 100px;
            height: 100px;
            background-color: #fff700;
            border: 5px solid pink;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="box"></div>

    <script>
        //드래그 대상 요소 설정
        const $box = document.querySelector('.box');

        //드래그 시작 시점 마우스 포인터 위치
        const initialMousePos = { x:0, y:0 };
        //오프셋: 이동할 거리
        const offset = {x:0, y:0};

        //mousemove 이벤트핸들러
        const move = e => {
            offset.x = e.clientX - initialMousePos.x;
            offset.y = e.clientY - initialMousePos.y;
            //현재 위치 - 시작 위치 차이

            $box.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
            //translate3d는 GPU를 사용하므로 absolute의 top, left 사용하는거보다 빠르다.
            //top, left는 레이아웃에 영향을 준다.
        };

        //mousedown 이벤트가 발생하면 드래그 시작 시점 포인터 좌표를 저장한다.
        $box.addEventListener('mousedown', (e) => {
            /*
             * 이동 거리 계산을 위해 mousedown 이벤트 발생하면 (드래그 시작) 드래그 시작지점의 좌표인 마우스 포인터 좌표를 저장해준다.
             * 한번이상 드래그로 이동한 경우 move에서 translate3d(${offset.x} px, ${offset.y} px, 0)로 이동한 상태이니
             * offset.x와 offset.y를 빼준다.
            */
           initialMousePos.x = e.clientX - offset.x;
           initialMousePos.y = e.clientY - offset.y;

           document.addEventListener('mousemove', move); //down이벤트가 발생하면 box 요소를 이동시킨다.
        });

        //mouseup이벤트가 발생하면 move이벤트 제거해 이동을 멈춘다.
        document.addEventListener('mouseup', () =>{
            document.removeEventListener('mousemove', move);
        });
    </script>
</body>
</html>
```

### 키보드 정보 취득

```javaScript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>키보드 정보 취득</title>
</head>

<body>
    <input type="text" />
    <em class="message"></em>
    <script>
        const $input = document.querySelector('input[type=text]');
        const $msg = document.querySelector('.message');

        $input.onkeyup = e => {
            //e.key는 문자열로 반환한다
            //입력한키가 enter키가 아니면 무시
            if (e.key !== 'Enter') return;

            //엔터키라면 입력된 값 출력
            $msg.textContent = e.target.value;
            e.target.value = ''; //초기화
        };
    </script>
</body>

</html>
```

## 이벤트 전파

DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다. **이벤트 전파**라고 부른다.
ul의 두번째 자식 요소인 li요소를 클릭했을 때 클릭이벤트가 발생하게 한다. **생성된 이벤트 객체는 이벤트 발생시긴 DOM 요소인 이벤트 타깃을 중심으로 DOM 트리를 통해 전파된다.**
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/57332f75-e05b-47a2-89dc-5e19c93171be)

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id="fruits">
        <li id="apple">Apple</li>
        <li id="banana">Banana</li>
        <li id="orange">Orange</li>
    </ul>
    <script>
        const $fruits = document.getElementById('fruits');

        $fruits.addEventListener('click', e => {
            console.log(`이벤트 단계: ${e.eventPhase}`); //버블링단계
            console.log(`이벤트 타깃: ${e.target}`); //[object HTMLElement]
            console.log(`커런트 타깃: ${e.currentTarget}`); //[Object HTMLUListElement]
        })
    </script>
</body>
</html>
```

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/eea81e9a-78c7-4e84-907b-31eefaa5e627)

li 요소를 클릭하면 클릭 이벤트 객체가 생성되고, li 요소가 타깃이 된다. 이벤트 객체는 window 객체에서 이벤트 타깃으로 전파되는 것이 *캡처링 단계*이다.<br>
이벤트 타깃에 이벤트 객체가 도달하는 것이 *타깃 단계* <br>
객체는 타깃에서부터 다시 window 바양으로 전파된다. 이것이 *버블링 단계*이다.<br>
<br>
이벤트 핸들러 어트리뷰트/프로퍼티 방식은 타깃과 버블링 단계만 캐치할 수 있다. addEventListener 메서드는 캡처링도 캐치할 수 있는데, 3번째 인수로 true를 넘겨야 한다. false를 넘기거나 생략하면 타깃과 버블링 단계 이벤트만 캐치할 수 있다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id="fruits">
        <li id="apple">Apple</li>
        <li id="banana">Banana</li>
        <li id="orange">Orange</li>
    </ul>
    <script>
        const $fruits = document.getElementById('fruits');
        const $banana = document.getElementById('banana');

        //fruits의 하위 요소인 li 요소 클릭 후 캡처링 단계의 이벤트 캐치
        $fruits.addEventListener('click', e => {
            console.log(`이벤트 단계: ${e.eventPhase}`); //1: 캡처링 단계
            console.log(`이벤트 타깃: ${e.target}`); //[object HTMLLIElement]
            console.log(`커런트 타깃: ${e.currentTarget}`); //[Object HTMLUListElement]
        }, true);

        //타깃 이벤트 캐치
        $banana.addEventListener('click', e => {
            console.log(`이벤트 단계: ${e.eventPhase}`); //2: 타깃단계
            console.log(`이벤트 타깃: ${e.target}`); //[object HTMLLIElement]
            console.log(`커런트 타깃: ${e.currentTarget}`); //[Object HTMLLIElement]
        });

        $fruits.addEventListener('click', e => {
            console.log(`이벤트 단계: ${e.eventPhase}`); //3: 버블링 단계
            console.log(`이벤트 타깃: ${e.target}`); //[object HTMLLIElement]
            console.log(`커런트 타깃: ${e.currentTarget}`); //[Object HTMLUListElement]
        })

    </script>
</body>
</html>
```
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/5268bafc-5f30-4eea-91a6-6c188d9e5d35)

**이처럼 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론, 상위 DOM 요소에서도 캐치할 수 있다.** 즉 DOM 트리를 통해 전파되는 이벤트는 이벤트 패스path에 위치한 모든 DOM 요소에서 캐치할 수 있다. 대부분의 이벤트는 캡처링, 버블링을 통해 전파된다. <br>
그러나 다음 이벤트는 버블링을 통해 전파되지 않는다. 
![image](https://github.com/sangypar/SSAFRONT/assets/158231909/c711d53b-1fe2-47bb-a2f7-ae98506273b6)

위 이벤트를 상위 요소에서 캐치하려면 캡처링 단계 이벤트를 캐치해야 한다. 반드시 상위 요소에서 위 이벤트를 캐치해야 한다면 대체할 수 있는 이벤트가 존재한다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>혼용 이벤트</title>
    <style>
        html, body { height: 100%}
    </style>
</head>
<body>
  <p>버블링과 캡처링 이벤트 <button>버튼</button></p>
  <script>

    //버블링단계 이벤트 캐치
    document.body.addEventListener('click', () => {
        console.log('Handler for body');
    });

    //캡처링 단계의 이벤트 캐치
    document.querySelector('p').addEventListener('click', () => {
        console.log('Handler for paragraph');
    }, true);

    //타깃 단계 이벤트 캐치
    document.querySelector('button').addEventListener('click', () =>{
        console.log('Handler for button');
    });

  </script>
</body>
</html>
```

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/3ff9ec04-64b8-4ef9-9c1f-1f7cfb51c2f1)

여기서 body 요소는 버블링 단계 이벤트만 캐치하고 p 요소는 캡처링 단계 이벤트만 캐치한다. 이벤트는 캡처링 - 타깃 - 버블링 단계로 전파되므로 위와 같이 출력된다.

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/229ebf63-00f8-4a1e-90be-2bfb22cf2bee)

그러나 p 요소에서 클릭 이벤트가 발생하면 캡처링 단계를 캐치하는 p요소, 버블링 단계 body 요소만 순차적으로 출력된다.

## 이벤트 위임

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이벤트 위임</title>
    <style>
        #fruits {
            display: flex;
            list-style-type: none;
            padding: 0;
        }

        #fruits li {
            width: 100px;
            cursor: pointer;
        }

        #fruits .active {
            color: lightcoral;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <nav>
        <ul id="fruits">
            <li id="apple">Apple</li>
            <li id="banana">Banana</li>
            <li id="orange">Orange</li>
        </ul>
    </nav>
    <div>선택된 네비게이션 아이템: <em class="msg"></em></div>
    <script>
        const $fruits = document.querySelector('#fruits');
        const $msg = document.querySelector('.msg');

        //사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스 추가
        //그외 모든 내비게이션 아이템의 active 클래스 제거
        function activate({target}) {
            [ ... $fruits.children].forEach($fruit => {
                $fruit.classList.toggle('active', $fruit === target);
                $msg.textContent = target.id;
            });
        }

        //모든 li요소에 이벤트 핸들러를 등록한다.
        document.getElementById('apple').onclick = activate;
        document.getElementById('banana').onclick = activate;
        document.getElementById('orange').onclick = activate;

    </script>
</body>
</html>
```

각 요소에 이벤트 핸들러를 다 등록했다. 아이템이 100개라면 100개의 핸들러를 등록해야 하므로 성능 저하, 유지 보수에도 부적합하다.
**이벤트 위임은 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법**을 말한다.
일일히 하위 요소에 등록할 필요도 없고, 동적으로 추가해도 따로 등록할 필요가 없다. 위 예제를 수정해보자.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이벤트 위임</title>
    <style>
        #fruits {
            display: flex;
            list-style-type: none;
            padding: 0;
        }

        #fruits li {
            width: 100px;
            cursor: pointer;
        }

        #fruits .active {
            color: lightcoral;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <nav>
        <ul id="fruits">
            <li id="apple">Apple</li>
            <li id="banana">Banana</li>
            <li id="orange">Orange</li>
        </ul>
    </nav>
    <div>선택된 네비게이션 아이템: <em class="msg"></em></div>
    <script>
        const $fruits = document.querySelector('#fruits')
        const $msg = document.querySelector('.msg');

        //사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스 추가
        //그외 모든 내비게이션 아이템의 active 클래스 제거
        function activate({target}) {

            //이벤트 발생시킨 요소가 ul#fruits의 자식 요소가 아니라면 무시
            if(!target.matches('#fruits > li')) return;

            [ ... $fruits.children].forEach($fruit => {
                $fruit.classList.toggle('active', $fruit === target);
                $msg.textContent = target.id;
            });
        }

        $fruits.onclick = activate; //상위 요소는 하위 요소 이벤트를 캐치할 수 있다.

    </script>
</body>
</html>
```

이렇게 이벤트 위임을 통해 상위 DOM 요소에 이벤트를 바인딩한 경우, 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티가 다른 DOM 요소를 가리킬 수 있다.
위 예제에서 currentaTarget 프로퍼티는 언제나 변함없이 $fruits 요소를 가리키지만 이벤트 객체의 target 프로퍼티는 실제로 이벤트 발생시킨 DOM 요소를 가리킬 수 있다. ($fruits)

## DOM 요소의 기본 동작 조작

### DOM 요소의 기본 동작 중단

이벤트 preventDefault 메서드는 이러한 DOM 요소의 기본 동작을 중단시킨다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>중단</title>
</head>
<body>
    <a href="https://www.google.com">Go</a>
    <input type="checkbox">
    <script>
        document.querySelector('a').onclick = e => {
            //a요소 기본동작 중단한다.
            e.preventDefault();
        };

        document.querySelector('input[type=checkbox]').onclick = e => {
            //체크박스 중단
            e.preventDefault();
        };
    </script>
</body>
</html>
```

### 이벤트 전파 방지

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>중단2</title>
</head>
<body>
    <div class="container">
        <button class="btn1"> Button 1</button>
        <button class="btn2"> Button 2</button>
        <button class="btn3"> Button 3</button>
    </div>
    <script>
        //이벤트 위임
        document.querySelector('.container').onclick = ({target}) => {
            if(!target.matches('.container > button')) return; //하위 노드가 아니면 return
            target.style.color = 'red';
        };

        //btn2는 요소를 전파하지 않게!
        //상위 요소에서 이벤트를 캐치할 수 없다.
        document.querySelector('.btn2').onclick = e => {
            e.stopPropagation(); //이벤트 전파 중단
            e.target.style.color = 'blue';
        };
    </script>
</body>
</html>
```

## 이벤트 핸들러 내부의 this

### 이벤트 핸들러 어트리뷰트 방식

이벤트 핸들러 어트리뷰트 값으로 지정한 문자열은 사실 암묵적으로 생성되는 이벤트 핸들러의 문이라고 했다. 그래서 일반 함수로 호출된다. 일반함수로서 호출되는 함수 내부 this는 전역 객체 window를 가리킨다.
단, 이벤트 핸들러를 호출할 때 인수로 전달한 this는 이벤트 바인딩한 DOM 요소를 가리킨다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button onclick="handleClick()">Click</button>
    <script>
        function handleClick(button) {
            console.log(button); //이벤트 바인딩한 button 요소
            console.log(this); //window
        }
    </script>
</body>
</html>
```

### 이벤트 핸들러 프로퍼티 방식과 addEventListner 메서드 방식

프로퍼티 방식과 addEventListener 메서드 방식 모두 핸들러 내부 this는 이벤트 바인딩한 DOM 요소를 가리킨다. this는 객체의 currentTarget 프로퍼티와 같다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn1">0</button>
    <button class="btn2">0</button>
    <script>
       const $button1 = document.querySelector('.btn1');
       const $button2 = document.querySelector('.btn2');

       //프로퍼티 방식
       $button1.onclick = function (e) {
        //this는 바인딩한 DOM 요소
        console.log(this); //$button1
        console.log(e.currentTarget); //$button1
        console.log(this === e.currentTarget); //true

        ++this.textContent;
       };

       //addEventListener 메서드 방식
       $button2.addEventListener('click', function (e) {
        console.log(this); //$button2
        console.log(e.currentTarget); //$button2
        console.log(this === e.currentTarget); //true
        ++this.textContent;
       });
    </script>
</body>
</html>
```

화살표 함수는 자체 this 바인딩을 갖지 않아서 상위 스코프의 this를 가리킨다.

```javaScript
//프로퍼티 방식
       $button1.onclick = e => {
        console.log(this); //window
        console.log(e.currentTarget); //$button1
        console.log(this === e.currentTarget); //false
       }
        //addEventListener 메서드 방식
       $button2.addEventListener('click', e => {
        console.log(this); //window
        console.log(e.currentTarget); //$button2
        console.log(this === e.currentTarget); //false
        ++this.textContent;
       });
```

클래스에서 이벤트 핸들러 바인딩하는 경우 this에 주의하자.
핸들러 프로퍼티 방식을 사용하고 있으나 addEventListener 메서드 방식을 사용하는 경우와 동일하다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">0</button>
    <script>
        class App {
            constructor() {
                this.$button = document.querySelector('btn');
                this.count = 0;

                //increase 메서드 등록
                this.$button.onclick = this.increase;
            }

            increase() {
                //여기 내부 this는 this.$button을 가리킨다.
                //그래서 여기 this.$button은 this.$button.$button과 같다.
                this.$button.textContent = ++this.count;
                //TypeError 발생
            }
        }
    </script>
</body>
</html>
______________________________________________________________________________
//내부의 this 클래스가 클래스가 생성하는 인스턴스를 가리키도록 바인딩해주는 방법

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">0</button>
    <script>
        class App {
            constructor() {
                this.$button = document.querySelector('btn');
                this.count = 0;

                //increase 메서드 등록
                this.$button.onclick = this.increase.bind(this);
                //this를 바인딩함으로서 인스턴스를 가리키도록 한다.
            }

            increase() {
                //여기 내부 this는 this.$button을 가리킨다.
                //그래서 여기 this.$button은 this.$button.$button과 같다.
                this.$button.textContent = ++this.count;
                //TypeError 발생
            }
        }
    </script>
</body>
</html>
______________________________________________________________________________
//클래스 필드에 할당한 화살표 함수를 이벤트 핸들러로 등록해 핸들러 내부 this가 인스턴스를 가리키도록 할 수 있다.
//이때 핸들러 increase는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">0</button>
    <script>
        class App {
            constructor() {
                this.$button = document.querySelector('btn');
                this.count = 0;

                //increase 메서드 등록
                this.$button.onclick = this.increase;
            }

            increase = () => this.$button.textContent = ++this.count;
            //클래스 필드에 정의 되고 화살표 함수는 상위 객체 this를 받고 있으므로 갠춘
        }
    </script>
</body>
</html>
```

## 이벤트 핸들러에 인수 전달

이벤트 핸들러 프로퍼티 방식과 addEventListener 방식은 이벤트 핸들러를 브라우저가 호출하기 때문에 함수 자체를 등록해야 하고, 따라서 인수를 전달할 수 없다. (이벤트 핸들러 어트리뷰트 방식은 함수 호출문을 사용할 수 있어서 인수 전달 가능)

1. 핸들러 내부에서 함수 호출하면서 인수 전달하는 법
2. 핸들러를 반환하는 함수를 호출하면서 인수 전달하는 법

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <label>User name <input type="text"></label>
    <em class="message"></em>
    <script>
        const MIN_USER_NAME_LENGTH = 5; //이름 최소 길이
        const $input = document.querySelector('input[type=text]');
        const $msg = document.querySelector('.message');

        const checkUserNameLength = min => {
            $msg.textContent = $input.value.length < min ? `이름은 ${min}자 이상 입력해주세요` : '';
        };

        //이벤트 핸들러 내부에서 함수 호출, 인수 전달
        $input.onblur = () => {
            checkUserNameLength(MIN_USER_NAME_LENGTH);
        };
    </script>
</body>
</html>

//////////////////////////////////////////////////////////////////////////////////////////////////////////

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <label>User name <input type="text"></label>
    <em class="message"></em>
    <script>
        const MIN_USER_NAME_LENGTH = 5; //이름 최소 길이
        const $input = document.querySelector('input[type=text]');
        const $msg = document.querySelector('.message');

        const checkUserNameLength = min => e => { //반환한다
            $msg.textContent = $input.value.length < min ? `이름은 ${min}자 이상 입력해주세요` : '';
        };

        //이벤트 핸들러 반환 함수를 호출하며 인수 전달
        $input.onblur = checkUserNameLength(MIN_USER_NAME_LENGTH);
    </script>
</body>
</html>
```

## 커스텀 이벤트

### 커스텀 이벤트 생성

이벤트 생성자 함수를 호출하여 명시적으로 생성한 이벤트 객체는 임의의 이벤트 타입을 지정할 수 있다. 이를 **커스텀 이벤트**라고 한다.
이벤트 생성자 함수는 첫 인수로 이벤트타입을 나타내는 문자열을 전달 받는데, 임의의 문자열을 전달받을 경우 새로운 이벤트 타입을 지정하는 것이다. 일반적으로 CustomEvent 생성자 함수를 이용한다.

```javaScript
const custonEvent = new CustomEvent('foo');
console.log(customEvent.type); //foo
```

생성된 커스텀 이벤트 객체는 버블링되지 않으며 preventDefault 메서드로 취소할 수도 없다.
= bubbles와 cancelable 프로퍼티 값이 false로 기본 설정된다는 뜻 <br>
커스텀 이벤트 객체의 bubbles 또는 cancelable 프로퍼티를 true로 설정하려면 이벤트 생성자 함수 두번째 인수로 bubbles 또는 cancelable 프로퍼티 갖는 객체를 전달한다.
그 두 프로퍼티 뿐 아니라 고유 프로퍼티 값을 지정할 수 있다.

```javaScript
const customEvent = new MouseEvent('click', {
    bubbles : true,
    cancelable: true
});

////////////////////////////////////////////////

const mouseEvent = new MouseEvent('click', {
    bubbles : true,
    cancelable: true,
    clientX: 50,
    clietny: 100
});

const keyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });

```

이벤트 생성자 함수로 생성한 커스텀 이벤트는 isTrusted 프로퍼티 값이 언제나 false다. 커스텀 아닌 사용자 행위에 의해 발생한 이벤트에 대해 생성된 isTrusted 값은 언제나 true이다.

### 커스텀 이벤트 디스패치

생성된 커스텀 이벤트는 dispatchEvent 메서드로 dispatch(이벤트를 발생시키는 행위)할 수 있다. 이벤트 객체를 인수로 전달하면서 호출하면, 인수 전달된 이벤트 타입의 이벤트가 발생한다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">Click</button>
    <script>
        const $button = document.querySelector('.btn');

        //버튼에 click 커스텀이벤트핸들러 등록
        //디스패치하기 전, 이벤트 핸들러를 등록해야 한다.
        $button.addEventListener('click', e => {
            console.log(e);
            alert(`${e} Clicked!`);
        });

        //커스텀 이벤트 생성
        const customEvent = new MouseEvent('click');

        //커스텀이벤트 디스패치(동기처리)
        $button.dispatchEvent(customEvent);
    </script>
</body>
</html>
```

![image](https://github.com/sangypar/SSAFRONT/assets/158231909/215aad1d-9cc7-48ca-a6ee-37a5921c0242)

일반적으로 이벤트 핸들러는 비동기 처리 방식으로 동작하지만, dispatchEvent 메서드는 동기 처리방식으로 호출한다. 즉, dispatchEvent를 호출하면 이벤트 핸들러를 호출하는 것과 같다.<br>
<br>
커스텀이벤트는 일반적으로는 CustomEvent 생성자 함수를 쓰는데, 이때 두번째 인수로 함게 전달하고 싶은 정보를 담은 detail 프로퍼티를 포함하는 객체를 전달할 수 있다.

```javaScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">Click</button>
    <script>
        const $button = document.querySelector('.btn');

        //커스텀 이벤트 핸들러 등록
        //디스패치 전 핸들러 등록해야 함
        $button.addEventListener('foo', e => {
            //여기는 두번째 함수 인수로 전달한 정보가 담겨 있다.
            alert(e.detail.message);
        });

        //커스텀 이벤트 객체 생성
        const customEvent = new CustomEvent('foo', {
            detail: {message: 'Hello'}
        });

        $button.dispatchEvent(customEvent);

    </script>
</body>
</html>
```

임의의 이벤트 타입을 지정하여 커스텀 이벤트 객체를 생성한 경우 반드시 addEventListener 방식으로 이벤트 핸들러를 등록해야 한다. 어트리뷰트/프로퍼티를 사용할 수 없는 이유는 'on+이벤트타입'로 이루어진 이벤트 핸들러 어트리뷰트/프로퍼티가 요소노드에 존재하지 않기 때문이다. 예를 들어 'foo'라고 생성했을 경우, 'onfoo'라는 것이 요소 노드에 존재하지 않기 때문에 어트리뷰트/프로퍼티 방식으로는 등록할 수 없다.
