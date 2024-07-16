function solution(number) {
    var output = [];
    combination([], number, output);
    return output.length;
}

const combination = (array, number, output) => {
    // 기저 조건
    if (array.length === 3) {
        var sum = 0;
        for (const item of array) {
            sum += item;
        }
        
        if (sum === 0) {
            return output.push(array);
        }
        
        return;
    }
    
    // 재귀 부분
    number.forEach((value, index) => {
        const rest = number.slice(index + 1);
        combination([...array, value], rest, output);
    })
}

// 테스트 1 〉	통과 (0.42ms, 33.7MB)
// 테스트 2 〉	통과 (0.23ms, 33.4MB)
// 테스트 3 〉	통과 (0.25ms, 33.5MB)
// 테스트 4 〉	통과 (0.28ms, 33.5MB)
// 테스트 5 〉	통과 (0.31ms, 33.5MB)
// 테스트 6 〉	통과 (0.36ms, 33.7MB)
// 테스트 7 〉	통과 (0.40ms, 33.7MB)
// 테스트 8 〉	통과 (0.41ms, 33.7MB)
// 테스트 9 〉	통과 (0.37ms, 33.7MB)
// 테스트 10 〉	통과 (0.40ms, 33.7MB)
// 테스트 11 〉	통과 (0.32ms, 33.5MB)
// 테스트 12 〉	통과 (0.34ms, 33.7MB)
// 테스트 13 〉	통과 (0.40ms, 33.5MB)
