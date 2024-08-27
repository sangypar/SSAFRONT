/*
정확성  테스트
테스트 1 〉	통과 (0.23ms, 33.6MB)
테스트 2 〉	통과 (0.26ms, 33.4MB)
테스트 3 〉	통과 (0.17ms, 33.4MB)
테스트 4 〉	통과 (0.25ms, 33.6MB)
테스트 5 〉	통과 (0.25ms, 33.5MB)

효율성  테스트
테스트 1 〉	통과 (0.96ms, 33.2MB)
테스트 2 〉	통과 (0.91ms, 33.2MB)
테스트 3 〉	통과 (21.65ms, 35.4MB)
테스트 4 〉	통과 (0.18ms, 32.9MB)
테스트 5 〉	통과 (57.21ms, 36.1MB)
*/

function solution(routes) {
    let answer = 1;
    
    routes.sort((a, b) => a[1] - b[1]);
    
    let camera = routes[0][1];
    
    for(let i = 1; i < routes.length; i++) {
        const currLeft = routes[i][0];
        const currRight = routes[i][1];
        
        if(currLeft <= camera && camera <= currRight) {
            continue;
            
        } else {
            camera = currRight;
            answer++;
        }
    }
    
    return answer;
}
