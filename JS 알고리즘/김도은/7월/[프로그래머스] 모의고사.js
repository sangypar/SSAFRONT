
function solution(answers) {

    let people1 = [1,2,3,4,5];
    let people2 = [2,1,2,3,2,4,2,5];
    let people3 = [3,3,1,1,2,2,4,4,5,5];

   let cnt = [0, 0, 0];

    let max = 0;

    answers.forEach((item, idx) => {

        if(item === people1[idx%5]) cnt[0]++;
        if(item === people2[idx%8]) cnt[1]++;
        if(item === people3[idx%10]) cnt[2]++;

        max = Math.max(...cnt);
    });

    let answer = [];

    cnt.forEach((item, idx) => {
        if(max === item) answer.push(idx+1);
    })

    return answer.sort((a,b) => a-b);
}
