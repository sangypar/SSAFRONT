function solution(board, moves) {
    
    let stack = []; //스택 바구니
    
    let answer = 0;
    
    for(let move of moves) {
        const idx = move-1; //현재 줄
        
       for (let i = 0; i < board.length; i++) {
            if (board[i][idx] !== 0) {
            
                let doll = board[i][idx];
            board[i][idx] = 0; //뺏으니까 바꿈
            stack.push(doll);
        
        if(stack.length >= 2 && stack[stack.length - 1] === stack[stack.length -2]) {
            stack.pop();
            stack.pop(); //두개 다 없애줌
            answer += 2;
        }
                // console.log(stack)
         break; //if 찾아서 했으면 멈춰!
        }
       }
    }
    
    return answer;
}

// 테스트 1 〉	통과 (0.20ms, 33.4MB)
// 테스트 2 〉	통과 (0.18ms, 33.5MB)
// 테스트 3 〉	통과 (0.21ms, 33.5MB)
// 테스트 4 〉	통과 (4.19ms, 36.8MB)
// 테스트 5 〉	통과 (0.20ms, 33.4MB)
// 테스트 6 〉	통과 (0.22ms, 33.5MB)
// 테스트 7 〉	통과 (0.30ms, 33.5MB)
// 테스트 8 〉	통과 (0.46ms, 33.5MB)
// 테스트 9 〉	통과 (0.29ms, 33.5MB)
// 테스트 10 〉	통과 (0.38ms, 33.4MB)
// 테스트 11 〉	통과 (0.55ms, 33.6MB)
