function solution(land) {
    let [r, c] = [land.length, land[0].length];
    let visit = Array.from({length: r}, () => Array(c).fill(0));
    
    let result = Array(c).fill(0);
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];
    
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (!visit[i][j] && land[i][j]) {
                let cols = new Set();
                let count = 1;
                let q = [[i, j]];
                
                while (q.length) {
                    const [x, y] = q.shift();
                    visit[x][y] = 1;
                    cols.add(y);
                    
                    for (let d = 0; d < 4; d++) {
                        let nr = dr[d] + x;
                        let nc = dc[d] + y;
                        
                        if (nr >= 0 && nr < r && nc >= 0 && nc < c) {
                            if (land[nr][nc] && !visit[nr][nc]) {
                                visit[nr][nc] = 1;
                                q.push([nr, nc]);
                                count++;
                            }
                        }
                    }
                }
                
                for (const col of cols) {
                    result[col] += count;
                }
            }
        }
    }
    
    return Math.max(...result);
}

// 정확성  테스트
// 테스트 1 〉	통과 (0.36ms, 33.5MB)
// 테스트 2 〉	통과 (0.42ms, 33.5MB)
// 테스트 3 〉	통과 (0.32ms, 33.4MB)
// 테스트 4 〉	통과 (0.39ms, 33.5MB)
// 테스트 5 〉	통과 (0.35ms, 33.6MB)
// 테스트 6 〉	통과 (0.77ms, 33.7MB)
// 테스트 7 〉	통과 (0.99ms, 33.7MB)
// 테스트 8 〉	통과 (0.55ms, 33.6MB)
// 테스트 9 〉	통과 (2.14ms, 34.3MB)
// 효율성  테스트
// 테스트 1 〉	통과 (27.63ms, 47.3MB)
// 테스트 2 〉	통과 (51.22ms, 51MB)
// 테스트 3 〉	통과 (28.24ms, 51.3MB)
// 테스트 4 〉	통과 (26.25ms, 47.4MB)
// 테스트 5 〉	통과 (56.25ms, 51.5MB)
// 테스트 6 〉	통과 (26.31ms, 47.5MB)
