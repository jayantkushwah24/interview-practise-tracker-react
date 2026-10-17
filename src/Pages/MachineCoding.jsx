import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import MachineCodingCard from "../components/MachineCodingCard";

const MachineCoding = () => {
  let [displayForm, setDisplayForm] = useState(false);
  let [coding, setCodingData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  let [title, setTitle] = useState("");
  let [status, setStatus] = useState("pending");
  let [difficulty, setDifficulty] = useState("");
  let [codingId, setCodingId] = useState(null);
  const [titleSearch, setTitleSearch] = useState("");

  const navigate = useNavigate();

  const filteredData = coding.filter((tech) => {
    const matchesTitle =
      !titleSearch ||
      tech.title.toLowerCase().includes(titleSearch.toLocaleLowerCase());
    const matchesStatus = !statusFilter || tech.status === statusFilter;
    const matchesDifficulty =
      !difficultyFilter || tech.difficulty === difficultyFilter;

    return matchesDifficulty && matchesStatus && matchesTitle;
  });

  function getCodingData() {
    const getCodingData =
      JSON.parse(localStorage.getItem("coding_data")) || [];
    setCodingData(getCodingData);
  }

  useEffect(() => {
    getCodingData();
  }, []);

  const resetForm = () => {
    setTitle("");
    setStatus("pending");
    setDifficulty("");
    setCodingId(null);
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

    let newCodingData;

    if (codingId !== null) {
      newCodingData = coding.map((tech) =>
        tech.id === codingId
          ? { ...tech, title: title, status: status, difficulty: difficulty }
          : tech,
      );
      setCodingId(null);
      toast.success("Question updated!");
    } else {
      newCodingData = [
        ...coding,
        { id: crypto.randomUUID(), title, status, difficulty },
      ];
      toast.success("Question added!");
    }

    setCodingData(newCodingData);
    localStorage.setItem("coding_data", JSON.stringify(newCodingData));
    setDisplayForm(false);
    resetForm();
  }

  function handleMarkCompleted(id) {
    const newCodingData = coding?.map((tech) =>
      tech.id === id ? { ...tech, status: "completed" } : tech,
    );
    setCodingData(newCodingData);
    localStorage.setItem("coding_data", JSON.stringify(newCodingData));

    toast.success("Marked as completed!");
  }

  function handleDelete(id) {
    const newCodingData = coding?.filter((tech) => tech.id !== id);
    setCodingData(newCodingData);
    localStorage.setItem("coding_data", JSON.stringify(newCodingData));
    toast.success("Question deleted");
  }

  function handleUpdate(id) {
    const data = coding?.find((tech) => tech.id === id);
    if (!data) return;

    setDisplayForm(true);
    setTitle(data?.title);
    setStatus(data?.status);
    setDifficulty(data?.difficulty);
    setCodingId(id);
  }

  return (
    <div>
      <h1>Machine Coding Questions</h1>
      <nav className="flex justify-evenly">
        <button onClick={() => navigate("/")}>Back to Dashboard</button>
        <button onClick={() => setDisplayForm(true)}>
          Add Machine Coding Questions
        </button>

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

export default MachineCoding;
