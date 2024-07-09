function solution(s){
  let answer = false;

  let left = 0;

  for (let i = 0; i < s.length; i++) {
    if (left === 0 && s.charAt(i) === ')') {
      answer = false;
      return answer;
    }

    if (s.charAt(i) === '(') {
      left++;
    } else {
      left--;
    }
  }

  if (left === 0) {
    answer = true;
  } 
  
  return answer;
}

solution(")()(");

// 정확성  테스트
// 테스트 1 〉	통과 (0.04ms, 33.5MB)
// 테스트 2 〉	통과 (0.05ms, 33.4MB)
// 테스트 3 〉	통과 (0.04ms, 33.4MB)
// 테스트 4 〉	통과 (0.06ms, 33.4MB)
// 테스트 5 〉	통과 (0.06ms, 33.6MB)
// 테스트 6 〉	통과 (0.04ms, 33.4MB)
// 테스트 7 〉	통과 (0.05ms, 33.5MB)
// 테스트 8 〉	통과 (0.06ms, 33.6MB)
// 테스트 9 〉	통과 (0.12ms, 33.5MB)
// 테스트 10 〉	통과 (0.05ms, 33.4MB)
// 테스트 11 〉	통과 (0.04ms, 33.5MB)
// 테스트 12 〉	통과 (0.13ms, 33.4MB)
// 테스트 13 〉	통과 (0.12ms, 33.4MB)
// 테스트 14 〉	통과 (0.12ms, 33.4MB)
// 테스트 15 〉	통과 (0.12ms, 33.4MB)
// 테스트 16 〉	통과 (0.13ms, 33.5MB)
// 테스트 17 〉	통과 (0.12ms, 33.4MB)
// 테스트 18 〉	통과 (0.17ms, 33.6MB)
// 효율성  테스트
// 테스트 1 〉	통과 (22.82ms, 36.6MB)
// 테스트 2 〉	통과 (2.48ms, 36.9MB)