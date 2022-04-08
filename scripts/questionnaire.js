// function to calculate the result of the survey
function tabulateAnswers() {
  // initialize variables for each choice's score
  // If you add more choices and outcomes, you must add another variable here.
  var c1score = 0;
  var c2score = 0;
  var c3score = 0;
  var c4score = 0;
  // get a list of the radio inputs on the page
  var choices = document.getElementsByTagName("input");
  // loop through all the radio inputs
  for (i = 0; i < choices.length; i++) {
    // if the radio is checked..
    if (choices[i].checked) {
      // add 1 to that choice's score
      if (choices[i].value == "c1") {
        c1score = c1score + 1;
      }
      if (choices[i].value == "c2") {
        c2score = c2score + 1;
      }
      if (choices[i].value == "c3") {
        c3score = c3score + 1;
      }
      if (choices[i].value == "c4") {
        c4score = c4score + 1;
      }
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }

  // Find out which choice got the highest score.
  // If you add more choices and outcomes, you must add the variable here.
  var maxscore = Math.max(c1score, c2score, c3score, c4score);

  // Display answer corresponding to that choice
  var answerbox = document.getElementById("answer");
  if (c1score == maxscore) {
    // If user chooses the first choice the most, this outcome will be displayed.
    answerbox.innerHTML = "Answer A athletes.";
  }
  if (c2score == maxscore) {
    // If user chooses the second choice the most, this outcome will be displayed.
    answerbox.innerHTML = "Answer B athletes.";
  }
  if (c3score == maxscore) {
    // If user chooses the third choice the most, this outcome will be displayed.
    answerbox.innerHTML = "Answer C athletes.";
  }
  if (c4score == maxscore) {
    // If user chooses the fourth choice the most, this outcome will be displayed.
    test();
  }
}
// If you add more choices, you must add another response below.

// program the reset button
function resetAnswer() {
  var answerbox = document.getElementById("answer");
  answerbox.innerHTML = "Your result will show up here!";
}

function test() {
  jQuery("#answer").html(
    "<a href='https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjLtNe2xIP3AhVwJzQIHX2uADsQ3yx6BAgDEAI&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AOvVaw0aHtehaphMhOCAkCydRLZU'>" +
      "test" +
      "</a>"
  );
}

$(document).ready(setup);
