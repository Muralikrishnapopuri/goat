function unkown(s) {
  let startIndex = 0, endIndex = s.length - 1;
  while (startIndex < endIndex) {
    if (s[startIndex++] !== s[endIndex--]) {
      return false
    }
  }
  return true
}
console.log(unkown("raccarrr"))