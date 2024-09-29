function solution(numbers, target) {
    
    let count = 0; 
    
    const dfs = (idx, sum) => {
        if(idx === numbers.length) {
            if(sum === target) count++;
            return;
        }
        
        dfs(idx + 1, sum + numbers[idx]);
        dfs(idx + 1, sum - numbers[idx]);
    }
    
    dfs(0, 0);
    
    return count;

}

// 테스트 1 〉	통과 (34.30ms, 36.4MB)
// 테스트 2 〉	통과 (71.20ms, 36.5MB)
// 테스트 3 〉	통과 (0.19ms, 33.5MB)
// 테스트 4 〉	통과 (0.43ms, 33.5MB)
// 테스트 5 〉	통과 (19.72ms, 36.6MB)
// 테스트 6 〉	통과 (0.28ms, 33.4MB)
// 테스트 7 〉	통과 (0.20ms, 33.5MB)
// 테스트 8 〉	통과 (1.04ms, 35.5MB)
// 채점 결과
// 정확성: 100.0
// 합계: 100.0 / 100.0
