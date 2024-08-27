function solution(board, moves) {
  let answer = 0;

  let heights = []; // 몇 번째 요소에서 빼야하는지
  let N = board.length;

  for (let i = 0; i < N; i++) {
    for (let r = 0; r < N; r++) {
      if (board[r][i] !== 0) {
        heights.push(r);
        break;
      }
      // 아무 인형도 들어있지 않은 칸에는 N push
      if (r == N - 1) {
        heights.push(N);
      }
    }
  }

  let basket = [];  // 스택

  moves = moves.map((val) => val - 1);

  // 첫번째 뽑은 인형 스택에 넣기
  basket.push(board[heights[moves[0]]][moves[0]])
  heights[moves[0]]++;

  for (let i = 1; i < moves.length; i++) {

    // 더 이상 아무 인형도 남아있지 않은 칸: continue
    if (heights[moves[i]] === N)
      continue;

    let curVal = board[heights[moves[i]]][moves[i]];
    // 스택에 요소가 남아있고 && 해당 요소가 현재 뽑은 인형과 동일한 인형일 때: pop
    if (basket.length >= 1 && (basket[basket.length - 1] === curVal)) {
      basket.pop();
      answer += 2;
    } else {
      // 서로 다른 인형일 때: push
      basket.push(board[heights[moves[i]]][moves[i]]);
    }

    // heights 갱신
    heights[moves[i]]++;
  }

  return answer;
}

solution(
  [
    [0,0,0,0,0],
    [0,0,1,0,3],
    [0,2,5,0,1],
    [4,2,4,4,2],
    [3,5,1,3,1]
  ],
  [1,5,3,5,1,2,1,4]
);

// 정확성  테스트
// 테스트 1 〉	통과 (0.09ms, 33.4MB)
// 테스트 2 〉	통과 (0.18ms, 33.4MB)
// 테스트 3 〉	통과 (0.19ms, 33.4MB)
// 테스트 4 〉	통과 (0.41ms, 33.5MB)
// 테스트 5 〉	통과 (0.18ms, 33.2MB)
// 테스트 6 〉	통과 (0.18ms, 33.3MB)
// 테스트 7 〉	통과 (0.20ms, 33.5MB)
// 테스트 8 〉	통과 (0.27ms, 33.4MB)
// 테스트 9 〉	통과 (0.27ms, 33.6MB)
// 테스트 10 〉	통과 (0.25ms, 33.5MB)
// 테스트 11 〉	통과 (0.30ms, 33.5MB)