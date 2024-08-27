function solution(brown, yellow) {
  let answer = [];

  let total = brown + yellow;
  
  for (let i = 1; i <= Math.sqrt(total); i++) {
    if (total % i === 0) {
      let r = i;
      let c = total / i;
      
      if (((r - 2) * (c - 2)) === yellow) {
        answer.push(c);
        answer.push(r);
        break;
      }
    }
  }

  return answer;
}

solution(24, 24);

// 정확성  테스트
// 테스트 1 〉	통과 (0.06ms, 33.5MB)
// 테스트 2 〉	통과 (0.05ms, 33.5MB)
// 테스트 3 〉	통과 (0.15ms, 33.5MB)
// 테스트 4 〉	통과 (0.05ms, 33.5MB)
// 테스트 5 〉	통과 (0.05ms, 33.5MB)
// 테스트 6 〉	통과 (0.13ms, 33.4MB)
// 테스트 7 〉	통과 (0.17ms, 33.4MB)
// 테스트 8 〉	통과 (0.16ms, 33.5MB)
// 테스트 9 〉	통과 (0.24ms, 33.4MB)
// 테스트 10 〉	통과 (0.17ms, 33.5MB)
// 테스트 11 〉	통과 (0.04ms, 33.4MB)
// 테스트 12 〉	통과 (0.04ms, 33.4MB)
// 테스트 13 〉	통과 (0.04ms, 33.4MB)