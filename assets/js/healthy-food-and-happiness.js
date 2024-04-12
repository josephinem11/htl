'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);

/**
 * quiz
 */

const questions = [
  {
    question: "What was the average happiness rating for eating occasions in the study?",
    answers: [
      { text: "50.00", correct: false },
      { text: "65.24", correct: false },
      { text: "77.59", correct: true },
      { text: "85.00", correct: false }
    ]
  },
  {
    question: "Which food category contributed the most to eating happiness according to the study?",
    answers: [
      { text: "Sweets", correct: false },
      { text: "Meat substitutes", correct: false },
      { text: "Vegetables", correct: true },
      { text: "Pasta", correct: false }
    ]
  },
  {
    question: "How did the happiness rating of snacks compare to other meal types?",
    answers: [
      { text: "Snacks and dinners had comparable happiness ratings, both higher than other meals", correct: true },
      { text: "Snacks had the lowest happiness rating", correct: false },
      { text: " Snacks had a significantly higher happiness rating than all other meal types", correct: false },
      { text: "The happiness rating of snacks was significantly lower than that of breakfast", correct: false }
    ]
  }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("quiz-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("quiz-btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer); // Attach event listener
  });
}


function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true"
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function exitModal() {
  const modal = document.getElementById('quizModal');
  modal.style.display = 'none';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Exit";
  nextButton.style.display = "block";

  // Add event listener to exit modal when nextButton is clicked
  nextButton.addEventListener("click", exitModal);
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  }
  else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  }
  else {
    startQuiz();
  }
});

startQuiz();

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('quizModal');
  const openModalBtn = document.getElementById('openQuizModal');
  const modalContent = document.querySelector('.modal-content');
  const closeButton = document.getElementById('closeQuizModal');
  // const submitAnswerButton = document.getElementById('submitAnswer');


  function resetQuiz() {
    resetState(); // Reset quiz state
    startQuiz(); // Start the quiz
  }

  // Add click event listener to open the modal
  openModalBtn.addEventListener('click', function () {
    showModal();
    resetQuiz();
  });

  // Close the modal when clicking on the close button
  closeButton.addEventListener('click', function () {
    hideModal();
  });

  // Close the modal when clicking outside of it
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      hideModal();
    }
  });

  // Prevent the modal from closing when clicking inside it
  modal.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // Function to show the modal
  function showModal() {
    modal.classList.add('active');
    modalContent.classList.add('active');
  }

  // Function to hide the modal
  function hideModal() {
    modal.classList.remove('active');
    modalContent.classList.remove('active');
  }
});


