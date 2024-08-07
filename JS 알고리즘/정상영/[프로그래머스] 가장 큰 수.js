// 찾아봤음. 이걸 어케 생각하지?

function solution(numbers) {
    // 숫자 배열을 문자열 배열로 변환
    let answer = numbers.map(String)  
                        // 문자열 배열을 특정 기준에 따라 정렬
                        .sort((a, b) => (b + a) - (a + b))
                        // 정렬된 문자열 배열을 합침
                        .join('');  

    // 모든 숫자가 0인 경우 처리
    return answer[0] === '0' ? '0' : answer; 
}
