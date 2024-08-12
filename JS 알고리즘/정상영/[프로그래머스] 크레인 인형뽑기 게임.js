function solution(board, moves) {
    let answer = 0;
    const r = board.length;
    const c = board[0].length;
    const arrays = [];
    
    // 각 열을 기준으로 스택 초기화
    for(let i = 0; i < c; i++) {
        arrays.push([]);
    }
    
    // 각 열에 인형을 스택에 쌓기
    for(let i = r - 1; i >= 0; i--) {
        for(let j = 0; j < c; j++) {
            if(board[i][j] > 0) {
                arrays[j].push(board[i][j]);
            }
        }
    }
    
    const basket = [];
    
    for(let i = 0; i < moves.length; i++) {
        const column = moves[i] - 1; // moves 값은 1부터 시작하므로 0부터 맞추기 위해 1을 뺌
        
        if (arrays[column].length > 0) {
            const doll = arrays[column].pop(); // 인형을 꺼냄
            
            if (basket.length > 0 && basket[basket.length - 1] === doll) {
                basket.pop(); // 바구니의 마지막 인형과 동일하면 제거
                answer += 2;  // 인형이 터지므로 점수 추가
            } else {
                basket.push(doll); // 그렇지 않으면 바구니에 인형 추가
            }
        }
    }
    
    return answer;
}
