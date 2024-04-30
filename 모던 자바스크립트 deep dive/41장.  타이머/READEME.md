## 41.1 호출 스케줄링

- 함수를 명시적으로 호출하지 않고 일정 시간이 경과된 이후에 호출되도록 함수 호출을 예약하려면 타이머 함수 사용(호출 스케줄링)
- 타이머 함수 setTimeout과 setInterval, 타이머를 제거할 수 있는 타이머 함수 clearTimeout과 clearInterval
- 빌트인 함수는 아니지만 브라우저 환경과 Node.js 환경에서 모두 전역 객체의 메서드로 제공
- 타이머 함수 setTimeout과 setInterval은 모두 일정 시간이 경과된 이후 콜백 함수가 호출되도록 타이머 생성
- 자바스크립트엔진은 싱글 스레드로 동작하기에 타이머 함수는 비동기 처리 방식으로 동작

## 41.2 타이머 함수

### 41.2.1 setTimeout / clearTimeout

- setTimeout 함수는 두 번째 인수로 전달받은 시간(ms, 1/1000초)으로 단 한 번 동작하는 타이머 생성
- 타이머가 만료되면 첫 번째 인수로 전달받은 콜백 함수 호출

```javascript
const timeoutId = setTimeout(func|code[, delay, param1, param2, ...]);
```

매개변수 | 설명
-|-
func | 타이머가 만료된 뒤 호출될 콜백 함수
delay | 타이머 만료 시간, delay 시간으로 단 한 번 동작하는 타이머 생성, 인수 생략 시 기본값 0
param1 | 호출 스케줄링된 콜백 함수에 전달해야할 인수가 존재하는 경우 세 번째 이후의 인수로 전달

```javascript
// 1초 후 타이머가 만료되면 콜백 함수 호출
setTimeout(() => console.log('Hi!'), 1000);

// 콜백 함수에 'Kim'이 인수로 전달
setTimeout(name => console.log(`Hi! ${name}.`), 1000, 'Kim');
```

```javascript
// 1초 후 타이머가 만료되면 콜백 함수 호출
// setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id 반환
const timerId = setTimeout(() => console.log('Hi!'), 1000);

// setTimeout 함수가 반환한 타이머 id를 함수의 인수로 전달하여 타이머 취소
// 타이머가 취소되면 setTimeout 함수의 콜백 함수 실행 X
clearTimeout(timerId);
```

### 41.2.2 setInterval / clearInterval

- setInterval 함수는 두 번째 인수로 전달받은 시간(ms, 1/1000초)으로 반복 동작하는 타이머 생성
- 타이머가 만료될 때마다 첫 번째 인수로 전달받은 콜백 함수가 반복 호출하며 취소될 때까지 계속

```javascript
const timerId = setInterval(func|code[, delay, param1, param2, ...]);
```

- setInterval 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id 반환
- setInterval 함수가 반환한 타이머 id는 브라우저 환경인 경우 숫자, Node.js 환경인 경우 객체

```javascript
let count = 1;

// 1초 후 타이머가 만료될 때마다 콜백 함수 호출
// setInterval 함수는 생서된 타이머를 식별할 수 있는 고유한 타이머 id 반환
const timeoutId = setInterval(() => {
  console.log(count);

  // count가 5이면 setInterval 함수가 반환한 타이머 id를 clearInterval 함수의 인수로 전달하여 타이머 취소
  if(count++ === 5) clearInterval(timeoutId);
}, 1000);
```

## 41.3 디바운스와 스로틀

- scroll, resize, input, mousemove 같은 이벤트는 짧은 시간 간격으로 연속해서 발생
- 이러한 이벤트에 바인딩한 이벤트 핸들러는 과도하게 호출되어 성능에 문제 발생
- 디바운스와 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 과도한 이벤트 핸들러 호출 방지

### 41.3.1 디바운스

```html
<!DOCTYPE html>
<html>
  <body>
    <input type="text" />
    <div class="msg"></div>
    <script>
      const $input = document.querySelector("input");
      const $msg = document.querySelector(".msg");

      const debounce = (callback, delay) => {
        let timerId;

        // debounce 함수는 timerId를 기억하는 클로저 반환
        return (event) => {
          // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머 재설정
          // 따라서 delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출 X
          if (timerId) clearTimeout(timerId);
          timerId = setTimeout(callback, delay, event);
        };
      };

      // debounce 함수가 반환하는 클로저는 이벤트 핸들러로 등록
      // 500ms보다 짧은 간격으로 input 이벤트가 발생하면 debounce 함수의 콜백 함수는
      // 호출되지 않다가 500ms 동안 input 이벤트가 더 이상 발생하지 않으면 한 번만 호출
      $input.oninput = debounce((e) => {
        $msg.textContent = e.target.value;
      }, 500);
    </script>
  </body>
</html>
```

- input 이벤트는 사용자가 텍스트 입력 필드에 값을 입력할 때마다 연속해서 발생
- Ajax 요청과 같은 무거운 처리를 수행한다면 불필요한 요청이 전송되어 서버에도 부담

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/cdacf3a9-272f-4cad-9f68-2afe23baf634)

### 41.3.2 스로틀

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        width: 300px;
        height: 300px;
        background-color: rebeccapurple;
        overflow: scroll;
      }
      .content {
        width: 300px;
        height: 1000vh;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content"></div>
    </div>
    <div>
      일반 이벤트 핸들러가 scroll 이벤트를 처리한 횟수:
      <span class="normal-count">0</span>
    </div>
    <div>
      스로틀 이벤트 핸들러가 scroll 이벤트를 처리한 횟수:
      <span class="throttle-count">0</span>
    </div>
    <script>
      const $container = document.querySelector(".container");
      const $normalCount = document.querySelector(".normal-count");
      const $throttleCount = document.querySelector(".throttle-count");

      const throttle = (callback, delay) => {
        let timerId;

        // throttle 함수는 timerId를 기억하는 클로저 반환
        return (event) => {

          // delay가 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가
          // delay가 경과했을 때 이벤트가 발생하면 새로운 타이머 재설정
          // 따라서 delay 간격으로 callback 호출
          if (timerId) return;
          timerId = setTimeout(
            () => {
              callback(event);
              timerId = null;
            },
            delay,
            event
          );
        };
      };

      let normalCount = 0;
      $container.addEventListener("scroll", () => {
        $normalCount.textContent = ++normalCount;
      });

      let throttleCount = 0;

      $container.addEventListener(
        "scroll",
        throttle(() => { // throttle 함수가 반환하는 클로저가 이벤트 핸들러로 등록
          $throttleCount.textContent = ++throttleCount;
        }, 100)
      );
    </script>
  </body>
</html>
```

- 이벤트를 그룹화해서 일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기 생성
- scroll 이벤트 처리나 무한 스크롤 UI 구현 등에 유용하게 사용

![image](https://github.com/sangypar/SSAFRONT/assets/106229016/c1955699-1fea-4bf3-a4aa-84daff0f2923)

