import { useEffect, useState } from "react";

const GitCard = ({ onClick }) => {
  const [gitData, setGitData] = useState(() => {
    return JSON.parse(localStorage.getItem("git_data")) || [];
  });

  useEffect(() => {
    setGitData(JSON.parse(localStorage.getItem("git_data")) || []);
  }, []);

  const total = gitData.length;
  const solved = gitData.filter((git) => git.status === "completed").length;
  const unsolved = total - solved;
  const progress = total > 0 ? Math.floor((solved / total) * 100) : 0;

  return (
    <div className="border p-4 cursor-pointer" onClick={onClick}>
      <h1 className="text-center bg-amber-100">Git & Github</h1>
      <p>Total Git Questions: {total}</p>
      <p>Solved Git Questions: {solved}</p>
      <p>Unsolved Git Questions: {unsolved}</p>
      <p>Progress: {progress}%</p>
    </div>
  );
};

export default GitCard;
