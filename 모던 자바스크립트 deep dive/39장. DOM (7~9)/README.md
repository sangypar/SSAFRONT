## 39.7 어트리뷰트
### 39.7.1 어트리뷰트 노드와 attributes 프로퍼티
HTML 요소는 여러 개의 어트리뷰트를 가질 수 있다.<br>
HTML 어트리뷰트는 시작 태그에 **어트리뷰트 이름="어트리뷰트 값"** 형식으로 정의한다.<br><br>

글로벌 어트리뷰트(id, class, style 등)와 이벤트 핸들러 어트리뷰트(onclick, onchange, onfocus 등)는 모든 HTML 요소에서 공통적으로 사용할 수 있지만,<br>
특정 HTML 요소에만 한정적으로 사용가능한 어트리뷰트도 있다.<br>
예를 들어 type, value, checked 어트리뷰트는 input 요소에만 사용할 수 있다.<br><br>

HTML 요소가 파싱될 때 어트리뷰트 하나당 하나의 어트리뷰트 노드로 변환되어 요소 노드와 연결된다.<br>
이때 모든 어트리뷰트 노드의 참조는 유사 배열 객체이자 이터러블인 **NamedNodeMap** 객체에 담겨서, 요소 노드의 attributes 프로퍼티에 저장된다.<br>
따라서 모든 어트리뷰트 노드는 요소 노드의 Element.prototype.attributes 프로퍼티로 취득할 수 있다.

``` HTML
<!DOCTYPE html>
<html>
<body>
  <input id="user" type="text" value="ungmo2">
  <script>
    const { attributes } = document.getElementById('user');
    console.log(attributes); // NamedNodeMap {0: id, 1: type, 2: value, id: id, type: type, value: value, length: 3}

    console.log(attributes.id.value); // user
    console.log(attributes.type.value); // text
    console.log(attributes.value.value); // ungmo2
  </script>
</body>
</html>
```

### 39.7.2 HTML 어트리뷰트 조작
요소 노드의 attributes 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이다.<br>
따라서 어트리뷰트 값을 변경할 수 없다. 또한 attributes 프로퍼티를 통해야만 값을 취득할 수 있어서 불편하다. <br><br>

**Element.prototype.getAttribute/setAttribute** 메서드를 사용하면, 어트리뷰트 값을 취득하거나 변경할 수 있어 편리하다.<br>
특정 어트리뷰트가 존재하는지 확인하려면 **Element.prototype.hasAttribute(attributename)** 을 사용하고,<br>
특정 어트리뷰트를 삭제하려면 **Element.prototype.removeAttribute(attributename)** 을 사용한다.

### 39.7.3 HTML 어트리뷰트 vs DOM 프로퍼티
요소 노드 객체에는 HTML 어트리뷰트 값을 초기값으로 하는 DOM 프로퍼티가 존재한다.<br>
예를 들어 <input id="user" type="text" value="ungmo2">가 파싱되어 생성된 요소 노드 객체에는<br>
id,type, value 어트리뷰트에 대응하는 id, type, value DOM 프로퍼티가 존재한다.<br>
**DOM 프로퍼티는 setter와 getter가 모두 존재하는 접근자 프로퍼티다. 따라서 참조와 변경이 가능하다.**

``` HTML
<!DOCTYPE html>
<html>
<body>
  <input id="user" type="text" value="ungmo2">
  <script>
    const $input = document.getElementById('user');

    // 요소 노드의 value 프로퍼티 값을 변경
    $input.value = 'foo';
    // 요소 노드의 value 프로퍼티 값을 참조
    console.log($input.value); //foo
  </script>
</body>
</html>
```

그렇다면 HTML 어트리뷰트는 DOM에서 중복관리 되고 있는가? 그렇지 않다.<br>
**HTML 어트리뷰트의 역할은 HTML 요소의 초기 상태를 지정하는 것이다.<br>
즉, HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미하며, 이는 변하지 않는다.<br>
요소 노드의 초기상태는 어트리뷰트 노드가 관리하며, 최신 상태는 DOM 프로퍼티가 관리한다.**

<hr>

#### HTML 어트리뷰트와 DOM 프로퍼티의 대응 관계
모든 DOM 프로퍼티가 사용자의 입력에 의해 변경되어 최신 상태를 관리하는 것은 아니다.<br>
예를 들어 input의 id 어트리뷰트와 id 프로퍼티는 사용자 입력과 관계가 없으므로 항상 동일한 값을 유지한다.<br>
**이처럼 사용자 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티만 최신 상태 값을 관리한다.** <br>

대부분의 어트리뷰트는 프로퍼티와 1:1로 대응하지만 언제나는 아니며, 어트리뷰트 이름과 프로퍼티 이름이 반드시 일치하는 것도 아니다.<br>

