// function findName(name) {
//     console.log('what is your name?'); //--- (1)
//     console.log('...finding');  //--- (2)
//     setTimeout(() => {
//         console.log('your name is ' + name); //--- (3)
//     }, 3000);
// 	console.log('right?'); //--- (4)
// }

// findName('홍길동');

// ----

function findName2(name) {
	if (!name) return console.log("Sorry, I don't know you");
	console.log('your name is ' + name); //--- (3)
	console.log('right?');  //--- (4)
}

function delay(id, cb) {
    console.log('what is your name?'); //--- (1)
    console.log('...finding'); //--- (2)
    setTimeout(() => {
        const data = { 1: '홍길동', 2: '스펀지밥' };
        cb(data[id]);
    }, 3000);
}

delay(1, findName2);
