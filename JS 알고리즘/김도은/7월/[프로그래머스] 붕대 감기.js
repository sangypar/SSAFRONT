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
