function solution(bandage, health, attacks) {

    const maxHealth = health; //최대
    let nowHealth = health; //시작체력

    let time = 0; //0초부터 시작

    //forEach로 하니까 멈출수가 없었엄 .,...
     for (const attack of attacks) {

        let gap = attack[0] - time - 1;

        if(gap > 0){
            nowHealth += gap*bandage[1]; //공격과 공격 사이의 시간차만큼 회복
            nowHealth += Math.floor(gap/bandage[0]) * bandage[2]; //추가회복력
        }

        if(nowHealth > maxHealth) nowHealth = maxHealth; //최대를 넘을 순 없음

        nowHealth -= attack[1]; //깎이는 숫자

        if(nowHealth <= 0) { //죽으면 멈춰
            nowHealth = -1;
            return nowHealth;
        }

        time = attack[0];
    };

    return nowHealth;
}

// 테스트 1 〉	통과 (0.06ms, 33.4MB)
// 테스트 2 〉	통과 (0.08ms, 33.4MB)
// 테스트 3 〉	통과 (0.06ms, 33.4MB)
// 테스트 4 〉	통과 (0.06ms, 33.4MB)
// 테스트 5 〉	통과 (0.06ms, 33.6MB)
// 테스트 6 〉	통과 (0.09ms, 33.5MB)
// 테스트 7 〉	통과 (0.06ms, 33.4MB)
// 테스트 8 〉	통과 (0.07ms, 33.4MB)
// 테스트 9 〉	통과 (0.17ms, 33.5MB)
// 테스트 10 〉	통과 (0.06ms, 33.4MB)
// 테스트 11 〉	통과 (0.16ms, 33.4MB)
// 테스트 12 〉	통과 (0.16ms, 33.4MB)
// 테스트 13 〉	통과 (0.16ms, 33.5MB)
// 테스트 14 〉	통과 (0.17ms, 33.5MB)
// 테스트 15 〉	통과 (0.07ms, 33.4MB)
// 테스트 16 〉	통과 (0.06ms, 33.4MB)
// 테스트 17 〉	통과 (0.15ms, 33.4MB)
// 테스트 18 〉	통과 (0.06ms, 33.4MB)
// 테스트 19 〉	통과 (0.16ms, 33.5MB)
// 테스트 20 〉	통과 (0.14ms, 33.4MB)
