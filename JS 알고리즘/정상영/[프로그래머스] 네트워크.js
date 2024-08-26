/*
테스트 1 〉	통과 (0.15ms, 33.6MB)
테스트 2 〉	통과 (0.15ms, 33.5MB)
테스트 3 〉	통과 (0.16ms, 33.4MB)
테스트 4 〉	통과 (0.16ms, 33.4MB)
테스트 5 〉	통과 (0.07ms, 33.4MB)
테스트 6 〉	통과 (0.21ms, 33.4MB)
테스트 7 〉	통과 (0.15ms, 33.5MB)
테스트 8 〉	통과 (0.19ms, 33.6MB)
테스트 9 〉	통과 (0.18ms, 33.4MB)
테스트 10 〉	통과 (0.18ms, 33.6MB)
테스트 11 〉	통과 (0.58ms, 33.7MB)
테스트 12 〉	통과 (0.35ms, 33.8MB)
테스트 13 〉	통과 (0.24ms, 33.5MB)
*/

function solution(n, computers) {
    let answer = 0;
    
    let visited = new Array(n);
    visited.fill(false);
    
    const dfs = ((idx) => {
        visited[idx] = true;
        
        for(let i = 0; i < n; i++) {
            if(computers[idx][i] && !visited[i]) dfs(i);
        }
    });
    
    for(let i = 0; i < n; i++) {
        if(!visited[i]) {
            dfs(i);
            answer++;
        }
    }
    
    return answer;
}
