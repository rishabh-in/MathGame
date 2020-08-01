var playing = false;
var score;
var myCounter;
var timeRemaining;
var correctAnswer;
var correctPosition;

var startReset = document.querySelector(".startReset");
startReset.addEventListener("click", function() {
    if(playing == true) {
        location.reload();
    }
    else {
       // set playing = true
        playing = true;

        // set score to zero
        score = 0;
        document.querySelector("#scoreValue").innerHTML = score;

        // Change start -> Reset
        document.querySelector(".startReset").innerHTML = "Reset";

        // Display the clock
        document.querySelector(".timeCounter").style.display = "block";
        timeRemaining = 60;
        document.querySelector("#timeRemaining").innerHTML = timeRemaining;

        // Hide the game over box
        document.querySelector(".gameover").style.display = "none";

        // Start countdown
        startCountDown();

        // Generate question and multiple answers
        genereteQuestion();

        // If answers is clicked
        answerClicked();
        
        
});


// Functions

function startCountDown() {
    timeRemaining = 60;
    myCounter = setInterval(function() {

        timeRemaining = timeRemaining-1;
        document.querySelector("#timeRemaining").innerHTML = timeRemaining;

        // If the player run out of time which means the game has ended..
        if(timeRemaining == 0) {
            stopCounter();
        }
    }, 1000);
}
function stopCounter() {
    clearInterval(myCounter);
    document.querySelector(".gameover").style.display = "block";
    document.querySelector("#score").innerHTML = score;
    document.querySelector(".timeCounter").style.display = "none";
    document.querySelector(".correct").style.display = "none";
    document.querySelector(".wrong").style.display = "none";
    playing = false;
    document.querySelector(".startReset").innerHTML = "Start Game";
    
}
function genereteQuestion() {

    x = Math.round(Math.random()*14) + 1;
    y = Math.round(Math.random()*9) + 1;
    correctAnswer = x*y;
    document.querySelector(".question").innerHTML = x + ' x ' + y;

    // Putting the correct answer in of the boxes
    correctPosition = 1 + Math.round(Math.random()*3);
    document.querySelector("#box"+correctPosition).innerHTML = correctAnswer;

    // Putting wrong answers
    for (i=1; i<5; i++) {
        wrongAnswer = 1 + (Math.round(Math.random()*12) *  (Math.round(Math.random()*10)))
        if(wrongAnswer == correctAnswer) {
            wrongAnswer = 1 + (Math.round(Math.random()*12) *  (Math.round(Math.random()*10)))
        }
        if(i != correctPosition) {
            document.querySelector("#box"+i).innerHTML = wrongAnswer;
        }
    }
}
function answerClicked() {
    for(i = 1; i < 5; i++) {
        value = document.querySelector("#box" + i);
        value.addEventListener("click", function() {
            if(playing == true) {
                if(this.innerHTML == correctAnswer) {
                    score += 1;
                    document.querySelector("#scoreValue").innerHTML = score;
                    document.querySelector(".wrong").style.display = "none";
                    document.querySelector(".correct").style.display = "block";
                    setTimeout(function(){
                        document.querySelector(".correct").style.display = "none";
                    }, 1000)
                    genereteQuestion();

                }
                else {
                    document.querySelector(".wrong").style.display = "block";
                    document.querySelector(".correct").style.display = "none";
                    setTimeout(function(){
                        document.querySelector(".wrong").style.display = "none";
                    }, 1000)
                    genereteQuestion();
                }
            }
        })
    }
}

