let timerElement = document.getElementById("timer");
let timer;
let timeLeft = 10; // seconds


const questions = [
    {
        question : "whic is the largest animal in the world",
        answers : [
            {Text : "shark", correct : false},
            {Text : "blue whale", correct : true},
            {Text : "Elephant", correct : false},
            {Text : "Giraffe", correct : false},
        ]
    },

    {
        question : "whic is the smallest country  in the world",
        answers : [
            {Text : "Nepal", correct : false},
            {Text : "Bhutan", correct : true},
            {Text : "Vatica city", correct : false},
            {Text : "India", correct : false},
        ]
    },

    {
        question : "whic is the largest desert in the world",
        answers : [
            {Text : "Asia", correct : false},
            {Text : "Gobi", correct : false},
            {Text : "Sahara", correct : false},
            {Text : "Antarctica", correct : true},
        ]
    },

    {
        question : "whic is the smallest  continent in the world",
        answers : [
            {Text : "Asia", correct : false},
            {Text : "Australia", correct : true},
            {Text : "Arctic", correct : false},
            {Text : "Africa", correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;

// ...................................start
   function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
    progressBar.style.width = progressPercent + '%';
    progressBar.innerText = progressPercent + '%';
}

// ....................................stop


let score = 0;

function StartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuetion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +currentQuetion.question;
    
    // ...........................start
     updateProgressBar();
    //  .................................stop

currentQuetion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});

// ai.........................start
 startTimer();

//  ...........................stop

}


 
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}



function selectAnswer(e){
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

      }else{
        selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'play again';
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        StartQuiz();
    }
})

// ai ......................................................start
function startTimer() {
    timeLeft = 10;
    timerElement.innerHTML = `Time: ${timeLeft}`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            // Auto move to next question
            autoSelect();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}


function autoSelect() {
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// ...........................................................stop


StartQuiz();