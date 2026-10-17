import React from "react";
import DsaCard from "./DsaCard";
import GitCard from "./GitCard";
import TechnicalQuesCard from "./TechnicalQuesCard";
import MahineCodingCard from "./MahineCodingCard";

const Dashboard = () => {
  return (
    <div>
      <h1 className="bg-blue-200 text-2xl">Welcome</h1>
      <h3 className="bg-blue-200 text-xl">Interview Preparation Tracker</h3>
      <div className="grid grid-cols-2 grid-rows-2 gap-10 p-4">
        <DsaCard />
        <GitCard />
        <TechnicalQuesCard />
        <MahineCodingCard />
      </div>
    </div>
  );
};

export default Dashboard;
