function solution(n, words) {

    let game = []; //말한 낱말 넣을 배열
    let idx = 0;
    let answer = [0, 0];

    for(let word of words){

        let before = game[game.length - 1] ?? '';

        //그전문자가 빈문자열이 아닐때
        if(game.includes(word) || (before !== '' && before.charAt(before.length - 1) !== word.charAt(0))) {
            //포함하고 있으면 멈춰

            answer[0] = idx % n + 1; //번호
            answer[1] = Math.floor(idx / n) + 1; //차례

            return answer;
        }

        game.push(word);
        idx++;
    }

    return answer;
}

// 테스트 1 〉	통과 (0.08ms, 33.4MB)
// 테스트 2 〉	통과 (0.20ms, 33.5MB)
// 테스트 3 〉	통과 (0.09ms, 33.5MB)
// 테스트 4 〉	통과 (0.09ms, 33.5MB)
// 테스트 5 〉	통과 (0.29ms, 33.5MB)
// 테스트 6 〉	통과 (0.08ms, 33.4MB)
// 테스트 7 〉	통과 (0.21ms, 33.5MB)
// 테스트 8 〉	통과 (0.12ms, 33.6MB)
// 테스트 9 〉	통과 (0.14ms, 33.6MB)
// 테스트 10 〉	통과 (0.28ms, 33.4MB)
// 테스트 11 〉	통과 (0.18ms, 33.5MB)
// 테스트 12 〉	통과 (0.35ms, 33.4MB)
// 테스트 13 〉	통과 (0.10ms, 33.5MB)
// 테스트 14 〉	통과 (0.14ms, 33.4MB)
// 테스트 15 〉	통과 (0.08ms, 33.5MB)
// 테스트 16 〉	통과 (0.10ms, 33.6MB)
// 테스트 17 〉	통과 (0.07ms, 33.5MB)
// 테스트 18 〉	통과 (0.08ms, 33.4MB)
// 테스트 19 〉	통과 (0.13ms, 33.2MB)
// 테스트 20 〉	통과 (0.21ms, 33.5MB)
