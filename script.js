'use strict';

const quiz = [
  {
    q: 'Auf wieviele Inseln verteilt sich Indonesien ?',
    options: ['17.000', '7.000', '23.000', '4.000'],
    answer: 0,
  },
  {
    q: 'Die giftigste Schlange der Welt ist die/der ...',
    options: ['Braunschlange', 'Python', 'Inlandtaipan', 'Seeschlange'],
    answer: 2,
  },
  {
    q: 'Wie oft gewann Deutschland die Fußball-Weltweisterschaft?',
    options: ['4x', '5x', '6x', '7x'],
    answer: 0,
  },
  {
    q: 'Lieber 0,01€ 30 Tage lang verdoppeln oder 3 Mio € direkt auf die Hand?',
    options: ['Verdoppeln', 'Direkt 3 Mio €'],
    answer: 0,
  },
  {
    q: 'Wie schnell fliegt ein Flugzeug durchschnittlich?',
    options: ['600 km/h', '900 km/h', '1400 km/h', '1800 km/h'],
    answer: 1,
  },
  {
    q: 'Wieviel mal ist Deutschland größer als Holland?',
    options: ['11 Mal', '9 Mal', '14 Mal', '16 Mal'],
    answer: 1,
  },
  {
    q: 'Welches dieser Länder hat die meisten Einwohner?',
    options: ['Australien', 'Holland', 'Belgien', 'Polen'],
    answer: 3,
  },
  {
    q: 'Wieviele Weihnachtsbäume werden in Deutschland jährlich verkauft?',
    options: ['30 Millionen', '10 Millionen', 'So viele wie es Haushalte gibt'],
    answer: 0,
  },
  {
    q: 'Welcher Ozean liegt zwischen Europa und Amerika?',
    options: [
      'Indischer Ozean',
      'Pazifischer Ozean',
      'Atlantischer Ozean',
      'Arktischer Ozean',
    ],
    answer: 2,
  },
  {
    q: 'Für welchen Film bekam Leonardo DiCaprio einen Oscar?',
    options: [
      'The Wolf of Wall Street',
      'Titanic',
      'The Revenant',
      'Django Unchained',
    ],
    answer: 2,
  },
];

const noq = document.querySelector('.number-of-questions');
const homebox = document.querySelector('.homebox');
const quizbox = document.querySelector('.quizbox');
const question = document.querySelector('.question');
const numberquestion = document.querySelector('.numberquestion');
const btnNext = document.querySelector('.btn-next');
const viewResult = document.querySelector('.viewResult');
const questionContainer = document.querySelector('.question-container');
const resultBox = document.querySelector('.resultBox');
const answer = document.querySelectorAll('.answer');
const optionContainer = document.querySelector('.optionContainer');
const myAnswers = document.querySelector('.my-answers');
const btnHighScore = document.querySelector('.btnHighScore');

let questionCounter = -1;
const availablequestions = [];
const availableOptions = [];
const totalQuestion = quiz.length;
let currentQuestion;
let index = -1;
let score = 0;
let scoreWrong = 0;
let attempt = 0;

noq.innerText = totalQuestion;

quiz.forEach((q) => {
  availablequestions.push(q);
});
console.log(availablequestions);

function startQuiz() {
  homebox.classList.add('hide');
  quizbox.classList.remove('hide');
  goBackHomeBtn.classList.add('hide');
  getNewQuestion();
  myanswers();
}

function getNewQuestion() {
  questionCounter++;
  numberquestion.innerText =
    questionCounter + 1 + ' of ' + totalQuestion + ' Questions';
  index++;
  currentQuestion = availablequestions[index];
  question.innerText = currentQuestion.q;

  const optionLength = currentQuestion.options.length;

  for (let i = 0; i < optionLength; i++) {
    availableOptions.push(i);
  }
  console.log(optionLength);
  console.log(availableOptions);

  optionContainer.innerHTML = '';
  for (let i = 0; i < optionLength; i++) {
    const option = document.createElement('div');
    option.innerHTML = currentQuestion.options[i];
    option.id = availableOptions[i];

    optionContainer.appendChild(option);
    option.classList.add('option');
    option.setAttribute('onclick', 'getResult(this)');
  }

  if (index === quiz.length - 1) {
    btnNext.classList.add('hide');
    viewResult.classList.remove('hide');
  }
}

