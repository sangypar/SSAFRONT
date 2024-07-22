function solution(d, budget) {
    let answer = 0;

    d.sort((a, b) => a - b);

    for (const req of d) {
        if (req <= budget) {
            answer++;
            budget -= req;
        }
    }

    return answer;
}
