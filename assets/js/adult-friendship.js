'use strict';

/**
 * Function to extract URL parameters
 */
//  const getUrlParams = function (url) {
//   const params = {};
//   const searchParams = new URLSearchParams(new URL(url).search);
//   for (const [key, value] of searchParams) {
//     params[key] = value;
//   }
//   return params;
// }


// Capture 'SESSION_ID' from URL
// const params = getUrlParams(window.location.href);
// const session_id = params['SESSION_ID'];

// function generateSessionId(length) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   let sessionId = '';
//   for (let i = 0; i < length; i++) {
//     sessionId += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return sessionId;
// }

// // Example usage:
// const session_id = generateSessionId(10); // Generates a session ID with length 10


// // Define a sample URL with the SESSION_ID parameter
// const sampleUrl = 'https://example.com?PROLIFIC_PID=123&STUDY_ID=456&SESSION_ID=789';

// // Define the getUrlParams function
// const getUrlParams = function (url) {
//   const params = {};
//   const searchParams = new URLSearchParams(new URL(url).search);
//   for (const [key, value] of searchParams) {
//     params[key] = value;
//   }
//   return params;
// };

// // Capture parameters from the sample URL
// const params = getUrlParams(sampleUrl);
// const session_id = params['SESSION_ID'];

const sampleUrls = [
  'https://example.com?PROLIFIC_PID=123&STUDY_ID=456&SESSION_ID=789',
  'https://example.com?PROLIFIC_PID=456&STUDY_ID=789&SESSION_ID=123',
  'https://example.com?PROLIFIC_PID=789&STUDY_ID=123&SESSION_ID=456',
  'https://example.com?PROLIFIC_PID=abc&STUDY_ID=def&SESSION_ID=ghi',
  'https://example.com?PROLIFIC_PID=def&STUDY_ID=ghi&SESSION_ID=abc',
];

// Define the getUrlParams function
const getUrlParams = function (url) {
  const params = {};
  const searchParams = new URLSearchParams(new URL(url).search);
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
};

// Iterate over each sample URL and capture the session ID
sampleUrls.forEach((url, index) => {
  const params = getUrlParams(url);
  const session_id = params['SESSION_ID'];
  
});


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
    question: "What percentage of US adults are affected by depression each year, underscoring the potential mitigating role of friendships?",
    answers: [
      { text: "5%", correct: false },
      { text: "8%", correct: true },
      { text: "15%", correct: false },
      { text: "20%", correct: false }
    ]
  },
  {
    question: "Which friendship practice is linked to the highest increase in wellbeing, according to research?",
    answers: [
      { text: "Maintaining a gratitude journal", correct: false },
      { text: "Writing a gratitude letter", correct: true },
      { text: "Digital socializing", correct: false },
      { text: "Public expressions of gratitude", correct: false }
    ]
  },
  {
    question: "Which of the following gaps is highlighted in the literature on adult friendship and wellbeing?",
    answers: [
      { text: "An overemphasis on financial aspects of friendships", correct: false },
      { text: "A lack of focus on middle-aged adults", correct: false },
      { text: "Sparse data on specific wellbeing components, with a notable focus on younger adult populations", correct: true },
      { text: "An absence of studies on the role of pets in enhancing adult friendships", correct: false }
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

  // Make a GET request to the end endpoint
  fetch(`https://hammerhead-app-5ehuo.ondigitalocean.app/app/end/?session_id=${session_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function calculateScore() {
  // Construct the URL with the appropriate query parameters
  const scoreUrl = `https://hammerhead-app-5ehuo.ondigitalocean.app/app/score/?session_id=${session_id}&total=${questions.length}&correct=${score}`;

  // Send a GET request to the API endpoint
  fetch(scoreUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
}


function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Exit";
  nextButton.style.display = "block";

  // Add event listener to exit modal when nextButton is clicked
  nextButton.addEventListener("click", exitModal);

  // Trigger API call for score calculation
  calculateScore();
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

  // let quizStartTime;
  // let modalExitTime;
  // const timeElapsedEvent = new Event('timeElapsed');

  function resetQuiz() {
    resetState(); // Reset quiz state
    startQuiz(); // Start the quiz
  }

  // // Add click event listener to open the modal
  // openModalBtn.addEventListener('click', function () {
  //   showModal();
  //   resetQuiz();
  //   quizStartTime = new Date(); 
  //   // trigger event
  //   openModalBtn.dispatchEvent(timeElapsedEvent);
  // });

  // Add click event listener to open the modal
  openModalBtn.addEventListener('click', function () {
    // Send GET request to start the quiz
    fetch(`https://hammerhead-app-5ehuo.ondigitalocean.app/app/start/?session_id=${session_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    showModal();
    resetQuiz();
  });


  // Close the modal when clicking on the close button
  closeButton.addEventListener('click', function () {
    hideModal();
    // Make a GET request to the endpoint
    fetch(`https://hammerhead-app-5ehuo.ondigitalocean.app/app/end/?session_id=${session_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
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


