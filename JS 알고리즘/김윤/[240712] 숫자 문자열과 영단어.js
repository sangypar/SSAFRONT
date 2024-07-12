function solution(s) {
    var array = s.split("");
    var answer = "";
    var word = "";
    
    const number = {
        "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four",
        "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine"
    }
    
    out: for (const item of array) {
        for (const prop in number) {
            if (item === prop) {
                answer += item;
                continue out;
            }
        }
        
        word += item;
        
        for (const prop in number) {
            if (word === number[prop]) {
                answer += prop;
                word = "";
                continue out;
            }
        }
    }
    
    return Number(answer);
}

// 테스트 1 〉	통과 (0.19ms, 33.4MB)
// 테스트 2 〉	통과 (0.22ms, 33.5MB)
// 테스트 3 〉	통과 (0.23ms, 33.4MB)
// 테스트 4 〉	통과 (0.26ms, 33.5MB)
// 테스트 5 〉	통과 (0.19ms, 33.5MB)
// 테스트 6 〉	통과 (0.31ms, 33.6MB)
// 테스트 7 〉	통과 (0.29ms, 33.7MB)
// 테스트 8 〉	통과 (0.25ms, 33.5MB)
// 테스트 9 〉	통과 (0.37ms, 33.4MB)
// 테스트 10 〉	통과 (0.13ms, 33.5MB)
