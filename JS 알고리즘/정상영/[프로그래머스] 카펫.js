/*
테스트 1 〉	통과 (0.04ms, 33.5MB)
테스트 2 〉	통과 (0.04ms, 33.4MB)
테스트 3 〉	통과 (0.13ms, 33.3MB)
테스트 4 〉	통과 (0.04ms, 33.5MB)
테스트 5 〉	통과 (0.04ms, 33.4MB)
테스트 6 〉	통과 (0.12ms, 33.5MB)
테스트 7 〉	통과 (0.13ms, 33.5MB)
테스트 8 〉	통과 (0.13ms, 33.3MB)
테스트 9 〉	통과 (0.13ms, 33.4MB)
테스트 10 〉	통과 (0.13ms, 33.5MB)
테스트 11 〉	통과 (0.04ms, 33.5MB)
테스트 12 〉	통과 (0.04ms, 33.4MB)
테스트 13 〉	통과 (0.04ms, 33.4MB)
*/

function solution(brown, yellow) {
    let answer = [];
    
    const sum = brown + yellow;
    
    for(let height = 3; height <= 2005000/3; height++) {
        if(sum % height === 0) {
            const width = sum / height;
            
            if((2 * width) + (2 * (height - 2)) === brown) {
                answer.push(width);
                answer.push(height);
                break;
            }
        }
    }
    
    return answer;
}
