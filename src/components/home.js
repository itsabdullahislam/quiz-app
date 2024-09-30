import React, { useState } from 'react';

const Home = ({ startQuiz, user , logout }) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [questionCount, setQuestionCount] = useState(2);

  const handleStart = () => {
    if (category) {
      startQuiz(category, difficulty, questionCount);
    } else {
      alert("Please select a category."); 
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Welcome to the Quiz Platform</h2>
      <div className="form-group">
        <label>Select Category:</label>
        <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
          <option value="">Choose...</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </select>
      </div>
      <div className="form-group">
        <label>Select Difficulty:</label>
        <select className="form-control" onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="form-group">
        <label>Select Number of Questions:</label>
        <select className="form-control" onChange={(e) => setQuestionCount(Number(e.target.value))}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleStart}>
        Start Quiz
      </button>
      <button className="btn btn-secondary mt-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
