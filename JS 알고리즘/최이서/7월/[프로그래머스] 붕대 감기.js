function solution(bandage, health, attacks) {
  const max = health;
  let answer = 0;
  let combo = 0;
  let time = 0; 
  
  while (health > 0) {
    time++;

    // 몬스터의 공격 시간과 현재 시간이 동일하다면
    if (time === attacks[0][0]) {
      health -= attacks[0][1];
      attacks.shift();
      
      if (attacks.length === 0) {
        break;
      }

      combo = 0;
      continue;
    }

    combo++;
    
    if (health + bandage[1] > max) {
      health = max;
    } else {
      health += bandage[1];
    }

    if (combo === bandage[0]) {
      health += bandage[2];
      combo = 0;
    }
  }

  if (health <= 0) {
    health = -1;
  }

  return health;
}

// 1. [ 시전 시간, 초당 회복량, 추가 회복량 ];
// 2. 최대 체력
// 3. 몬스터의 공격 시간 / 피해량
// solution([5, 1, 5], 30, [[2, 10], [9, 15], [10, 5], [11, 5]]);
// solution([3, 2, 7], 20, [[1, 15], [5, 16], [8, 6]]);
// solution([5, 1, 5], 30, [[2, 10], [9, 15], [10, 5], [11, 5]]);