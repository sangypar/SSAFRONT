function solution(bandage, health, attacks) {
    var HP = health; // 내 HP
    var ongoing = 0; // 진행 시간
    var maxTime = attacks[attacks.length - 1][0]; // 공격 시간
    var index = 0;
    
    for (let i = 1; i <= maxTime; i++) {
        if (i === attacks[index][0]) {
            HP -= attacks[index][1];
            if (HP <= 0) return -1;
            ongoing = 0;
            index++;
        } else {
            ongoing++;
            if (HP < health) {
                HP + bandage[1] > health ? HP = health : HP += bandage[1];
            }
                
            if (ongoing === bandage[0]) {
                HP + bandage[2] > health ? HP = health : HP += bandage[2];
                ongoing = 0;
            }
        }
    }
    
    return HP;
}

// 테스트 1 〉	통과 (0.13ms, 33.4MB)
// 테스트 2 〉	통과 (0.25ms, 33.6MB)
// 테스트 3 〉	통과 (0.16ms, 33.6MB)
// 테스트 4 〉	통과 (0.06ms, 33.4MB)
// 테스트 5 〉	통과 (0.06ms, 33.6MB)
// 테스트 6 〉	통과 (0.08ms, 33.4MB)
// 테스트 7 〉	통과 (0.15ms, 33.4MB)
// 테스트 8 〉	통과 (0.19ms, 33.6MB)
// 테스트 9 〉	통과 (0.17ms, 33.5MB)
// 테스트 10 〉	통과 (0.14ms, 33.4MB)
// 테스트 11 〉	통과 (0.34ms, 33.7MB)
// 테스트 12 〉	통과 (0.17ms, 33.5MB)
// 테스트 13 〉	통과 (0.23ms, 33.5MB)
// 테스트 14 〉	통과 (0.21ms, 33.5MB)
// 테스트 15 〉	통과 (0.19ms, 33.5MB)
// 테스트 16 〉	통과 (0.17ms, 33.5MB)
// 테스트 17 〉	통과 (0.15ms, 33.5MB)
// 테스트 18 〉	통과 (0.20ms, 33.5MB)
// 테스트 19 〉	통과 (0.19ms, 33.4MB)
// 테스트 20 〉	통과 (0.21ms, 33.4MB)
