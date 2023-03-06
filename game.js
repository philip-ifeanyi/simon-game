let checkGameStart = 0
let level = 0
var userClickedPattern = []
var gamePattern = []
const buttonColors = ['red', 'blue', 'green', 'yellow']

// 
const nextSequence = () => {
  userClickedPattern = []
  level++
  var randomNumber = Math.floor((Math.random() * 4)) 
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)

  // Target the div with the selected color as id
  $(`#${randomChosenColor}`)
    .fadeOut(150)
    .fadeIn(150)
  playSound(`${randomChosenColor}`)

  $("h1").text(`Level ${level}`)
}

// Function to play audio
const playSound = (name) => {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

// Function for press animation
const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed")
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed")
  }, 100);
}

// Function to start game
$("body").keypress(function() {
  if (checkGameStart < 1 && checkGameStart < 2) {
    checkGameStart ++;
    nextSequence();
    $("h1").text(`Level 0`)
  }
})
 
// Detect button click and callback function
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id")
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length -1)
})

// Function to check answer
const checkAnswer = (currentLevel) => {
  // Check if the last user input equals game input
 if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  console.log("Correct")

  // Check if number of user input equal length of game input and prompt the game to make new input
  if(userClickedPattern.length === gamePattern.length) {
  setTimeout(() => {
    nextSequence()
  },1000)
 }
 } else {
  // if user input is wrong play audio, add animation for wrong input, end game and start over
  playSound('wrong')
  $('body').addClass("game-over")
  setTimeout(()=>{
    $('body').removeClass("game-over")
  }, 200)
  $("h1").text("Game Over, Press any Key to Restart")
  startOver()
 }
}

// Function to start over by resetting variables
const startOver = () => {
  checkGameStart = 0
  level = 0
  gamePattern = []
}