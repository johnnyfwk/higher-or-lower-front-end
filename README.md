# Higher or Lower: Frontend

HigherorLower.co.uk is a full-stack game where users guess whether the next number will be higher or lower. If they score high enough, they can add their details to the global leaderboard.

It was built using PostgreSQL, Express, React, and Node.js.

Live URL: https://HigherorLower.co.uk

The frontend was created using React and uses Axios to request user scores from the backend (Github repo: https://github.com/johnnyfwk/higher-or-lower-back-end).

To run this project locally:
- go to the Github repo at https://github.com/johnnyfwk/higher-or-lower-front-end;
- near the top of the page, click on the button labeled 'Code';
- in the 'Local' tab, copy the HTTPS URL 'https://github.com/johnnyfwk/higher-or-lower-front-end.git';
- in Terminal, go to the folder you want to clone the repo;
- type 'git clone https://github.com/johnnyfwk/higher-or-lower-front-end.git' to copy the repo to your local machine;
- type 'cd higher-or-lower-front-end' to go that folder;
- type 'npm i' to install all the packages that the project requires to run;
- to seed the tables required for this project, follow the instructions in the back end readme at https://github.com/johnnyfwk/higher-or-lower-back-end;
- in the api.js file located in the 'src' folder, change the baseUrl to 'http://localhost:9090/W2eR9tY4uI7oP1aS8dF3gH6jK5lQ0';
- type 'npm start' to run the React project;
- your browser should automatically display the app; if it doesn't, type 'http://localhost:3000/' into your browser.
