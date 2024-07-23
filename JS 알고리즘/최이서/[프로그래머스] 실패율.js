let input1 = 5;
let input2 = [2, 1, 2, 6, 2, 4, 3, 3];

// N: 스테이지의 개수
function solution(N, stages) {
  let answer = [];

  let failRate = [];

  for (let i = 1; i <= N; i++) {
    let filteredStage = stages.filter((num) => {
      return num > i;
    })

    failRate.push([i, ((stages.length - filteredStage.length) / stages.length)]);
    stages = filteredStage;

    failRate.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] - b[0];
      }
      return b[1] - a[1];
    })
  }
  
  answer = failRate.map(row => row[0]);
  return answer;
}

solution(input1, input2);

// 정확성  테스트
// 테스트 1 〉	통과 (0.07ms, 33.6MB)
// 테스트 2 〉	통과 (0.31ms, 33.6MB)
// 테스트 3 〉	통과 (67.24ms, 42.9MB)
// 테스트 4 〉	통과 (444.84ms, 74.9MB)
// 테스트 5 〉	통과 (2129.13ms, 75.5MB)
// 테스트 6 〉	통과 (2.16ms, 36.5MB)
// 테스트 7 〉	통과 (12.37ms, 38.7MB)
// 테스트 8 〉	통과 (489.36ms, 76.1MB)
// 테스트 9 〉	통과 (2134.40ms, 74.4MB)
// 테스트 10 〉	통과 (187.52ms, 65.5MB)
// 테스트 11 〉	통과 (485.00ms, 70.2MB)
// 테스트 12 〉	통과 (210.21ms, 66.8MB)
// 테스트 13 〉	통과 (1072.78ms, 67.3MB)
// 테스트 14 〉	통과 (0.15ms, 33.6MB)
// 테스트 15 〉	통과 (35.59ms, 48.6MB)
// 테스트 16 〉	통과 (2.47ms, 37.7MB)
// 테스트 17 〉	통과 (34.34ms, 48.8MB)
// 테스트 18 〉	통과 (2.49ms, 37.7MB)
// 테스트 19 〉	통과 (0.61ms, 33.9MB)
// 테스트 20 〉	통과 (4.31ms, 38.5MB)
// 테스트 21 〉	통과 (9.92ms, 38.6MB)
// 테스트 22 〉	통과 (4227.88ms, 73MB)
// 테스트 23 〉	통과 (21.48ms, 47.6MB)
// 테스트 24 〉	통과 (84.85ms, 60.3MB)
// 테스트 25 〉	통과 (0.03ms, 33.4MB)
// 테스트 26 〉	통과 (0.02ms, 33.4MB)
// 테스트 27 〉	통과 (0.02ms, 33.5MB)