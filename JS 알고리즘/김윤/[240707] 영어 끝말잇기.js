function solution(n, words) {
    var answer = [0, 0];
    var pass = [words[0]];
    
    for (let i = 1; i < words.length; i++) {
        for (const item of pass) {
            if (words[i] === item) {
                answer[0] = i % n + 1;
                answer[1] = parseInt(i / n) + 1;
                return answer;
            }
        }
        
        pass.push(words[i]);
        
        var char1 = words[i-1].charAt(words[i-1].length - 1);
        var char2 = words[i].charAt(0);
        
        if (char1 !== char2) {
            answer[0] = i % n + 1;
            answer[1] = parseInt(i / n) + 1;
            return answer;
        }
    }
    
    return answer;
}

// 테스트 1 〉	통과 (0.19ms, 33.4MB)
// 테스트 2 〉	통과 (0.23ms, 33.5MB)
// 테스트 3 〉	통과 (0.08ms, 33.5MB)
// 테스트 4 〉	통과 (0.19ms, 33.5MB)
// 테스트 5 〉	통과 (0.29ms, 33.5MB)
// 테스트 6 〉	통과 (0.18ms, 33.4MB)
// 테스트 7 〉	통과 (0.19ms, 33.1MB)
// 테스트 8 〉	통과 (0.08ms, 33.2MB)
// 테스트 9 〉	통과 (0.21ms, 33.5MB)
// 테스트 10 〉	통과 (0.28ms, 33.5MB)
// 테스트 11 〉	통과 (0.26ms, 33.6MB)
// 테스트 12 〉	통과 (0.21ms, 33.6MB)
// 테스트 13 〉	통과 (0.08ms, 33.5MB)
// 테스트 14 〉	통과 (0.08ms, 33.4MB)
// 테스트 15 〉	통과 (0.08ms, 33.5MB)
// 테스트 16 〉	통과 (0.07ms, 33.4MB)
// 테스트 17 〉	통과 (0.08ms, 33.5MB)
// 테스트 18 〉	통과 (0.19ms, 33.4MB)
// 테스트 19 〉	통과 (0.08ms, 33.5MB)
// 테스트 20 〉	통과 (0.49ms, 33.7MB)
