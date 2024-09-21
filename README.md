# Stock Chatbot - Tech Challenge

This project was created with Create React App.

- Docs: https://create-react-app.dev/docs/getting-started

### Prerequisites

Make sure you have Node.js and npm installed.

- node: v20.17.0
- npm: 10.8.2

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install the dependencies: `npm install`

### Running the App

To start the application in development mode, run: `npm start`

- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Code review

The main functionality of the code can be found in `StockChatbot.js` and the styles in `StockChatbot.css`

### Tech Challenge Remarks

Due to time constraints, error handling has not been implemented. Here are some examples of potential errors that could occur, in a real life scenario (when interacting with an API):

- **Data Not Found**: The API might not return the expected data if a user selects an option that doesn't exist.
- **Network Errors**: Users may experience issues if their internet connection is unstable.
- **Invalid Responses**: The API might return malformed or unexpected data, which could cause errors in processing or display.
