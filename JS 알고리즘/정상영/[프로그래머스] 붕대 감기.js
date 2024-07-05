테스트 1 〉	통과 (0.19ms, 33.4MB)
테스트 2 〉	통과 (0.26ms, 33.5MB)
테스트 3 〉	통과 (0.18ms, 33.5MB)
테스트 4 〉	통과 (0.08ms, 33.5MB)
테스트 5 〉	통과 (0.11ms, 33.4MB)
테스트 6 〉	통과 (0.10ms, 31.9MB)
테스트 7 〉	통과 (0.26ms, 31.9MB)
테스트 8 〉	통과 (0.26ms, 33.4MB)
테스트 9 〉	통과 (0.20ms, 33.5MB)
테스트 10 〉	통과 (0.26ms, 33.5MB)
테스트 11 〉	통과 (0.34ms, 33.5MB)
테스트 12 〉	통과 (0.21ms, 33.4MB)
테스트 13 〉	통과 (0.30ms, 33.4MB)
테스트 14 〉	통과 (0.25ms, 33.4MB)
테스트 15 〉	통과 (0.23ms, 33.5MB)
테스트 16 〉	통과 (0.24ms, 33.4MB)
테스트 17 〉	통과 (0.19ms, 33.5MB)
테스트 18 〉	통과 (0.23ms, 33.4MB)
테스트 19 〉	통과 (0.23ms, 33.4MB)
테스트 20 〉	통과 (0.29ms, 33.4MB)

function solution(bandage, health, attacks) {
    const maxHp = health;
    let answer = health;
    const lastTime = attacks[attacks.length-1][0];
    let attackArr = new Array(lastTime+1).fill(0);
    const bonusTime = bandage[0];
    const recovery = bandage[1];
    const bonus = bandage[2];
    
    for(const attack of attacks) {
        attackArr[attack[0]] = attack[1];
    }
    
    let bonusCnt = 0;
    
    for(let i = 1; i <= lastTime; i++) {
        if(attackArr[i] > 0) {
            bonusCnt = 0;
            answer -= attackArr[i];
            if(answer <= 0) {
                answer = -1;
                break;
            }
        } else {
            answer += recovery
            bonusCnt++;
            if(bonusCnt === bonusTime) {
                answer += bonus;
                bonusCnt = 0;
            }
            
        answer = Math.min(maxHp, answer);
        }
        
    }
    
    return answer;
}
