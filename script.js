import { questions } from "./questions.js";
// -------------------------
let nameInput;
let startBtn;
let question;
let container = document.querySelector(".container");
let name = "";
let result = 0;
let pass;
// -----------------------------
function generateStartPage() {
  container.innerHTML = `
    <form class="start-form">
      <h1 class="start-title">Welcome to the web dev quiz!</h1>
      <div class="name-input-wrraper">
        <input type="text" id="name-input" />
        <button class="start-btn">Start</button>
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
      <button class="play-again-btn">Retry</button>
    </div>`;
  name = "";
  result = 0;
  document.querySelector(".play-again-btn").addEventListener("click", start);
}

function generateQuestions(question, choicesHTML, questionIndex) {
  container.innerHTML = `
      <form class="question-wrraper">
      <input readonly type="text" id="question" value="${question.question}" />
      <p>question: ${questionIndex + 1} / ${questions.length}</p>
          <div class="choices-wrapper">${choicesHTML}</div>
          <div class="feedback"><p></p></div>
          <div class="progress-wrraper">
            <div class="progress-bar">
              <span style="width:${(questionIndex / questions.length) * 100}%"></span>
            </div>
            <button class="submit-answer-btn">Submit</button>
          </div>
      </form>`;
}

function play(questionIndex) {
  pass = false;
  question = questions[questionIndex];
  let choicesHTML = "";
  question.choices.forEach((choice, index) => {
    choicesHTML += `
        <label class='choice-wrapper' for="${index}">
          <div class="radio-container">
            <input type="radio" name="answer" id="${index}" value="${index}"/>
            <div class="radio"></div>
          </div>
          <label id='label' for="${index}"></label>
        </label>`;
  });

  generateQuestions(question, choicesHTML, questionIndex);
  document.querySelectorAll("#label").forEach((label, index) => {
    label.textContent = question.choices[index];
  });

  document
    .querySelector(".submit-answer-btn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      if (pass === true) {
        if (questionIndex !== questions.length - 1) play(++questionIndex);
        else generateResultspage();
        return;
      }

      if (pass === false && !document.querySelector(`input:checked`)) {
        alert("please select a choice.");
        return;
      }

      document.querySelector(".progress-bar > span").style.width =
        `${((questionIndex + 1) / questions.length) * 100}%`;

      const selectedIndex = Number(
        document.querySelector(`input:checked`).value,
      );
      const answer = question.choices[selectedIndex];

      if (answer === question.choices[question.answerIndex]) {
        result++;
        document.querySelector(".feedback > p").textContent = "Correct";
        document.querySelector(".feedback > p").classList.add("correct");
        document.querySelector(".feedback > p").classList.remove("incorrect");
      } else {
        document.querySelector(".feedback > p").textContent = "Incorrect";
        document.querySelector(".feedback > p").classList.add("incorrect");
        document.querySelector(".feedback > p").classList.remove("correct");
      }

      choicesHTML = "";
      question.choices.forEach((choice, index) => {
        choicesHTML += `
        <label class="choice-wrapper ${index === question.answerIndex ? "right-choice" : ""} ${selectedIndex === index ? "selected-choice" : ""}">
          <div class="radio-container">
            <input type="radio" name="answer" id="${index}" value="${index}" ${index === question.answerIndex ? 'class="checked"' : ""} />
            <div class="radio"></div>
          </div>
          <label id='label'></label>
        </label>`;
      });
      document.querySelector(".choices-wrapper").innerHTML = choicesHTML;
      document.querySelectorAll("#label").forEach((label, index) => {
        label.textContent = question.choices[index];
      });
      event.target.textContent = "Next";
      pass = true;
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
