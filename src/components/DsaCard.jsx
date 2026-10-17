import React, { useState } from "react";
import { useNavigate } from "react-router";

const DsaCard = ({ onClick }) => {
  const [totalDsa, setTotalDsa] = useState(0);
  const [solvedDsa, setSolvedDsa] = useState(0);
  const [unsolvedDsa, setUnsolvedDsa] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="border p-4 cursor-pointer" onClick={onClick}>
      <h1 className="text-center bg-amber-100">DSA (Leetcode)</h1>
      <p>Total DSA Questions: {totalDsa}</p>
      <p>Solved DSA Questions: {solvedDsa}</p>
      <p>Unsolved DSA Questions: {unsolvedDsa}</p>
    </div>
  );
};

export default DsaCard;
