/*
테스트 1 〉	통과 (0.22ms, 33.4MB)
테스트 2 〉	통과 (1.19ms, 33.9MB)
테스트 3 〉	통과 (39.29ms, 38.3MB)
테스트 4 〉	통과 (153.91ms, 39.5MB)
테스트 5 〉	통과 (550.89ms, 43.4MB)
테스트 6 〉	통과 (6.18ms, 37.1MB)
테스트 7 〉	통과 (13.82ms, 38.1MB)
테스트 8 〉	통과 (126.63ms, 39.6MB)
테스트 9 〉	통과 (501.89ms, 43.6MB)
테스트 10 〉	통과 (62.76ms, 39.3MB)
테스트 11 〉	통과 (144.78ms, 39.5MB)
테스트 12 〉	통과 (128.88ms, 40MB)
테스트 13 〉	통과 (179.83ms, 40.5MB)
테스트 14 〉	통과 (0.32ms, 33.6MB)
테스트 15 〉	통과 (18.82ms, 38.9MB)
테스트 16 〉	통과 (13.77ms, 39.3MB)
테스트 17 〉	통과 (16.47ms, 38.9MB)
테스트 18 〉	통과 (21.92ms, 39.3MB)
테스트 19 〉	통과 (4.78ms, 37.7MB)
테스트 20 〉	통과 (19.68ms, 39.7MB)
테스트 21 〉	통과 (19.49ms, 39.1MB)
테스트 22 〉	통과 (325.64ms, 43.7MB)
테스트 23 〉	통과 (26.51ms, 40.8MB)
테스트 24 〉	통과 (38.85ms, 41MB)
테스트 25 〉	통과 (0.08ms, 33.4MB)
테스트 26 〉	통과 (0.08ms, 33.5MB)
테스트 27 〉	통과 (0.07ms, 33.4MB)
*/

function solution(N, stages) {
    let arr = [];
    
    for(let i = 1; i <= N; i++) {
        let notClear = 0;
        let challengers = 0;
        
        for(let stage of stages) {
            if(stage >= i) {
                challengers++;
                if(stage == i) {
                    notClear++;
                } 
            } 
        }
        
        arr.push([i, notClear / challengers]);
    }
    
    arr.sort((a, b) => b[1] - a[1]);
    
    const answer = arr.map((x) => (x[0]));
    
    return answer;
}
