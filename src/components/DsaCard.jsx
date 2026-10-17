import React, { useState } from "react";

const DsaCard = () => {
  const [totalDsa, setTotalDsa] = useState(0);
  const [solvedDsa, setSolvedDsa] = useState(0);
  const [unsolvedDsa, setUnsolvedDsa] = useState(0);

  return (
    <div className="border p-4 cursor-pointer">
      <h1 className="text-center bg-amber-100">DSA (Leetcode)</h1>
      <p>Total DSA Questions: {totalDsa}</p>
      <p>Solved DSA Questions: {solvedDsa}</p>
      <p>Unsolved DSA Questions: {unsolvedDsa}</p>
    </div>
  );
};

export default DsaCard;
