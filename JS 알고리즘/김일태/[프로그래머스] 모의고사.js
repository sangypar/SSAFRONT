function solution(answers) {
    let answer = [0, 0, 0];
    
    let supo_1 = [1, 2, 3, 4, 5];
    let supo_2 = [2, 1, 2, 3, 2, 4, 2, 5];
    let supo_3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    
    for (let i = 0; i < answers.length; i++) {
        let question = answers[i];
        
        if (question === supo_1[i % 5]) {
            answer[0]++;
        }
        if (question === supo_2[i % 8]) {
            answer[1]++;
        }
        if (question === supo_3[i % 10]) {
            answer[2]++;
        }
    }
    
    let max = Math.max(...answer);
    
    // max와 같은 점수를 가진 학생들의 인덱스 찾기
    let result = [];
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === max) {
            result.push(i + 1);
        }
    }
    
    return result;
}
