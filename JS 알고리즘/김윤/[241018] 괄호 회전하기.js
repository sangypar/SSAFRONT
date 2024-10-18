function solution(s) {
    let array = s.split("");
    let answer = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (check(array.join(''))) {
            answer++;
        }
        
        array.push(array.shift());
    }
    
    return answer;
}

function check(s) {
    const stack = [];
    const pair = {')': '(', '}': '{', ']': '['};
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== pair[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}
