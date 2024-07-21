function solution(d, budget) {
    let answer = 0, acc = 0;
    d.sort((a, b) => a - b);
    for(number of d) {
        acc += number;
        answer++;
        if(acc > budget) {
            answer--;
            break;
        }
    }
    return answer;
}
