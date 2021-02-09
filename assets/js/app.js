/*
--------------------------------------
  Application View Class Declarations
--------------------------------------
*/

// Intro View
class IntroView {
  constructor(app) {
    // Get App Object
    this.app = app;

    // Intro View Component Template
    this.template = `
      <section class="" id="intro">
        <div class="container py-5 text-center">
          <div class="row mt-5">
            <div class="col-10 mx-auto">
              <h1 class="fw-bold display-1" id="intro-heading">
                Coding Quiz Challenge
              </h1>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-10 col-lg-7 mx-auto">
              <p class="lead" id="intro-text">
                Try to answer the following code-related questions within the
                time limit. Keep in mind that incorrect answers will penalize
                your score/time by ten seconds!
              </p>
              <ul class="nav flex-column d-none" id="choices-list"></ul>
            </div>
          </div>

          <div class="d-grid gap-2 col-3 mx-auto mt-4" id="intro-btn-wrapper">
            <button
              class="btn btn-lg btn-warning text-uppercase"
              id="start-btn"
            >
              Start Quiz
            </button>
            <button
              class="btn btn-lg btn-info text-uppercase"
              id="highscores-btn"
            >
              View Highscores
            </button>
          </div>
        </div>
      </section>
    `;
  }

  render() {
    this.app.root.innerHTML = this.template;
  }

  attachEventHandlers() {
    document.querySelector("#start-btn").addEventListener("click", () => {
      this.app.startQuiz();
    });
    document.querySelector("#highscores-btn").addEventListener("click", () => {
      this.app.showLeaderboard();
    });
  }
}

