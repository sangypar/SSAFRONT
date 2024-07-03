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
