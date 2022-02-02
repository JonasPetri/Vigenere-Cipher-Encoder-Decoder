const bigLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
"L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const smallLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
"l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const textEl = document.getElementById('text')
const keyEl = document.getElementById('key')
const toggleEl = document.getElementById('toggle')
const resultEl = document.getElementById('result')
const textErr = document.getElementById('text-err')
const keyErr = document.getElementById('key-err')
const toggleErr = document.getElementById('select-err')

function checkForErrors(text, key, toggle) {
  if (toggle === "") {
    toggleErr.textContent = "Please choose an option."
  } else {
    toggleErr.textContent = ""
  }
  if (key === "") {
    keyErr.textContent = "Please type a key."
  } else {
    keyErr.textContent = ""
  }
  if (text === "") {
    textErr.textContent = "Please type some text."
  } else {
    textErr.textContent = ""
  }
  return toggle === "" && key === "" && text === ""
}

function encode(text, key) {
  var final = ""
  while (key.length < text.length) {
    key = key + key
  }
  for (var i = 0; i < text.length; i++) {
    if (bigLetters.includes(key[i])) {
      var keyNum = bigLetters.indexOf(key[i])
    } else if (smallLetters.includes(key[i])) {
      var keyNum = smallLetters.indexOf(key[i])
    } else {
      keyErr.textContent = "Please select a key that only conatins regular letters."
    }
    if (bigLetters.includes(text[i])) {
      var txtNum =  bigLetters.indexOf(text[i])
      var num = txtNum + keyNum
      if (num >= 26) {
        num = num - 26
      }
      var result = bigLetters[num]
      final = final + result
    } else if (smallLetters.includes(text[i])) {
      var txtNum =  smallLetters.indexOf(text[i])
      var num = txtNum + keyNum
      if (num >= 26) {
        num = num - 26
      }
      var result = smallLetters[num]
      final = final + result
    } else {
      final = final + text[i]
    }
  }
  resultEl.textContent = `Result: ${final}`
}

function decode(text, key) {
  var final = ""
  while (key.length < text.length) {
    key = key + key
  }
  for (var i = 0; i < text.length; i++) {
    if (bigLetters.includes(key[i])) {
      var keyNum = bigLetters.indexOf(key[i])
    } else if (smallLetters.includes(key[i])) {
      var keyNum = smallLetters.indexOf(key[i])
    } else {
      keyErr.textContent = "Please select a key that only conatins regular letters."
    }
    if (bigLetters.includes(text[i])) {
      var txtNum =  bigLetters.indexOf(text[i])
      var num = txtNum - keyNum
      if (num < 0) {
        num = num + 26
      }
      var result = bigLetters[num]
      final = final + result
    } else if (smallLetters.includes(text[i])) {
      var txtNum =  smallLetters.indexOf(text[i])
      var num = txtNum - keyNum
      if (num < 0) {
        num = num + 26
      }
      var result = smallLetters[num]
      final = final + result
    } else {
      final = final + text[i]
    }
  }
  resultEl.textContent = `Result: ${final}`
}

document.getElementById('submit').addEventListener('click', () => {
  var text = textEl.value
  var key = keyEl.value
  var toggle = toggleEl.value
  if (!checkForErrors(text, key, toggle) ) {
    if (toggle == "encode") {encode(text, key)}
    if (toggle == "decode") {decode(text, key)}
  }
})