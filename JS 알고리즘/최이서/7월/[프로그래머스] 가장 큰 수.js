function solution(numbers) {

  let answer = '';

  // 문자열 배열로 복사
  strArr = numbers.map((val) => val.toString());

  // 요소 정렬
  strArr.sort((a, b) => {

    // 첫번째 수가 같은 경우: 이어 붙였을 때 더 큰 수 기준 정렬
    if (a.charAt(0) == b.charAt(0)) {
      return ''.concat(b, a) - ''.concat(a, b);
    }

    // 그 외: 첫번째 수 기준 정렬
    return b.charAt(0) - a.charAt(0);
  })
  
  // 테케11: 모든 요소가 0인 경우 >> 0 반환
  if (strArr.every((val) => val === '0')) {
    return '0';
  }

  // 그 외: 정렬된 배열의 요소 붙이기
  for (let num of strArr) {
    answer += num;
  }
  
  // reduce가 for of 보다 조금 더 느림
  // answer = strArr.reduce((acc, cur) => acc += cur)

  return answer;
}

solution([6, 10, 2]);
// solution([3, 30, 34, 5, 9]);

// 정확성  테스트
// 테스트 1 〉	통과 (128.21ms, 43.9MB)
// 테스트 2 〉	통과 (71.11ms, 42.3MB)
// 테스트 3 〉	통과 (167.70ms, 47.1MB)
// 테스트 4 〉	통과 (4.78ms, 37.7MB)
// 테스트 5 〉	통과 (114.46ms, 45.1MB)
// 테스트 6 〉	통과 (100.70ms, 44.2MB)
// 테스트 7 〉	통과 (0.20ms, 33.4MB)
// 테스트 8 〉	통과 (0.19ms, 33.4MB)
// 테스트 9 〉	통과 (0.19ms, 33.4MB)
// 테스트 10 〉	통과 (0.19ms, 33.4MB)
// 테스트 11 〉	통과 (0.19ms, 33.4MB)
// 테스트 12 〉	통과 (0.09ms, 33.5MB)
// 테스트 13 〉	통과 (0.10ms, 33.5MB)
// 테스트 14 〉	통과 (0.17ms, 33.4MB)
// 테스트 15 〉	통과 (0.09ms, 33.4MB)