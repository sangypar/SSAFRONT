function solution(s){

    let open = 0, close = 0;
    
    for(let i = 0; i < s.length; i++) {
        s[i] === '(' ? open++ : close++;
        if(close > open) {
            open = -1;
            break;
        }
    }
    
    return open === close ? true : false
    
}
