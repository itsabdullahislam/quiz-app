import React, { useState, useEffect } from 'react';

const questions = {
  Math: [
    {
      question: "What is 2 + 2?",
      type: "multiple-choice",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "What is the derivative of x^2?",
      type: "short-answer",
      answer: "2x"
    },
    {
      question: "What is the square root of 16?",
      type: "multiple-choice",
      options: ["2", "3", "4", "5"],
      answer: "4"
    },
    {
      question: "What is 10% of 200?",
      type: "multiple-choice",
      options: ["10", "15", "20", "25"],
      answer: "20"
    },
    {
      question: "What is 5 × 6?",
      type: "multiple-choice",
      options: ["30", "25", "20", "15"],
      answer: "30"
    }
  ],
  Science: [
    {
      question: "What is the chemical symbol for water?",
      type: "short-answer",
      answer: "H2O"
    },
    {
      question: "True or False: The Earth revolves around the Sun.",
      type: "true-false",
      options: ["True", "False"],
      answer: "True"
    },
    {
      question: "What is the process of photosynthesis?",
      type: "short-answer",
      answer: "Conversion of light energy into chemical energy"
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      type: "multiple-choice",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Carbon Dioxide"
    },
    {
      question: "What is the powerhouse of the cell?",
      type: "multiple-choice",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
      answer: "Mitochondria"
    }
  ],
  History: [
    {
      question: "Who was the first President of the United States?",
      type: "short-answer",
      answer: "George Washington"
    },
    {
      question: "True or False: The Titanic sank in 1912.",
      type: "true-false",
      options: ["True", "False"],
      answer: "True"
    },
    {
      question: "What ancient civilization built the pyramids?",
      type: "short-answer",
      answer: "Egyptians"
    },
    {
      question: "What year did World War II end?",
      type: "short-answer",
      answer: "1945"
    },
    {
      question: "Who wrote the Declaration of Independence?",
      type: "short-answer",
      answer: "Thomas Jefferson"
    }
  ]
};



const Quiz = ({ finishQuiz, difficulty, questionCount, selectedCategory }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); 

  
  const selectedQuestions = questions[selectedCategory].slice(0, questionCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      finishQuiz(score); // Finish quiz when time is up
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelection = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(''); // Clear the previous answer selection
    } else {
      finishQuiz(score);
    }
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <div className="container text-center mt-5">
      <h2>{selectedCategory} Quiz</h2>
      <h4>{currentQuestion.question}</h4>
      {currentQuestion.type === 'multiple-choice' && (
        <div className="options mt-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`btn btn-secondary m-2 ${selectedAnswer === option ? 'btn-primary' : ''}`}
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {currentQuestion.type === 'true-false' && (
        <div className="options mt-3">
          {["True", "False"].map((option, index) => (
            <button
              key={index}
              className={`btn btn-secondary m-2 ${selectedAnswer === option ? 'btn-primary' : ''}`}
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {currentQuestion.type === 'short-answer' && (
        <input
          type="text"
          className="form-control mt-3"
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        />
      )}
      <button className="btn btn-primary mt-3" onClick={handleNextQuestion}>
        Next
      </button>
      <div className="progress mt-3">
        <div className="progress-bar" style={{ width: `${((currentQuestionIndex + 1) / questionCount) * 100}%` }}></div>
      </div>
      <div className="mt-3">Time left: {timeLeft} seconds</div>
    </div>
  );
};

export default Quiz;
