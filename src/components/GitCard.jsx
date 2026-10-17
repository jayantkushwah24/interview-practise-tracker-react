import React from "react";

const GitCard = ({ onClick }) => {
  return (
    <div className="border p-4 cursor-pointer" onClick={onClick}>
      <h1 className="text-center bg-amber-100">Git & Github </h1>
      <p>Total: </p>
      <p>Solved: </p>
      <p>Unsolved: </p>
    </div>
  );
};

export default GitCard;
