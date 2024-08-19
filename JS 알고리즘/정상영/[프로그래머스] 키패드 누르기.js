/*
테스트 1 〉	통과 (0.12ms, 33.4MB)
테스트 2 〉	통과 (0.13ms, 33.4MB)
테스트 3 〉	통과 (0.13ms, 33.4MB)
테스트 4 〉	통과 (0.12ms, 33.4MB)
테스트 5 〉	통과 (0.13ms, 33.5MB)
테스트 6 〉	통과 (0.19ms, 33.5MB)
테스트 7 〉	통과 (0.13ms, 33.4MB)
테스트 8 〉	통과 (0.14ms, 33.4MB)
테스트 9 〉	통과 (0.14ms, 33.5MB)
테스트 10 〉	통과 (0.13ms, 33.4MB)
테스트 11 〉	통과 (0.24ms, 33.5MB)
테스트 12 〉	통과 (0.25ms, 33.4MB)
테스트 13 〉	통과 (0.25ms, 33.4MB)
테스트 14 〉	통과 (0.25ms, 33.6MB)
테스트 15 〉	통과 (0.32ms, 33.4MB)
테스트 16 〉	통과 (0.49ms, 33.5MB)
테스트 17 〉	통과 (0.42ms, 33.6MB)
테스트 18 〉	통과 (0.61ms, 33.6MB)
테스트 19 〉	통과 (0.38ms, 33.5MB)
테스트 20 〉	통과 (0.37ms, 33.5MB)
*/

function solution(numbers, hand) {
    let answer = '';
    
    const keyPad = {
        1: [0, 0],
        2: [0, 1],
        3: [0, 2],
        4: [1, 0],
        5: [1, 1],
        6: [1, 2],
        7: [2, 0],
        8: [2, 1],
        9: [2, 2],
        '*': [3, 0],
        0: [3, 1],
        '#': [3, 2],
    }
    
    let leftPosition = keyPad['*'];
    let rightPosition = keyPad['#'];
    const handType = (hand === 'left' ? 'L' : 'R');
    
    numbers.forEach((number) => {
        const position = keyPad[number];
        // 1 4 7
        if(number === 1 || number === 4 || number === 7) {
            leftPosition = keyPad[number];
            answer += 'L';
            
        // 3 6 9
        } else if(number === 3 || number === 6 || number === 9) {
            rightPosition = keyPad[number];
            answer += 'R';
            
        // 2 5 8 0 거리 가까운 걸로
        } else {
            const leftDist = Math.abs(position[0] - leftPosition[0]) + Math.abs(position[1] - leftPosition[1]);
            const rightDist = Math.abs(position[0] - rightPosition[0]) + Math.abs(position[1] - rightPosition[1]);
            
            if(leftDist > rightDist) {
                answer += 'R';
                rightPosition = position;
                
            } else if(rightDist > leftDist) {
                answer += 'L';
                leftPosition = position;
            } else {
                answer += handType;
                
                if(handType === 'L') {
                    leftPosition = position;
                } else {
                    rightPosition = position;
                }
            }
        }
    })
    
    
    return answer;
}
