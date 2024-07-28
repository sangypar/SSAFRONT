function solution(numbers) {
    numbers.sort((a, b) => {
        let strA = a.toString();
        let strB = b.toString();
        return parseInt(strB + strA) - parseInt(strA + strB);
    });
    
    var answer = '';
    
    for (const item of numbers) {
        answer += item;
    }
    
    return answer[0] === '0' ? '0' : answer;
}

// 테스트 1 〉	통과 (169.54ms, 43.4MB)
// 테스트 2 〉	통과 (93.01ms, 42MB)
// 테스트 3 〉	통과 (221.89ms, 47MB)
// 테스트 4 〉	통과 (5.35ms, 36.6MB)
// 테스트 5 〉	통과 (154.07ms, 45MB)
// 테스트 6 〉	통과 (133.36ms, 44.3MB)
// 테스트 7 〉	통과 (0.10ms, 33.4MB)
// 테스트 8 〉	통과 (0.09ms, 33.5MB)
// 테스트 9 〉	통과 (0.09ms, 33.5MB)
// 테스트 10 〉	통과 (0.09ms, 33.4MB)
// 테스트 11 〉	통과 (0.17ms, 33.5MB)
// 테스트 12 〉	통과 (0.06ms, 33.4MB)
// 테스트 13 〉	통과 (0.07ms, 33.5MB)
// 테스트 14 〉	통과 (0.08ms, 33.6MB)
// 테스트 15 〉	통과 (0.06ms, 33.6MB)
