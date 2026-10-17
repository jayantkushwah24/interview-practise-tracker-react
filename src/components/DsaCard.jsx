import { useEffect, useState } from "react";

const DsaCard = ({ onClick }) => {
  const [dsaData, setDsaData] = useState(() => {
    return JSON.parse(localStorage.getItem("dsa_data")) || [];
  });

  useEffect(() => {
    setDsaData(JSON.parse(localStorage.getItem("dsa_data")) || []);
  }, []);

  const total = dsaData.length;
  const solved = dsaData.filter((dsa) => dsa.status === "completed").length;
  const unsolved = total - solved;
  const progress = total > 0 ? Math.floor((solved / total) * 100) : 0;

  return (
    <div className="border p-4 cursor-pointer" onClick={onClick}>
      <h1 className="text-center bg-amber-100">DSA (Leetcode)</h1>
      <p>Total DSA Questions: {total}</p>
      <p>Solved DSA Questions: {solved}</p>
      <p>Unsolved DSA Questions: {unsolved}</p>
      <p>Progress: {progress}%</p>
    </div>
  );
};

export default DsaCard;   