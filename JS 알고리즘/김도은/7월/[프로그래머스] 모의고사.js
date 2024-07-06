function solution(answers) {

    let people1 = [1,2,3,4,5];
    let people2 = [2,1,2,3,2,4,2,5];
    let people3 = [3,3,1,1,2,2,4,4,5,5];

   let cnt = [0, 0, 0];

    let max = 0;

    answers.forEach((item, idx) => {

        if(item === people1[idx%5]) cnt[0]++;
        if(item === people2[idx%8]) cnt[1]++;
        if(item === people3[idx%10]) cnt[2]++;

        max = Math.max(...cnt);
    });

    let answer = [];

    cnt.forEach((item, idx) => {
        if(max === item) answer.push(idx+1);
    })

    return answer.sort((a,b) => a-b);
}


// 테스트 1 〉	통과 (0.17ms, 33.4MB)
// 테스트 2 〉	통과 (0.09ms, 33.4MB)
// 테스트 3 〉	통과 (0.08ms, 33.4MB)
// 테스트 4 〉	통과 (0.09ms, 33.6MB)
// 테스트 5 〉	통과 (0.19ms, 33.4MB)
// 테스트 6 〉	통과 (0.19ms, 33.5MB)
// 테스트 7 〉	통과 (1.99ms, 35.5MB)
// 테스트 8 〉	통과 (0.36ms, 33.5MB)
// 테스트 9 〉	통과 (1.62ms, 35.8MB)
// 테스트 10 〉	통과 (0.65ms, 33.4MB)
// 테스트 11 〉	통과 (1.70ms, 35.7MB)
// 테스트 12 〉	통과 (2.28ms, 35.9MB)
// 테스트 13 〉	통과 (0.24ms, 33.5MB)
// 테스트 14 〉	통과 (2.39ms, 35.7MB)
