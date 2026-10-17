import React, { useEffect, useState } from "react";
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
    setTitle(data[0]?.title);
    setStatus(data[0]?.status);
    setDifficulty(data[0]?.difficulty);
    setDsaId(id);
  }

  return (
    <div>
      <h1>DSA (Leetcode) Questions</h1>
      <nav className="flex justify-evenly">
        <button onClick={() => navigate("/")}>Back to Dashboard</button>
        <button onClick={() => setDisplayForm(true)}>Add DSA Questions</button>

        <input
          type="text"
          placeholder="Search by title"
          onChange={(e) => setTitleSearch(e.target.value)}
          value={titleSearch}
        />

        <label>
          Filter:{" "}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="">All difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Status:{" "}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </nav>

      {displayForm && (
        <div>
          <form
            onSubmit={handleFormSubmit}
            className="border p-4 mt-4 flex flex-col gap-2"
          >
            <label>
              Title:
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter question title"
                value={title}
              />
            </label>

            <label>
              Difficulty:
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label>
              Select the status of this question:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In progess</option>
                <option value="completed">Completed</option>
              </select>
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {!displayForm && (
        <div className="mt-4 flex flex-col gap-3">
          {filteredData.length === 0 ? (
            <p>No questions found.</p>
          ) : (
            filteredData.map(({ id, title, status, difficulty }) => (
              <div key={id} className="border p-3 flex items-center gap-4">
                <div className="flex-1">
                  <h2>{title}</h2>
                  <p>Status: {status}</p>
                  <p>Difficulty: {difficulty}</p>
                </div>
                <div className="flex gap-2">
                  {status !== "completed" && (
                    <button
                      onClick={() => handleMarkCompleted(id)}
                      className="bg-green-200 px-2 py-1"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleUpdate(id)}
                    className="bg-yellow-200 px-2 py-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="bg-red-200 px-2 py-1"
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
  );
};

export default DSA;
