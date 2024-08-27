function solution(progresses, speeds) {
  
  let answer = [];
  let idx = 0;

  while (idx < progresses.length) {

    for (let i = 0; i < progresses.length; i++) {
      progresses[i] += speeds[i];
    }

    if (progresses[idx] >= 100) {
      let cnt = 0;

      while (idx < progresses.length && progresses[idx] >= 100) {
        cnt++;
        idx++;
      }
      answer.push(cnt);
    }
  }

  return answer;
}

// 정확성  테스트
// 테스트 1 〉	통과 (0.14ms, 33.4MB)
// 테스트 2 〉	통과 (0.48ms, 33.5MB)
// 테스트 3 〉	통과 (0.38ms, 33.5MB)
// 테스트 4 〉	통과 (0.36ms, 33.4MB)
// 테스트 5 〉	통과 (0.14ms, 33.5MB)
// 테스트 6 〉	통과 (0.21ms, 33.4MB)
// 테스트 7 〉	통과 (0.40ms, 33.5MB)
// 테스트 8 〉	통과 (0.15ms, 33.5MB)
// 테스트 9 〉	통과 (0.46ms, 33.5MB)
// 테스트 10 〉	통과 (0.33ms, 33.5MB)
// 테스트 11 〉	통과 (0.14ms, 33.5MB)