#### DOM 프로퍼티 값의 타입
getAttribute 메서드로 취득한 어트리뷰트 값의 타입은 언제나 문자열이다.<br>
하지만 DOM 프로퍼티로 취득한 최신 상태 값은 문자열이 아닐 수도 있다.<br>
예를 들어 checkbox 요소의 checked 어트리뷰트 값은 문자열이지만, 프로퍼티 값은 불리언 타입이다.
<hr>

### 39.7.4 data 어트리뷰트와 dataset 프로퍼티
data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있다.<br>
data 어트리뷰트는 data-user-id, data-role과 같이 data- 접두사 다음에 임의의 이름을 붙여 사용한다.<br><br>

data 어트리뷰트의 값은 HTMLElement.dataset 프로퍼티르 취득할 수 있다.<br>
dataset 프로퍼티는 HTML 요소의 모든 data 어트리뷰트의 정보를 제공하는 DOMStringMap 객체를 반환한다.<br>
DOMStringMap 객체는 data 어트리뷰트의 접두사 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고 있다.<br>
이 프로퍼티로 data 어트리뷰트의 값을 취득하거나 변경할 수 있다.<br><br>

data 어트리뷰트의 data- 접두사 다음에 존재하지 않는 이름을 키로 사용하여 dataset 프로퍼티에 값을 할당하면 HTML 요소에 data 어트리뷰트가 추가된다.<br>
이때 dataset 프로퍼티에 추가한 카멜케이스의 프로퍼티 키는 data 어트리뷰트의 data- 접두사 다음에 케밥 케이스로 자동 변경되어 추가된다.

``` HTML
<!DOCTYPE html>
<html>
<body>
  <ul class="users">
    <li id="1" data-user-id="7621">Lee</li>
    <li id="2" data-user-id="9524">Kim</li>
  </ul>
  <script>
    const users = [ ... document.querySelector('.users').children];

    // user-id가 '7621'인 요소 노드를 획득한다.
    const user = users.find(user => user.dataset.userId === '7621');

    // user-id가 '7621'인 요소 노드에 새로운 data 어트리뷰트를 추가한다.
    user.dataset.role = 'admin';
    console.log(user.dataset);
    /*
    DOMStringMap {userId: "7621", role: "admin"}
    → <li id="1" data-user-id="7621">Lee</li>
    */
  </script>
</body>
</html>
```

## 39.8 스타일
### 39.8.1 인라인 스타일 조작
HTMLElement.prototype.style 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로, 요소 노드의 **인라인 스타일**을 취득하거나 추가 또는 변경한다.

``` html
<!DOCTYPE html>
<html>
<body>
  <div style="color: red">Hello World</div>
  <script>
    const $div = document.querySelector('div');

    // 인라인 스타일 취득
    console.log($div.style); // CSSStyleDeclaration { 0: "color", ... }

    // 인라인 스타일 변경
    $div.style.color = 'blue';

    // 인라인 스타일 추가
    $div.style.width = '100px';
    $div.style.height = '100px';
    $div.style.backgroundColor = 'yellow';
  </script>
</body>
</html>
```

style 프로퍼티를 참조하면 CSSStyleDeclaration 타입의 객체를 반환한다.<br>
CSSStyleDeclaration 객체는 다양한 CSS 프로퍼티에 대응하는 프로퍼티를 가지고 있으며, 이 프로퍼티에 값을 할당하면 해당 CSS 프로퍼티가 인라인 스타일로 HTML 요소에 추가되거나 변경된다.<br>
CSS 프로퍼티는 케밥 케이스지만, CSSStyleDeclaration 객체의 프로퍼티는 카멜 케이스를 따른다.<br>
예를 들어, CSS 프로퍼티 background-color에 대응하는 CSSStyleDeclaration 객체의 프로퍼티는 backgroundColor다.

``` javascript
$div.style.backgroundColor = 'yellow';
$div.style['background-color'] = 'yellow'; // 케밥 케이스의 CSS 프로퍼티를 그대로 사용하려면 대괄호 표기법을 사용한다.
$div.style.width = '100px'; // 단위 지정이 필요한 CSS 프로퍼티의 값은 반드시 단위를 지정해야 한다.
```

### 39.8.2 클래스 조작
클래스 선택자를 사용하여 CSS class를 미리 정의한 다음, class 어트리뷰트 값을 변경하여 HTML 요소의 스타일을 변경할 수도 있다.<br>
이때는 class 어트리뷰트에 대응하는 DOM 프로퍼티를 사용한다.<br>
단, class 어트리뷰트에 대응하는 DOM 프로퍼티는 class가 아니라 **className**과 **classList**다. 자바스크립트에서 class는 예약어이기 때문이다.

<hr>

