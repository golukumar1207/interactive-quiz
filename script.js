/**
 * Interactive Quiz Engine
 * Lecture 10 Project
 * Author: Golu Kumar (JECRC University)
 */

const questions = [
  {
    question: "Which HTML5 element is used to specify a footer for a document or section?",
    options: ["<bottom>", "<footer>", "<section-end>", "<nav>"],
    answer: 1,
    explanation: "The <footer> element represents a footer for its nearest sectioning content or sectioning root element."
  },
  {
    question: "In CSS Flexbox, which property defines how flex items align along the main axis?",
    options: ["align-items", "align-content", "justify-content", "flex-direction"],
    answer: 2,
    explanation: "'justify-content' aligns items along the main axis, while 'align-items' handles the cross axis."
  },
  {
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    options: ["String", "Number", "Boolean", "Object"],
    answer: 3,
    explanation: "Objects (including Arrays and Functions) are reference types in JavaScript, not primitives."
  },
  {
    question: "What does the 'typeof NaN' evaluate to in JavaScript?",
    options: ["'undefined'", "'number'", "'NaN'", "'null'"],
    answer: 1,
    explanation: "In JavaScript, NaN (Not-a-Number) is technically of type 'number'."
  },
  {
    question: "Which Git command is used to record changes to the local repository?",
    options: ["git push", "git commit", "git pull", "git merge"],
    answer: 1,
    explanation: "'git commit' saves your staged changes to the local repository history."
  }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const scoreLive = document.getElementById("score-live");
const progressBarFill = document.getElementById("progress-bar-fill");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

startBtn.addEventListener("click", () => {
  startScreen.hidden = true;
  quizScreen.hidden = false;
  currentQuestion = 0;
  score = 0;
  loadQuestion();
});

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreLive.textContent = `Score: ${score}`;
  progressBarFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  feedback.hidden = true;
  nextBtn.hidden = true;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
    btn.addEventListener("click", () => selectOption(idx));
    optionsContainer.appendChild(btn);
  });
}

function selectOption(selectedIdx) {
  const q = questions[currentQuestion];
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  buttons.forEach(btn => (btn.disabled = true));

  if (selectedIdx === q.answer) {
    score += 1;
    buttons[selectedIdx].classList.add("correct");
    feedback.textContent = `✓ Correct! ${q.explanation}`;
    feedback.style.color = "#38b000";
  } else {
    buttons[selectedIdx].classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    feedback.textContent = `✗ Incorrect. ${q.explanation}`;
    feedback.style.color = "#ff6b6b";
  }

  scoreLive.textContent = `Score: ${score}`;
  feedback.hidden = false;
  nextBtn.hidden = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion += 1;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  finalScore.textContent = `${score} / ${questions.length}`;

  const pct = (score / questions.length) * 100;
  if (pct === 100) {
    resultMessage.textContent = "Outstanding! Perfect score on Computer Science & Web Dev!";
  } else if (pct >= 60) {
    resultMessage.textContent = "Great job! You have a solid grasp of fundamental concepts.";
  } else {
    resultMessage.textContent = "Keep practicing! Review the concepts and try again.";
  }
}

restartBtn.addEventListener("click", () => {
  resultScreen.hidden = true;
  startScreen.hidden = false;
});
