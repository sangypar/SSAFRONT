function solution(routes) {
  let answer = 0;
  routes.sort((a, b) => a[1] - b[1]);
  answer++;
  let now = routes[0][1];
  for (let i = 1; i < routes.length; i++) {
    if (routes[i][0] <= now || routes[i][1] <= now) {
      continue;
    } else {
      answer++;
      now = routes[i][1];
    }
  }
  return answer;
}

solution([[-20,-15], [-14,-5], [-18, -13], [-5,-3]]);

// 정확성  테스트
// 테스트 1 〉	통과 (0.16ms, 33.5MB)
// 테스트 2 〉	통과 (0.16ms, 33.4MB)
// 테스트 3 〉	통과 (0.25ms, 33.4MB)
// 테스트 4 〉	통과 (0.18ms, 33.5MB)
// 테스트 5 〉	통과 (0.27ms, 33.5MB)
// 효율성  테스트
// 테스트 1 〉	통과 (1.30ms, 33.2MB)
// 테스트 2 〉	통과 (0.88ms, 33.4MB)
// 테스트 3 〉	통과 (16.80ms, 35.4MB)
// 테스트 4 〉	통과 (0.24ms, 32.9MB)
// 테스트 5 〉	통과 (24.59ms, 35.7MB)