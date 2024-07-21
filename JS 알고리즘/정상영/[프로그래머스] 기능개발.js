function solution(progresses, speeds) {
    let answer = [];
    
    let arr = progresses.map((x, i) => Math.ceil((100 - x) / speeds[i]));
    
    let i = 0;
    while (i < arr.length) {
        let count = 1;
        let currDay = arr[i];
        
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] <= currDay) {
                count++;
            } else {
                break;
            }
        }
        
        answer.push(count);
        i += count;
    }
    
    return answer;
}
