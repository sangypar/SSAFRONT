function solution(routes) {
    routes.sort((a, b) => a[1] - b[1]);
    
    var install = 0;
    var camera = -30001;
    
    for (let route of routes) {
        if (camera < route[0]) {
            install++;
            camera = route[1];
        }
    }
    
    return install;
}

// 정확성  테스트
// 테스트 1 〉	통과 (0.15ms, 33.5MB)
// 테스트 2 〉	통과 (0.16ms, 33.6MB)
// 테스트 3 〉	통과 (0.16ms, 33.4MB)
// 테스트 4 〉	통과 (0.17ms, 33.5MB)
// 테스트 5 〉	통과 (0.17ms, 33.5MB)
// 효율성  테스트
// 테스트 1 〉	통과 (0.97ms, 33.3MB)
// 테스트 2 〉	통과 (0.96ms, 33.3MB)
// 테스트 3 〉	통과 (17.91ms, 35.5MB)
// 테스트 4 〉	통과 (0.26ms, 33MB)
// 테스트 5 〉	통과 (2.59ms, 36.2MB)
