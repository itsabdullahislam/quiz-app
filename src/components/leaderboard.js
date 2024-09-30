import React from 'react';

const Leaderboard = ({ user }) => {
  const userData = JSON.parse(localStorage.getItem(user)) || { scores: [] };

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {userData.scores.map((scoreData, index) => (
          <li key={index} className="list-group-item">
            {`Category: ${scoreData.category}, Score: ${scoreData.score}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