#### className
Element.prototype.className 프로퍼티는 setter, getter 모두 존재하는 접근자 프로퍼티다.<br>
요소 노드의 className 프로퍼티를 참조하면 class 어트리뷰트 값을 문자열로 반환하고,<br>
요소 노드의 className 프로퍼티에 문자열을 할당하면 class 어트리뷰트 값을 할당한 문자열로 변경한다.<br>
className 프로퍼티는 문자열을 반환하기 때문에, 여러 개의 클래스를 반환하는 경우 다루기가 불편하다.

``` html
<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      width: 100px; height: 100px;
      background-color: antiquewhite;
    }
    .red { color: red; }
    .blue { color: blue; }
  </style>
</head>
<body>
  <div class="box red">Hello World</div>
  <script>
    const $box = document.querySelector('.box');

    // .box 요소의 class 어트리뷰트 값을 취득
    console.log($box.className); // 'box red'

    // .box 요소의 class 어트리뷰트 값 중에서 'red'만 'blue'로 변경
    $box.className = $box.className.replace('red', 'blue');
  </script>
</body>
</html>
```

#### classList
Element.prototype.classList 프로퍼티는 class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환한다.<br>
DOMTokenList 객체는 유사 배열 객체이면서 이터러블이다.<br>
add, remove, item, contains, replace, toggle 등의 유용한 메서드를 제공한다.

``` html
<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      width: 100px; height: 100px;
      background-color: antiquewhite;
    }
    .red { color: red; }
    .blue { color: blue; }
  </style>
</head>
<body>
  <div class="box red">Hello World</div>
  <script>
    const $box = document.querySelector('.box');
  
    // .box 요소의 class 어트리뷰트 정보를 담은 DOMTokenList 객체를 취득
    // classList가 반환하는 DOMTokenList 객체는 HTMLCollection과 NodeList와 같이
    // 노드 객체의 상태 변화를 실시간으로 반영하는 살아 있는(live) 객체다.
    console.log($box.classList);
    // DOMTokenList(2) [length: 2, value: "box blue", 0: "box", 1: "blue"]

    // .box 요소의 class 어트리뷰트 값 중에서 'red'만 'blue'로 변경
    $box.classList.replace('red', 'blue');  
  </script>
</body>
</html>
```

### 39.8.3 요소에 적용되어 있는 CSS 스타일 참조
style 프로퍼티는 인라인 스타일만 반환한다. 따라서 클래스를 적용한 스타일이나 상속을 통해 암묵적으로 적용된 스타일은 style 프로퍼티로 참조할 수 없다.<br>
HTML 요소에 적용되어 있는 모든 CSS 스타일을 참조해야 할 경우 **getComputedStyle** 메서드를 사용한다.

``` html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      color: red;
    }
    .box {
      width: 100px;
      height: 50px;
      background-color: cornsilk;
      border: 1px solid black;
    }
  </style>
</head>
<body>
  <div class="box">Box</div>
  <script>
    const $box = document.querySelector('.box');

    // .box 요소에 적용된 모든 CSS 스타일을 담고 있는 CSSStyleDeclaration 객체를 취득
    const computedStyle = window.getComputedStyle($box);
    console.log(computedStyle); // CSSStyleDeclaration

    // 임베딩 스타일
    console.log(computedStyle.width); // 100px
    console.log(computedStyle.height); // 50px
    console.log(computedStyle.backgroundColor); // rgb(255, 248, 220)
    console.log(computedStyle.border); // 100px // 1px solid rgb(0, 0, 0)

    // 상속 스타일(body → .box)
    console.log(computedStyle.color); // rgb(255, 0, 0)

    // 기본 스타일
    console.log(computedStyle.display); // block
  </script>
</body>
</html>
```
  
window.getComputedStyle(element[, pseudo]) 메서드는 첫 번째 인수로 전달한 요소 노드에 적용되어 있는 모든 스타일을 CSSStyleDeclaration 객체에 담아 반환한다.<br>
메서드의 두 번째 인수(pseudo)로 :after, :before와 같은 의사 요소를 지정하는 문자열을 전달할 수 있다.<br>
[의사 요소 공식 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/::before)

``` html
<!DOCTYPE html>
<html>
<head>
  <style>
    .box:before {
      content: 'Hello';
    }
  </style>
</head>
<body>
  <div class="box">Box</div>
  <script>
    const $box = document.querySelector('.box');

    // 의사 요소 :before의 스타일을 취득한다.
    const computedStyle = window.getComputedStyle($box, ':before');
    console.log(computedStyle.content); // "Hello"
  </script>
</body>
</html>
```

## 39.9 DOM 표준
HTML과 DOM 표준은 W3C와 WHATWG 두 단체가 협력하면서 공통된 표준을 만들어 왔었다가,<br>
현재는 WHATWG가 단일 표준을 내놓고 있다.

