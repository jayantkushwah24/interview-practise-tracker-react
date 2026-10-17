import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const DSA = () => {
  let [displayForm, setDisplayForm] = useState(false);
  let [dsaData, setDsaData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  let [title, setTitle] = useState("");
  let [status, setStatus] = useState("pending");
  let [difficulty, setDifficulty] = useState("");
  let [dsaId, setDsaId] = useState(null);
  const [titleSearch, setTitleSearch] = useState("");

  const navigate = useNavigate();

  const filteredData = dsaData.filter((dsa) => {
    const matchesTitle =
      !titleSearch ||
      dsa.title.toLowerCase().includes(titleSearch.toLocaleLowerCase());
    const matchesStatus = !statusFilter || dsa.status === statusFilter;
    const matchesDifficulty =
      !difficultyFilter || dsa.difficulty === difficultyFilter;

    return matchesDifficulty && matchesStatus && matchesTitle;
  });

  function getDsaData() {
    const getDsaData = JSON.parse(localStorage.getItem("dsa_data")) || [];
    setDsaData(getDsaData);
  }

  useEffect(() => {
    getDsaData();
  }, []);

  const resetForm = () => {
    setTitle("");
    setStatus("pending");
    setDifficulty("");
    setDsaId(null);
  };

  function handleFormSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      toast.error("please enter title");
      return;
    }
    if (difficulty === "") {
      toast.error("please enter difficulty");
      return;
    }

    let newDsaData;

    if (dsaId !== null) {
      newDsaData = dsaData.map((dsa) =>
        dsa.id === dsaId
          ? { ...dsa, title: title, status: status, difficulty: difficulty }
          : dsa,
      );
      setDsaId(null);
      toast.success("Question updated!");
    } else {
      newDsaData = [
        ...dsaData,
        { id: crypto.randomUUID(), title, status, difficulty },
      ];
      toast.success("Question added!");
    }

    setDsaData(newDsaData);
    localStorage.setItem("dsa_data", JSON.stringify(newDsaData));
    setDisplayForm(false);
    resetForm();
  }

  function handleMarkCompleted(id) {
    const newDsaData = dsaData?.map((dsa) =>
      dsa.id === id ? { ...dsa, status: "completed" } : dsa,
    );
    setDsaData(newDsaData);
    localStorage.setItem("dsa_data", JSON.stringify(newDsaData));

    toast.success("Marked as completed!");
  }

  function handleDelete(id) {
    const newDsaData = dsaData?.filter((dsa) => dsa.id !== id);
    setDsaData(newDsaData);
    localStorage.setItem("dsa_data", JSON.stringify(newDsaData));
    toast.success("Question deleted");
  }

  function handleUpdate(id) {
    const data = dsaData?.find((dsa) => dsa.id === id);
    if (!data) return;

    setDisplayForm(true);
    setTitle(data?.title);
    setStatus(data?.status);
    setDifficulty(data?.difficulty);
    setDsaId(id);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <span aria-hidden="true">←</span> Dashboard
        </button>
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Practice track</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Data Structures & Algorithms</h1>
            <p className="mt-2 text-sm text-slate-500">Keep your coding practice focused and consistent.</p>
          </div>
          <button
            type="button"
            onClick={() => setDisplayForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span aria-hidden="true">+</span> Add question
          </button>
        </header>

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-label="Search and filter questions">
          <nav className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <input
              type="search"
              aria-label="Search questions by title"
              placeholder="Search questions..."
              onChange={(e) => setTitleSearch(e.target.value)}
              value={titleSearch}
              className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
            <label className="sr-only" htmlFor="difficulty-filter">Filter by difficulty</label>
            <select
              id="difficulty-filter"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">All difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <label className="sr-only" htmlFor="status-filter">Filter by status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </nav>
        </section>

        {displayForm ? (
          <form onSubmit={handleFormSubmit} className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-bold">{dsaId ? "Update question" : "Add a question"}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                Question title
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Two Sum"
                  value={title}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Difficulty
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">
                Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            </div>
            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { setDisplayForm(false); resetForm(); }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">{dsaId ? "Save changes" : "Add question"}</button>
            </div>
          </form>
        ) : (
          <section aria-label="Questions">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Your questions</h2>
              <span className="text-sm text-slate-500">{filteredData.length} {filteredData.length === 1 ? "question" : "questions"}</span>
            </div>
            {filteredData.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                <p className="font-semibold text-slate-700">No questions found</p>
                <p className="mt-1 text-sm text-slate-500">Try a different search or add your first question.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredData.map(({ id, title, status, difficulty }) => (
                  <article key={id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="min-w-0">
                      <h3 className="break-words font-semibold text-slate-900">{title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 capitalize text-slate-600">{status.replace("-", " ")}</span>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 capitalize text-indigo-700">{difficulty}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {status !== "completed" && <button type="button" onClick={() => handleMarkCompleted(id)} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100">Mark complete</button>}
                      <button type="button" onClick={() => handleUpdate(id)} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Edit</button>
                      <button type="button" onClick={() => handleDelete(id)} className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100">Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default DSA;
