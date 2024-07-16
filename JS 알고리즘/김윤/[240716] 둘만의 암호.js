function solution(s, skip, index) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let skipSet = new Set(skip);

    function getNextChar(c, index) {
        let pos = alphabet.indexOf(c);
        let steps = 0;

        while (steps < index) {
            pos = (pos + 1) % 26;
            if (!skipSet.has(alphabet[pos])) {
                steps++;
            }
        }
        return alphabet[pos];
    }

    let result = '';
    for (let char of s) {
        result += getNextChar(char, index);
    }

    return result;
}

// 테스트 1 〉	통과 (0.19ms, 33.4MB)
// 테스트 2 〉	통과 (0.16ms, 33.4MB)
// 테스트 3 〉	통과 (0.24ms, 33.4MB)
// 테스트 4 〉	통과 (0.17ms, 33.4MB)
// 테스트 5 〉	통과 (0.19ms, 33.5MB)
// 테스트 6 〉	통과 (0.18ms, 33.4MB)
// 테스트 7 〉	통과 (0.22ms, 33.4MB)
// 테스트 8 〉	통과 (0.18ms, 33.4MB)
// 테스트 9 〉	통과 (0.18ms, 33.4MB)
// 테스트 10 〉	통과 (0.17ms, 33.4MB)
// 테스트 11 〉	통과 (0.21ms, 33.4MB)
// 테스트 12 〉	통과 (0.18ms, 33.5MB)
// 테스트 13 〉	통과 (0.20ms, 33.4MB)
// 테스트 14 〉	통과 (0.17ms, 33.4MB)
// 테스트 15 〉	통과 (0.18ms, 33.5MB)
// 테스트 16 〉	통과 (0.20ms, 33.4MB)
// 테스트 17 〉	통과 (0.25ms, 33.3MB)
// 테스트 18 〉	통과 (0.21ms, 33.4MB)
// 테스트 19 〉	통과 (0.40ms, 33.4MB)
