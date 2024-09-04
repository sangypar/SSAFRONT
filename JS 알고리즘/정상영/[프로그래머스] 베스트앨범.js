function solution(genres, plays) {
    const n = genres.length;
    
    const playCntByGenre = [];
    
    for(let i = 0; i < n; i++) {
        const genre = genres[i];
        const play = plays[i];
        
        // 배열에 있는지 찾기
        const idx = playCntByGenre.findIndex(item => item[0] === genre);
        
        // 있으면 누적합 
        if(idx >= 0) playCntByGenre[idx][1] += play;
        // 없으면 추가
        else playCntByGenre.push([genre, play]);
    }
    // 내림차순으로 정렬
    playCntByGenre.sort((a, b) => b[1] - a[1]);
    
    const songs = [];
    
    for(let i = 0; i < n; i++) {
        songs.push([i, plays[i], genres[i]]);
    }
    
    songs.sort((a, b) => {
        if(a[1] === b[1] && a[2] === b[2]) return a[0] - b[0];
        else return b[1] - a[1];
    })
    
    let answer = [];
    const albumGenre = new Set();
    
    playCntByGenre.forEach((el) => {
        const genre = el[0];
        let cnt = 0;
        
        // 이미 담은 장르는 pass
        if(albumGenre.has(genre)) return;
        
        songs.forEach((songs) => {
            // 2번 담았으면 끝
            if(cnt === 2) {
                albumGenre.add(genre);
                return;
            }
            
            // 2번까지 담기
            if(songs[2] === genre) {
                cnt++;
                answer.push(songs[0]);
            }
        })
    })
    
    return answer;
}

/*
테스트 1 〉	통과 (0.18ms, 33.4MB)
테스트 2 〉	통과 (0.17ms, 33.5MB)
테스트 3 〉	통과 (0.15ms, 33.6MB)
테스트 4 〉	통과 (0.12ms, 33.4MB)
테스트 5 〉	통과 (0.51ms, 33.4MB)
테스트 6 〉	통과 (0.44ms, 33.4MB)
테스트 7 〉	통과 (0.36ms, 33.6MB)
테스트 8 〉	통과 (0.33ms, 33.5MB)
테스트 9 〉	통과 (0.18ms, 33.4MB)
테스트 10 〉	통과 (0.48ms, 33.5MB)
테스트 11 〉	통과 (0.39ms, 33.4MB)
테스트 12 〉	통과 (0.40ms, 33.5MB)
테스트 13 〉	통과 (0.40ms, 33.4MB)
테스트 14 〉	통과 (0.42ms, 33.5MB)
테스트 15 〉	통과 (0.18ms, 33.4MB)
*/
