# JavaScript Code Quiz

<p align="center">
  <img src="./assets/img/screenshot.gif" alt="JavaScript code quiz game screenshot">
</p>

> <h2 align="center"><a  href="https://kevin-aminzadeh.github.io/javascript-code-quiz/">Live Demo</a></h2>

## Table of Contents

- [Overview](#overview)
- [Acceptance Criteria](#acceptance-criteria)
- [Approach](#approach)
- [Technologies Used](#technologies-used)
- [License](#license)

## Overview

This application is a multiple-choice code quiz built with Javascript. It features a simple penalty system for incorrect answers, responsive UI as well as a locally stored leader board populated with the user's saved high scores.

The purpose behind the project is to demonstrate an understanding of DOM manipulation, event handling and local data storage techniques.

## Acceptance Criteria

The following criteria provided in the project brief were used in building the project:

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

## Approach

### Application Architecture

In an effort to build a well-organized system and aid maintainability, the application was broken down into a number of smaller ES6 Classes using a pseudo-MVC design approach, with each class addressing a separate concern.

The term "pseudo-MVC" is used here as it's the author's belief that the application's current implementation does not fully align with a true MVC design. The application components in their current form are still somewhat entangled in one another and smaller, more concise components/classes can be derived from the current implementation classes.

### User Interface

In order to facilitate rapid prototyping and development, the Bootstrap CSS framework was used to build the project's various UI Components. The use of Bootstrap also allowed for the quick implementation of responsive behaviors and consist design across the project.

### Storage

To address the persistent leader board feature outlined in the project's acceptance criteria, the user's score and initials are pushed to a `highscores` object array which is then stringified and saved in `LocalStroage`. This stringified object is then retrieved and used to render the quiz leader board.

## Technologies Used

The following technologies were used to build this project:

- [Bootstrap v5.0](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

## License

This project is licensed under the terms of the MIT license.
