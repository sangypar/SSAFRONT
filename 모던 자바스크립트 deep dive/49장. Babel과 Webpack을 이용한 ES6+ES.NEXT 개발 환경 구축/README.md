# 49장. Babel과 Webpack을 이용한 ES6+/ES.NEXT 개발 환경 구축

- 매년 새롭게 도입되는 ES6 이상의 버전과 제안 단계에 있는 ES 제안 사양(ES.NEXT)는 브라우저에 따라 지원율이 제각각이다.
- 따라서 최신 사양으로 프로젝트를 진행하기 위해서는 구형 브라우저에서 문제 없이 코드를 동작 시키기 위한 개발환경을 구축하는 것이 필요하다.
- 또한 대부분의 프로젝트가 모듈을 사용하므로 모듈 로더도 필요하다. ESM이 존재하지만 아래의 이유로 아직까지는 ESM보다 별도의 모듈 로더를 사용하는 것이 일반 적이다.
1) IE를 포함한 구형 브라우저는 ESM을 지원하지 않는다.
2) ESM을 사용하더라도 트랜스파일링이나 번들링이 필요한 것은 변함없다.
3) ESM이 아직 지원하지 않는 기능이 있고, 점차 해결되고 있지만 아직 이슈가 존재한다.
- 이에 따라 트랜스파일러인 Babel과 모듈 번들러인 Webpack을 이용해 ES6+/ES.NEXT 개발 환경을 구축해보자

### 49.1 Babel
- Babel이란?
> 트랜스 파일링 도구, 최신 사양의 소스코드를 구형 브라우저에서도 오류 없이 동작하도록 ES5 사양의 코드로 변환해주는 도구

```JS
// ES6의 화살표 함수와 ES7의 지수 연산자 사용
[1, 2, 3].map(n => n ** n);
// 구형 브라우저에서는 해당 기능을 지원하지 않을 수 있다.
// Babel을 사용하면 위 코드를 다음과 같이 ES5 사양으로 변환할 수 잇다.

///////////////// 변환 후 //////////////////
"use strict";

[1, 2, 3].map(function (n) {
    return Math.pow(n, n);
})
```

### 49.1.1 Babel 설치
npm을 사용하여 Babel을 설치해 보자.
> cf. npm
패키지 관리자, Nojde.js의 패키지를 관리할 수 있는 도구이다. 일반적인 경우에는 Node.js를 설치하면 자동으로 설치된다.

```
# 프로젝트 폴더 생성
$ mkdir esnext—project && esnext-project
# package, json 생성
$ npm init -y
# babel-core, babel-cli 설치
$ npm install --save-dev @babel/core @babel/cli
```

참고로 Babel과 Webpack, 플러그인 버전은 빈번하게 업그레이드 된다. npm install은 언제나 최신 버전의 패키지를 설치한다. 하지만 다음과 같이 패키지 이름 뒤에 @과 함께 설치하고 싶은 버전을 지정하는 것도 가능하다.

```
# 버전 지정 설치
npm install --save-dev @babel/core@7.10.3 @babel/cli@7.10.3
```

### 49.1.2 Babel 프리셋 설치와 babel.config.json 설정 파일 작성

> Babel을 사용하려면 @babel/preset-env를 설치해야 한다. @babel/preset-env는 함께 사용되어야 하는
Babel 플러그인을 모아 둔 것으로, Babel 프리셋이라고 부른다.

```
# 기본 설정의 @babel/preset-env 설치
$ npm install --save一dev @babel/preset-env
```

> 설치가 완료되면 프로젝트 루트 폴더에 babel.config.json 설정 파일을 생성하고 다음과 같이 작성한다. 지금 설치한 @babel/preset-env를 사용하겠다는 의미다.

```
{
	"presets": ["@babel/preset-env"]
}
```

### 49.1.3 트랜스파일링
> 본격적으로 트랜스파일링을 진행하기 위해 Babel 명령어를 사용할 수도 있으나 트랜스파일링할 때마다 매번 명령어를 입력하는 것은 번거롭기 때문에 npm scripts에 Babel 명령어를 등록하여 사용한다.

