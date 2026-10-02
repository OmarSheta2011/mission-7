import { questions } from "./questions.js";
// -------------------------
let nameInput;
let startBtn;
let question;
let answer;
let container = document.querySelector(".container");
let name = "";
let result = 0;
// -----------------------------
function generateStartPage() {
  container.innerHTML = `
    <form class="start-form">
      <h1 class="start-title">Welcome to the web dev quiz!</h1>
      <div class="name-input-wrraper">
        <input type="text" id="name-input" />
        <button class="start-btn">Start Quiz</button>
      </div>
    </form>`;
  nameInput = document.querySelector("#name-input");
  startBtn = document.querySelector(".start-btn");
}

function generateResultspage() {
  container.innerHTML = `
    <div class="result-continer">
      <div class="name">Player Name: ${name}</div>
      <div class="result"> Result: ${result} / ${questions.length}</div>
      <div class="percentage">Percentage: ${(result / questions.length) * 100} %</div>
      <button class="play-again-btn">play again</button>
    </div>`;
  name = "";
  result = 0;
  document.querySelector(".play-again-btn").addEventListener("click", start);
}

function generateQuestions(question, choicesHTML) {
  container.innerHTML = `
      <form class="question-wrraper">
          <input readonly type="text" id="question" value="${question.question}" />
          <div class="choices-wrapper">${choicesHTML}</div>
          <button class="submit-answer-btn" >submit answer</button>
      </form>`;
}

function play(questionIndex) {
  let pass = false;
  question = questions[questionIndex];
  let choicesHTML = "";
  question.choices.forEach((choice, index) => {
    choicesHTML += `
        <label class='choice-wrapper' for="${index}">
          <div class="radio-container">
            <input type="radio" name="answer" id="${index}" value="${index}"/>
          </div>
          <label id='label' for="${index}"></label>
        </label>`;
  });

  generateQuestions(question, choicesHTML);

  document.querySelectorAll("#label").forEach((label, index) => {
    label.textContent = question.choices[index];
  });

  document
    .querySelector(".submit-answer-btn")
    .addEventListener("click", (event) => {
      if (!document.querySelector(`input:checked`)) {
        alert("please select a choice.");
        return;
      }
      answer = question.choices[document.querySelector(`input:checked`).value];
      if (answer === question.choices[question.answerIndex]) {
        result++;
        pass = true;
      } else {
        choicesHTML = "";
        question.choices.forEach((choice, index) => {
          choicesHTML += `
        <div class="choice-wrapper ${index === question.answerIndex ? "right-choice" : ""} ${(answer = index ? "selected-choice" : "")}">
          <input type="radio" name="answer" id="${index}" value="${index}"/>
          <label id='label' for="${index}"></label>
        </div>`;
        });
        document.querySelector(".choices-wrapper").innerHTML = choicesHTML;
        document.querySelectorAll("#label").forEach((label, index) => {
          label.textContent = question.choices[index];
        });
        event.target.textContent = "Next ->";
      }

      if (pass === true && questionIndex !== questions.langth)
        play(questionIndex + 1);
      else generateResultspage();
    });
}

function start() {
  generateStartPage();

  startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    name = nameInput.value.trim();
    if (!name) {
      alert("invalid name");
      return;
    }
    play(0);
  });
}

start();
