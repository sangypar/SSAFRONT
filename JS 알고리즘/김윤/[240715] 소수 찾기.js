function solution(numbers) {
    var output = new Set();
    var visit = new Array(numbers.length).fill(false);
    
    for (let i = 1; i <= numbers.length; i++) {
        permutation([], numbers, output, i, visit);
    }
    
    return output.size;
}

const permutation = (array, numbers, output, n, visit) => {
    // 기저 조건
    if (array.length === n) {
        var temp = array.join(''); // 배열을 문자열로 전환
        var num = Number(temp);
        
        if (isPrime(num)) {
            output.add(num);
        }
        return;
    }
    
    // 재귀 부분
    for (let i = 0; i < numbers.length; i++) {
        if (visit[i]) continue;
        
        visit[i] = true;
        permutation([...array, numbers[i]], numbers, output, n, visit);
        visit[i] = false;
    }
}

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// 테스트 1 〉	통과 (0.28ms, 33.6MB)
// 테스트 2 〉	통과 (3.74ms, 37.2MB)
// 테스트 3 〉	통과 (0.10ms, 33.5MB)
// 테스트 4 〉	통과 (4.11ms, 37MB)
// 테스트 5 〉	통과 (13.30ms, 37.5MB)
// 테스트 6 〉	통과 (0.15ms, 33.5MB)
// 테스트 7 〉	통과 (0.36ms, 33.5MB)
// 테스트 8 〉	통과 (9.36ms, 37.4MB)
// 테스트 9 〉	통과 (0.22ms, 33.5MB)
// 테스트 10 〉	통과 (6.05ms, 37.3MB)
// 테스트 11 〉	통과 (1.49ms, 35.9MB)
// 테스트 12 〉	통과 (0.56ms, 33.7MB)
