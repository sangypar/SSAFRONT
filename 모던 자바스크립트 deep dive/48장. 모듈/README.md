# 48장. 모듈

## 48.1 모듈의 일반적 의미
- 모듈이란 애플리케이션을 구성하는 개별적 요소로, 재사용 가능한 코드 조각을 말한다.
- 모듈은 기능 별로 분리되어 개별적인 파일로 작성된다.
- 모듈은 자신만의 파일 스코프(모듈 스코프)를 가질 수 있다.
- 모듈은 자신의 자산(변수, 함수, 객체 등)을 기본적으로 비공개 상태로 관리하지만, 공개가 필요한 자산에 한정하여 선택적으로 공개한다. 이를 export라 한다.
- 공개된 모듈을 사용하는 외부 모듈을 모듈 사용자라 칭하는데, 이 때 모듈 사용자는 모듈이 공개한 자산 중 일부, 또는 전체를 선택해 자신의 스코프 내로 불러들여 재사용한다. 이를 import라 한다.
![](https://velog.velcdn.com/images/chtoqur/post/e8a77b22-d62d-478e-907f-b0968fd76d34/image.png)

## 48.2 자바스크립트와 모듈
> 자바스크립트는 웹페이지의 단순한 보조 기능을 처리하기 위한 제한적 용도를 목적으로 태어났기 때문에 다른 프로그래밍 언어와 비교할 때 부족한 부분들이 존재한다. 대표적인 것이 자바의 import와 같은 모듈 시스템을 지원하지 않는다는 것이다. 하지만 스크립트의 크기가 커지면서 모듈의 필요성이 증가하였고 모듈 시스템이 등장하게 된다.

- AMD : 가장 올애된 모듈 시스템, require.js라는 라이브러리를 통해 처음 개발됨
- CommonJS : Node.js 서버를 위해 만들어진 모듈 시스템
- UMD : AMD와 CommonJS 두 그룹으로 나누어짐과 동시에 호환성의 문제가 생겨 만들어진 모듈 시스템
- 참고 사이트 (각 모듈 시스템의 사용 예시)
https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73

## 48.3 ES6 모듈(=ESM)
> 이러한 상황 속에서 ES6에서는 자바스크립트에서도 동작하는 모듈 기능을 추가했다. 사용법은 다음과 같다. script 태그에 모듈을 타입으로 지정할 경우 로드된 자바스크립트 파일은 모듈로서 동작한다. 일반적인 js파일이 아닌 ES6 모듈임을 명확히 하기 위해 파일 확장자는 mjs를 사용할 것을 권장한다.

```JS
<script type="module" src="app.mjs"></script>
```

### 48.3.1 모듈 스코프
> ESM은 독자적인 모듈 스코프를 갖는다. ESM이 아닌 일반적인 자바스크립트 파일은 script 태그로 분리해서 로드해도 독자적인 모듈 스코프를 갖지 않는다.

```JS
// foo.js
var x = 'foo';
console.log(window.x); // foo
```

```JS
// bar.js
// foo.js에서 선언한 전역 변수 x의 값이 재할당되었다.
var x = 'bar';
console.log(window.x); // bar
```

> 아래 파일에서 로드된 2개의 자바스크립트 파일은 하나의 자바스크립트 파일 내에 있는 것처럼 동작한다. 즉, 하나의 전역을 공유한다. 따라서 각각의 파일에서 선언한 x 변수는 중복 선언되며, x 변수의 갚은 덮어써진다.

```JS
<!DOCTYPE html>
<html lang="en">
<body>
  <script src="foo.js"></script>
  <script src="bar.js"></script>
</body>
<script>
  console.log(window.x); // bar
</script>
</html>
```
> 이와 반대로 ESM은 독자적인 모듈 스코프를 가지기 때문에 모듈 내에서 var 키워드르 변수를 선언해도 해당 변수는 전역 변수가 아니며, window 객체의 프로퍼티도 아니다.

```JS
// foo.mjs
var x = 'foo';
console.log(window.x); // undefined
```

```JS
// bar.js

// foo.js에서 선언한 전역 변수 x와 변수명이 동일하지만
// foo.js에 존재하는 x와 별도의 스코프를 가진 변수로 생성된다.
var x = 'bar';
```

```JS
<!DOCTYPE html>
<html lang="en">
<body>
  <script type="module" src="foo.mjs"></script>
  <script type="module" src="bar.mjs"></script>
</body>
<script>
  console.log(window.x); // undefined
</script>
</html>
```

### 48.3.2 export 키워드
> 모듈은 독자적인 모듈 스코프를 갖기 때문에 모듈 내부에서 선언한 자원을 외부에 공개하여 다른 모듈들이 재사용할 수 있게 하려면 export 키워드를 사용해야 한다.
export 키워드는 선언문 앞에 사용한다. 이를 통해 변수, 함수, 클래스 등 모든 식별자를 export 할 수 있다.

```JS
// lib.mjs
// 변수, 함수, 클래스 등 모든 식별자를 export 할 수 있다.
export const pi = Math.PI;

export function square(x) {
    return x * x;
}

export class Person {
    constructor(name) {
        this.name = name;
    }
}
```
> 다수의 자원을 객체로 구성하여 한 번에 export 할 수도 있다.

```JS
// lib.mjs
const pi = Math.PI;

function square(x) {
    return x * x;
}

class Person {
    constructor(name) {
        this.name = name;
    }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 export
export { pi, square, Person };
```

### 48.3.3 import 키워드
> 다른 모듈에서 export한 식별자를 자신의 모듈 스코프 내부로 로드하기 위해 import 키워드를 사용한다.

```JS
// app.mjs
import { pi, square, Person } from './lib.mjs';

console.log(pi); // 3.141592653589793
console.log(square(10)); // 100
console.log(new Person('Lee')); // Person { name: 'Lee' }
```

```JS
<!DOCTYPE html>
<html lang="en">
<body>
  <script type="module" src="app.mjs"></script>
</body>
</html>
```

> 모듈이 export한 식별자들을 하나의 이름으로 한 번에 import 하는 것도 가능하다.

```JS
// app.mjs
import * as lib from './lib.mjs';

console.log(lib.pi); // 3.141592653589793
console.log(lib.square(10)); // 100
console.log(new lib.Person('Lee')); // Person { name: 'Lee' }
```

> 본래의 식별자 이름을 변경하여 import 할 수도 있다.

```JS
// app.mjs
import { pi as PI, square as sq, Person as P } from './lib.mjs';

console.log(PI); // 3.141592653589793
console.log(sq(2)); // 4
console.log(new P('Choi')); // Person { name: 'Choi' }
```

> 모듈에서 하나의 값만 export 한다면 'default' 키워드를 사용할 수 있다. default 키워드를 사용하는 경우 var, let, const 키워드는 사용할 수 없다.

```JS
// lib.mjs
export default x => x * x;
```

> default 키워드와 함께 export한 모듈은 {} 없이 임의의 이름으로 import한다.

```JS
// app.mjs
import square from './lib.mjs'

console.log(square(3)); // 9
```