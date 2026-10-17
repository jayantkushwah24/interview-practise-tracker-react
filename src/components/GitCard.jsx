const GitCard = ({ onClick }) => {
  const gitData = JSON.parse(localStorage.getItem("git_data")) || [];

  const total = gitData.length;
  const solved = gitData.filter((git) => git.status === "completed").length;
  const unsolved = total - solved;
  const progress = total > 0 ? Math.floor((solved / total) * 100) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-indigo-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:p-6"
    >
      <span className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-600">02</span>
        <span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600" aria-hidden="true">↗</span>
      </span>
      <span className="mt-5 block text-lg font-bold tracking-tight text-slate-900">Git & GitHub</span>
      <span className="mt-1 block text-sm text-slate-500">Master the tools behind your code</span>
      <span className="mt-6 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{solved} of {total} solved</span>
        <span className="font-semibold text-emerald-600">{progress}%</span>
      </span>
      <span className="mt-2 block h-2 overflow-hidden rounded-full bg-slate-100">
        <span className="block h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
      </span>
      <span className="sr-only">{unsolved} questions remaining</span>
    </button>
  );
};

export default GitCard;
