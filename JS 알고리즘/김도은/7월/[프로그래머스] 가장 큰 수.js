function compare(a, b) {
    if (a + b > b + a) {
        return -1;
    } else if (a + b < b + a) {
        return 1;
    } else {
        return 0;
    }
}

function solution(numbers) {
    // 숫자를 문자열로 변환
    numbers = numbers.map(String);
    
    // 비교 함수를 사용하여 정렬
    numbers.sort(compare);
    
    // 정렬된 숫자들을 이어 붙임
    const result = numbers.join('');
    
    // 숫자가 0으로 시작하면 0을 반환
    return result[0] === '0' ? '0' : result;
}

// 테스트 1 〉	통과 (97.03ms, 43.5MB)
// 테스트 2 〉	통과 (335.32ms, 42.5MB)
// 테스트 3 〉	통과 (433.25ms, 45.2MB)
// 테스트 4 〉	통과 (24.37ms, 36.9MB)
// 테스트 5 〉	통과 (87.27ms, 45.3MB)
// 테스트 6 〉	통과 (76.65ms, 44.4MB)
// 테스트 7 〉	통과 (0.07ms, 33.5MB)
// 테스트 8 〉	통과 (0.09ms, 33.4MB)
// 테스트 9 〉	통과 (0.06ms, 33.4MB)
// 테스트 10 〉	통과 (0.08ms, 33.4MB)
// 테스트 11 〉	통과 (0.06ms, 33.5MB)
// 테스트 12 〉	통과 (0.05ms, 33.3MB)
// 테스트 13 〉	통과 (0.06ms, 33.4MB)
// 테스트 14 〉	통과 (0.08ms, 33.5MB)
// 테스트 15 〉	통과 (0.07ms, 33.1MB)

//해당 풀이는 스택오버플로우, 시간초과 등등 ...
// function solution(numbers) {
    
//     numbers = numbers.map(String); //문자열로 변환
    
//     const comb = (arr, now) => {
//         if(arr.length == 0) {
//             return now;
//         }
        
//         let max = "0";
        
//         for (let i = 0; i < arr.length; i++) {
//             const next = now + arr[i];
//             const newArr = [...arr];
//             newArr.splice(i, 1);
//             const result = comb(newArr, next);
            
//             if (result > max) {
//                 max = result;
//             } //max 갱신
//         }
//         return max;
//     }
    
    
//     return comb(numbers, "");
// }
