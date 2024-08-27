function solution(n, computers) {
  let answer = 0;                   // 정답: 네트워크 개수
  let checked = Array(n).fill(0);   // 방문체크

  for (let i = 0; i < n; i++) {
    if (checked[i] === 0) {
      answer++;
      BFS(i);
    }
  }

  function BFS(idx) {
    let Q = [idx];
    checked[idx] = 1;
    
    while (Q.length > 0) {
      let target = Q.shift();  // 0번째 요소 제거
      
      for (let i = 0; i < n; i++) {
        // 두 컴퓨터가 연결되어있고, 아직 네트워크에 연결되어 있지 않은 컴퓨터라면
        if (computers[target][i] === 1 && checked[i] === 0) {
          checked[i] = 1;
          Q.push(i);
        }
      }
    }
  }

  // console.log(answer);
  return answer;
}


solution(5, [
  [1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1]
]);

// 정확성  테스트
// 테스트 1 〉	통과 (0.24ms, 33.5MB)
// 테스트 2 〉	통과 (0.16ms, 33.5MB)
// 테스트 3 〉	통과 (0.17ms, 33.5MB)
// 테스트 4 〉	통과 (0.18ms, 33.4MB)
// 테스트 5 〉	통과 (0.07ms, 33.4MB)
// 테스트 6 〉	통과 (0.23ms, 33.4MB)
// 테스트 7 〉	통과 (0.22ms, 33.6MB)
// 테스트 8 〉	통과 (0.25ms, 33.4MB)
// 테스트 9 〉	통과 (0.19ms, 33.5MB)
// 테스트 10 〉	통과 (0.32ms, 33.5MB)
// 테스트 11 〉	통과 (0.41ms, 33.7MB)
// 테스트 12 〉	통과 (0.39ms, 33.8MB)
// 테스트 13 〉	통과 (0.29ms, 33.4MB)