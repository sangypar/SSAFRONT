function solution(n, words) {
    var answer = [0, 0];
    
    const set = new Set();
    
    for(let i = 0; i < words.length; i++) {
        let man = (i % n) + 1;
        let q = Math.floor(i / n) + 1;
        
        if(i > 0) {
            const prevWord = words[i-1];
            const currWord = words[i];
            
            if(set.has(currWord) || prevWord[prevWord.length - 1] !== currWord[0]) {
                answer = [man, q];
                break;
            }
        }
        
        set.add(words[i]);
    }

    return answer;
}
