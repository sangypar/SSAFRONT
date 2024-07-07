function solution(answers) {
    const pattern1 = [1, 2, 3, 4, 5];
    const pattern2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const pattern3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    
    let cnt1 = 0
    let cnt2 = 0
    let cnt3 = 0;
    
    for(let i = 0; i < answers.length; i++) {
        if (pattern1[i % pattern1.length] === answers[i]) cnt1++;
        if (pattern2[i % pattern2.length] === answers[i]) cnt2++;
        if (pattern3[i % pattern3.length] === answers[i]) cnt3++;
    }
    
    const maxCnt = Math.max(cnt1, cnt2, cnt3);
    
    let answer = [];
    
    if (cnt1 === maxCnt) answer.push(1);
    if (cnt2 === maxCnt) answer.push(2);
    if (cnt3 === maxCnt) answer.push(3);
    
    return answer;
}
