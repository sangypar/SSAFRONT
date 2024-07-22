function solution(word) {
    let answer = 0;
    
    const arr = {
        0: 'A',
        1: 'E',
        2: 'I',
        3: 'O',
        4: 'U',
    };
    
    const dict = [];
    
    let tmp = '';
    
    for(let i = 0; i < 5; i++) {
        tmp += arr[i];
        dict.push(tmp);
        
        for(let j = 0; j < 5; j++) {
            tmp += arr[j];
            dict.push(tmp);
            
            for(let k = 0; k < 5; k++) {
                tmp += arr[k];
                dict.push(tmp);
                
                for(let l = 0; l < 5; l++) {
                    tmp += arr[l];
                    dict.push(tmp);
            
                    for(let m = 0; m < 5; m++) {
                        tmp += arr[m];
                        dict.push(tmp);
            
                        tmp = tmp.slice(0, -1);
                    }
                    tmp = tmp.slice(0, -1);
                }
                tmp = tmp.slice(0, -1);
            }
            tmp = tmp.slice(0, -1);
        }
        tmp = tmp.slice(0, -1);
    }
    
    
    return dict.indexOf(word) + 1;
}
