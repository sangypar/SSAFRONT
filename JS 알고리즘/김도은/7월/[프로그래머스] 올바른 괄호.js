function solution(s){
        let stack = [];

        for(let i = 0; i < s.length; i++){
            let now = s.charAt(i);

            if(now === "(") {
                //시작하는 문자열이라면
                stack.push(now);
            } else {
                //아니라면 검사해야함
                if(stack.length === 0) return false;

                if(stack[stack.length - 1] === "(") stack.pop(); //마지막요소제거
                else return false;
            }
         }

    if(stack.length > 0) return false; //stack 남아있을 때
    return true;
}
