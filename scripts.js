var counter = 0
rainbow = function() {
  counter++
  console.log(counter)
  if (counter >= 21) {
    document.getElementById("smoltext").classList.add("rainbow-text")
    document.getElementById("bigtext").classList.add("rainbow-text")
  }
}