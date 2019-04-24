# Exam - Web Development and API Design [![Build Status](https://travis-ci.com/olaven/exam-PG6300.svg?token=zTzVh5wrqM89cpyf9qVd&branch=master)](https://travis-ci.com/olaven/exam-PG6300)

## About the application

## Before delivering: 
- [ ] explicitly state that I am aming for A and every extra effort I have done. 
- [ ] report coverage in readme 
- [ ] assert test coverage 
- [ ] test alle scritps
- [ ] assert that no part of exercise is forgotten
- [ ] test every feature manually 
- [ ] test the app without internet connection
- [ ] deploy most recent version to heroku with "git push heroku master" 

## Special users 
* When running in development mode, it is possible to log in with: 
  * username: dev
  * password: dev

## Extras 
* I have added styling with [Reactstrap](https://reactstrap.github.io). This required adding css-loaders to `webpack.config.js`. 
* To ensure consistent code-style, I have used [ESlint](https://eslint.org). This is also configured as an extra script.
* Although not required, I have set up Travis to automatically run tests
* The app is deployed to [Heroku](https://exam-pg6300.herokuapp.com)

## General notes
* Modifications to yarn scripts:
  * configuring `yarn start` to set environment variable. It indicates wether the server is running in development mode or not. This way, I may add demo data only when application is not in production.
* notes about copying from course repo 
  * Some files are completely copied. Others are copied, and later modified. This is differentiated in the comment. 
  * JSON-format does not support comments. `package.json`is partially copied from [this file](https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/package.json)
* dependencies not used in course
  * [eslint](https://yarnpkg.com/en/package/eslint) and related plugins. This is to create lint-config appropriate for the project (like support for React)
  *  [cross-env](https://www.npmjs.com/package/cross-env) is used for setting environment variables. I have access to a Mac. This should make sure that environment variable is working fine on non-UNIX systems as well
  * [style-loader](https://www.npmjs.com/package/style-loader) for loading styles to reactsrap.  
* on general style 
  * I could have written some functional components. In particular, smaller components with no state. However, I chose to stick with class based components for the sake of consistency. By "functional" and "class based", I am referring to the first and second example on [this page](https://reactjs.org/docs/components-and-props.html), respectively.
