# 답

```javascript
Math.abs(-1);           // 1
Math.abs('-1');         // 1
Math.abs('');           // 0
Math.abs([]);           // 0 
Math.abs(null);         // 0
Math.abs(undefined);    // NaN
Math.abs({});           // NaN → 빈 객체는 숫자 변환 규칙 없음
Math.abs('string');     // NaN
Math.abs();             // NaN → undefined와 동일
```
