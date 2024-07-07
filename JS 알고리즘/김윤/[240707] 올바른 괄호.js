function solution(s){
    var array = s.split("");
    var stack = [s[0]];
    
    if (s[0] === ')') return false;
    
    for (let i = 1; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(s[i]);
        } else {
            var check = stack.pop();
            if (check !== '(') return false;
        }
    }
    
    return stack.length === 0 ? true : false;
}

// 정확성 테스트
// 테스트 1 〉	통과 (0.07ms, 33.4MB)
// 테스트 2 〉	통과 (0.06ms, 33.4MB)
// 테스트 3 〉	통과 (0.05ms, 33.5MB)
// 테스트 4 〉	통과 (0.07ms, 33.4MB)
// 테스트 5 〉	통과 (0.05ms, 33.4MB)
// 테스트 6 〉	통과 (0.05ms, 33.4MB)
// 테스트 7 〉	통과 (0.05ms, 33.4MB)
// 테스트 8 〉	통과 (0.05ms, 33.4MB)
// 테스트 9 〉	통과 (0.05ms, 33.3MB)
// 테스트 10 〉	통과 (0.05ms, 33.3MB)
// 테스트 11 〉	통과 (0.06ms, 33.3MB)
// 테스트 12 〉	통과 (0.14ms, 33.5MB)
// 테스트 13 〉	통과 (0.14ms, 33.4MB)
// 테스트 14 〉	통과 (0.18ms, 33.4MB)
// 테스트 15 〉	통과 (0.21ms, 33.4MB)
// 테스트 16 〉	통과 (0.14ms, 33.4MB)
// 테스트 17 〉	통과 (0.15ms, 33.4MB)
// 테스트 18 〉	통과 (0.20ms, 33.4MB)

// 효율성  테스트
// 테스트 1 〉	통과 (39.30ms, 37.7MB)
// 테스트 2 〉	통과 (28.34ms, 37.7MB)
