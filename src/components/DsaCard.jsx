import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DsaCard = ({ onClick }) => {
  const [totalDsa, setTotalDsa] = useState(0);
  const [solvedDsa, setSolvedDsa] = useState(0);
  const [unsolvedDsa, setUnsolvedDsa] = useState(0);
  const [progress, setProgress] = useState(0);

  const dsaData = JSON.parse(localStorage.getItem("dsa_data"));

  function calculateProgress() {
    let total = dsaData.length;
    setTotalDsa(total);

    let solved = dsaData.filter((dsa) => dsa.status === "completed").length;
    setSolvedDsa(solved);

    setUnsolvedDsa(total - solved);
  }

  useEffect(() => {
    calculateProgress();
  }, []);

  return (
    <div className="border p-4 cursor-pointer" onClick={onClick}>
      <h1 className="text-center bg-amber-100">DSA (Leetcode)</h1>
      <p>Total DSA Questions: {totalDsa}</p>
      <p>Solved DSA Questions: {solvedDsa}</p>
      <p>Unsolved DSA Questions: {unsolvedDsa}</p>
      <p>Progress: {Math.floor((solvedDsa / totalDsa) * 100)}%</p>
    </div>
  );
};

export default DsaCard;
