const allowAlphanumericOnly = /[^ A-Za-z0-9]/
const whetherEveryStringIncludes = (checkedString = '', strings = []) => strings.every(s => s.includes(checkedString))
const findFirstIncluded = (substring = '', strings = []) => {
    for (let i = 0; i < substring.length; i++) {
        const testingPart = substring.substr(i, substring.length)
        if(whetherEveryStringIncludes(testingPart, strings)) {
        return testingPart
    }
}

return null
}
const findTheLongestSubstring = (strings = []) => {
let sortedArray = strings.filter(s => !s.match(allowAlphanumericOnly)).sort((s1, s2) => s1.length - s2.length)
let [first] = sortedArray
if (!sortedArray || sortedArray.length === 0) {
return ''
}
if (sortedArray.length === 1) {
return first
}
let currSubstring = null
const subStings = new Set()
first.split('').forEach((currChar, index) => {
const withAdd = currSubstring === null ? currChar : (currSubstring + currChar)
if (whetherEveryStringIncludes(withAdd, strings)) {
currSubstring = withAdd
} else {
if (currSubstring !== null) {
subStings.add(currSubstring)
currSubstring = findFirstIncluded(withAdd, strings)
}
}
})
if (currSubstring !== null) {
subStings.add(currSubstring)
}
const [longestSubstring] = [...subStings].sort((s1, s2) => s2.length - s1.length)
return longestSubstring || ''
}
console.log(findTheLongestSubstring(process.argv.slice(2)))