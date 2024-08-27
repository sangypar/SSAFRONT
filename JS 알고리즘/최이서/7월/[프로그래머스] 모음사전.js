function solution(word) {
  let answer = 0;
  const words = ['A', 'E', 'I', 'O', 'U'];
  let wordComb = [];

  comb(wordComb, 0);

  function comb(wordComb, len) {
    if (word.length === len && wordComb.every((val, idx) => val === word[idx])) {
      return true;
    }
  
    for (let i = 0; i < words.length; i++) {
      wordComb.push(words[i]);
    }
  }
  return answer;
}


solution("AAAAE");