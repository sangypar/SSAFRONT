function solution(number) {
    
    const students = number.length;
    let answer = 0;
    
    for(let i = 0 ; i < students - 2; i++) {
        for(let j = i + 1; j < students - 1; j++ ) {
            for(let k = j + 1; k < students; k++) {
                if(number[i] + number[j] + number[k] === 0) {
                    answer++;
                }
            }
        }
    }
    return answer;
}
