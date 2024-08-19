/*
정확성  테스트
테스트 1 〉	통과 (0.04ms, 33.4MB)
테스트 2 〉	통과 (0.04ms, 33.5MB)
테스트 3 〉	통과 (0.06ms, 33.5MB)
테스트 4 〉	통과 (0.04ms, 33.6MB)
테스트 5 〉	통과 (0.04ms, 33.5MB)
테스트 6 〉	통과 (0.04ms, 33.5MB)
테스트 7 〉	통과 (0.05ms, 33.5MB)
테스트 8 〉	통과 (0.04ms, 33.6MB)
테스트 9 〉	통과 (0.04ms, 33.5MB)
테스트 10 〉	통과 (0.04ms, 33.4MB)
테스트 11 〉	통과 (0.04ms, 33.4MB)
테스트 12 〉	통과 (0.04ms, 33.6MB)
테스트 13 〉	통과 (0.05ms, 33.4MB)
테스트 14 〉	통과 (0.57ms, 33.6MB)
테스트 15 〉	통과 (0.59ms, 33.8MB)
테스트 16 〉	통과 (0.71ms, 33.9MB)
테스트 17 〉	통과 (0.83ms, 33.8MB)
테스트 18 〉	통과 (1.21ms, 33.9MB)
테스트 19 〉	통과 (1.51ms, 34MB)
테스트 20 〉	통과 (1.40ms, 33.9MB)

효율성  테스트
테스트 1 〉	통과 (3.83ms, 35.4MB)
테스트 2 〉	통과 (3.45ms, 35.2MB)
테스트 3 〉	통과 (128.63ms, 79.2MB)
테스트 4 〉	통과 (93.96ms, 75.8MB)
*/

function solution(phone_book) {
    let answer = true;
    
    phone_book.sort(); // 사전 순으로 정렬
    
    for(let i = 0; i < phone_book.length - 1; i++) {
      // 접두어인지 비교하는 자바스크립트 함수 startsWith 사용
        if(phone_book[i + 1].startsWith(phone_book[i])) {
            answer = false;
            break;
        }
    }
    
    return answer;
}

/*
시간 초과 코드

정확성  테스트
테스트 1 〉	통과 (0.07ms, 33.4MB)
테스트 2 〉	통과 (0.07ms, 33.4MB)
테스트 3 〉	통과 (0.07ms, 33.5MB)
테스트 4 〉	통과 (0.07ms, 33.4MB)
테스트 5 〉	통과 (0.07ms, 33.4MB)
테스트 6 〉	통과 (0.07ms, 33.4MB)
테스트 7 〉	통과 (0.07ms, 33.4MB)
테스트 8 〉	통과 (0.07ms, 33.4MB)
테스트 9 〉	통과 (0.07ms, 33.4MB)
테스트 10 〉	통과 (0.07ms, 33.4MB)
테스트 11 〉	통과 (0.15ms, 33.4MB)
테스트 12 〉	통과 (0.07ms, 33.4MB)
테스트 13 〉	통과 (0.07ms, 33.4MB)
테스트 14 〉	통과 (8.03ms, 36.7MB)
테스트 15 〉	통과 (11.14ms, 36.8MB)
테스트 16 〉	통과 (15.64ms, 36.9MB)
테스트 17 〉	통과 (21.05ms, 37MB)
테스트 18 〉	통과 (31.20ms, 37.6MB)
테스트 19 〉	통과 (32.69ms, 37MB)
테스트 20 〉	통과 (47.10ms, 36.9MB)

효율성  테스트
테스트 1 〉	통과 (2.96ms, 37.3MB)
테스트 2 〉	통과 (3.08ms, 37.4MB)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
*/

/*
function solution(phone_book) {
    // true면 접두사 없음, false면 접두사 있음
    let answer = true;
    
    phone_book.sort((a, b) => (a.length - b.length));
    
    for(let i = 0; i < phone_book.length - 1; i++) {
        for(let j = i + 1; j < phone_book.length; j++) {
            // i번째와 j번째가 같은가?
            let isSame = true;
             
            for(let k = 0; k < phone_book[i].length; k++) {
                if(phone_book[i].charAt(k) !== phone_book[j].charAt(k)) {
                    isSame = false;
                    break; // 다른 문자가 발견되면 비교 종료
                }
            }
            
            if (isSame) {
                answer = false; // 접두사 발견
                break; // 더 이상 비교할 필요 없음
            }
        }
        if (!answer) break; // 접두사를 발견하면 외부 루프도 종료
    }
    
    return answer;
}
*/
