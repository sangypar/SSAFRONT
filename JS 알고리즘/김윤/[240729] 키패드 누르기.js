function solution(numbers, hand) {
    var result = '';
    
    const keypad = { 
        1: [0, 0], 2: [0, 1], 3: [0, 2],
        4: [1, 0], 5: [1, 1], 6: [1, 2],
        7: [2, 0], 8: [2, 1], 9: [2, 2],
        '*': [3, 0], 0: [3, 1], '#': [3, 2]
    };
    
    let leftHand = '*';
    let rightHand = '#';
    
    const getDistance = (a, b) => {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }
    
    for (const num of numbers) {
        if (num === 1 || num === 4 || num === 7) {
            result += "L";
            leftHand = num;
        } else if (num === 3 || num === 6 || num === 9) {
            result += "R";
            rightHand = num;
        } else {
            var leftDistance = getDistance(keypad[leftHand], keypad[num]);
            var rightDistance = getDistance(keypad[rightHand], keypad[num]);
            
            if (leftDistance > rightDistance) {
                result += "R";
                rightHand = num;
            } else if (leftDistance < rightDistance) {
                result += "L";
                leftHand = num;
            } else {
                if (hand === "right") {
                    result += "R";
                    rightHand = num;
                } else {
                    result += "L";
                    leftHand = num;
                }
            }
        }
    }
    
    return result;
}

// 테스트 1 〉	통과 (0.10ms, 33.6MB)
// 테스트 2 〉	통과 (0.11ms, 33.2MB)
// 테스트 3 〉	통과 (0.11ms, 33.6MB)
// 테스트 4 〉	통과 (0.10ms, 33.5MB)
// 테스트 5 〉	통과 (0.20ms, 33.5MB)
// 테스트 6 〉	통과 (0.11ms, 33.6MB)
// 테스트 7 〉	통과 (0.12ms, 33.5MB)
// 테스트 8 〉	통과 (0.22ms, 33.6MB)
// 테스트 9 〉	통과 (0.18ms, 33.5MB)
// 테스트 10 〉	통과 (0.12ms, 33.4MB)
// 테스트 11 〉	통과 (0.34ms, 33.5MB)
// 테스트 12 〉	통과 (0.23ms, 33.5MB)
// 테스트 13 〉	통과 (0.24ms, 33.5MB)
// 테스트 14 〉	통과 (0.26ms, 33.5MB)
// 테스트 15 〉	통과 (0.34ms, 33.6MB)
// 테스트 16 〉	통과 (0.31ms, 33.5MB)
// 테스트 17 〉	통과 (0.47ms, 33.6MB)
// 테스트 18 〉	통과 (0.38ms, 33.6MB)
// 테스트 19 〉	통과 (0.45ms, 33.5MB)
// 테스트 20 〉	통과 (0.71ms, 33.7MB)
