import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Git = () => {
  let [displayForm, setDisplayForm] = useState(false);
  let [gitData, setGitData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  let [title, setTitle] = useState("");
  let [status, setStatus] = useState("pending");
  let [difficulty, setDifficulty] = useState("");
  let [gitId, setGitId] = useState(null);
  const [titleSearch, setTitleSearch] = useState("");

  const navigate = useNavigate();

  const filteredData = gitData.filter((git) => {
    const matchesTitle =
      !titleSearch ||
      git.title.toLowerCase().includes(titleSearch.toLocaleLowerCase());
    const matchesStatus = !statusFilter || git.status === statusFilter;
    const matchesDifficulty =
      !difficultyFilter || git.difficulty === difficultyFilter;

    return matchesDifficulty && matchesStatus && matchesTitle;
  });

  function getGitData() {
    const getGitData = JSON.parse(localStorage.getItem("git_data")) || [];
    setGitData(getGitData);
  }

  useEffect(() => {
    getGitData();
  }, []);

  const resetForm = () => {
    setTitle("");
    setStatus("pending");
    setDifficulty("");
    setGitId(null);
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

    let newGitData;

    if (gitId !== null) {
      newGitData = gitData.map((git) =>
        git.id === gitId
          ? { ...git, title: title, status: status, difficulty: difficulty }
          : git,
      );
      setGitId(null);
      toast.success("Question updated!");
    } else {
      newGitData = [
        ...gitData,
        { id: crypto.randomUUID(), title, status, difficulty },
      ];
      toast.success("Question added!");
    }

    setGitData(newGitData);
    localStorage.setItem("git_data", JSON.stringify(newGitData));
    setDisplayForm(false);
    resetForm();
  }

  function handleMarkCompleted(id) {
    const newGitData = gitData?.map((git) =>
      git.id === id ? { ...git, status: "completed" } : git,
    );
    setGitData(newGitData);
    localStorage.setItem("git_data", JSON.stringify(newGitData));

    toast.success("Marked as completed!");
  }

  function handleDelete(id) {
    const newGitData = gitData?.filter((git) => git.id !== id);
    setGitData(newGitData);
    localStorage.setItem("git_data", JSON.stringify(newGitData));
    toast.success("Question deleted");
  }

  function handleUpdate(id) {
    const data = gitData?.find((git) => git.id === id);
    if (!data) return;

    setDisplayForm(true);
    setTitle(data?.title);
    setStatus(data?.status);
    setDifficulty(data?.difficulty);
    setGitId(id);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
      <button onClick={() => navigate("/")} className="mb-6 text-sm font-semibold text-slate-500 transition hover:text-indigo-600">← Dashboard</button>
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Practice track</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Git & GitHub</h1>
          <p className="mt-2 text-sm text-slate-500">Get comfortable with the tools behind your code.</p>
        </div>
        <button onClick={() => { if (gitId !== null) resetForm(); setDisplayForm(true); }} className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700">+ Add question</button>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <nav className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <input
          type="search"
          aria-label="Search questions by title"
          placeholder="Search questions..."
          onChange={(e) => setTitleSearch(e.target.value)}
          value={titleSearch}
          className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />

        <label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            aria-label="Filter by difficulty"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="">All difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </nav>
      </section>

      {displayForm && (
        <div>
          <form
            onSubmit={handleFormSubmit}
            className="mt-5 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6"
          >
            <h2 className="text-lg font-bold sm:col-span-2">{gitId ? "Update question" : "Add a question"}</h2>
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Question title
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How does git rebase work?"
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

            <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { setDisplayForm(false); resetForm(); }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">{gitId ? "Save changes" : "Add question"}</button>
            </div>
          </form>
        </div>
      )}

      {!displayForm && (
        <div className="mt-5 flex flex-col gap-3">
          {filteredData.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <p className="font-semibold text-slate-700">No questions found</p>
              <p className="mt-1 text-sm text-slate-500">Try a different search or add your first question.</p>
            </div>
          ) : (
            filteredData.map(({ id, title, status, difficulty }) => (
              <div key={id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex-1">
                  <h2 className="break-words font-semibold text-slate-900">{title}</h2>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 capitalize text-slate-600">{status.replace("-", " ")}</span>
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 capitalize text-indigo-700">{difficulty}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {status !== "completed" && (
                    <button
                      onClick={() => handleMarkCompleted(id)}
                      className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      Mark complete
                    </button>
                  )}
                  <button
                    onClick={() => handleUpdate(id)}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Delete
                  </button>
                  </div>
              </div>
            ))
          )}
        </div>
      )}
      </div>
    </main>
  );
};

export default Git;
