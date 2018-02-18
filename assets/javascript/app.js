// GLOBAL VARIABLES
// ------------------------------------------------------------------------------------------

// timer
var timer = 30;
var intervalId;
var questionNum = 0;

// questions and answers
var qAndA = {
      q1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      a1: [
        'answer option 1',
        'answer option 2',
        'answer option 3',
        'answer option 4'
      ],
      q2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      a2: [
        'answer option 1',
        'answer option 2',
        'answer option 3',
        'answer option 4'
      ],
      q3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      a3: [
        'answer option 1',
        'answer option 2',
        'answer option 3',
        'answer option 4'
      ]
};

var correctAnswer = [
      qAndA.a1[0],
      qAndA.a2[1],
      qAndA.a3[2]
];

// counter
var correctCounter    = 0;
var incorrectCounter  = 0;
var unanswered        = 0;

// FUNCTONS
// ------------------------------------------------------------------------------------------
function runTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(countdown, 1000);
}
function countdown() {
  timer--;
  $("#trivia-area").html("<p>Time Remaining: " + timer + " Seconds</p>");
  if (timer === 0) {
    //TODO: write this funciton
    // dosomething();
    stop();
    alert("Time's Up");
  }
};
function stop() {
  clearInterval(intervalId);
}



//TODO: when start is pressed, display the timer and the first questions and the first questions answers
for (var question in qAndA) {
  console.log(`qAndA.${}`);
}

//TODO: when answer selected, display 'Correct!' for the correct answer, or 'Nope!' for an incorrect answer.  If answered incorrectly, display the correct answer.  The game should advance to the next question after 5 seconds automatically

//TODO: if time remaining to answer hits 0, dispaly 'Out of Time!' and the correct answer.

//TODO: At the end of the game:
// Timer is off
// display All Done, Here's How You Did
// Correct Answers: #
// Incorrect Answers: #
// Unanswered: 1
// Start Over Button


//TODO: On Start Over Button Click:
// Game reloads without reloading the page.  Just reset the game






// MAIN PROCESS
// ------------------------------------------------------------------------------------------
$("#start-btn").click(function() {
  runTimer();

});
