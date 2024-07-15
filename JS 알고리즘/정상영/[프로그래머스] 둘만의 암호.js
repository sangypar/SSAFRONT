function solution(s, skip, index) {
    var answer = '';
    
    const apb = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    for(let s of skip) {
        for(let i = 0; i < apb.length; i++) {
            if(s === apb[i]) apb.splice(i, 1);
        }
    }
    
    for(let char of s) {
        for(let i = 0; i < apb.length; i++) {
            if(char === apb[i]) answer += apb[(i + index) % apb.length];
        }
    }
    
    return answer;
}