function removeQuestionContainer() {
  questionContainer.classList.add('hide');
  viewResult.classList.add('hide');
  resultBox.classList.remove('hide');
  btnHighScore.classList.remove('hide');
  saveScore.classList.remove('hide');
}

function getResult(element) {
  let id = parseInt(element.id);

  if (id === currentQuestion.answer) {
    element.classList.add('correct');
    score++;
    updateAnswerIndicator('correct');

    console.log(score);
  } else {
    element.classList.add('wrong');
    scoreWrong++;
    updateAnswerIndicator('wrong');

    const optionLen = optionContainer.children.length;

    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add('correct');
      }
    }
  }
  unclickableOptions();
}

function unclickableOptions() {
  const optionLen = optionContainer.children.length;

  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add('already-answered');
  }
}

function myanswers() {
  myAnswers.innerHTML = '';
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement('span');
    myAnswers.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType) {
  myAnswers.children[questionCounter].classList.add(markType);
}

const totalCorrect = document.querySelector('.total-correct');
const totalWrong = document.querySelector('.total-wrong');
const totalScore = document.querySelector('.total-score');
const totalAttempt = document.querySelector('.total-attempt');
const percentage = document.querySelector('.percentage');
const totalQuestions = document.querySelector('.total-question');
const goBackHomeBtn = document.querySelector('.goBackHome');

function res() {
  totalQuestions.innerHTML = quiz.length;
  totalWrong.innerHTML = scoreWrong;
  totalCorrect.innerHTML = score;
  totalScore.innerHTML = score;
  percentage.innerHTML = (score / totalQuestion) * 100 + ' %';
  const countAttempt = score + scoreWrong;

  if (countAttempt < totalQuestion) {
    totalAttempt.innerHTML = totalQuestion - countAttempt;
  } else {
    totalAttempt.innerHTML = 0;
  }
  goBackHomeBtn.classList.remove('hide');
}

function goBackHome() {
  homebox.classList.remove('hide');
  resultBox.classList.add('hide');
  myAnswers.classList.add('hide');
  quizbox.classList.add('hide');
  questionContainer.classList.remove('hide');
  myAnswers.classList.remove('hide');
  btnNext.classList.remove('hide');
  highScoresContainer.classList.add('hide');
  saveScore.classList.add('hide');
  noq.innerText = totalQuestion;
  resetQuiz();
}

function resetQuiz() {
  index = -1;
  score = 0;
  scoreWrong = 0;
  attempt = 0;
  questionCounter = -1;
}

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const maxHighScores = 10;
const username = document.getElementById('username');
const save = document.querySelector('.save-btn');
const highScoresList = document.querySelector('.highScoresList');
const highScoresContainer = document.querySelector('.highScoresContainer');
const saveScore = document.querySelector('.saveScore');

username.addEventListener('keyup', () => {
  save.disabled = !username.value; //damit man nicht save score drücken kann wenn kein inhalt da ist
});

function saveHighScore(e) {
  e.preventDefault();

  const scoreHighScore = {
    score: score,
    name: username.value,
  };
  highScores.push(scoreHighScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(10);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  console.log(highScores);
  username.value = '';
  window.location.reload();
}

highScoresList.innerHTML = highScores
  .map((scoreHighScore) => {
    return `<li class="li">
      ${scoreHighScore.name}    ${scoreHighScore.score} Points
    </li>`;
  })
  .join('');

function viewHighScores() {
  highScoresContainer.classList.remove('hide');
  quizbox.classList.add('hide');
  goBackHomeBtn.classList.remove('hide');
  homebox.classList.add('hide');
}

window.onload = function () {
  btnHighScore.classList.remove('hide');
};
