import { useEffect, useState } from "react";

const TechnicalQuesCard = ({ onClick }) => {
  const [technicalData, setTechnicalData] = useState(() => {
    return JSON.parse(localStorage.getItem("technical_data")) || [];
  });

  useEffect(() => {
    setTechnicalData(JSON.parse(localStorage.getItem("technical_data")) || []);
  }, []);

  const total = technicalData.length;
  const solved = technicalData.filter((tech) => tech.status === "completed").length;
  const unsolved = total - solved;
  const progress = total > 0 ? Math.floor((solved / total) * 100) : 0;

  return (
    <div className="border p-4 cursor-pointer" onClick={onClick}>
      <h1 className="text-center bg-amber-100">Full-Stack Technical Questions</h1>
      <p>Total Technical Questions: {total}</p>
      <p>Solved Technical Questions: {solved}</p>
      <p>Unsolved Technical Questions: {unsolved}</p>
      <p>Progress: {progress}%</p>
    </div>
  );
};

export default TechnicalQuesCard;   