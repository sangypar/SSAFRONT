function solution(land) {
    const n = land.length;
    const m = land[0].length;

    const dr = [1, -1, 0, 0]; // 행 이동 (상하)
    const dc = [0, 0, 1, -1]; // 열 이동 (좌우)

    // 방문 배열
    let visit = Array.from({ length: n }, () => Array(m).fill(false));

    // 석유 덩어리 정보를 저장할 배열
    let oilChunks = [];

    // DFS 함수로 석유 덩어리 크기 계산
    const dfs = (r, c) => {
        visit[r][c] = true; // 현재 위치 방문 처리
        let size = 1; // 현재 위치 포함, 덩어리 크기를 1로 시작
        let positions = [[r, c]]; // 해당 덩어리에 속한 위치들을 저장

        // 4방향 탐색
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            // 배열 범위 내에 있고, 방문하지 않았으며 land[nr][nc]가 1인 경우
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && land[nr][nc] === 1 && !visit[nr][nc]) {
                const [newSize, newPositions] = dfs(nr, nc); // 연결된 석유 덩어리 크기와 위치 더함
                size += newSize;
                positions = positions.concat(newPositions);
            }
        }

        return [size, positions]; // 덩어리 크기와 덩어리에 속한 좌표 반환
    };

    // 석유 덩어리 찾기
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (land[i][j] === 1 && !visit[i][j]) {
                let [chunkSize, positions] = dfs(i, j); // DFS로 덩어리 크기 및 좌표 계산
                oilChunks.push([chunkSize, positions]); // 덩어리 크기와 위치 저장
            }
        }
    }

    let maxOil = 0;

    // 열 별로 최대 석유량 계산
    for (let j = 0; j < m; j++) {
        let currentOil = 0;
        let visitedChunks = new Set(); // 중복된 덩어리 계산 방지

        // 각 열을 탐색
        for (let i = 0; i < n; i++) {
            if (land[i][j] === 1) {
                // 현재 열에 포함된 석유 덩어리 탐색
                for (let [size, positions] of oilChunks) {
                    // 덩어리 내의 위치가 현재 열에 해당하는지 확인
                    for (let [r, c] of positions) {
                        if (c === j && !visitedChunks.has(positions)) {
                            currentOil += size; // 덩어리 크기 합산
                            visitedChunks.add(positions); // 덩어리 방문 처리
                            break; // 하나의 덩어리 크기는 한 번만 계산
                        }
                    }
                }
            }
        }

        maxOil = Math.max(maxOil, currentOil); // 최대 석유량 갱신
    }

    return maxOil;
}

// 테스트 1 〉	통과 (0.58ms, 33.6MB)
// 테스트 2 〉	통과 (14.31ms, 38.6MB)
// 테스트 3 〉	통과 (0.57ms, 33.5MB)
// 테스트 4 〉	통과 (1.32ms, 34.1MB)
// 테스트 5 〉	통과 (0.79ms, 33.7MB)
// 테스트 6 〉	통과 (36.01ms, 39.6MB)
// 테스트 7 〉	통과 (28.13ms, 39.7MB)
// 테스트 8 〉	통과 (24.05ms, 39.6MB)
// 테스트 9 〉	통과 (79.91ms, 40.8MB)
// 효율성  테스트
// 테스트 1 〉	실패 (런타임 에러)
// 테스트 2 〉	실패 (시간 초과)
// 테스트 3 〉	실패 (시간 초과)
// 테스트 4 〉	실패 (런타임 에러)
// 테스트 5 〉	실패 (런타임 에러)
// 테스트 6 〉	실패 (런타임 에러)
// 채점 결과
// 정확성: 60.0
// 효율성: 0.0
// 합계: 60.0 / 100.0

