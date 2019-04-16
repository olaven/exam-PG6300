# Exam - Web Development and API Design [![Build Status](https://travis-ci.com/olaven/exam-PG6300.svg?token=zTzVh5wrqM89cpyf9qVd&branch=master)](https://travis-ci.com/olaven/exam-PG6300)

## About the application

## Before delivering: 
- [ ] assert test coverage 
- [ ] test alle scritps
- [ ] assert that no part of exercise is forgotten
- [ ] test every feature manually 
- [ ] test the app without internet connection
- [ ] deploy most recent version to heroku with "git push heroku master" 


## Extras 
* I have added styling with [Reactstrap](https://reactstrap.github.io). This required adding css-loaders to `webpack.config.js`. 
* To ensure consistent code-style, I have used [ESlint](https://eslint.org). This is also configured as an extra script.
* Although not required, I have set up Travis to automatically run tests
* The app is deployed to [Heroku](https://exam-pg6300.herokuapp.com)

## General notes
* notes about copying from course repo 
  * Some files are completely copied. Others are copied, and later modified. This is differentiated in the comment. 
  * JSON-format does not support comments. `package.json`is copied from [this file](https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/package.json)
* dependencies not used in course
  * [eslint](https://yarnpkg.com/en/package/eslint) and related plugins. This is to create lint-config appropriate for the project (like support for React)
* on general style 
  * I could have written some functional components. In particular, the components not having state. However, I stuck with class based components for the sake of consistency. 
