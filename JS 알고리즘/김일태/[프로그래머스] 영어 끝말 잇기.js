function solution(n, words) {
    let answer = [];
    let player = 1;
    let round = 1;
    
    answer.push(words.shift());
    
    while (words.length) {
        // 플레이어 번호 순환
        player = (player % n) + 1;
        
        // 첫번째 플레이어로 돌아왔으면 라운드 증가
        if (player === 1) {
            round++;
        }
        
        // 단어 비교
        let lastWord = answer[answer.length - 1];
        let currentWord = words[0];
        
        if (lastWord[lastWord.length - 1] !== currentWord[0] || answer.includes(currentWord)) {
            break;
        }
        
        answer.push(words.shift());
        
    }
    
    // words가 비었으면 끝말잇기 모두 성공
    if (words.length === 0) {
        player = round = 0;
    }
    
    return [player, round];
}
