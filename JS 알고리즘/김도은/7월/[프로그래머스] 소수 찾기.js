function solution(numbers) {
    
    let check = []; //만들어지는 모든 배열
    
    for(let i = 0; i < numbers.length; i++){
        check.push(numbers.charAt(i)); //선택하지 않음으로 처리
    }
    
    let countArr = []; //소수판별해서 들어갈 배열
    
    //소수검사
    const isPrime = (num) => {
        if (num < 2) return false;
        if (num === 2) return true;
        
          for(let i = 2; i < num; i++){
                if(num % i === 0){
                    //나누어 떨어지면
                    return false;
                }
            }
        return true;
    }
    
    // 순열 만들기
    const getPermutation = (arr, fixNum) => {
        //넘겨온 배열이 있을 때만!
        if(arr.length >= 1) {
            
            for (let i=0; i<arr.length; i++) {
                const newNum = fixNum + arr[i]; //만들어진 새 숫자
                
                const copyArr = [...arr];                
                copyArr.splice(i, 1);
                
                if (!countArr.includes(+newNum) && isPrime(+newNum)){
                    countArr.push(+newNum) 
                }
                
                getPermutation(copyArr, newNum); 
            }
        }
    }
    
    getPermutation(check, '');

    return countArr.length;
}

// 테스트 1 〉	통과 (0.25ms, 33.4MB)
// 테스트 2 〉	통과 (18.56ms, 35.7MB)
// 테스트 3 〉	통과 (0.12ms, 33.6MB)
// 테스트 4 〉	통과 (3.43ms, 36.7MB)
// 테스트 5 〉	통과 (6.29ms, 36.9MB)
// 테스트 6 〉	통과 (0.17ms, 33.5MB)
// 테스트 7 〉	통과 (0.43ms, 33.5MB)
// 테스트 8 〉	통과 (6.12ms, 36.9MB)
// 테스트 9 〉	통과 (0.28ms, 33.4MB)
// 테스트 10 〉	통과 (173.16ms, 36.6MB)
// 테스트 11 〉	통과 (7.70ms, 36.4MB)
// 테스트 12 〉	통과 (0.46ms, 33.5MB)
// 채점 결과
// 정확성: 100.0
// 합계: 100.0 / 100.0
