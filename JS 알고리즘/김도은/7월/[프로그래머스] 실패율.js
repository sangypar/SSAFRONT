function solution(N, stages) {
    
    let game = new Array(N+2).fill(0); //게임 스테이지별 실패율 담을 배열
    
    for(let user of stages) {
        game[user]++; //개수 세기
    }
    
    let totalUsers = stages.length; // 전체 사용자 수
    let fail = [];
    
    for (let i = 1; i <= N; i++) {
        if (totalUsers === 0) {
            fail.push({ stage: i, failRate: 0 });
        } else {
            let failRate = game[i] / totalUsers; // 실패율 계산
            fail.push({ stage: i, failRate: failRate });
            totalUsers -= game[i]; // 클리어한 사용자 수 업데이트
        }
    }

  //여기 틀린 이유 봐줄 사람 ㅠ ㅠ
    // for(let i = N; i >= 1; i--){
    //     let sum = 0;
    //     for(let j = N+1; j >= i; j--) {
    //         sum += game[j];
    //     }
    //     fail.push({stage: i, failrate: game[i] / sum});
    // }
    
    fail.sort((a,b) => {
        if(a.failRate === b.failRate) {
            return a.stage - b.stage;
        }
        return -(a.failRate - b.failRate);
    })
   
    
    return fail.map(item => item.stage);
}

// 테스트 1 〉	통과 (0.21ms, 33.5MB)
// 테스트 2 〉	통과 (0.34ms, 33.5MB)
// 테스트 3 〉	통과 (1.67ms, 34.6MB)
// 테스트 4 〉	통과 (7.88ms, 39.6MB)
// 테스트 5 〉	통과 (8.50ms, 43.5MB)
// 테스트 6 〉	통과 (0.39ms, 33.6MB)
// 테스트 7 〉	통과 (1.02ms, 34.3MB)
// 테스트 8 〉	통과 (5.82ms, 39.4MB)
// 테스트 9 〉	통과 (9.36ms, 43.4MB)
// 테스트 10 〉	통과 (8.04ms, 39.4MB)
// 테스트 11 〉	통과 (6.46ms, 39.5MB)
// 테스트 12 〉	통과 (6.15ms, 40.1MB)
// 테스트 13 〉	통과 (7.70ms, 40.6MB)
// 테스트 14 〉	통과 (0.27ms, 33.5MB)
// 테스트 15 〉	통과 (7.03ms, 38.7MB)
// 테스트 16 〉	통과 (3.82ms, 38.9MB)
// 테스트 17 〉	통과 (5.19ms, 38.7MB)
// 테스트 18 〉	통과 (4.11ms, 38.8MB)
// 테스트 19 〉	통과 (1.28ms, 33.9MB)
// 테스트 20 〉	통과 (4.54ms, 39.4MB)
// 테스트 21 〉	통과 (5.24ms, 39.1MB)
// 테스트 22 〉	통과 (10.27ms, 43.5MB)
// 테스트 23 〉	통과 (8.06ms, 40.7MB)
// 테스트 24 〉	통과 (10.88ms, 40.9MB)
// 테스트 25 〉	통과 (0.16ms, 33.4MB)
// 테스트 26 〉	통과 (0.11ms, 33.4MB)
// 테스트 27 〉	통과 (0.11ms, 33.4MB)
// 채점 결과
// 정확성: 100.0
// 합계: 100.0 / 100.0
