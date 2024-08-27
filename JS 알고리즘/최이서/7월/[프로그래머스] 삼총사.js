let answer = 0;
let visited = [];

function solution(number) {
  comb(0, 0, number);
  console.log(answer);
  return answer;
}

function comb(start, depth, number) {
  if (depth === 3) {
    let sum = visited.reduce((acc, val) => acc + val, 0);
    if (sum === 0) {
      answer++;
    }
    return;
  }

  for (let i = start; i < number.length; i++) {
    visited[depth] = number[i];
    comb(i + 1, depth + 1, number);
  }
}

solution([-2, 3, 0, 2, -5]);
