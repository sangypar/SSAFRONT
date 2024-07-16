function solution(s, skip, index) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const arr = s.split('');
    
    const result = arr.map((el) => {
        let idx = alphabet.indexOf(el), count = index;
        while (count > 0) {
            idx = (idx + 1) % 26;
            if (!skip.includes(alphabet[idx])) {
                count--;
            }
        }
        return alphabet[idx];
    });

    return result.join('');
}
