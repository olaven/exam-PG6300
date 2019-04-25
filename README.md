# Exam - Web Development and API Design [![Build Status](https://travis-ci.com/olaven/exam-PG6300.svg?token=zTzVh5wrqM89cpyf9qVd&branch=master)](https://travis-ci.com/olaven/exam-PG6300)

## About the application

## Before delivering: 
- [ ] explicitly state that I am aming for A and every extra effort I have done. 
- [ ] report coverage in readme 
- [ ] assert test coverage 
- [ ] remove unused stuff (like graphql, perhaps)
- [ ] test alle scritps
- [ ] clean up after wallaby 
- [ ] optimaliseri mports 
- [ ] assert that no part of exercise is forgotten
- [ ] test every feature manually 
- [ ] test the app without internet connection
- [ ] deploy most recent version to heroku with "git push heroku master" 

## Admin user
* When running in development mode, it is possible to log in with: 
  * email: dev@admin.com
  * password: dev
For a list of all demo-users, see `#23` in [this file](./src/server/database/demo.js).

## Extras 
* I have added styling with [Reactstrap](https://reactstrap.github.io). This required adding css-loaders to `webpack.config.js`. 
* To ensure consistent code-style, I have used [ESlint](https://eslint.org). This is also configured as an extra script.
* Although not required, I have set up Travis to automatically run tests
* The app is deployed to [Heroku](https://exam-pg6300.herokuapp.com)

## Assumptions and coices
* The API 
  * The endpoint for accepting/denying friend requests is at `DELETE /api/friendRequests/ID`. The use of `DELETE` may seem slightly unintuitive. However, the request is removed from the database when accepted or denied, thus the choice seems appropriate. Arguably, I could have used `PUT` instead, as the state of a user is updated/modified.
* Sockets 
  * As mentioned in [a file from the course repo](https://github.com/arcuri82/web_development_and_api_design/blob/4537742786621fe1b417cb27399ea1710670fcba/les10/connect4-v2/src/server/ws/ws-handler.js), using passport for authentication has some limitations with websockets. Another, token-based approach is used. In the [`timeline.jsx`](./src/client/components/timeline.jsx), I use something akin to this token-approach. In [`conversations.js`](./src/server/websockets/conversation.js), however, I use the passport-session to compare emails. My assumption is that for the purposes of this exam, showing two ways of doing something is better than showing one (or none). 

## General notes
* Modifications to yarn scripts:
  * configuring `yarn start` to set environment variable. It indicates wether the server is running in development mode or not. This way, I may add demo data only when application is not in production.
* notes about copying from course repo 
  * Some files are completely copied. Others are copied, and later modified. This is differentiated in the comment. 
  * JSON-format does not support comments. `package.json`is partially copied from [this file](https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/package.json)
* dependencies not used in course
  * [eslint](https://yarnpkg.com/en/package/eslint) and related plugins. This is to create lint-config appropriate for the project (like support for React)
* [nanoid](https://www.npmjs.com/package/nanoid) is used for generating random IDs. The library was updated recently, takes         minimal amount of space, and has 700k weekly downloads. 
  *  [cross-env](https://www.npmjs.com/package/cross-env) is used for setting environment variables. I have access to a Mac. This should make sure that environment variable is working fine on non-UNIX systems as well
  * [style-loader](https://www.npmjs.com/package/style-loader) for loading styles to reactsrap.  
* on general style 
  * I could have written some functional components. In particular, smaller components with no state. However, I chose to stick with class based components for the sake of consistency. By "functional" and "class based", I am referring to the first and second example on [this page](https://reactjs.org/docs/components-and-props.html), respectively.
