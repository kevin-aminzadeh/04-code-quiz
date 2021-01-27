// Question Class Definiton
class Question {
  constructor(question, answerIndex, choices) {
    this.question = question;
    this.answer = answerIndex;
    this.choices = choices;

    // DOM Elements
    this.questionSection = document.querySelector("#question");
    this.questionTextElement = document.querySelector("#question-text");
    this.choicesListElement = document.querySelector("#choices-list");
  }

  isCorrect(choiceIndex) {
    if (choiceIndex == this.answer) {
      return true;
    } else {
      return false;
    }
  }

  // Render Question Text in the DOM
  renderQuestion() {
    this.questionSection.classList.remove("d-none");
    this.questionTextElement.classList.remove("display-1");
    this.questionTextElement.textContent = this.question;
  }

  // Render Answer Choices in the DOM
  renderChoices() {
    // Remove Previous Choice Buttons if They Exist in the Choice List DOM Element
    if (this.choicesListElement.hasChildNodes()) {
      this.choicesListElement
        .querySelectorAll("*")
        .forEach((node) => node.remove());
    }

    // Iteratively Render Each Choice as a Button Element with the Appropriate CSS Classes, Text & Data Attribute in the DOM
    for (const choice in this.choices) {
      const choiceLiElement = document.createElement("li");
      const choiceBtnElement = document.createElement("button");

      // Add Necessary CSS classes to the Elements
      choiceLiElement.classList.add("nav-item", "nav-link");
      choiceBtnElement.classList.add("btn", "btn-primary", "choice-btn");

      // Set Button Text
      choiceBtnElement.textContent = `${parseInt(choice) + 1}. ${
        this.choices[choice]
      }`;

      // Set the choice array index value as a data attribute on the button element
      choiceBtnElement.setAttribute("data-index", parseInt(choice));

      // Add Event Listener To Each Choice Button
      choiceBtnElement.addEventListener("click", (e) => {
        quiz.nextQuestion(e);
      });

      // Add Choice Buttons to the Choices List as List Items
      choiceLiElement.appendChild(choiceBtnElement);
      this.choicesListElement.appendChild(choiceLiElement);

      // Unhide Choices List Element
      this.choicesListElement.classList.remove("d-none");
    }
  }
}

// Quiz Class Definiton
class Quiz {
  constructor() {
    // Questions Array
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

    this.currentQuestion = 0;
    this.maxTime = 75;
    this.score = this.maxTime;
    this.quizOver = false;

    // DOM Element References

    // Intro View Elements
    this.introSection = document.querySelector("#intro");

    // Question View Elements
    this.questionSection = document.querySelector("#question");
    this.scoreElement = document.querySelector("#score-element");
    this.scoreText = document.querySelector("#score");
    this.questionTextElement = document.querySelector("#question-text");
    this.choicesListElement = document.querySelector("#choices-list");

    // Outro View Elements
    this.outroSection = document.querySelector("#outro");
    this.outroText = document.querySelector("#outro-text");
  }

  nextQuestion(e) {
    // Get the Index Data Attribue From Choice Button Element
    let choiceIndex = e.target.dataset.index;

    switch (this.questions[this.currentQuestion].isCorrect(choiceIndex)) {
      case true:
        console.log("Correct!");
        break;

      case false:
        console.log("Incorrect!");
        this.score -= 10;
        break;
    }
    this.currentQuestion++;

    if (this.currentQuestion < this.questions.length) {
      // Render Next Question
      this.questions[this.currentQuestion].renderQuestion();
      this.questions[this.currentQuestion].renderChoices();
    } else {
      this.quizOver = true;
    }
  }

  startQuiz() {
    this.render();

    let timer = setInterval(() => {
      this.score--;
      this.scoreText.textContent = this.score;

      if (this.score <= 0 || this.quizOver === true) {
        clearInterval(timer);
        this.endQuiz();
      }
    }, 1000);
  }

  endQuiz() {
    // Set Quiz State To Ended
    console.log("Quiz Has Ended!");
    this.questionSection.classList.add("d-none");
    this.outroSection.classList.remove("d-none");

    // Display End of Quiz View Elements
    this.outroText.innerHTML = `Your final score is <strong>${this.score}</strong>.`;

    this.questionTextElement.textContent = "All done!";

    // Hide Score Component Elements
    this.scoreElement.classList.add("invisible");

    // Remove Choice Component Elements
    this.choicesListElement
      .querySelectorAll("*")
      .forEach((node) => node.remove());

    // Hide choice-list DIV
    this.choicesListElement.classList.add("d-none");
  }

  render() {
    console.log("Quiz Started!");
    // Hide Intro Content
    this.introSection.classList.add("d-none");

    // Unhide Timer Element
    this.scoreElement.classList.remove("invisible");
    // Render Question Content
    this.questions[this.currentQuestion].renderQuestion();
    this.questions[this.currentQuestion].renderChoices();
  }
}

let quiz = new Quiz();
