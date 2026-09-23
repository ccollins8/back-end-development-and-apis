function getUpperCase(str) {
    return str.toUpperCase()
}

function getLowerCase(str) {
    return str.toLowerCase()
}

function getSentenceCase(str) {
    return str.split('').map((char, index) => {
        if (index === 0) {
            return char.toUpperCase()
        }
        return char.toLowerCase()
    }).join('')
}

function getProperCase(str) {
    return str.split(' ').map((word) => {
        const firstChar = word[0].toUpperCase()
        const remainingChars = word.slice(1).toLowerCase()
        return firstChar + remainingChars
    }).join(' ')
}

module.exports = {
    getUpperCase, getLowerCase, getSentenceCase, getProperCase
}