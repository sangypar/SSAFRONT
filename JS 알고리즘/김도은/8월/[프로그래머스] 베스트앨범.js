function solution(genres, plays) {
    
    let best = [];
    let genreCount = {};
    
    for(let i = 0; i < genres.length; i++) {
        let kind = genres[i]; //종류
        let num = plays[i]; //수
        best.push({ genre: kind, play: num, id: i });
        
        // 장르별 총 재생 횟수 계산
        if (!genreCount[kind]) {
            genreCount[kind] = 0;
        }
        
        genreCount[kind] += num;
    }
    
    let sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);
    //재생수 많은 장르 순
    
    best.sort((a, b) => {
        if (a.genre === b.genre) {
            return b.play - a.play || a.id - b.id;
            // 같은 장르 내에서는 재생 횟수 내림차순, 재생 횟수가 같으면 고유 번호 오름차순
        } else {
            return sortedGenres.indexOf(a.genre) - sortedGenres.indexOf(b.genre);
            // 장르가 다르다면 sortedGenres에 있는 순서대로 정렬하기 위함
        }
    });
    
    // 각 장르별로 최대 두 곡씩 추가
    let album = {};
    let answer = [];
    
    for (let song of best) {
        if (!album[song.genre]) {
            album[song.genre] = 0; //해당 키 값이 없으면, 0으로 초기화해서 만들어주고
        }
        if (album[song.genre] < 2) {
            answer.push(song.id);
            album[song.genre]++; //0 1 하면 두곡이 들어간거임
        }
    }
    
    return answer;
}

// 테스트 1 〉	통과 (0.15ms, 33.3MB)
// 테스트 2 〉	통과 (0.15ms, 33.4MB)
// 테스트 3 〉	통과 (0.13ms, 33.4MB)
// 테스트 4 〉	통과 (0.11ms, 33.4MB)
// 테스트 5 〉	통과 (0.43ms, 33.4MB)
// 테스트 6 〉	통과 (0.44ms, 33.4MB)
// 테스트 7 〉	통과 (0.38ms, 33.5MB)
// 테스트 8 〉	통과 (0.36ms, 33.5MB)
// 테스트 9 〉	통과 (0.15ms, 33.4MB)
// 테스트 10 〉	통과 (0.41ms, 33.5MB)
// 테스트 11 〉	통과 (0.24ms, 33.4MB)
// 테스트 12 〉	통과 (0.36ms, 33.5MB)
// 테스트 13 〉	통과 (0.63ms, 33.4MB)
// 테스트 14 〉	통과 (0.41ms, 33.4MB)
// 테스트 15 〉	통과 (0.15ms, 33.4MB)
// 채점 결과
// 정확성: 100.0
// 합계: 100.0 / 100.0
