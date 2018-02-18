$(document).ready(function() {

// GLOBAL VARIABLES
// ------------------------------------------------------------------------------------------
// just some variables I'll need
var answered;
var numAnswers = 4;
var userAnswer;
var messages = {
  correct: "Today, You Live!!",
  incorrect: "Today, You Die",
  timeUp: "You're Time Has Run Out",
  finish: "Let's Tally the Score"
}

// timer
var seconds = 30;
var intervalId;
var questionNum = 0;

// questions and answers
var qAndA = [
      {
      q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      a: [
        'answer option 1',
        'answer option 2',
        'answer option 3',
        'answer option 4'
      ],
      },
      {
      q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      a: [
        'answer option 1',
        'answer option 2',
        'answer option 3',
        'answer option 4'
      ],
      },
      {
      q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      a: [
        'answer option 1',
        'answer option 2',
        'answer option 3',
        'answer option 4'
      ],
      }
];

var correctAnswer = [
      qAndA[0].a[0],
      qAndA[1].a[1],
      qAndA[2].a[2]
];

console.log(correctAnswer[0]);


// counter
var correctCounter    = 0;
var incorrectCounter  = 0;
var unanswered        = 0;

// FUNCTONS
// ------------------------------------------------------------------------------------------
// hide the startover button initially
$("#startOver-btn").hide();

// setup the timer
function timer() {
  // display the starting time and set the interval
  $("#timeUp").html("<p>Time Til You Die: " + seconds + "</p>");
  answered = true;

  intervalId = setInterval(showTimer, 1000 * 1);
}


// setup the countdown
function showTimer() {
  seconds--;
  $("#timeUp").html("<p>Tim Til You Die: " + seconds + "</p>");

  // setup run out of time
  if (seconds < 1) {
    clearInterval(intervalId);
    answered = false;
    // we'll setup this function later TODO
    showAnswer();
  }
}


// GET A NEW QUESTION AND IT'S ANSWERS +++++++++++++++++++++++++++++++
function nextQuestion() {
  // empty stuff we don't need
  $("#rightWrong").empty();
  $("#correctAnswer").empty();
  $("#gif").empty();
  answered = true;

  // get the question and answers
  $("#currentQuestion").html("Question #" + (questionNum + 1) + " of " + qAndA.length);
  $(".question").html("<p>" + qAndA[questionNum].q + "</p>");

  // setup displaying the questions, I HAD TO LOOK THIS UP
  for (var i = 0; i < numAnswers; i++) {
    var options = $("<div>");
    options.text(qAndA[questionNum].a[i]);
    options.attr({"data-index": i});
    options.addClass("thisChoice");
    $(".answerOptions").append(options);
  }
  console.log("questionNum var " + questionNum);

  // run the timer
  timer();

  // write the method for what they click
  $(".thisChoice").on("click", function () {
    userAnswer = $(this).data("index");
    console.log("userAnswer " + userAnswer);
    clearInterval(intervalId);
    // take them to the answer Page TODO
    answerPage();
  });
}

// FUNCTION TO START THE GAME ++++++++++++++++++++++++++++++++++++++++
function goTime() {
  // clear the divs
  $("#finalOutcome").empty();
  $("#correctCounter").empty();
  $("#incorrectCounter").empty();
  $("#unanswered").empty();

  // reset the variables
  questionNum       = 0;
  correctCounter    = 0;
  incorrectCounter  = 0;
  unanswered        = 0;

  // call the next question
  nextQuestion();
}

// TODO SHOW EM THE ANSWERS +++++++++++++++++++++++++++++++++++++++++++++++
function answerPage() {
  // empty out some stuff
  $("#currentQuestion").empty();
  $(".thisChoice").empty();
  $(".question").empty();

  // grab the right answer to use later  I HAD TO LOOK THIS UP
  var answerText = correctAnswer[questionNum];
  var answerIndex = qAndA[questionNum].a.indexOf(correctAnswer[questionNum]);

  // testing
  console.log("answerText var = " + answerText);
  console.log("answerIndex var = " + answerIndex);

  // run the logic to see if they picked the right answer
  if (userAnswer == answerIndex && answered == true) {
    // add 1 to the correct counter
    correctCounter++;
    // output to the DOM
    $("#rightWrong").html(messages.correct);
  } else if (userAnswer != answerIndex && answered == true) {
    // add 1 to the incorrect counter
    incorrectCounter++;
    // output to the DOM
    $("#rightWrong").html(messages.incorrect);
    $("#correctAnswer").html("The Raven Says the Correct Answer is: " + answerText);
  } else {
    // iterate the unanswered counter
    unanswered++;
    // output to the DOM
    $("#rightWrong").html(messages.timeUp);
    $("#correctAnswer").html("The Raven Says the Correct Answer is: " + answerText);
    // set answered back to true
    answered = true;
  }
  // go to the next question
  // if we're at the last question, go to the scores
  if (questionNum == (qAndA.length - 1)) {
    setTimeout(scores, 1000 * 4);
  }
  // otherwise just go to the next question
  questionNum++;
  setTimeout(nextQuestion, 1000 * 4);

}

// TODO FINAL PAGE SCORES +++++++++++++++++++++++++++++++++++++++++++++++++
function scores() {
  // clear em out
  $("#timeUp").empty();
  $("#rightWrong").empty();
  $("#correctAnswer").empty();
  $("#gif").empty();

  // display the final totals
  $("#finalOutcome").html(messages.finish);
  $("#correctCounter").html("You lived through: " + correctCounter + " battles.  Good Job!");
  $("#incorrectCounter").html("You died: " + incorrectCounter + " times.  But you 'John Snowed' it and came back to life.");
  $("#unanswered").html("You failed to answer: " + unanswered + " times.");
  $("#startOver-btn").show();
}




// MAIN PROCESS
// ------------------------------------------------------------------------------------------
$("#start-btn").on("click", function () {
  $(this).hide();
  goTime();
});

$("#startOver-btn").on("click", function () {
  $(this).hide();
  goTime();
});


});//END OF THE DOC READY FUNCTION
