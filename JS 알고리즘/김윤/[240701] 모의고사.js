function solution(answers) {
    var result = [];
    
    const first_student = [1, 2, 3, 4, 5];
    const second_student = [2, 1, 2, 3, 2, 4, 2, 5];
    const third_student = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    
    var first_count = 0;
    var second_count = 0;
    var third_count = 0;
    
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === first_student[parseInt(i % first_student.length)]) {
            first_count++;
        }
        
        if (answers[i] === second_student[parseInt(i % second_student.length)]) {
            second_count++;
        }
        
        if (answers[i] === third_student[parseInt(i % third_student.length)]) {
            third_count++;
        }
    }
    
    const max = Math.max(first_count, second_count, third_count);
    
    if (max === first_count) result.push(1);
    if (max === second_count) result.push(2);
    if (max === third_count) result.push(3);
    
    return result;
}

// 테스트 1 〉	통과 (0.11ms, 33.5MB)
// 테스트 2 〉	통과 (0.08ms, 33.4MB)
// 테스트 3 〉	통과 (0.09ms, 33.4MB)
// 테스트 4 〉	통과 (0.06ms, 33.4MB)
// 테스트 5 〉	통과 (0.16ms, 33.5MB)
// 테스트 6 〉	통과 (0.18ms, 33.4MB)
// 테스트 7 〉	통과 (0.86ms, 33.4MB)
// 테스트 8 〉	통과 (0.40ms, 33.5MB)
// 테스트 9 〉	통과 (4.31ms, 37.1MB)
// 테스트 10 〉	통과 (0.93ms, 33.4MB)
// 테스트 11 〉	통과 (29.54ms, 37MB)
// 테스트 12 〉	통과 (6.12ms, 37MB)
// 테스트 13 〉	통과 (0.38ms, 33.5MB)
// 테스트 14 〉	통과 (6.96ms, 37.1MB)
