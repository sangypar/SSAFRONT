function solution(s){
        let stack = [];

        for(let i = 0; i < s.length; i++){
            let now = s.charAt(i);

            if(now === "(") {
                //시작하는 문자열이라면
                stack.push(now);
            } else {
                //아니라면 검사해야함
                if(stack.length === 0) return false;

                if(stack[stack.length - 1] === "(") stack.pop(); //마지막요소제거
                else return false;
            }
         }

    if(stack.length > 0) return false; //stack 남아있을 때
    return true;
}

// 테스트 1 〉	통과 (0.04ms, 33.2MB)
// 테스트 2 〉	통과 (0.07ms, 33.5MB)
// 테스트 3 〉	통과 (0.04ms, 33.2MB)
// 테스트 4 〉	통과 (0.05ms, 33.4MB)
// 테스트 5 〉	통과 (0.05ms, 33.3MB)
// 테스트 6 〉	통과 (0.04ms, 33.3MB)
// 테스트 7 〉	통과 (0.05ms, 33.5MB)
// 테스트 8 〉	통과 (0.05ms, 33.4MB)
// 테스트 9 〉	통과 (0.13ms, 33.4MB)
// 테스트 10 〉	통과 (0.05ms, 33.3MB)
// 테스트 11 〉	통과 (0.05ms, 33.4MB)
// 테스트 12 〉	통과 (0.14ms, 33.4MB)
// 테스트 13 〉	통과 (0.14ms, 33.4MB)
// 테스트 14 〉	통과 (0.14ms, 33.4MB)
// 테스트 15 〉	통과 (0.14ms, 33.4MB)
// 테스트 16 〉	통과 (0.14ms, 33.4MB)
// 테스트 17 〉	통과 (0.14ms, 33.4MB)
// 테스트 18 〉	통과 (0.14ms, 33.5MB)

// 효율성 테스트
// 테스트 1 〉	통과 (32.69ms, 37.1MB)
// 테스트 2 〉	통과 (36.22ms, 37.1MB)
