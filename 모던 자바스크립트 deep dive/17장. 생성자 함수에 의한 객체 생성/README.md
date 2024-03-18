# 생성자 함수에 의한 객체 생성

## Object 생성자 함수
new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체를 생성한 후 프로퍼티 또는 메서드를 추가해 완성할 수 있다.
* 생성자 함수? new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수
```javaScript
const person = new Object();

//프로퍼티 추가
person.name = "Kim";
person.sayHello = function () {
  console.log('Hi! My name is '+ this.name);
}
```

Object 생성자 함수 외에도 String, number, Boolean, Function, Array, Date, RegExp, Promise 등 빌트인 생성자 함수를 제공한다.
*반드시 생성자함수를 통해 빈 객체를 생성해야 하는 것은 아니다.*

## 생성자 함수
### 객체 리터럴에 의한 객체 생성 방식의 문제점
객체 리터럴에 의한 객체 생성 방식은 *단 하나의 객체*만 생성한다. 그러나 같은 프로퍼티를 갖는 객체를 여러 개 생성할 때는 매번 코드를 기술해야 한다.
```javaScript
const cicrle1 = {
  radius: 5,
  getDiameter(){
  return 2 * this.radius;
  }
};

const cicrle2 = {
  radius: 10,
  getDiameter(){
  return 2 * this.radius;
  }
};
//두 객체는 따로 만들어야 한다.
```

### 생성자 함수에 의한 객체 생성 방식의 장점
생성자 함수에 의한 객체 생성은 같은 프로퍼티를 갖는 객체를 여러 개 생성할 수 있다.
*new 연산자와 함께 호출해야 생성자 함수로 동작*하고, new 연산자가 없으면 일반 함수로 동작한다.
```javaScript
function Circle(radius){
  this.radius = radius;
  this.getDiameter = function() {
    return 2*this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

//new를 쓰지 않으면 일반 함수로 작동
const circle3 = Circle(15);
console.log(cicrle3); //undefined
console.log(radius); //15
```

<b>this?</b>
객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수 → this 바인딩은 함수 호출 방식에 따라 동적으로 결정
* 일반 함수로서 호출 → 전역 객체
* 메서드로서 호출 → 메서드를 호출한 객체
* 생성자 함수로서 호출 → 생성자 함수가 생성할 인스턴스

### 생성자 함수의 인스턴스 생성 과정
