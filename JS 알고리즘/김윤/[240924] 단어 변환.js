function solution(begin, target, words) {
    let queue = [[begin, 0]];
    let visit = new Set();
    
    while (queue.length > 0) {
        let [current, step] = queue.shift();
        
        if (current === target) return step;
        
        for (const word of words) {
            if (!visit.has(word) && convert(current, word)) {
                visit.add(word);
                queue.push([word, step + 1]);
            }
        }
    }
        
    return 0;
}

function convert(a, b) {
    let diff = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) diff++;
        if (diff > 1) return false;
    }
    
    return diff === 1;
}

// 테스트 1 〉	통과 (0.09ms, 33.4MB)
// 테스트 2 〉	통과 (0.24ms, 33.5MB)
// 테스트 3 〉	통과 (0.30ms, 33.5MB)
// 테스트 4 〉	통과 (0.10ms, 33.4MB)
// 테스트 5 〉	통과 (0.09ms, 33.5MB)
