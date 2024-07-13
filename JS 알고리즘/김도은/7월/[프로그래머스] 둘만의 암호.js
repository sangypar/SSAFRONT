function solution(s, skip, index) {
    
    //알파벳은 26개...
    let alphabet = ['a', 'b', 'c', 'd', 'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    const check = (idx) => {
       return skip.includes(alphabet[idx])
    }
    
        let answer = '';
    
    for(let i = 0; i < s.length; i++){
        let idx = alphabet.indexOf(s.charAt(i));
        let count = index;
        
        while(count !== 0){
            //0이 될때까지
            idx = (idx + 1) % 26;
            if(!check(idx)) {
                //skip에 없다면
                count--;
            }
        }
        
        answer+=alphabet[idx % 26];
    }
    
    return answer;
}

// 테스트 1 〉	통과 (0.22ms, 33.6MB)
// 테스트 2 〉	통과 (0.17ms, 33.4MB)
// 테스트 3 〉	통과 (0.27ms, 33.4MB)
// 테스트 4 〉	통과 (0.17ms, 33.5MB)
// 테스트 5 〉	통과 (0.20ms, 33.4MB)
// 테스트 6 〉	통과 (0.19ms, 33.4MB)
// 테스트 7 〉	통과 (0.23ms, 33.4MB)
// 테스트 8 〉	통과 (0.17ms, 33.5MB)
// 테스트 9 〉	통과 (0.19ms, 33.6MB)
// 테스트 10 〉	통과 (0.18ms, 33.5MB)
// 테스트 11 〉	통과 (0.21ms, 33.4MB)
// 테스트 12 〉	통과 (0.18ms, 33.4MB)
// 테스트 13 〉	통과 (0.19ms, 33.5MB)
// 테스트 14 〉	통과 (0.17ms, 33.5MB)
// 테스트 15 〉	통과 (0.20ms, 33.4MB)
// 테스트 16 〉	통과 (0.18ms, 33.4MB)
// 테스트 17 〉	통과 (0.21ms, 33.4MB)
// 테스트 18 〉	통과 (0.23ms, 33.5MB)
// 테스트 19 〉	통과 (0.24ms, 33.4MB)
// 채점 결과
// 정확성: 100.0
// 합계: 100.0 / 100.0
