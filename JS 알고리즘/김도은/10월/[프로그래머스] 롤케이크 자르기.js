function solution(topping) {
    
    const len = topping.length;
    
    let count = 0;
    
    let roll1 = new Set();
    let roll2 = new Map();
    
    for(let i = 0; i < len; i++) {
        roll2.set(topping[i], (roll2.get(topping[i]) || 0) + 1);
    } //map에 개수 세놓기
    
    for(let i = 0; i < len; i++) {
        roll1.add(topping[i]); //하나추가
        
        roll2.set(topping[i], roll2.get(topping[i]) - 1); //한개 제거
        //뺄게 없을 때는 제거
        if (roll2.get(topping[i]) === 0) {
            roll2.delete(topping[i]);
        }
        
        if(roll1.size === roll2.size) count++;
    }   
    
    
    return count;
}

// 테스트 1 〉	통과 (10.54ms, 37.1MB)
// 테스트 2 〉	통과 (21.06ms, 40.3MB)
// 테스트 3 〉	통과 (12.96ms, 38.1MB)
// 테스트 4 〉	통과 (15.36ms, 37.9MB)
// 테스트 5 〉	통과 (45.75ms, 65.8MB)
// 테스트 6 〉	통과 (105.58ms, 71.5MB)
// 테스트 7 〉	통과 (99.12ms, 71.6MB)
// 테스트 8 〉	통과 (90.44ms, 71.5MB)
// 테스트 9 〉	통과 (110.78ms, 71.3MB)
// 테스트 10 〉	통과 (88.73ms, 71.3MB)
// 테스트 11 〉	통과 (13.34ms, 38.1MB)
// 테스트 12 〉	통과 (12.79ms, 38.6MB)
// 테스트 13 〉	통과 (93.86ms, 71.3MB)
// 테스트 14 〉	통과 (100.27ms, 71.3MB)
// 테스트 15 〉	통과 (109.49ms, 71.3MB)
// 테스트 16 〉	통과 (89.69ms, 71.3MB)
// 테스트 17 〉	통과 (94.89ms, 71.3MB)
// 테스트 18 〉	통과 (91.15ms, 71.5MB)
// 테스트 19 〉	통과 (94.01ms, 71.5MB)
// 테스트 20 〉	통과 (100.11ms, 71.5MB)
// 채점 결과
// 정확성: 100.0
// 합계: 100.0 / 100.0
