State management: 
For state management I'm using Context Api, for that I have setted up:
1) Reducer - contains initial state and which consumes dispatch action type and payload
2) DataLayer - passes data to reducer from actions
3) Actions - contains function that dispatches action types and payloads

To make states global index.js is wrapped with datalayer, containing initial state and reducer

In global states I save:
1) User name - user enters it on the homepage
2) QuizId - selected test id
3) QuizQuestions - questions for the quiz
4) Answers - user selected answers

Routing:
For routing I'm using react-router and react-router-dom, the App.js contains all routes. /test route is accessible only if user and quizId are set in a global state, /result route is accessible if user and answers are set in a global state.

Page/component combine:
To easier import pages/components index.js is created under /pages /components root, that contains the necessary exports, thus all pages or all components can be imported in a single line.

Components:
As the website is relatively small I didn't divide pages to a smaller components (like Questions->Question component, Answer components, etc.). The only component is Button component, that is used for all buttons on the website.

Pages:
Pages are divided in 3 folders:
1) Home - on component load all quizes are fetched and placed in select. User must enter name and choose option from select, before proceeding to the test, otherwise an error will be thrown, depending on the missing field. On clicking Start user is redirected to test page.
2) Test - if state has user and quizId there the test page is opened, on component load quiz questions are fetched by using quizId in global state, quiz questions are saved using react useState. When the quiz quesitons are loaded another load is triggered and first question is fetched and rendered.
When answer is selected and user clicks next, index of question is increased, next question is fetched and rendered until the last one. When the last one is answered then result page is loaded.
If no answer is provided, then error message appears.
3) Result - page can be opened if there are user and answers states. On component load answers url is built by concating answer ids from answers state, then correct answers count is fetched and rendered on the page. 
