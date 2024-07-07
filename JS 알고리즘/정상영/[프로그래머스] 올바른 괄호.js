function solution(s){
    var answer = true;
    
    if(s[0] === ')') return false;
    else if(s[s.length - 1] === '(') return false;
    
    let openCnt = 0;
    let closeCnt = 0;
    
    for(let char of s) {
        if(char === '(') openCnt++;
        else if(char === ')') closeCnt++;
        
        if(openCnt < closeCnt) return false;
    }
    
    if(openCnt !== closeCnt) return false;
    
    return answer;
}

/*
정확성  테스트
테스트 1 〉	통과 (0.07ms, 33.2MB)
테스트 2 〉	통과 (0.13ms, 33.3MB)
테스트 3 〉	통과 (0.05ms, 33.4MB)
테스트 4 〉	통과 (0.09ms, 33.4MB)
테스트 5 〉	통과 (0.07ms, 33.4MB)
테스트 6 〉	통과 (0.05ms, 33.5MB)
테스트 7 〉	통과 (0.07ms, 33.4MB)
테스트 8 〉	통과 (0.05ms, 33.5MB)
테스트 9 〉	통과 (0.07ms, 33.4MB)
테스트 10 〉	통과 (0.09ms, 33.4MB)
테스트 11 〉	통과 (0.05ms, 33.3MB)
테스트 12 〉	통과 (0.15ms, 33.4MB)
테스트 13 〉	통과 (0.34ms, 33.4MB)
테스트 14 〉	통과 (0.14ms, 33.4MB)
테스트 15 〉	통과 (0.16ms, 33.5MB)
테스트 16 〉	통과 (0.22ms, 33.4MB)
테스트 17 〉	통과 (0.14ms, 33.4MB)
테스트 18 〉	통과 (0.05ms, 33.4MB)
효율성  테스트
테스트 1 〉	통과 (27.30ms, 37.9MB)
테스트 2 〉	통과 (25.76ms, 37.9MB)
*/
