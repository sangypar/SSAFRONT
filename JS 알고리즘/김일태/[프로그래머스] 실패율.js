function solution(N, stages) {
    const failureRates = [];
    let stage = 1, idx = 0, len = stages.length;
    stages.sort((a, b) => a - b);
    
    while (stage <= N) {
        let acc = 0;
        while (stages[idx] === stage) {
            acc++;
            idx++;
        }
        if (len > 0) {
            failureRates.push({ stage, rate: acc / len });
        } else {
            failureRates.push({ stage, rate: 0 });
        }
        len -= acc;
        stage++;
    }

    failureRates.sort((a, b) => {
        if (b.rate === a.rate) {
            return a.stage - b.stage;
        }
        return b.rate - a.rate;
    });

    return failureRates.map(f => f.stage);
}
