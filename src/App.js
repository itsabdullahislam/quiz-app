import React, { useState } from 'react';
import Home from './components/home';
import Quiz from './components/quiz';
import Results from './components/results';
import Leaderboard from './components/leaderboard';
import Login from './components/login';

const App = () => {
  const [user, setUser] = useState(null); 
  const [isGuest, setIsGuest] = useState(true); 
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [questionCount, setQuestionCount] = useState(2);
  const [score, setScore] = useState(0);

  const startQuiz = (category, difficulty, questionCount) => {
    setSelectedCategory(category);
    setDifficulty(difficulty);
    setQuestionCount(questionCount);
    setQuizStarted(true);
    setQuizFinished(false);
    setScore(0);
  };

  const finishQuiz = (finalScore) => {
    setQuizFinished(true);
    setQuizStarted(false);
    if (!isGuest) {
      saveScore(finalScore); 
    }
  };

  const saveScore = (finalScore) => {
    if (user) {
      let userData = JSON.parse(localStorage.getItem(user)) || { scores: [] };
      userData.scores.push({ category: selectedCategory, score: finalScore });
      localStorage.setItem(user, JSON.stringify(userData));
    }
  };

  const login = (username) => {
    setUser(username);
    setIsGuest(false); 
  };

  const logout = () => {
    setUser(null);
    setIsGuest(true); 
    setQuizStarted(false); 
    setQuizFinished(false); 
    setScore(0);
    localStorage.removeItem(user);
  };

  return (
    <div>
    {user === null ? ( 
      <Login login={login} />
    ) : (
      <>
        <Home startQuiz={startQuiz} user={user} logout={logout} />
        {quizStarted && !quizFinished && (
          <Quiz finishQuiz={finishQuiz} difficulty={difficulty} questionCount={questionCount} selectedCategory={selectedCategory} />
        )}
        {quizFinished && <Results score={score} startQuiz={startQuiz} logout={logout} />}
        <Leaderboard user={user} />
      </>
    )}
  </div>
  );
};

export default App;
