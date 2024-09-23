function solution(begin, target, words) {
    
    if(!words.includes(target)) return 0; //타겟이 없으면 0

    ///////////////BFS 구현하는 법... 외워두기
  
    // BFS를 위한 큐와 방문 여부 확인용 배열
    let queue = [[begin, 0]]; // [현재 단어, 변환 횟수]
    let visited = new Set();  // 방문한 단어들을 기록

    // 한 단어가 다른 단어로 변환 가능한지 체크하는 함수
    const canTransform = (word1, word2) => {
        let diffCount = 0;
        
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) diffCount++;
            
            if (diffCount > 1) return false; // 한 글자만 달라야 함
        }
        
        return diffCount === 1;
    };

    // BFS 탐색 시작
    while (queue.length > 0) {
        let [currentWord, stepCount] = queue.shift();

        // 목표 단어를 찾으면 변환 횟수를 반환
        if (currentWord === target) return stepCount;

        // 현재 단어에서 변환 가능한 단어들을 큐에 추가
        for (let nextWord of words) {
            if (!visited.has(nextWord) && canTransform(currentWord, nextWord)) {
                visited.add(nextWord);  // 변환한 단어는 방문한 것으로 표시
                queue.push([nextWord, stepCount + 1]); // 변환 후 큐에 추가
            }
        }
    }

    // 변환할 수 없는 경우 0을 반환
    return 0;
    
}

// 정확성  테스트
// 테스트 1 〉	통과 (0.11ms, 33.5MB)
// 테스트 2 〉	통과 (0.26ms, 33.4MB)
// 테스트 3 〉	통과 (0.32ms, 33.4MB)
// 테스트 4 〉	통과 (0.11ms, 33.4MB)
// 테스트 5 〉	통과 (0.08ms, 33.4MB)
// 채점 결과
// 정확성: 100.0
합계: 100.0 / 100.0
