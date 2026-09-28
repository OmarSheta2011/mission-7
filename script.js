import { questions } from "./questions.js";
// -------------------------
let nameInput;
let startBtn;
let question;
let answer;
let resultElem;
let radioSelectors;
let container = document.querySelector(".container");
// -----------------------------
function generateStartPage() {
  container.innerHTML = `
    <form>
      <p class="start-title">Welcome to the web dev quiz!</p>
      <input type="text" id="name-input" />
      <button class="start-btn">Start Quiz</button>
    </form>`;
  nameInput = document.querySelector("#name-input");
  startBtn = document.querySelector(".start-btn");
}

function generateResultspage(result) {
  container.innerHTML = `
    <div class="result-continer">
      <div class="result-element"> Result: ${result}</div>
      <button>play again</button>
    </div>`;
  resultElem = document.querySelector(".result-element");
}

function generateQuestion(index) {
  question = questions[index];
  let choicesHTML = "";
  question.choices.forEach((choice) => {
    choicesHTML += `
        <div>
          <input type="radio" name="answer" id="${choice}" value="${choice}"/>
          <label for="${choice}"><span>${choice}</span></label>
        </div>`;
  });
  console.log(choicesHTML);
  container.innerHTML = `
        <input readonly type="text" id="question" value="${question.question}" />
        ${choicesHTML}
        <button class="submit-answer-btn" data-question-index="${index}">submit answer</button>`;

  document.querySelector(".submit-answer-btn").addEventListener("click", () => {
    answer = document.querySelector(`input:checked`).value;
    console.log(question);
    console.log(answer.replaceAll("\n", ""));
    console.log(question.choices[question.answerIndex]);
    console.log(
      answer.replaceAll("\n", "") === question.choices[question.answerIndex],
    );
  });
}

function start() {
  generateStartPage();
  console.log(startBtn);

  startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
      alert("invalid name");
      return;
    }
    play();
  });
}

function play() {
  generateQuestion(0);
}

start();
