function solution(n, computers) {
    var visit = new Array(n).fill(false);
    var count = 0;
    
    for (let i = 0; i < computers.length; i++) {
        if (!visit[i]) {
            dfs(computers, visit, i);
            count++;
        }
    }
    
    return count;
}

const dfs = (computers, visit, i) => {
    visit[i] = true;
    
    for (let j = 0; j < computers.length; j++) {
        if (computers[i][j] === 1 && !visit[j]) {
            dfs(computers, visit, j);
        }
    }
}

// 테스트 1 〉	통과 (0.14ms, 33.4MB)
// 테스트 2 〉	통과 (0.14ms, 33.4MB)
// 테스트 3 〉	통과 (0.16ms, 33.4MB)
// 테스트 4 〉	통과 (0.15ms, 33.4MB)
// 테스트 5 〉	통과 (0.09ms, 33.4MB)
// 테스트 6 〉	통과 (0.35ms, 33.3MB)
// 테스트 7 〉	통과 (0.14ms, 33.5MB)
// 테스트 8 〉	통과 (0.36ms, 33.5MB)
// 테스트 9 〉	통과 (0.17ms, 33.5MB)
// 테스트 10 〉	통과 (0.18ms, 33.6MB)
// 테스트 11 〉	통과 (0.62ms, 33.6MB)
// 테스트 12 〉	통과 (0.37ms, 33.8MB)
// 테스트 13 〉	통과 (0.25ms, 33.4MB)
