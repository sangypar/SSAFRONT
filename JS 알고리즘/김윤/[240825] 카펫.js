function solution(brown, yellow) {
    var answer = [];
    
    var width = brown + yellow;
    var length = brown / 2 + 2;
    
    for (let i = 1; i <= length / 2; i++) {
        var garo = length - i;
        var sero = i;
        
        if (garo * sero === width) {
            answer.push(garo);
            answer.push(sero);
            break;
        }
    }
    
    return answer;
}

// 테스트 1 〉	통과 (0.04ms, 33.6MB)
// 테스트 2 〉	통과 (0.04ms, 33.4MB)
// 테스트 3 〉	통과 (0.13ms, 33.6MB)
// 테스트 4 〉	통과 (0.04ms, 33.4MB)
// 테스트 5 〉	통과 (0.04ms, 33.5MB)
// 테스트 6 〉	통과 (0.13ms, 33.5MB)
// 테스트 7 〉	통과 (0.14ms, 33.5MB)
// 테스트 8 〉	통과 (0.14ms, 33.6MB)
// 테스트 9 〉	통과 (0.14ms, 33.5MB)
// 테스트 10 〉	통과 (0.14ms, 33.5MB)
// 테스트 11 〉	통과 (0.04ms, 33.5MB)
// 테스트 12 〉	통과 (0.04ms, 33.4MB)
// 테스트 13 〉	통과 (0.04ms, 33.4MB)
