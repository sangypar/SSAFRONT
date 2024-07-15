function solution(numbers) {
    var answer = 0;
    const digits = numbers.split('');

    // 모든 순열 조합을 저장할 Set
    const numSet = new Set();

    // 순열 생성 함수
    const getPerm = function (arr, prefix) {
        if (prefix.length > 0) {
            numSet.add(parseInt(prefix));
        }

        for (let i = 0; i < arr.length; i++) {
            getPerm(arr.slice(0, i).concat(arr.slice(i + 1)), prefix + arr[i]);
        }
    }

    getPerm(digits, '');

    // 소수 판별 함수
    function isPrime(num) {
        if (num <= 1) return false; // 0과 1은 소수가 아님
        if (num === 2) return true; // 2는 소수
        if (num % 2 === 0) return false; // 짝수는 소수가 아님
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    // Set에 저장된 모든 숫자에 대해 소수 여부 판별
    numSet.forEach(num => {
        if (isPrime(num)) answer++;
    });

    return answer;
}
