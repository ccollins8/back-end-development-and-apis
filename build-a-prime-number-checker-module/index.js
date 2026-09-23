const mathjs = require('mathjs')


function isPrime(num) {
    return mathjs.isPrime(num)
}

module.exports = {
    isPrime
}

console.log(isPrime(8))