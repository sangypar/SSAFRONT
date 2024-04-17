# 39장 DOM_(2)

## 39.5 요소 노드의 텍스트 조작
### 39.5.1 nodeValue 프로퍼티
- setter와 getter가 모두 존재하는 접근자 프로퍼티
- 참조와 할당 가능
- 반환 값은 텍스트 노드 객체의 텍스트 값, 따라서 텍스트 노드가 아닌 노드의 nodeValue 프로퍼티를 참조할 경우 null을 반환
- 텍스트 노드의 nodeValue 프로퍼티에 값을 할당하면 텍스트 노드의 값, 즉 텍스트를 변경할 수 있음

![](https://velog.velcdn.com/images/chtoqur/post/33da363e-1d11-4ca1-a867-baf39ea3c7d9/image.png)

#### 요소 노드의 텍스트 변경 방법
1. 텍스트를 변경할 요소 노드 취득
2. 취득한 요소 노드의 텍스트 노드 탐색 (텍스트 노드: 요소 노드의 자식 노드이므로 firstChild 프로퍼티 사용)
3. 탐색한 텍스트 노드의 nodeValue 프로퍼티를 사용하여 텍스트 변경

![](https://velog.velcdn.com/images/chtoqur/post/96ba875f-fdce-44be-bba3-e185f3858ade/image.png)

### 39.5.2 textContent 프로퍼티
- setter와 getter가 모두 존재하는 접근자 프로퍼티
- 참조 시 요소 노드의 시작 태그와 종료 태그 사이의 모든 텍스트 반환
- 마크업은 무시

![](https://velog.velcdn.com/images/chtoqur/post/902519cf-4d1b-41eb-99a5-26ffeac12f91/image.png)

![](https://velog.velcdn.com/images/chtoqur/post/04ee1623-e0ba-4c4d-99a8-6ec61e48c3f5/image.png)

![](https://velog.velcdn.com/images/chtoqur/post/23d2246b-8204-4e47-aa68-018d013fb2f1/image.png)

#### 유사한 기능의 innerText 사용은 다음과 같은 이유로 지양
1. innerText 프로퍼티는 CSS에 순종적이다.
만일 CSS에 의해 비표시(visibility: hidden) 된 노드의 경우 innerText 프로퍼티는 해당 노드의 텍스트를 반환하지 않는다.
2. innerText 프로퍼티는 CSS를 고려하기 때문에 textContent 프로퍼티보다 느리다.

## 39.6 DOM 조작
> 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것

### 39.6.1 innerHTML 프로퍼티
- 요소 노드의 HTML 마크업을 취득하거나 변경
- 참조하는 요소 노드의 시작 태그와 종료 태그 사이 포함된 모든 HTML 마크업을 문자열로 반환한다.

![](https://velog.velcdn.com/images/chtoqur/post/58abb722-8c23-403f-acd4-497129c0b34e/image.png)

- innerHTML 또한 textContent와 마찬가지로 문자열을 할당할 경우 요소 노드의 모든 자식 노드를 제거하고 할당한 문자열로 교체한다 <br/>
![](https://velog.velcdn.com/images/chtoqur/post/c5abfbb4-07de-47aa-86f2-4382f9d9727e/image.png)

- innerHTML 프로퍼티를 사용한 DOM 조작은 구현이 간단하고 직관적이지만, 크로스 사이트 스크립팅 공격에 취약하다는 단점이 존재한다. 

#### cf. 크로스 사이트 스크립팅, Cross Site Scripting(XSS)
공격자가 상대방의 브라우저에 스크립트가 실행되도록 해 사용자의 세션을 가로채거나, 웹사이트 변조, 악의적 콘텐츠 삽입, 피싱 등의 공격을 진행하는 것

![](https://velog.velcdn.com/images/chtoqur/post/37751cc3-01a9-4b27-be0d-617b0035004d/image.png)

#### cf. HTML 새니티제이션
- sanitize : 소독하다
- 입력받은 데이터에 의해 발생할 수 있는 크로스 사이트 스크립팅 공격을 예방하기 위해 잠재적 위험을 제거하는 기능, 직접 함수를 구현할 수도 있겠지만 DOMPurify 라이브러리 사용이 권장됨
- DOMPurify: 이름 그대로 DOM을 정화하기 위한 라이브러리, HTML 코드 소독 + XSS 공격을 막아줌

```JS
    DOMPurify.sanitize('<img src="x" onerror="alert(document.cookie)">');
    // => <img src="x">
```

### 39.6.2 insertAdjacentHTML 메서드
- 기존 innerHTML 프로퍼티의 경우 문자열 할당 시 요소 노드의 모든 자식 노드를 제거하고 새로 할당한 문자열로 교체하기 때문에 삽입 위치를 지정할 수 없다는 단점이 존재
- insertAdjacentHTML은 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입할 수 있음
- 첫번째 인수에는 삽입할 위치, 두 번째 인수에는 실제로 삽입할 HTML 마크업 문자열을 전달
- 기존 요소에는 영향을 주지 않기 때문에 innerHTML 프로퍼티보다 효율적이고 속도도 빠름

![](https://velog.velcdn.com/images/chtoqur/post/1317cff5-77bf-49e3-a668-35b107cf408c/image.png)

![](https://velog.velcdn.com/images/chtoqur/post/c454f7c0-6cc1-49f3-95d0-81d208dab9aa/image.png)

### 39.6.3 노드 생성과 추가
![](https://velog.velcdn.com/images/chtoqur/post/0f376ff6-9562-493d-b25a-c278015233c1/image.png)

### 39.6.4 복수의 노드 생성과 추가, DocumentFragment
복수의 노드를 생성하고 DOM에 추가하는 경우 39.6.3 챕터의 작업을 반복문을 통해 여러번 반복하면서 그 때마다 DOM에 추가하는 방식으로 구현 가능하다. 하지만 DOM을 변경하는 것은 높은 비용이 드는 처리이므로 가급적 횟수를 줄이는 편이 성능에 유리하다. 따라서 여러번 DOM을 변경하는 문제를 회피하기 위해 컨테이너 요소를 사용한다.

![](https://velog.velcdn.com/images/chtoqur/post/4f59ff15-63bb-4e99-9e0e-228180618aea/image.png)

위와 같은 방식으로 별도의 div 태그를 컨테이너로 생성해서 처리할 수도 있지만, 불필요한 컨테이너 요소(div)가 DOM에 추가되는 부작용이 존재한다. 이러한 문제를 해결하기 위해서 DocumentFragment 노드를 사용한다. DocumentFragment 노드는 노드 객체의 일종으로, 부모 노드가 없기 때문에 기존 DOM과 별도로 존재한다. 또한 DocumentFragment 노드를 DOM에 추가하면 자신은 제거되고 자신의 자식 노드만 DOM에 추가된다.

![](https://velog.velcdn.com/images/chtoqur/post/58a42f2b-e9d7-4f86-a888-0e243ca6711a/image.png)

- 이전의 코드 : 불필요한 div 태그가 존재 <br/>
![](https://velog.velcdn.com/images/chtoqur/post/fe45a938-6ce8-471b-81c0-8426d4664c88/image.png)

- DocumnetFragment를 사용한 코드 <br/>
![](https://velog.velcdn.com/images/chtoqur/post/dc579639-df68-45b4-810f-647e765a34f6/image.png)

### 39.6.5 노드 삽입
#### appendChild 메서드: 마지막 노드로 추가
- 노드 추가 위치 지정 불가능, 언제나 마지막 자식 노드로 추가 <br/>
![](https://velog.velcdn.com/images/chtoqur/post/aa6ee2c7-ae79-4ad0-ada2-776b2a724c0e/image.png)

#### insertBefore 메서드: 지정한 위치에 노드 삽입
- 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입
- 두 번째 인수로 전달받은, 위치를 지정하는 노드는 반드시 insertBefore 메서드를 호출한 노드의 자식 노드여야만 한다. 그렇지 않으면 DOMException 에러가 발생한다.
- 만일 두 번째 인수로 전달받은 노드가 null이면 insertBefore 메서드를 호출한 노드의 마지막 자식 노드로 추가된다. 즉 appendChild 메서드처럼 동작한다. <br/>
![](https://velog.velcdn.com/images/chtoqur/post/1e19e187-00db-4c95-a03b-d3e27badf504/image.png)

### 39.6.6 노드 이동
#### appendChild 메서드: 마지막 노드로 이동
#### insertBefore 메서드: 원하는 위치로 이동
DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore 메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다. 즉, 노드가 이동한다. <br/>
![](https://velog.velcdn.com/images/chtoqur/post/70aa38f2-96c3-4a17-9915-77f7ab7d397a/image.png)

### 39.6.7 노드 복사
#### cloneNode 메서드: 노드의 사본을 생성하여 반환
- 매개변수 deep에 true를 인수로 전달하면 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성, false를 전달하거나 생략하면 노드를 얕은 복사하여 노드 자신만의 사본을 생성한다. 이 때, 본인 노드를 제외한 모든 노드(자손 노드 포함)가 생략되므로 텍스트 노드 또한 생략된다.

![](https://velog.velcdn.com/images/chtoqur/post/f77ca6c1-7d1c-429f-b9f7-7907b202ceea/image.png)

### 39.6.8 노드 교체: replaceChild(newChild, oldChild)
- oldChild 매개변수에 인수로 전달한 노드는 replaceChild를 호출한 노드의 자식노드여야 한다.

### 39.6.9 노드 삭제: removeChild(child)
- child 매개변수에 인수로 전달한 노드는 removeChild 호출한 노드의 자식노드여야 한다.
