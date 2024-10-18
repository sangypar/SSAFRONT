function solution(genres, plays) {
    let map = new Map();
    
    // 장르별로 재생 횟수와 곡들을 저장
    genres.forEach((genre, index) => {
        if (!map.has(genre)) map.set(genre, { totalPlays: 0, songs: [] });
        map.get(genre).totalPlays += plays[index];
        map.get(genre).songs.push({ playCount: plays[index], index: index });
    })
    
    // 장르별로 총 재생 횟수 정렬
    let genreList = [...map.entries()].sort((a, b) => b[1].totalPlays - a[1].totalPlays);
    
    // 장르 내에서 재생 횟수별로 정렬 후 상위 두개 추가
    let bestAlbum = [];
    genreList.forEach(([genre, info]) => {
        let songsList = info.songs.sort((a, b) => b.playCount - a.playCount || a.index - b.index);
        bestAlbum.push(songsList[0].index);
        if (songsList[1]) bestAlbum.push(songsList[1].index);
    })
    
    return bestAlbum;
}

// 테스트 1 〉	통과 (0.17ms, 33.5MB)
// 테스트 2 〉	통과 (0.27ms, 33.5MB)
// 테스트 3 〉	통과 (0.16ms, 33.4MB)
// 테스트 4 〉	통과 (0.14ms, 33.4MB)
// 테스트 5 〉	통과 (0.37ms, 33.5MB)
// 테스트 6 〉	통과 (0.32ms, 33.5MB)
// 테스트 7 〉	통과 (0.30ms, 33.5MB)
// 테스트 8 〉	통과 (0.38ms, 33.4MB)
// 테스트 9 〉	통과 (0.26ms, 33.4MB)
// 테스트 10 〉	통과 (0.52ms, 33.5MB)
// 테스트 11 〉	통과 (0.25ms, 33.4MB)
// 테스트 12 〉	통과 (0.35ms, 33.5MB)
// 테스트 13 〉	통과 (0.52ms, 33.5MB)
// 테스트 14 〉	통과 (0.32ms, 33.5MB)
// 테스트 15 〉	통과 (0.27ms, 33.4MB)
