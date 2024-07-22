function solution(progresses, speeds) {
    var answer = [];
        
    while (progresses.length !== 0) {
        let count = 0;

        for (let i = 0; i < progresses.length; i++) {
            progresses[i] += speeds[i];
        }

        while (progresses[0] >= 100) {
            count++;
            progresses.shift();
            speeds.shift();
        }
        
        if (count > 0) answer.push(count);
    }

    return answer;
}

// 테스트 1 〉	통과 (0.15ms, 33.4MB)
// 테스트 2 〉	통과 (0.28ms, 33.5MB)
// 테스트 3 〉	통과 (0.51ms, 33.7MB)
// 테스트 4 〉	통과 (0.21ms, 33.4MB)
// 테스트 5 〉	통과 (0.16ms, 33.4MB)
// 테스트 6 〉	통과 (0.26ms, 33.5MB)
// 테스트 7 〉	통과 (0.55ms, 33.4MB)
// 테스트 8 〉	통과 (0.16ms, 33.6MB)
// 테스트 9 〉	통과 (0.47ms, 33.5MB)
// 테스트 10 〉	통과 (0.31ms, 33.6MB)
// 테스트 11 〉	통과 (0.19ms, 33.4MB)
