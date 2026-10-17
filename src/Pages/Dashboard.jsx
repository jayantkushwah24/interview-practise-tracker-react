import DsaCard from "../components/DsaCard";
import GitCard from "../components/GitCard";
import TechnicalQuesCard from "../components/TechnicalQuesCard";
import MachineCodingCard from "../components/MachineCodingCard";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="bg-blue-200 text-2xl">Welcome</h1>
      <h3 className="bg-blue-200 text-xl">Interview Preparation Tracker</h3>
      <div className="grid grid-cols-2 grid-rows-2 gap-10 p-4">
        <DsaCard onClick={() => navigate("/dsa")} />
        <GitCard onClick={() => navigate("/git")} />
        <TechnicalQuesCard onClick={() => navigate("/technical-ques")} />
        <MachineCodingCard onClick={() => navigate("/machine-coding")} />
      </div>
    </div>
  );
};

export default Dashboard;
