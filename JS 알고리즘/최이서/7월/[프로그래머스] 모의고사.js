function solution(answers) {
  let result = [0];
  let max = 0;

  const pattern = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  ];

  for (let p = 0; p < 3; p++) {
    let ptn = pattern[p];
    let cnt = 0;
    
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === ptn[i % ptn.length]) {
        cnt++;
      }
    }

    if (cnt > max) {
      result = [p+1];
      max = cnt;
    } else if (cnt == max) {
      result.push(p+1);
    }
  }

  return result;
}

solution([1, 3, 2, 4, 2]);