// Question View
class QuestionView {
  constructor(app) {
    this.questionText;
    this.choiceList;
    this.app = app;

    this.template = `
      <!-- Question View -->
      <section id="question">
        <div class="container py-5">
          <div class="row">
            <div class="col ms-auto text-end" id="score-wrapper">

            </div>
          </div>
          <div class="row mt-5">
            <div class="col-8 mx-auto">
              <h1 class="fw-bold" id="question-text"></h1>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-8 mx-auto">
              <ul class="nav flex-column" id="choice-list"></ul>
            </div>
          </div>

          <div class="row invisible" id="feedback-wrapper">
            <div class="col-6 mx-auto">
              <hr />
              <p class="text-start" id="feedback"></p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEventHandlers() {}

  setQuestion(question) {
    while (question) {
      if (this.questionText && this.choiceList) {
        this.questionText.innerHTML = "";
        this.choiceList.innerHTML = "";
      }

      this.questionText.textContent = question.prompt;

      // Iteratively Render Each Choice as a Button Element with the Appropriate CSS Classes, Text & Data Attribute in the DOM
      for (const choice in question.choices) {
        const choiceLiElement = document.createElement("li");
        const choiceBtnElement = document.createElement("button");

        // Add Necessary CSS classes to the Elements
        choiceLiElement.classList.add("nav-item", "nav-link");
        choiceBtnElement.classList.add("btn", "btn-primary", "choice-btn");

        // Set Button Text
        choiceBtnElement.textContent = `${parseInt(choice) + 1}. ${
          question.choices[choice]
        }`;

        // Set the choice array index value as a data attribute on the button element
        choiceBtnElement.setAttribute("data-index", parseInt(choice));

        choiceBtnElement.addEventListener("click", (e) => {
          this.app.nextQuestion(e.target.dataset.index);
        });

        // Add Choice Buttons to the Choices List as List Items
        choiceLiElement.appendChild(choiceBtnElement);
        this.choiceList.appendChild(choiceLiElement);
      }
      break;
    }
  }

  render() {
    this.app.root.innerHTML = this.template;
    document.querySelector("#feedback-wrapper").classList.add("invisible");
    this.questionText = document.querySelector("#question-text");
    this.choiceList = document.querySelector("#choice-list");
  }

  renderFeedback(isCorrect) {
    document.querySelector("#feedback-wrapper").classList.remove("invisible");
    const feedbackText = document.querySelector("#feedback");
    if (isCorrect) {
      feedbackText.classList.remove("text-danger");
      feedbackText.classList.add("text-success");
      feedbackText.textContent = "Correct!";
    } else {
      feedbackText.classList.add("text-danger");
      feedbackText.classList.remove("text-success");
      feedbackText.textContent = "Incorrect!";
    }
  }
}

// Outro View
class OutroView {
  constructor(app) {
    this.app = app;
    this.template = `
      <!-- Outro View  -->
      <section id="outro">
        <div class="container">
          <div class="row mt-5">
            <div class="col-8 mx-auto">
              <h1 class="fw-bold" id="outro-heading">All done!</h1>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-8 mx-auto">
              <p class="lead" id="outro-text">Your final score is <strong><span id="final-score"></span></strong>.</p>
            </div>
          </div>

          <div class="row">
            <div class="col-8 mx-auto">
              <form class="row row-cols-lg-auto mt-3 align-items-center g-2" id="highscore-form">

                <div class="col-auto">
                  <label class="visually-hidden" for="playerNameInput"
                    >Name</label
                  >
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      id="playerNameInput"
                      placeholder="Enter Your Initials"
                    />
                  </div>
                </div>

                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn btn-warning text-uppercase"
                    id="submit-btn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>    
    `;
  }

  render(finalScore) {
    this.app.root.innerHTML = this.template;
    document.querySelector("#final-score").textContent = finalScore;
  }

  attachEventHandlers() {
    const highscoreForm = document.querySelector("#highscore-form");
    highscoreForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.app.submitHighScore(e.target[0].value);
    });
  }
}

class LeaderBoardView {
  constructor(app) {
    this.app = app;
    this.template = `
      <!-- Leaderboard View -->
      <section id="leaderboard">
        <div class="container text-center">
          <div class="row mt-5">
            <div class="col-8 mx-auto">
              <h1 class="fw-bold display-1" id="leaderboard-heading">
                Leaderboard
              </h1>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-8 mx-auto">
              <ul class="nav flex-column" id="leaderboard-list">

              </ul>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-8 mx-auto">
              <button
                class="btn btn-lg btn-info text-uppercase"
                id="back-btn"
              >
                Go Back
              </button>
              <button
                class="btn btn-lg btn-warning text-uppercase"
                id="clear-btn"
              >
                Clear Highscores
              </button>
            </div>
          </div>
        </div>
      </section>      
    `;
  }

  render(scores) {
    this.app.root.innerHTML = this.template;
    const leaderboardList = document.querySelector("#leaderboard-list");

    if (scores) {
      for (const score of scores) {
        const leaderboardItem = document.createElement("li");
        leaderboardItem.classList.add("nav-item");
        leaderboardItem.innerHTML = `<h4>${score.name} - ${score.score}</h4>`;
        leaderboardList.appendChild(leaderboardItem);
      }
    } else {
      leaderboardList.innerHTML = `<p>There are no highscores to display.</p>`;
    }
  }

  attachEventHandlers() {
    document.querySelector("#back-btn").addEventListener("click", () => {
      this.app.onInit();
    });

    document.querySelector("#clear-btn").addEventListener("click", () => {
      this.app.clearHighScores();
    });
  }
}

class TimerView {
  constructor(app) {
    this.app = app;
    this.scoreText;
    this.template = `
      <div id="score-element">
        <h3 class="text-uppercase text-light fw-light">
          Score:
          <span class="fw-bold h2 text-warning" id="score"></span>
        </h3>
      </div>
    `;
  }

  render() {
    this.app.root.querySelector("#score-wrapper").innerHTML = this.template;
    this.scoreText = document.querySelector("#score");
    this.scoreText.textContent = this.app.score;
  }

  update(scoreValue) {
    this.scoreText.textContent = scoreValue;
  }
}

/*
--------------------------------------
  Application Model Class Declarations
--------------------------------------
*/

// Question Class Definiton
class Question {
  constructor(prompt, answerIndex, choices) {
    this.prompt = prompt;
    this.answerIndex = answerIndex;
    this.choices = choices;

    // DOM Elements
    this.questionSection = document.querySelector("#question");
    this.questionTextElement = document.querySelector("#question-text");
    this.choicesListElement = document.querySelector("#choice-list");
  }

  isCorrect(choiceIndex) {
    return parseInt(choiceIndex) === this.answerIndex;
  }
}

// Quiz Model Class Definition
class Quiz {
  constructor(app) {
    // Question Dataset
    this.questions = [
      new Question("Commonly used data types DO NOT include ____.", 2, [
        "strings",
        "booleans",
        "alerts",
        "numbers",
      ]),
      new Question(
        "The condition in an if / else statement is enclosed within ____.",
        2,
        ["quotes", "curly brackets", "parentheses", "square brackets"]
      ),
      new Question("Arrays in Javascript can be used to store ____.", 3, [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above",
      ]),
      new Question(
        "String values must be enclosed within ____ when being assigned to variables.",
        2,
        ["commas", "curly brackets", "quotes", "parentheses"]
      ),
      new Question(
        "A very useful tool used during development and debugging for printing content to the debugger is:",
        3,
        ["JavaScript", "terminal/bash", "for loops", "console.log()"]
      ),
    ];

    this.app = app;
    this.currentQuestionIndex = 0;
  }

  onInit() {
    this.currentQuestionIndex = 0;
    return this.getCurrentQuestion();
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  getNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      return this.getCurrentQuestion();
    } else {
      this.app.quizOver = true;
    }
  }

  checkAnswer(choiceIndex) {
    if (choiceIndex) {
      return this.questions[this.currentQuestionIndex].isCorrect(choiceIndex);
    }
  }
}

class LeaderboardModel {
  constructor() {}

  getScores() {
    const scores = JSON.parse(localStorage.getItem("highscores"));
    return scores;
  }

  setScore(name, score) {
    let scores = [];
    const playerScore = {
      name: name,
      score: score,
    };

    if (JSON.parse(localStorage.getItem("highscores"))) {
      scores = JSON.parse(localStorage.getItem("highscores"));
      scores.push(playerScore);
    } else {
      scores.push(playerScore);
    }
    localStorage.setItem("highscores", JSON.stringify(scores));
  }

  clearScores() {
    localStorage.clear();
  }
}

/*
--------------------------------------
  Application Controller Class Declarations
--------------------------------------
*/

// Quiz Controller Class Definition
class App {
  constructor() {
    this.quizOver = false;
    this.timeLimit = 75;
    this.score;

    // Get App Root Element From DOM
    this.root = document.querySelector(".app-root");

    // Instantiate View Classes
    this.introView = new IntroView(this);
    this.questionView = new QuestionView(this);
    this.timerView = new TimerView(this);
    this.OutroView = new OutroView(this);
    this.leaderBoardView = new LeaderBoardView(this);

    this.quiz = new Quiz(this);
    this.leaderboard = new LeaderboardModel(this);
  }

  // Render Intro View on Init
  onInit() {
    this.score = this.timeLimit;
    this.quizOver = false;
    this.introView.render();
    this.introView.attachEventHandlers();
  }

  startQuiz() {
    this.questionView.render();
    this.questionView.setQuestion(this.quiz.onInit());
    this.questionView.attachEventHandlers();
    this.timerView.render();
    let timer = setInterval(() => {
      this.score--;
      this.timerView.update(this.score);

      if (this.quizOver || this.score <= 0) {
        clearInterval(timer);
        this.endQuiz();
      }
    }, 1000);
  }

  nextQuestion(choiceIndex) {
    if (!this.quiz.checkAnswer(choiceIndex)) {
      this.score -= 10;
      this.timerView.update(this.score);
    }
    this.questionView.renderFeedback(this.quiz.checkAnswer(choiceIndex));
    this.questionView.setQuestion(this.quiz.getNextQuestion());
  }

  endQuiz() {
    this.OutroView.render(this.score);
    this.OutroView.attachEventHandlers();
  }

  submitHighScore(playerName) {
    this.leaderboard.setScore(playerName, this.score);
    this.showLeaderboard(this.leaderboard.getScores());
  }

  showLeaderboard(scores) {
    this.leaderBoardView.render(this.leaderboard.getScores());
    this.leaderBoardView.attachEventHandlers();
  }

  clearHighScores() {
    this.leaderboard.clearScores();
    this.leaderBoardView.render();
    this.leaderBoardView.attachEventHandlers();
  }
}

let app = new App();
app.onInit();
