function solution(n, words) {
  // n: 끝말잇기에 참여하는 사람의 수
  // words: 끝말잇기에 사용된 단어들이 순서대로 들어있는 배열

  // answer
  // 1. 가장 먼저 탈락하는 사람의 번호
  // 2. 그 사람이 몇 번째 차례에 탈락하는지
  let answer = [];

  let usedWords = [];
  let lastChar = words[0].charAt(0);

  for (let i = 0; i < words.length; i++) {
    // 이미 사용된 단어를 말했거나
    // 이전 단어의 마지막 스펠링과 다른 스펠링으로 시작하는 단어를 말한 경우: break
    if (usedWords.includes(words[i]) || lastChar !== words[i].charAt(0)) {
      answer[0] = (i % n) + 1;
      answer[1] = Math.trunc((i / n) + 1);
      break;
    } 

    usedWords.push(words[i]);
    lastChar = words[i].charAt(words[i].length - 1);
  }

  if (answer.length == 0) {
    answer[0] = answer[1] = 0;
  }

  return answer;
}

solution(2, ["hello", "one", "even", "never", "now", "world", "draw"]);