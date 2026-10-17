import DsaCard from "../components/DsaCard";
import GitCard from "../components/GitCard";
import TechnicalQuesCard from "../components/TechnicalQuesCard";
import MachineCodingCard from "../components/MachineCodingCard";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <button type="button" onClick={() => navigate("/")} className="flex items-center gap-3" aria-label="PrepTrack home">
            <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-200">
              P
            </span>
            <span className="text-lg font-bold tracking-tight">PrepTrack</span>
          </button>
          <span className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 sm:inline-flex">
            Your personal interview workspace
          </span>
        </header>

        <section className="relative mb-8 overflow-hidden rounded-3xl bg-indigo-950 px-6 py-10 text-white shadow-xl shadow-indigo-950/10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-16 -top-28 size-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-1/4 size-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
              Small steps, big progress
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Get interview-ready,
              <span className="mt-1 block text-indigo-300">one question at a time.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-indigo-100/75 sm:text-base">
              Keep your practice organized, track what you’ve solved, and stay focused on your next goal.
            </p>
          </div>
        </section>

        <section aria-labelledby="practice-heading">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Your workspace</p>
              <h2 id="practice-heading" className="mt-1 text-2xl font-bold tracking-tight">
                Choose a practice track
              </h2>
            </div>
            <p className="hidden text-sm text-slate-500 sm:block">Pick up where you left off</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <DsaCard onClick={() => navigate("/dsa")} />
            <GitCard onClick={() => navigate("/git")} />
            <TechnicalQuesCard onClick={() => navigate("/technical-ques")} />
            <MachineCodingCard onClick={() => navigate("/machine-coding")} />
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
          Your progress is saved automatically on this device.
        </footer>
      </div>
    </main>
  );
};

export default Dashboard;
