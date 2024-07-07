function solution(answers) {
    var answer = [];
    var cnt = [0, 0, 0];
    
    for(var i = 0; i < answers.length; i++) {
        var idx1or3 = i % 10;
        var answer1or3 = [-1, -1];
        
        switch(idx1or3) {
            case 0: 
                answer1or3 = [1, 3];
                break;
            case 1: 
                answer1or3 = [2, 3];
                break;
            case 2: 
                answer1or3 = [3, 1];
                break;
            case 3: 
                answer1or3 = [4, 1];
                break;
            case 4: 
                answer1or3 = [5, 2];
                break;
            case 5: 
                answer1or3 = [1, 2];
                break;
            case 6: 
                answer1or3 = [2, 4];
                break;
            case 7: 
                answer1or3 = [3, 4];
                break;
            case 8: 
                answer1or3 = [4, 5];
                break;
            case 9: 
                answer1or3 = [5, 5];
                break;
        }
        
        var idx2 = i % 8;
        var answer2 = -1;
        
        switch(idx2) {
            case 0: 
                answer2 = 2;
                break;
            case 1: 
                answer2 = 1;
                break;
            case 2: 
                answer2 = 2;
                break;
            case 3: 
                answer2 = 3;
                break;
            case 4: 
                answer2 = 2;
                break;
            case 5: 
                answer2 = 4;
                break;
            case 6: 
                answer2 = 2;
                break;
            case 7: 
                answer2 = 5;
                break;
        }
        
        if(answer1or3[0] === answers[i]) cnt[0]++;
        if(answer2 === answers[i]) cnt[1]++;
        if(answer1or3[1] === answers[i]) cnt[2]++;
    }    
    
    var maxIdx = 1;
    
    if(cnt[0] > cnt[1]) {
        if(cnt[0] > cnt[2]) answer.push(1);
        else if(cnt[0] === cnt[2]) {
            answer.push(1);
            answer.push(3);
        } else if(cnt[2] > cnt[0]) answer.push(3);
    }
    else if(cnt[0] === cnt[1]) {
        if(cnt[0] === cnt[2]) {
            answer.push(1);
            answer.push(2);
            answer.push(3);
        } else if(cnt[2] > cnt[0]) answer.push(3);
        else if(cnt[0] > cnt[2]) {
            answer.push(1);
            answer.push(2);
        }
    } else if(cnt[0] < cnt[1]) {
        if(cnt[1] > cnt[2]) answer.push(2);
        else if(cnt[1] === cnt[2]) {
            answer.push(2);
            answer.push(3);
        } else if(cnt[2] > cnt[1]) answer.push(3);
    }
    
    return answer;
}
