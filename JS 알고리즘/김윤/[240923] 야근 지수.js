function solution(n, works) {
    works.sort((a, b) => b - a);
    
    while (n > 0) {
        if (works[0] === 0) break;
        works[0] -= 1;
        n -= 1;
        
        let i = 0;
        
        while (i < works.length - 1 && works[i] < works[i + 1]) {
            [works[i], works[i + 1]] = [works[i + 1], works[i]];
            i++;
        }
    }
    
    let answer = 0;
    works.forEach(x => {answer += x * x;})
    
    return answer;
}

// 정확성  테스트
// 테스트 1 〉	통과 (0.27ms, 33.6MB)
// 테스트 2 〉	통과 (0.20ms, 33.6MB)
// 테스트 3 〉	통과 (0.09ms, 33.5MB)
// 테스트 4 〉	통과 (0.22ms, 33.5MB)
// 테스트 5 〉	통과 (0.15ms, 33.5MB)
// 테스트 6 〉	통과 (0.16ms, 33.7MB)
// 테스트 7 〉	통과 (0.19ms, 33.5MB)
// 테스트 8 〉	통과 (0.93ms, 33.9MB)
// 테스트 9 〉	통과 (4.64ms, 37.6MB)
// 테스트 10 〉	통과 (0.21ms, 33.6MB)
// 테스트 11 〉	통과 (0.08ms, 33.7MB)
// 테스트 12 〉	통과 (0.35ms, 33.5MB)
// 테스트 13 〉	통과 (0.20ms, 33.5MB)
// 효율성  테스트
// 테스트 1 〉	통과 (823.14ms, 37.1MB)
// 테스트 2 〉	통과 (293.10ms, 36.8MB)
