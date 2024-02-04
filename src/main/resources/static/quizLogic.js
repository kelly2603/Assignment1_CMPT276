
let questions = [
    {
        question: "How many hearts does an octopus have?",
        answers: [
            {text:"1", correct: false, selected: false},
            {text:"2", correct: false, selected: false},
            {text:"3", correct: true, selected: false},
            {text:"5", correct: false, selected: false},
        ]
    },
    {
        question: "What color is a polar bear's skin?",
        answers: [
            {text:"white", correct: false, selected: false},
            {text:"black", correct: true, selected: false},
            {text:"tan", correct: false, selected: false},
            {text:"blue", correct: false, selected: false},
        ]
    },
    {
        question: "How many teeth/tooth do Narwhals have?",
        answers: [
            {text:"32", correct: false, selected: false},
            {text:"1", correct: true, selected: false},
            {text:"51", correct: false, selected: false},
            {text:"0", correct: false, selected: false},
        ]
    },
    {
        question: "How many bones does a Shark have?",
        answers: [
            {text:"357", correct: false, selected: false},
            {text:"206", correct: false, selected: false},
            {text:"25", correct: false, selected: false},
            {text:"0", correct: true, selected: false},
        ]
    },
    {
        question: "What do Humpback whales use to attack their prey?",
        answers: [
            {text:"bubbles", correct: true, selected: false},
            {text:"fins", correct: false, selected: false},
            {text:"tail", correct: false, selected: false},
            {text:"knife", correct: false, selected: false},
        ]
    },
    {
        question: "What color are Flamingos born with?",
        answers: [
            {text:"red", correct: false, selected: false},
            {text:"pink", correct: false, selected: false},
            {text:"white/grey", correct: true, selected: false},
            {text:"black", correct: false, selected: false},
        ]
    }
];

const correctAnswers = [
    '<br>Correct answers were:<br><br>' +
        `1. How many hearts does an octopus have?<br>
        correct answer: 3<br><br>` +
        `2. What color is a polar bear's skin?<br>
        correct answer: black<br><br>` +
        `3. How many teeth/tooth do Narwhals have?<br>
        correct answer: 1<br><br>` +
        `4. How many bones does a Shark have?<br>
        correct answer: 0<br><br>` +
        `5. What do Humpback whales use to attack their prey?<br>
        correct answer: bubbles<br><br>` +
        `6. What color are Flamingos born with?<br>
        correct answer: white/grey<br><br>`
]


//each interactive elements should have a variable
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answers")
const nextButton = document.getElementById("next-btn")
const prevButton = document.getElementById("prev-btn")
const correctAnswersElement = document.getElementById("correct-answers")

let arrivedQuestionIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    arrivedQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    prevButton.innerHTML = "Previous";
    prevButton.style.display = "none";
    correctAnswersElement.style.display = "none"
    showQuestion();
}

function showQuestion(){
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    if(currentQuestionIndex == 0){
        prevButton.style.display = "none"
    }else{
        prevButton.style.display = "inline-block"
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        //check if the user is currently looking back at answers or answering a new question
        if(currentQuestionIndex >= arrivedQuestionIndex){ //new question
            button.addEventListener("click", selectAnswer);
        }else{ //old question
            if(answer.selected){ // Check if the answer was previously selected
                button.classList.add("incorrect");
            }
            if(answer.correct){
                button.classList.add("correct");
            }
            button.disabled = true;
            if(currentQuestionIndex === questions.length - 1){
                nextButton.innerHTML = "SUBMIT";
            }else{
                nextButton.innerHTML = "Next";
            }
            nextButton.style.display = "inline-block";
        }
    })
}

//reset previous questions and answers
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    arrivedQuestionIndex++;
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    selectedBtn.setAttribute('data-selected','true');

    questions[currentQuestionIndex].answers.forEach(answer => {
        answer.selected = answer.text === selectedBtn.textContent;
    });

    if(isCorrect){
        score++;
        selectedBtn.classList.add("correct");
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })

    nextButton.style.display = "inline-block";
    if(currentQuestionIndex == questions.length - 1){
        nextButton.innerHTML = "SUBMIT";
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Amazing! You scored ${score} out of ${questions.length}!`;
    displayAnswers();
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
    prevButton.style.display = "none";
}

function displayAnswers(){
    correctAnswersElement.innerHTML = correctAnswers;
    correctAnswersElement.style.display = "inline";
}


function handleNextButton(){
    currentQuestionIndex++;
    
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

prevButton.addEventListener("click", ()=>{
    currentQuestionIndex--;
    showQuestion();
})


startQuiz();

