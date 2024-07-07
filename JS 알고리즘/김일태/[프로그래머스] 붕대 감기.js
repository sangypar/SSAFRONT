function solution(bandage, health, attacks) {
    var answer = 0;
    let time = 0, index = 0, duration = 0, hp = health;
    
    while (time <= attacks[attacks.length - 1][0]) {
        if (attacks[index][0] === time) {
            hp -= attacks[index][1];
            index++;
            duration = 0;
            if (hp <= 0) {
                break;
            }
        } else {
            hp += bandage[1];
            duration++;
            if (duration === bandage[0]) {
                hp += bandage[2];
                duration = 0;
            }
            if (hp > health) {
                hp = health;
            }
        }
        time++;
    }
    
    return hp > 0 ? hp : -1;
}
