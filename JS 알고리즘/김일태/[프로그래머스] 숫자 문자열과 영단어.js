function solution(s) {
    
    const wordsToNumbers = {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
        'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
    };
    
    let answer = '';
    let temp = '';
    
    for (let i = 0; i < s.length; i++) {
        // 숫자면 그냥 추가
        if ('0123456789'.includes(s[i])) {
            answer += s[i];
        } else {
            // 아니면 temp에 추가하고 키값으로 존재할 때까지 temp에 추가
            // 객체 키 값이 존재하게 되면 그 요소 값을 더하고 temp 초기화
            temp += s[i];
            if (wordsToNumbers[temp] !== undefined) {
                answer += wordsToNumbers[temp];
                temp = '';
            }
        }
    }
    
    return +answer;
}

function solution(s) {
    // 숫자들을 영단어로 정의한 배열
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    // 결과값을 저장할 변수 초기화
    var answer = s;

    // 숫자 영단어 배열을 순회하면서 처리
    for(let i=0; i< numbers.length; i++) {
        // 문자열을 현재 숫자 영단어를 기준으로 나누어 배열로 만듦
        let arr = answer.split(numbers[i]);
        // 배열을 현재 인덱스 값(i)으로 연결하여 문자열을 업데이트
        answer = arr.join(i);
    }

    // 문자열을 숫자로 변환하여 반환
    return Number(answer);
}
