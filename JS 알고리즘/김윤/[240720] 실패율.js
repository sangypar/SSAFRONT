function solution(N, stages) {
    var temp = new Array(N).fill(0).map(() => new Array(2).fill(0));
    var answer = [];
    
    stages.sort((a, b) => a - b);
    
    for (let i = 1; i <= N; i++) {
        temp[i-1][0] = i;
        
        var num1 = 0;
        var num2 = 0;
        
        for (const item of stages) {
            if (item >= i) num1++;
            if (item == i) num2++;
        }
        
        temp[i-1][1] = num2 / num1;
    }
    
    temp.sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        else return a[0] - b[0];
    })
    
    for (const item of temp) {
        answer.push(item[0]);
    }
    
    return answer;
}

// 테스트 1 〉	통과 (0.25ms, 33.5MB)
// 테스트 2 〉	통과 (1.82ms, 33.9MB)
// 테스트 3 〉	통과 (34.16ms, 37MB)
// 테스트 4 〉	통과 (115.48ms, 42.2MB)
// 테스트 5 〉	통과 (319.39ms, 50.8MB)
// 테스트 6 〉	통과 (4.65ms, 37.6MB)
// 테스트 7 〉	통과 (9.89ms, 37.1MB)
// 테스트 8 〉	통과 (123.27ms, 42.2MB)
// 테스트 9 〉	통과 (303.64ms, 50.7MB)
// 테스트 10 〉	통과 (60.54ms, 42.1MB)
// 테스트 11 〉	통과 (92.61ms, 42.4MB)
// 테스트 12 〉	통과 (106.00ms, 43.3MB)
// 테스트 13 〉	통과 (138.28ms, 43.9MB)
// 테스트 14 〉	통과 (0.36ms, 33.6MB)
// 테스트 15 〉	통과 (27.85ms, 40.3MB)
// 테스트 16 〉	통과 (19.83ms, 38.4MB)
// 테스트 17 〉	통과 (27.18ms, 40.4MB)
// 테스트 18 〉	통과 (21.55ms, 38.5MB)
// 테스트 19 〉	통과 (7.98ms, 37.6MB)
// 테스트 20 〉	통과 (24.75ms, 38.7MB)
// 테스트 21 〉	통과 (34.86ms, 40.8MB)
// 테스트 22 〉	통과 (293.91ms, 45MB)
// 테스트 23 〉	통과 (50.39ms, 44.6MB)
// 테스트 24 〉	통과 (68.11ms, 45MB)
// 테스트 25 〉	통과 (0.10ms, 33.4MB)
// 테스트 26 〉	통과 (0.09ms, 33.3MB)
// 테스트 27 〉	통과 (0.09ms, 33.3MB)
