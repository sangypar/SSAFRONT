function solution(s) {
  let answer = "";
  const arr = [...s];
  let str = "";

  for (let c of arr) {
    if (isNaN(parseInt(c))) {
      str += c;
      if (changeStr(str) != undefined) {
        answer += changeStr(str);
        str = "";
      }
    } else {
      answer += c;
      str = "";
    }
  }
  return parseInt(answer);
}

function changeStr(str) {
  switch (str) {
    case "zero":
      return "0";
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
  }
}

solution("one4seveneight");

// 테스트 1 〉	통과 (0.07ms, 33.4MB)
// 테스트 2 〉	통과 (0.08ms, 33.5MB)
// 테스트 3 〉	통과 (0.08ms, 33.4MB)
// 테스트 4 〉	통과 (0.07ms, 33.4MB)
// 테스트 5 〉	통과 (0.17ms, 33.4MB)
// 테스트 6 〉	통과 (0.17ms, 33.2MB)
// 테스트 7 〉	통과 (0.17ms, 33.3MB)
// 테스트 8 〉	통과 (0.17ms, 33.3MB)
// 테스트 9 〉	통과 (0.17ms, 33.5MB)
// 테스트 10 〉	통과 (0.06ms, 33.4MB)