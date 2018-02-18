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
var seconds;
var intervalId;
var questionNum = 0;

// questions and answers
var qAndA = [
      {
      q: "What is Daenerys Targaryen's full title?",
      a: [
        'Big Deal Daeny',
        'Burner of Things',
        'Dragon Mother, aka Chain Breaker, aka More Stuff, aka More Stuff',
        'Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen, Khaleesi of the Great Grass Sea, Protector of the Realm, Lady Regnant of the Seven Kingdoms, Breaker of Chains and Mother of Dragons'
      ],
      },
      {
      q: "What are Daenerys' Dragons Names?",
      a: [
        'Larry, Curly, and Mo',
        'Drogon, Rhaegal, and Viserion',
        'Rhaegal, Leptide, and Kyle',
        'Knight King, Tantrum, and Kinetic'
      ],
      },
      {
      q: "Who is John Snow?",
      a: [
        'Bastard son of "Ned", aka Eddard Stark, Aegon Targaryen, King of the North and Lord Commander of the Knights Watch',
        'A dude with a real boring name.',
        'The Stark that died in the Red Wedding',
        'The Three Eyed Raven'
      ],
      },
      {
      q: "Who was the first person to kill a whitewalker?",
      a: [
        'The Knight King',
        'Jamie Lannister',
        'Samwell Tarly',
        'Lord Commander Mormont'
      ],
      },
      {
      q: "How did Cersei Lannister Exact Revenge on the High Sparrow?",
      a: [
        'She blew him, and everyone else who crossed her, up while they were gathered for what was supposed to be her trial',
        'She tickled him to death',
        'She sent her dragons to attack him',
        "She's merciful, so she forgave and forgot"
      ],
      },
      {
      q: "Who's on Arya Stark's Hit List?",
      a: [
        'Cersei Lannister, Ilyn Payne, Melisandre, Beric Dondarrion, Thoros of Myr, Polliver, Joffrey Baratheon, Rorge, The Mountain, The Hound, Tywin Lannister, Sir Meryn, and Walder Frey',
        'All the white walkers',
        'The Boltons, Littlefinger, all The Lannisters, and The Hound',
        "Nobody, she gets along with everyone"
      ],
      },
      {
      q: "Who is the Knight King?",
      a: [
        'John Snows oldest friend',
        'The true heir to the iron throne',
        'Just another guy trying to take over the world',
        "The leader of the white walkers, who got a major ride upgrade last season by white-walker-ifying one of Danerys' dragons"
      ],
      },
      {
      q: "What kills white walkers?",
      a: [
        "Really nothing, they live forever cause they're not really alive",
        'Dragon glass, valyrian steel, dragons, and fire',
        'Heart disease, anxiety, and other white walkers',
        "Kale, spinach, and other leafy greens"
      ],
      }
];

var correctAnswer = [
      qAndA[0].a[3],
      qAndA[1].a[1],
      qAndA[2].a[0],
      qAndA[3].a[2],
      qAndA[4].a[0],
      qAndA[5].a[0],
      qAndA[6].a[3],
      qAndA[7].a[1],
];

// counterS
var correctCounter    = 0;
var incorrectCounter  = 0;
var unanswered        = 0;

// FUNCTONS
// ------------------------------------------------------------------------------------------
// hide the startover button initially
$("#startOver-btn").hide();

// setup the timer
function timer() {
  seconds = 15;
  // display the starting time and set the interval
  $("#timeUp").html("<h2>Time Til You Die: " + seconds + "</h2>");
  answered = true;

  intervalId = setInterval(showTimer, 1000 * 1);
}


// setup the countdown
function showTimer() {
  seconds--;
  $("#timeUp").html("<h2>Time Til You Die: " + seconds + "</h2>");

  // setup run out of time
  if (seconds < 1) {
    clearInterval(intervalId);
    answered = false;
    // we'll setup this function later
    answerPage();
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
  // console.log("questionNum var " + questionNum);

  // run the timer
  timer();

  // write the method for what they click
  $(".thisChoice").on("click", function () {
    userAnswer = $(this).data("index");
    // console.log("userAnswer " + userAnswer);
    clearInterval(intervalId);
    // take them to the answer Page
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

// CHECK THE ANSWERS, SHOW EM THE ANSWERS +++++++++++++++++++++++++++++++++++++++++++++++
function answerPage() {
  // empty out some stuff
  $("#currentQuestion").empty();
  $(".thisChoice").empty();
  $(".question").empty();

  // grab the right answer to use later  I HAD TO LOOK THIS UP
  var answerText = correctAnswer[questionNum];
  var answerIndex = qAndA[questionNum].a.indexOf(correctAnswer[questionNum]);

  // testing
  // console.log("answerText var = " + answerText);
  // console.log("answerIndex var = " + answerIndex);

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
    $("#correctAnswer").html("<h2>The Raven Says the Correct Answer is: <br></h2>" + answerText);
  } else {
    // iterate the unanswered counter
    unanswered++;
    // output to the DOM
    $("#rightWrong").html(messages.timeUp);
    $("#correctAnswer").html("<h2>The Raven Says the Correct Answer is: <br></h2>" + answerText);
    // set answered back to true
    answered = true;
  }
  // go to the next question
  // if we're at the last question, go to the scores
  if (questionNum == (qAndA.length - 1)) {
    setTimeout(scores, 1000 * 4);
  } else {
  // otherwise just go to the next question
  questionNum++;
  setTimeout(nextQuestion, 1000 * 4);
  }
}

// FINAL PAGE SCORES +++++++++++++++++++++++++++++++++++++++++++++++++
function scores() {
  // clear em out
  $("#timeUp").empty();
  $("#rightWrong").empty();
  $("#correctAnswer").empty();
  $("#gif").empty();

  // display the final totals
  $("#finalOutcome").html("<h2>" + messages.finish + "</h2>");
  $("#correctCounter").html("You lived through: " + correctCounter + " battles.  Good Job!");
  $("#incorrectCounter").html("You died: " + incorrectCounter + " times.  But you 'John Snowed' it and came back to life.");
  $("#unanswered").html("You failed to answer: " + unanswered + " times.<br>");
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
