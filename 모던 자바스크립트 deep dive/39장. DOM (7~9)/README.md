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


