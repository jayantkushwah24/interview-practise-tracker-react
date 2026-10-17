import React from "react";

const MachineCodingCard = ({ onClick }) => {
  return (
    <div className="border p-4 cursor-pointer" onClick={onClick}>
      <h1 className="text-center bg-amber-100 ">Machine Coding Round</h1>
      <p>Total: </p>
      <p>Solved: </p>
      <p>Unsolved: </p>
    </div>
  );
};

export default MachineCodingCard;
