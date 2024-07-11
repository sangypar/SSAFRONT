function solution(s) {

    let answer = new String();
    let numWord = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    let changeNum = new String();

    for(let i = 0; i < s.length; i++){
        let c = s.charAt(i);

        if(c === '0' || c === '1' ||c === '2'||c === '3'||c === '4'||c === '5'||c === '6'||c === '7'||c === '8'||c === '9') {
            //숫자라면
            answer+=c;
        } else {
            //숫자가 아니라면
            changeNum += c;

            for(let n = 0; n < 10; n++){
                if(changeNum === numWord[n]) {
                    //같은게 있다면!!
                    answer += n.toString(); // 문자열로 변환한 값을 넣어주셈~!
                    changeNum = new String(); //다시 빈문자열로
                }
            }

        }
    }

    return Number(answer); //숫자로 형 변환해줘야 함 ....
}

///////replace를 쓰면 금방 해결된다니...

///////////////////아래 풀이가 이해 안감

// function solution(s) {
//     let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
//     var answer = s;

//     for(let i=0; i< numbers.length; i++) {
//         let arr = answer.split(numbers[i]);
//         answer = arr.join(i);
//     }

//     return Number(answer);
// }
