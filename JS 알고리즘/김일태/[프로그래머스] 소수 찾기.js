function solution(numbers) {
    const numArray = numbers.split('');
    const numSet = new Set();
    generatePermutations(numArray, '');

    function generatePermutations(arr, current) {
        if (current !== '') {
            if (isPrime(parseInt(current))) {
                numSet.add(parseInt(current));
            }
        }
        
        for (let i = 0; i < arr.length; i++) {
            const newArr = [...arr];
            newArr.splice(i, 1); // 현재 인덱스 숫자 제거
            generatePermutations(newArr, current + arr[i]);
        }
    }

    function isPrime(num) {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;

        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    }

    return numSet.size;
}
