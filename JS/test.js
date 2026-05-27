function unkown(s) {
  let reverse = ""
  for (let last = s.length - 1; last >= 0; last--) {
    reverse += s[last]

  }
}
console.log(unkown("reverse"))

function reverseString(s) {
  let r = "";
  for (let i = s.length - 1; i >= 0; i--) {
    r += s[i];
  }
  return r;
}
console.log(reverseString("reverse"))
