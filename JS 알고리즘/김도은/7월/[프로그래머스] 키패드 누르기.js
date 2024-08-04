function solution(numbers, hand) {
    
    //키패드
    const keypad = {
        1: [0, 0], 2: [0, 1], 3: [0, 2],
        4: [1, 0], 5: [1, 1], 6: [1, 2],
        7: [2, 0], 8: [2, 1], 9: [2, 2],
        '*': [3, 0], 0: [3, 1], '#': [3, 2]
    };
    
    let answer = [];
    
    let leftHand = keypad['*'];
    let rightHand = keypad['#'];
    
    for(let num of numbers) {
        if([1,4,7].includes(num)) {
            answer.push('L');
            leftHand = keypad[num];
        }
        else if([3,6,9].includes(num)) {
            answer.push('R');
            rightHand = keypad[num];
        } else {
            let leftDist = Math.abs(leftHand[0] - keypad[num][0]) + Math.abs(leftHand[1] - keypad[num][1]);
            let rightDist = Math.abs(rightHand[0] - keypad[num][0]) + Math.abs(rightHand[1] - keypad[num][1]);
            
            if(leftDist < rightDist) {
                answer.push('L');
                leftHand=keypad[num];
            } else if (leftDist > rightDist) {
                answer.push('R');
                rightHand=keypad[num];
            } else {
                //같은 경우
                if(hand === 'left') {
                    answer.push('L');
                leftHand=keypad[num];
                } else {
                      answer.push('R');
                      rightHand=keypad[num];
                }
            }
        }
    } //for문 끝
    
    return answer.join('');
}

// 테스트 1 〉	통과 (0.10ms, 33.5MB)
// 테스트 2 〉	통과 (0.11ms, 33.3MB)
// 테스트 3 〉	통과 (0.11ms, 33.2MB)
// 테스트 4 〉	통과 (0.10ms, 33.4MB)
// 테스트 5 〉	통과 (0.11ms, 33.4MB)
// 테스트 6 〉	통과 (0.11ms, 33.4MB)
// 테스트 7 〉	통과 (0.11ms, 33.4MB)
// 테스트 8 〉	통과 (0.12ms, 33.5MB)
// 테스트 9 〉	통과 (0.16ms, 33.5MB)
// 테스트 10 〉	통과 (0.12ms, 33.6MB)
// 테스트 11 〉	통과 (0.24ms, 33.4MB)
// 테스트 12 〉	통과 (0.24ms, 33.5MB)
// 테스트 13 〉	통과 (0.32ms, 33.5MB)
// 테스트 14 〉	통과 (0.30ms, 33.5MB)
// 테스트 15 〉	통과 (0.43ms, 33.5MB)
// 테스트 16 〉	통과 (0.38ms, 33.5MB)
// 테스트 17 〉	통과 (0.57ms, 33.7MB)
// 테스트 18 〉	통과 (0.53ms, 33.8MB)
// 테스트 19 〉	통과 (0.56ms, 33.7MB)
// 테스트 20 〉	통과 (0.56ms, 33.8MB)
// 채점 결과
// 정확성: 100.0
// 합계: 100.0 / 100.0
