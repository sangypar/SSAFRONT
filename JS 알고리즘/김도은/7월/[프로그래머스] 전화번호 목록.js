function solution(phone_book) {

    phone_book.sort();

    for (let i = 0; i < phone_book.length - 1; i++) {
        if (phone_book[i + 1].startsWith(phone_book[i])) {
            return false;
        }
    }

    return true;
}

// 테스트 1 〉	통과 (0.06ms, 33.5MB)
// 테스트 2 〉	통과 (0.04ms, 33.6MB)
// 테스트 3 〉	통과 (0.04ms, 33.4MB)
// 테스트 4 〉	통과 (0.04ms, 33.4MB)
// 테스트 5 〉	통과 (0.06ms, 33.5MB)
// 테스트 6 〉	통과 (0.06ms, 33.5MB)
// 테스트 7 〉	통과 (0.05ms, 33.6MB)
// 테스트 8 〉	통과 (0.04ms, 33.4MB)
// 테스트 9 〉	통과 (0.04ms, 33.4MB)
// 테스트 10 〉	통과 (0.04ms, 33.4MB)
// 테스트 11 〉	통과 (0.07ms, 33.5MB)
// 테스트 12 〉	통과 (0.04ms, 33.4MB)
// 테스트 13 〉	통과 (0.04ms, 33.4MB)
// 테스트 14 〉	통과 (0.43ms, 33.6MB)
// 테스트 15 〉	통과 (0.54ms, 33.6MB)
// 테스트 16 〉	통과 (0.61ms, 33.7MB)
// 테스트 17 〉	통과 (0.75ms, 33.7MB)
// 테스트 18 〉	통과 (1.01ms, 33.8MB)
// 테스트 19 〉	통과 (1.21ms, 33.9MB)
// 테스트 20 〉	통과 (1.35ms, 33.9MB)
// 효율성  테스트
// 테스트 1 〉	통과 (3.43ms, 35.1MB)
// 테스트 2 〉	통과 (3.73ms, 35.3MB)
// 테스트 3 〉	통과 (130.41ms, 78.9MB)
// 테스트 4 〉	통과 (92.65ms, 76.1MB)
// 채점 결과
// 정확성: 83.3
// 효율성: 16.7
// 합계: 100.0 / 100.0


/////////////////// 아래 풀이는 시간초과
// function solution(phone_book) {
    
//     let answer = true;
    
//     for(let i = 0; i < phone_book.length - 1; i++) {
//         let phoneOne = phone_book[i];
//         for(let j = i+1; j < phone_book.length; j++){
//             let phoneTwo = phone_book[j];
            
//             if(phoneTwo.startsWith(phoneOne)) {
//                 answer = false;
//                 break;
//             }
//         }
//     }
    
//     return answer;
// }