- package.json에 트랜스파일링 명령어 추가
```
"scripts":  {
    "bulid":  "babel src/js -w -d dist/js"
},
```
- src/js 타겟 폴더에 있는 모든 js파일을 트랜스파일링하여 dist/js폴더에 저장하는 명령어
- w 옵션 : --watch 옵션의 축약, 타깃폴더에 있는 모든 js 파일들의 변경을 감지하여 자동으로 트랜스파일
- d 옵션 : --out-dir 옵션의 축약, 트랜스파일링 결과물이 저장될 폴더를 지정, 지정된 폴더가 존재하지 않으면 자동으로 생성

```
$ npm run build
> esnext-project@1.0.0 build /Users/leeungmo/Desktop/esnext-project
> babel src/js -w -d dist/js
```

### 49.1.4 Babel 플러그인 설치
> 코드의 내용에 따라 별도의 플러그인 설치가 필요할 수 있다. 플러그인은 Babel 홈페이지에서 검색할 수 있다. 설치명령어를 --save-dev 뒷쪽에 입력하여 플러그인을 설치한다.

```
$ npm install --save-dev @babel/plugin-proposal-class-properties
```

> 설치한 플러그인은 babel.config.json 설정 파일에 추가해야 한다.

```
{
	"presets": [ "babel/preset-env"],
	"plugins"： ["@babel/plugin-proposal-class-properties"]
}
```

## 49.2 WebPack
> 의존 관계에 있는 자바스크립트, CSS, 이미지 등의 리소스들을 하나의 파일로 번들링 하는 모듈 번들러. Webpack 사용 시 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요 없다. HTML 파일에서 여러 개의 script 태그로 자바스크립트 파일을 로드해야하는 번거로움도 사라진다.

### 49.2.1 Webpack 설치
```
$ npm install save-dev webpack webpack-cli
```

### 49.2.2 babel-loader 설치
> Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+/ES.NEXT 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링하도록 babel-loader 설치

```
npm install --save-dev babel-loader
```

> package.json 파일을 다음과 같이 수정한다.

```
{
  "name": "esnext-project",
  "version": "1.0.0",
  "scripts": {
  "build": "webpack -w"
  },
  "devDependencies": {
  "@babel/cli": "A7.10.3",
  "@babel/core": "A7.10.3",
  "@babel/plugin-proposal-class-properties": "A7.10.1",
  "@babel/preset-env": "A7.10.3",
  "babel-loader": "^8.1.0",
  "webpack": "&4.43.0",
  "webpack-cli": "^3.3.12"
  }
}
```

### 49.2.3 webpack.config.js 설정 파일 작성
> webpack.config.js는 Webpack이 실행될 때 참조하는 설정 파일이다. 프로젝트 루트 폴더에 webpack.config.js 파일을 생성하고 다음과 같이 작성한다.

```
const path = require('path');
 
module.exports = {
  entry: './src/js/main.js',
  // 번들링된 js 파일의 이름(filename)과 저장될 경로(path)를 지정
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
}
```
> 이제 Webpack을 실행하여 트랜스파일링(Babel) 및 번들링(Webpack)을 실행해보자.

```
$ npm run build
> esnext-project@1.0.0 build /Users/leeungmo/Desktop/esnext-project
> webpack -w
```

명령어가 정상적으로 실행된 경우 dist/js 폴더에 bundle.js가 생성된다. 이 파일은 모듈이 하나로 번들링된 결과물이다. 해당 결과물을 index.html에 script 파일로 추가해주고 실행하면 브라우저에서 문제없이 실행되는 것을 볼 수 있다.

```
<!DOCTYPE html>
<html>
<body>
<script src= './dist/js/bundle.js"></script>
</body>
</html>

```

### 49.2.4 babel-polyfill 설치
> 위의 과정을 거쳐도 ES6에서 추가된 Promise, Object.assign, Array.from 등은 ES5 사양으로 트랜스파일링해도 ES5 사양에 대체할 기능이 없기 때문에 트랜스파일링되지 못하고 그대로 남아있을 수 있다. 따라서 @babel/polyfill을 설치해야 한다.

```
$ npm install @babel/polyfill
```

- ES6의 import를 사용하는 경우 진입점의 선두에서 폴리필을 로드
```
import "@babel/polyfill";
import { pi, power, Foo } from "./lib";
```

- Webpack을 사용하는 경우 webpack.config.js 파일의 entry 배열에 폴리필을 추가
```
module.exports = {
    entry: ["@babel/polyfill", "./src/js/main.js"],
};
```