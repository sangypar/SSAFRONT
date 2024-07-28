function solution(board, moves) {
    var basket = [];    
    var answer = 0;
    
    out: for (const move of moves) {
        for (let i = 0; i < board.length; i++) {
            if (board[i][move - 1] !== 0) {
                let pickDoll = board[i][move - 1];
                board[i][move - 1] = 0;
                
                if (basket.length !== 0 && basket[basket.length - 1] === pickDoll) {
                    basket.pop();
                    answer += 2;
                } else {
                    basket.push(pickDoll);
                }
                
                continue out;
            }
        }
    }
    
    return answer;
}

// 테스트 1 〉	통과 (0.16ms, 33.4MB)
// 테스트 2 〉	통과 (0.16ms, 32.9MB)
// 테스트 3 〉	통과 (0.16ms, 33.5MB)
// 테스트 4 〉	통과 (4.65ms, 36.1MB)
// 테스트 5 〉	통과 (0.24ms, 33.5MB)
// 테스트 6 〉	통과 (0.17ms, 33.4MB)
// 테스트 7 〉	통과 (0.19ms, 33.4MB)
// 테스트 8 〉	통과 (0.31ms, 33.4MB)
// 테스트 9 〉	통과 (0.29ms, 33.1MB)
// 테스트 10 〉	통과 (0.32ms, 33.1MB)
// 테스트 11 〉	통과 (0.53ms, 33.5MB)
