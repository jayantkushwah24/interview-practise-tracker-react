import { useEffect, useState } from "react";

const MachineCodingCard = ({ onClick }) => {
  const [codingData, setCodingData] = useState(() => {
    return JSON.parse(localStorage.getItem("coding_data")) || [];
  });

  useEffect(() => {
    setCodingData(JSON.parse(localStorage.getItem("coding_data")) || []);
  }, []);

  const total = codingData.length;
  const solved = codingData.filter(
    (code) => code.status === "completed",
  ).length;
  const unsolved = total - solved;
  const progress = total > 0 ? Math.floor((solved / total) * 100) : 0;

  return (
    <div className="border p-4 cursor-pointer" onClick={onClick}>
      <h1 className="text-center bg-amber-100">Machine Coding Questions</h1>
      <p>Total Coding Questions: {total}</p>
      <p>Solved Coding Questions: {solved}</p>
      <p>Unsolved Coding Questions: {unsolved}</p>
      <p>Progress: {progress}%</p>
    </div>
  );
};

export default MachineCodingCard;
