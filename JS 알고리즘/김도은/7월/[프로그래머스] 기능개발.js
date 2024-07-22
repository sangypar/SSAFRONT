function solution(progresses, speeds) {
    
    let day = 0;
    
    let finish = [];
    
    while(progresses.length !== 0){
        //작업이 남아 있지 않을 때까지
        day++; //하루지남   
        
        for(let i = 0; i < progresses.length; i++) {
            progresses[i] += speeds[i];
        }
               
        let count = 0; //끝낼 일
    
        //첫타자가 완료된다면
        while(progresses[0] >= 100) {
            progresses.shift();
            speeds.shift();
            count++;
        }
        finish.push(count);
    }
     
    return finish.filter((progress) => progress !== 0);
}

// 테스트 1 〉	통과 (0.16ms, 33.6MB)
// 테스트 2 〉	통과 (0.48ms, 33.5MB)
// 테스트 3 〉	통과 (0.36ms, 33.6MB)
// 테스트 4 〉	통과 (0.22ms, 33.6MB)
// 테스트 5 〉	통과 (0.16ms, 33.6MB)
// 테스트 6 〉	통과 (0.16ms, 33.5MB)
// 테스트 7 〉	통과 (0.33ms, 33.5MB)
// 테스트 8 〉	통과 (0.17ms, 33.5MB)
// 테스트 9 〉	통과 (0.29ms, 33.6MB)
// 테스트 10 〉	통과 (0.31ms, 33.5MB)
// 테스트 11 〉	통과 (0.15ms, 33.5MB)
// 채점 결과
// 정확성: 100.0
// 합계: 100.0 / 100.0
