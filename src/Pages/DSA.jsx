import React, { useEffect, useState } from "react";

const DSA = () => {
  let [displayForm, setDisplayForm] = useState(false);
  let [dsaData, setDsaData] = useState([]);
  let [title, setTitle] = useState("");
  let [status, setStatus] = useState("pending");
  let [dsaId, setDsaId] = useState(null);

  function handleFormSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      alert("please enter title");
      return;
    }

    let newDsaData;

    if (dsaId !== null) {
      newDsaData = dsaData.map((dsa) =>
        dsa.id === dsaId ? { ...dsa, title: title, status: status } : dsa,
      );
    } else {
      newDsaData = [...dsaData, { id: crypto.randomUUID(), title, status }];
    }

    setDsaData(newDsaData);
    localStorage.setItem("dsa_data", JSON.stringify(newDsaData));
    setDisplayForm(false);
    setDsaId(null);
  }

  function handleMarkCompleted(id) {
    const newDsaData = dsaData?.map((dsa) =>
      dsa.id === id ? { ...dsa, status: "completed" } : dsa,
    );
    setDsaData(newDsaData);
    localStorage.setItem("dsa_data", JSON.stringify(newDsaData));
  }

  function handleDelete(id) {
    const newDsaData = dsaData?.filter((dsa) => dsa.id !== id);
    setDsaData(newDsaData);
    localStorage.setItem("dsa_data", JSON.stringify(newDsaData));
  }

  function handleUpdate(id) {
    const data = dsaData?.filter((dsa) => dsa.id === id);

    setDisplayForm(true);
    setTitle(data[0]?.title);
    setStatus(data[0]?.status);
    setDsaId(id);
  }

  useEffect(() => {
    const getDsaData = JSON.parse(localStorage.getItem("dsa_data")) || [];
    setDsaData(getDsaData);
  }, []);

  return (
    <div>
      <h1>DSA (Leetcode) Questions</h1>
      <button onClick={() => setDisplayForm(true)}>Add Questions</button>
      {displayForm && (
        <div>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <label htmlFor="title">Enter dsa question title: </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              value={title}
            />
            <label htmlFor="status">Select the status of this question: </label>
            <select
              name="status"
              id=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In progess</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {displayForm == false &&
        dsaData?.map(({ id, title, status }) => {
          return (
            <div key={id}>
              <h1>{title}</h1>
              <p>{status}</p>
              {status !== "completed" && (
                <button onClick={() => handleMarkCompleted(id)}>
                  Mark as Completed
                </button>
              )}
              <button onClick={() => handleUpdate(id)}>Update</button>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
};

export default DSA;
