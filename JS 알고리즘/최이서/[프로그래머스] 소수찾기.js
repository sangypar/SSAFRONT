function solution(numbers) {
  let set = new Set();

  function comb(arr, ex) {
   
    for (let i = 0; i < arr.length; i++) {
      let after = ex + arr[i];
      set.add(parseInt(after));
      let newArr = arr.slice(0, i).concat(arr.slice(i + 1));
      comb(newArr, after);
    }
  }

  function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  comb(numbers.split(''), '');

  let count = 0;
  set.forEach(num => {
    if (isPrime(num)) count++;
  });

  return count;
}