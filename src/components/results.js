import React from 'react';


const Results = ({ score, startQuiz, logout }) => {
  return (
    <div className="container text-center mt-5">
      <h2>Quiz Finished</h2>
      <p>Your score is {score}.</p>
      <button className="btn btn-primary mt-3" onClick={startQuiz}>
        Restart Quiz
      </button>
      <button className="btn btn-secondary mt-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
};


export default Results;
